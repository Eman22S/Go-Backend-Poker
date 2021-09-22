package utils

import (
	"testing"
)

func TestGetSecureRandom(t *testing.T) {
	min, max := 0, 10

	for i := 0; i < max*max; i++ {
		got, err := GetSecureRandom(min, max)
		if err != nil {
			t.Errorf("Error retured while expecting random number")
		}
		if got > max || got < min {
			t.Errorf("Generatee number is out of range")
		}
	}
}
