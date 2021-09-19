package utils

import (
	"fmt"
	"math"
	"testing"
)

func TestGetSecureRandom(t *testing.T) {
	min, max := 0, 10

	for i := 0; i < max^2; i++ {
		got, err := GetSecureRandom(min, max)
		if err != nil {
			t.Errorf("Error while getting secure random")
		}
		if got > max || got < min {
			t.Errorf("Random generator not correct")
		}
	}
}

func TestGetSecureRandomEqualProbability(t *testing.T) {
	min, max := 0, 101

	numberOfTry := 100 ^ 5

	countDict := make([]int, max+1)

	for i := 0; i < numberOfTry; i++ {
		rn, err := GetSecureRandom(min, max)
		if err != nil {
			t.Errorf("Error while getting secure random")
		}

		countDict[rn]++
	}

	// calculate percentage
	sd := getStandardDeviation(countDict)
	fmt.Printf("%v", countDict)
	if sd != 0 {
		t.Errorf("Expected standard deviation 0 but found %f", sd)
	}
}

func getStandardDeviation(nums []int) float64 {
	var sum, mean, sd float64
	for _, value := range nums {
		sum += float64(value)
	}

	numsLen := float64(len(nums))
	mean = sum / numsLen

	for _, value := range nums {
		// The use of Pow math function func Pow(x, y float64) float64
		sd += math.Pow(float64(value)-mean, 2)
	}
	// The use of Sqrt math function func Sqrt(x float64) float64
	sd = math.Sqrt(sd / numsLen)

	return sd
}
