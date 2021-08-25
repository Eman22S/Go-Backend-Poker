package main

import (
	"log"

	service "cameronapockergames/services"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

func main() {

	var conn *grpc.ClientConn
	conn, err := grpc.Dial(":9000", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %s", err)
	}
	defer conn.Close()

	c := service.NewSngClient(conn)

	response, err := c.GetAllUiSettings(context.Background(), &service.UiSettingsRequest{})
	if err != nil {
		log.Fatalf("Error when calling SayHello: %s", err)
	}
	log.Printf("Response from server: %s", response.Result)

}
