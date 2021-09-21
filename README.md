# Go Poker

Command to generate proto for go(protobuf version was 3.17 at the time of documentation)

- `protoc --go_out=. --go_opt=paths=source_relative  --go-grpc_out=. --go-grpc_opt=paths=source_relative sngpoker/sngpoker.proto`

- Check for latest version on https://github.com/protocolbuffers/protobuf/releases

Test
- run ```gotestum``` in project root terminal