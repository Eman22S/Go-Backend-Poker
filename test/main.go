package main

import (
	service "cameronapockergames/services"
	"log"

	"google.golang.org/grpc"
)

func main() {

	var conn *grpc.ClientConn
	conn, err := grpc.Dial(":10000", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %s", err)
	}
	defer conn.Close()

	c := service.NewSngClient(conn)

	TestUIState(c)
	TestGameState(c)

}
