package utils

import (
	"crypto/rand"
	"fmt"
	"math"
	"math/big"
	"strconv"

	"github.com/pkg/errors"
)

// GetSecureRandom gets a fair random secure value
func GetSecureRandom(min, max int) (int, error) {

	if max <= 0 {
		return 0, fmt.Errorf("can't define input as <=0")
	}
	// rand.Int() returns a uniform random value in [0, max). It panics if max <= 0
	// https://pkg.go.dev/crypto/rand#Int
	nbig, err := rand.Int(rand.Reader, big.NewInt(int64(max)))
	if err != nil {
		return max, errors.Wrap(err, "GetSecureRandom failed")
	}
	n := int(nbig.Int64())

	return min + n, err
}

/**
 * Pull an appropriate number of bytes from the system's prng
 * and scale the resulting value to the range of $min, $max inclusive
 *
 **/
func GetSecureRandomLegacy(min, max int) (int, error) {
	numbersRange := max - min
	rangeLog := math.Log2(float64(numbersRange))
	bytesToFetch := int(rangeLog/8) + 1
	//possibly not as large as bytes to fetch (eg only care about 6 bits in 1 byte)
	bitsToFetch := int(rangeLog) + 1
	//rng filter to assist in requiring less loops to generate random numbers
	//the filter doesn't constrain random numbers to our exact range, but it does
	//get them closer.	eg Only care about 6 bits and generate random data for one byte
	//we discard the 2 highest bits and then see if that result is still greater than our range
	//filter in bin has all bits set to 1 of length $bits_to_fetch
	rangeFilter := int(1<<bitsToFetch) - 1

	randomNum, err := getRandomNum(bytesToFetch, rangeFilter)

	if err != nil {
		return -1, errors.WithMessage(err, "GetSecureRandomLegacy Failed")
	}

	for randomNum > numbersRange {
		randomNum, err = getRandomNum(bytesToFetch, rangeFilter)
		if err != nil {
			return -1, errors.WithMessage(err, "GetSecureRandomLegacy failed")
		}

	}
	return randomNum + min, nil
}

func getRandomNum(bytesToFetch, rangeFilter int) (int, error) {
	binStr, err := getRandomPsudoBytesString(bytesToFetch)
	if err != nil {
		return -1, errors.Wrap(err, "getRandom Failed")
	}
	hexStr, err := bin2hex(binStr)
	if err != nil {
		return -1, err
	}
	randomNum, err := strconv.ParseInt(hexStr, 10, 64)
	if err != nil {
		return -1, errors.Wrap(err, "getRandom Failed")
	}
	// discard irrelevant bits
	randomNum = int64(rangeFilter) & randomNum

	return int(randomNum), nil
}

func getRandomPsudoBytesString(bytesToFetch int) (string, error) {
	byteArray := make([]byte, bytesToFetch)
	_, err := rand.Read(byteArray)
	if err != nil {
		return "", errors.Wrap(err, "getRandomPsudoBytesString Failed")
	}

	randStr := ""

	for i := 0; i < len(byteArray); i++ {
		randStr += fmt.Sprintf("%08b", byteArray[i])
	}

	return randStr, nil
}

func bin2hex(str string) (string, error) {
	ui, err := strconv.ParseUint(str, 2, 64)
	if err != nil {
		return "", errors.Wrap(err, "bin2hex Failed")
	}
	return fmt.Sprintf("%016b", ui), nil
}
