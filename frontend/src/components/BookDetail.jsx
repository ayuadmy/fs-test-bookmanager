import { useEffect, useState } from "react"
import API from "../services/api"

// Komponen BookDetail bertujuan untuk menampilkan detail informasi buku tertentu
function BookDetail({ bookId, onBack }) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    API.get(`/books/${bookId}`).then(res => setBook(res.data))
  }, [bookId])

  if (!book) return <div className="alert alert-info">Loading...</div>

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title">Detail Buku</h2>
        <p><strong>ID:</strong> {book.id}</p>
        <p><strong>Judul Buku:</strong> {book.title}</p>
        <p><strong>Penulis:</strong> {book.author}</p>
        <p><strong>Tahun Penerbitan:</strong> {book.published_year}</p>
        <button onClick={onBack} className="btn btn-secondary">Kembali</button>
      </div>
    </div>
  )
}

export default BookDetail