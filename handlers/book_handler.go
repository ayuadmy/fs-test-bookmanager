package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/ayuadmy/fs-test-bookmanager/models"
	"github.com/ayuadmy/fs-test-bookmanager/storage"
	"github.com/go-chi/chi/v5"
)

// Handler untuk route GET /books
func GetBook(w http.ResponseWriter, r *http.Request) {
	books := storage.GetStorageBook().GetBook()
	json.NewEncoder(w).Encode(books)
}

// Handler untuk route GET /books/{id}
func GetBookByID(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		http.Error(w, "ID salah.", http.StatusBadRequest)
		return
	}

	book, found := storage.GetStorageBook().GetBookByID(id)
	if !found {
		http.Error(w, "Buku tidak ditemukan.", http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(book)
}

// Handler untuk route POST /books
func InputBook(w http.ResponseWriter, r *http.Request) {
	var newBook models.Book
	err := json.NewDecoder(r.Body).Decode(&newBook)
	if err != nil {
		http.Error(w, "Struktur JSON tidak valid.", http.StatusBadRequest)
		return
	}

	storage.GetStorageBook().InputBook(newBook)
	json.NewEncoder(w).Encode(newBook)
}

// Handler untuk route PUT /books/{id}
func UpdateBook(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		http.Error(w, "ID salah.", http.StatusBadRequest)
		return
	}

	var updated models.Book
	err = json.NewDecoder(r.Body).Decode(&updated)
	if err != nil {
		http.Error(w, "Struktur JSON tidak valid.", http.StatusBadRequest)
		return
	}

	book, located := storage.GetStorageBook().UpdateBook(id, updated)
	if !located {
		http.Error(w, "Buku tidak ditemukan.", http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(book)
}

// Handler untuk route DELETE /books/{id}
func DeleteBook(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		http.Error(w, "ID salah.", http.StatusBadRequest)
		return
	}

	discovered := storage.GetStorageBook().DeleteBook(id)
	if !discovered {
		http.Error(w, "Buku tidak ditemukan.", http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message":"deleted"}`))
}
