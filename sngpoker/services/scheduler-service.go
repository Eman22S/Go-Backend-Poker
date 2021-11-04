package services

import (
	"log"
	"sngrpc/sngpoker"

	"golang.org/x/net/context"
)

func (s *Server) Perform(ctx context.Context, req *sngpoker.SchedulerQuery) (*sngpoker.Result, error) {
	log.Printf("Received: %v", req)
	return &sngpoker.Result{Msg: "I have received your request"}, nil
}
