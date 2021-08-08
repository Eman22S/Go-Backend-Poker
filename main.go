package main

import (
	"log"
	"net"

	services "cameronapockergames/services"

	"google.golang.org/grpc"
)

func main() {

	lis, err := net.Listen("tcp", ":9000")

	if err != nil {
		log.Fatal("Server failed to listen")
	}

	s := services.Server{}

	grpcServer := grpc.NewServer()

	services.RegisterSngServer(grpcServer, &s)

	errGrpcServer := grpcServer.Serve(lis)

	if errGrpcServer != nil {
		log.Fatal("Grpc Server Failed To Listen")
	}

}
