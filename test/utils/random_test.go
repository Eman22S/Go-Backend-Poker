package utils_test

import (
	utils "cameronapockergames/utils"
	"testing"
)

func TestGetSecureRandom(t *testing.T) {
	min, max := 0, 10

	for i := 0; i < 10; i++ {
		got, err := utils.GetSecureRandom(min, max)
		if err != nil {
			t.Errorf("Error while getting secure random")
		}
		if got > max || got < min {
			t.Errorf("Random generator not correct")
		}
	}
}
