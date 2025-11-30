package storage

import (
	"sync"

	"github.com/ayuadmy/fs-test-bookmanager/models"
)

type StorageBook struct {
	Books  []models.Book
	mu     sync.Mutex
	nextID int
}

var instance *StorageBook
var once sync.Once

// Fungsi ini mengembalikan singleton StorageBook
func GetStorageBook() *StorageBook {
	once.Do(func() {
		instance = &StorageBook{
			Books:  make([]models.Book, 0),
			nextID: 1,
		}
	})

	return instance
}

// Fungsi ini untuk menambahkan buku baru
func (s *StorageBook) InputBook(book models.Book) {
	s.mu.Lock()
	defer s.mu.Unlock()
	book.ID = s.nextID
	s.nextID++
	s.Books = append(s.Books, book)
}

// Fungsi ini untuk mengambil data semua buku
func (s *StorageBook) GetBook() []models.Book {
	return s.Books
}

// Fungsi ini untuk mengambil data buku berdasarkan ID bukunya
func (s *StorageBook) GetBookByID(id int) (models.Book, bool) {
	for i := range s.Books {
		if s.Books[i].ID == id {
			return s.Books[i], true
		}
	}

	return models.Book{}, false
}

// Fungsi ini untuk memperbarui informasi buku
func (s *StorageBook) UpdateBook(id int, updated models.Book) (models.Book, bool) {
	for i := range s.Books {
		if s.Books[i].ID == id {
			s.Books[i] = updated

			return updated, true
		}
	}

	return models.Book{}, false
}

// Fungsi ini untuk menghapus buku
func (s *StorageBook) DeleteBook(id int) bool {
	for i := range s.Books {
		if s.Books[i].ID == id {
			s.Books = append(s.Books[:i], s.Books[i+1:]...)

			return true
		}
	}

	return false
}
