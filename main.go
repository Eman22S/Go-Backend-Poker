package main

import (
	"flag"
	"fmt"
	"log"
	"net"

	sngpoker "sngrpc/sngpoker"
	services "sngrpc/sngpoker/services"
	scheduler "sngrpc/sngscheduler"

	"google.golang.org/grpc"
)

var (
	tls        = flag.Bool("tls", false, "Connection uses TLS if true, else plain TCP")
	certFile   = flag.String("cert_file", "", "The TLS cert file")
	keyFile    = flag.String("key_file", "", "The TLS key file")
	jsonDBFile = flag.String("json_db_file", "", "A json file containing a list of features")
	port       = flag.Int("port", 10000, "The server port")
)

func main() {
	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	var opts []grpc.ServerOption
	go scheduler.ScheduleOperations()
	grpcServer := grpc.NewServer(opts...)
	sngpoker.RegisterSngServer(grpcServer, &services.Server{})
	grpcServer.Serve(lis)
}
