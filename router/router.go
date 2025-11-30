package router

import (
	"github.com/ayuadmy/fs-test-bookmanager/handlers"
	"github.com/ayuadmy/fs-test-bookmanager/middleware"
	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func New() *chi.Mux {
	r := chi.NewRouter()

	r.Use(chimiddleware.Recoverer)
	r.Use(middleware.LoggerMiddleware)

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5174"}, // server Vite (frontend)
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // cache preflight request 5 menit
	}))

	r.Route("/books", func(r chi.Router) {
		r.Get("/", handlers.GetBook)
		r.Get("/{id}", handlers.GetBookByID)
		r.Post("/", handlers.InputBook)
		r.Put("/{id}", handlers.UpdateBook)
		r.Delete("/{id}", handlers.DeleteBook)
	})

	return r
}
