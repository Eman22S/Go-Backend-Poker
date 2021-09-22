package utils

import (
	sngerrors "sngrpc/sngErrors"
	"testing"
)

func TestGetSecureRandom(t *testing.T) {
	min, max := 0, 10
	for i := 0; i < max*max; i++ {
		got, err := GetSecureRandom(min, max)
		if err != nil {
			sngerrors.PrintErrorAndFailTest(err, t)
		}
		if got > max || got < min {
			t.Errorf("Generated number is out of range %d", got)
		}
	}
}

func TestGetSecureRandomLegacy(t *testing.T) {
	min, max := 0, 10
	for i := 0; i < max*max; i++ {
		got, err := GetSecureRandomLegacy(min, max)
		if err != nil {
			sngerrors.PrintErrorAndFailTest(err, t)
		}
		if got > max || got < min {
			t.Errorf("Generated number is out of range %d", got)
		}
	}
}
