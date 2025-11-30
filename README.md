**BookCorner - Sistem Manajemen Buku**

Alasan tampilan user-friendly:
- Pengelolaan buku yang simpel, mulai dari menambahkan, mengedit, hingga menghapus buku
- Navbar sederhana dengan branding jelas
- Form tambah buku terstruktur dengan label
- Tabel daftar buku dengan tombol aksi yang konsisten
- Alert sambutan membuat aplikasi terasa ramah

Komponen penting di ReactJS yang digunakan:
- App.jsx -> Berfungsi untuk menyimpan state global dan mengatur alur tampilan. Semua Komponen lain bergantung pada state dan props dari App
- BookForm.jsx -> Form input bagi user untuk menambahkan buku baru, yang kemudian menjadi awal berjalannya sistem ini
- BookList.jsx -> Menampilkan tabel daftar buku yang telah ditambahkan, beserta tombol aksi. Komponen ini mendukung update dan delete buku yang diperlukan user saat menemukan data yang tidak sesuai.
- FormEdit.jsx -> Form input bagi user untuk mengedit data buku yang telah ditambahkan sebelumnya. Serupa dengan BookList, komponen ini juga membantu menjaga keakuratan data.
- BookDetail.jsx -> Menampilkan detail lengkap satu buku berdasarkan ID
- Komponen Bootstrap -> Meningkatkan user experience dengan memberikan tampilan yang responsif dan konsisten
