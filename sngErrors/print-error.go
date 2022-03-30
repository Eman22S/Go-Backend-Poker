package sngerrors

import (
	"fmt"
	sngconfig "sngrpc/sngConfig"
	"testing"
)

// help get sack trace on development env
func PrintError(err error) {
	if sngconfig.GetEnvVariable("GOENV") != "test" {
		fmt.Printf("# Stack Trace:\n%+v\n\n", err)
	}
}

// help get statck trace on test env and fails the test
func PrintErrorAndFailTest(err error, t *testing.T) {
	t.Errorf("# Stack Trace:\n%+v\n\n", err)
	t.FailNow()
}
