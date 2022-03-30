# Go Poker
# Installation 
Download and Install Go from https://go.dev/doc/install

Install pre-compiled binaries of protobuf following instruction from https://grpc.io/docs/protoc-installation/. 

Install gRPC following instruction from https://grpc.io/docs/languages/go/quickstart/ .

Run

- `protoc --go_out=. --go_opt=paths=source_relative  --go-grpc_out=. --go-grpc_opt=paths=source_relative sngpoker/sngpoker.proto`

- Check for latest version on https://github.com/protocolbuffers/protobuf/releases

Test
- run ```gotestum``` in project root terminal
