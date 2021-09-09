package main

import (
	"cameronapockergames/services"
	"io"
	"log"

	"golang.org/x/net/context"
)

// TestGameState game state
func TestGameState(c services.SngClient) {
	stream, err := c.GetStatus(context.Background(), &services.GetStatusRequest{})

	if err != nil {
		log.Fatalf("open stream error %v", err)
	}

	done := make(chan bool)

	go func() {
		for {
			resp, err := stream.Recv()
			if err == io.EOF {
				done <- true //means stream is finished
				return
			}
			if err != nil {
				log.Fatalf("cannot receive %v", err)
			}
			log.Printf("Resp received: %s", resp)
		}
	}()

	<-done //we will wait until all response is received
	log.Printf("finished")
}
