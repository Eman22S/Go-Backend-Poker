package sngpoker

import (
	"log"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

//nolint
func main() {
	var conn *grpc.ClientConn
	// This code is changed to address deprecation error in precommit.
	conn, err := grpc.Dial(":10000", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %s", err)
	}
	defer conn.Close()

	c := NewSngClient(conn)

	TestUIState(c)
	TestGameState(c)
}
