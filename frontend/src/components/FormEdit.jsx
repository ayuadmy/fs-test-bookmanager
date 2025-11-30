import { useState, useEffect } from "react"
import API from "../services/api"

// Komponen FormEdit bertujuan untuk menampilkan halaman edit informasi buku yang telah diinputkan sebelumnya
function FormEdit({ bookToEdit, onSuccess, onCancel }) {
  const [book, setBook] = useState(bookToEdit)

  useEffect(() => {
    setBook(bookToEdit)
  }, [bookToEdit])

  const submit = async (e) => {
    e.preventDefault()
    await API.put(`/books/${book.id}`, {
      title: book.title,
      author: book.author,
      published_year: book.published_year
    })
    onSuccess()
  }

  if (!book) return null

  return (
    <form onSubmit={submit} className="mb-4">
      <h2 className="mb-3">Edit Buku</h2>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Judul Buku" 
          value={book.title} 
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Nama Penulis" 
          value={book.author} 
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="number"
          placeholder="Tahun Penerbitan" 
          value={book.published_year} 
          onChange={(e) => setBook({ ...book, published_year: Number(e.target.value) })}
        />
      </div>
      <button type="submit" className="btn btn-success me-2">Simpan Perubahan</button>
      <button type="button" onClick={onCancel} className="btn btn-secondary">Batal</button>
    </form>
  )
}

export default FormEdit