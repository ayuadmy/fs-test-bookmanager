package main

import (
	"log"
	"net/http"

	"github.com/ayuadmy/fs-test-bookmanager/router"
)

func main() {
	r := router.New()

	log.Println("Server running on :8080")
	http.ListenAndServe(":8080", r)
}
