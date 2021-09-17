package main

import (
	"cameronapockergames/services"
	"log"

	"golang.org/x/net/context"
)

// TestUIState test
func TestUIState(c services.SngClient) {
	response, err := c.GetAllUiSettings(context.Background(), &services.UiSettingsRequest{UserId: "1"})

	if err != nil {
		log.Fatalf("Error when calling SayHello: %s", err)
	}
	log.Printf("Response from server: %s", response.Result)
}
