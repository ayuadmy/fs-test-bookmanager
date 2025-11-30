import API from "../services/api"

// Komponen BookList bertujuan untuk menampilkan daftar buku dalam bentuk tabel
function BookList({ books, onEdit, onDelete }) {
  const deleteBook = async (id) => {
  await API.delete(`/books/${id}`)
  onDelete()
  }

  return (
    <table className="table table-striped table-bordered table-hover table-light mt-4">
      <thead className="table-dark">
        <tr className="text-center">
          <th>No.</th>
          <th>Judul Buku</th>
          <th>Penulis</th>
          <th>Tahun Penerbitan</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {books.map((b, index) => (
          <tr key={b.id} className="text-center">
            <td>{index + 1}</td>
            <td>{b.title}</td>
            <td>{b.author}</td>
            <td>{b.published_year}</td>
            <td>
              <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(b)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteBook(b.id)}>Hapus</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BookList
