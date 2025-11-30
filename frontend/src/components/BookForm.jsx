import { useState } from "react"
import API from "../services/api"

// Komponen BookForm bertujuan menampilkan form input untuk menambahkan buku baru
function BookForm({ onSuccess }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    published_year: "",
  })

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/books", book)
    setBook({ title: "", author: "", published_year: "" })
    onSuccess()
  }

  return (
    <div className="card mb-4">
      <div className="card-header fw-bold text-center">Tambah Buku</div>
      <div className="card-body">
        <form onSubmit={submit} className="mb-4 mt-3">
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold text-end">Judul Buku:</label>
            <div className="col-sm-6">
              <input
                className="form-control"
                placeholder="Judul Buku" 
                value={book.title} 
                onChange={(e) => setBook({ ...book, title: e.target.value })}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold text-end">Nama Penulis:</label>
            <div className="col-sm-6">
              <input 
                className="form-control"
                placeholder="Nama Penulis" 
                value={book.author} 
                onChange={(e) => setBook({ ...book, author: e.target.value })}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold text-end">Tahun Penerbitan:</label>
            <div className="col-sm-6">
              <input 
                className="form-control"
                type="number"
                placeholder="Tahun Penerbitan" 
                value={book.published_year}
                min="1800"
                max={new Date().getFullYear()}
                onChange={(e) => setBook({ ...book, published_year: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="card-footer text-center">
            <button type="submit" className="btn btn-primary w-50 mt-3">Tambahkan Buku</button>
          </div>
        </form>
      </div>
    </div>


  )
}

export default BookForm