FROM ubuntu:20.04

RUN apt-get update
RUN apt-get -y install ca-certificates
RUN update-ca-certificates

# Install essential tools
RUN apt-get update -y \
 && apt install --no-install-recommends -y \
  build-essential \
  curl \
  wget \
  git \
  unzip

ENV GO111MODULE=on 
# Golang installation
RUN curl -OL https://golang.org/dl/go1.18.linux-amd64.tar.gz
RUN sha256sum go1.18.linux-amd64.tar.gz
RUN tar -C /usr/local -xvf go1.18.linux-amd64.tar.gz
ENV PATH=$PATH:/usr/local/go/bin
RUN go version

# Protoc installation
ENV PB_REL="https://github.com/protocolbuffers/protobuf/releases"
RUN curl -LO $PB_REL/download/v3.15.8/protoc-3.15.8-linux-x86_64.zip
RUN unzip protoc-3.15.8-linux-x86_64.zip -d /root/.local
ENV PATH="$PATH:/root/.local/bin"


# Install protoc-gen-go and protoc-gen-go-grpc plugins
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
ENV PATH="$PATH:/root/go/bin"

# Check protoc is installed
RUN protoc --version

# Setup Go-Backend-Pocker
RUN mkdir go-backend-poker 
WORKDIR go-backend-poker
COPY . .

# Generate Protoc files
RUN protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative sngpoker/sngpoker.proto
