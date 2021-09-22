package sngconfig

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func GetEnvVariable(name string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file %s", err.Error())
	}
	return os.Getenv(name)
}
