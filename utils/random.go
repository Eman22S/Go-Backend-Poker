package utils

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"math"
	"strconv"
)

// GetSecureRandom gets a fair random secure value
// Currently returns random including the max
// Will check it
func GetSecureRandom(min, max int) (int, error) {
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

	return hex.EncodeToString([]byte(byteArray)), nil
}

func bin2hex(str string) (string, error) {
	ui, err := strconv.ParseUint(str, 16, 64)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("%016b", ui), nil
}
