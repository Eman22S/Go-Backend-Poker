package utils

import (
	"crypto/rand"
	"fmt"
	"math"
	"math/big"
	"strconv"
)

// GetSecureRandom gets a fair random secure value
// Currently returns random including the max
// Will check it
func GetSecureRandom(min, max int) (int, error) {

	if max <= 0 {
		return 0, fmt.Errorf("can't define input as <=0")
	}
	nbig, err := rand.Int(rand.Reader, big.NewInt(int64(max)))
	if err != nil {
		return max, err
	}
	n := int(nbig.Int64())

	return min + n, err
}

func GetSecureRandomLegacy(min, max int) (int, error) {
	numbersRange := max - min
	rangeLog := math.Log2(float64(numbersRange))
	bytesToFetch := int(rangeLog/8) + 1
	bitsToFetch := int(rangeLog) + 1
	rangeFilter := int(1<<bitsToFetch) - 1

	randomNum, err := getRandomNum(bytesToFetch, rangeFilter)

	if err != nil {
		return -1, err
	}

	for randomNum > numbersRange {
		randomNum, err = getRandomNum(bytesToFetch, rangeFilter)

	}
	return randomNum + min, nil
}

func getRandomNum(bytesToFetch, rangeFilter int) (int, error) {
	binStr, err := getRandomPsudoBytesString(bytesToFetch)
	if err != nil {
		return -1, err
	}
	hexStr, err := bin2hex(binStr)
	if err != nil {
		return -1, nil
	}
	randomNum, err := strconv.ParseInt(hexStr, 10, 64)
	if err != nil {
	}
	randomNum = int64(rangeFilter) & randomNum

	return int(randomNum), nil
}

func getRandomPsudoBytesString(bytesToFetch int) (string, error) {
	byteArray := make([]byte, bytesToFetch)
	_, err := rand.Read(byteArray)
	if err != nil {
		return "", err
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
		return "", err
	}
	return fmt.Sprintf("%016b", ui), nil
}
