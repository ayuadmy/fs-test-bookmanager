import { useEffect, useState } from "react"
import API from "./services/api"
import BookList from "./components/BookList"
import BookForm from "./components/BookForm"
import FormEdit from "./components/FormEdit"
import BookDetail from "./components/BookDetail"

function App() {
  // State utama
  const [books, setBooks] = useState([])
  const [editingBook, setEditingBook] = useState(null)
  const [detailBookId, setDetailBookId] = useState(null)

  // Fungsi untuk mengambil daftar buku dari backend
  const fetchBooks = async () => {
    const res = await API.get("/books")
    setBooks(res.data)
  }

  useEffect(() => {
  const loadBooks = async () => {
    await fetchBooks()
  }
  loadBooks()
  }, [])

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src="/logo.png"
              alt="BookCorner Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top me-2"
            />
            BookCorner
          </a>
        </div>
      </nav>
      <div className="alert alert-success text-center" role="alert">
        Selamat Datang di <strong>BookCorner</strong>!<br />
        <em>Temukan, simpan rapi, dan bagikan koleksi buku Anda di <strong>BookCorner</strong>.</em>
      </div>

      <h1 className="mb-4 text-center">Sistem Manajemen Koleksi Buku</h1>

      {!editingBook && !detailBookId && (
        <>
          <BookForm onSuccess={fetchBooks} />
          <BookList 
            books={books} 
            onEdit={(b) => setEditingBook(b)} 
            onDelete={fetchBooks}
          />
        </>
      )}

      {editingBook && (
        <FormEdit 
          bookToEdit={editingBook} 
          onSuccess={() => { setEditingBook(null); fetchBooks() }} 
          onCancel={() => setEditingBook(null)} 
        />
      )}

      {detailBookId && (
        <BookDetail 
          bookId={detailBookId} 
          onBack={() => setDetailBookId(null)} 
        />
      )}
    </div>
  )
}

export default App