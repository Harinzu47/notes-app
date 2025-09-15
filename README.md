Aplikasi Catatan Markdown (Full-Stack MERN)

Selamat datang di Aplikasi Catatan Markdown! Ini adalah aplikasi web full-stack yang dibangun dari awal menggunakan tumpukan MERN (MongoDB, Express.js, React, Node.js). Aplikasi ini memungkinkan pengguna untuk mendaftar, login, dan mengelola catatan pribadi mereka yang ditulis dalam format Markdown, dengan pratinjau yang dirender secara real-time.

Proyek ini adalah demonstrasi komprehensif dari pengembangan web modern, mencakup arsitektur backend yang kokoh, frontend yang reaktif, autentikasi aman, dan pengujian otomatis.

✨ Fitur Utama
Autentikasi Pengguna Aman: Sistem registrasi dan login lengkap menggunakan JSON Web Tokens (JWT) untuk mengamankan sesi pengguna.

Manajemen Catatan (CRUD): Fungsionalitas penuh untuk Membuat, Membaca, Memperbarui, dan Menghapus catatan.

Editor & Pratinjau Markdown Real-time: Tulis catatan dalam Markdown dan lihat hasilnya dirender ke HTML secara instan saat Anda mengetik.

Pencarian Cepat di Sisi Klien: Cari catatan berdasarkan judul dengan pemfilteran instan tanpa memuat ulang halaman.

Penyempurnaan UI/UX: Dilengkapi dengan indikator loading dan pesan error yang informatif untuk pengalaman pengguna yang lebih baik.

Desain Responsif: Antarmuka yang dibuat dengan Tailwind CSS beradaptasi dengan baik di berbagai ukuran layar, dari desktop hingga mobile.

Backend yang Aman & Tervalidasi: Dilengkapi dengan validasi input, rate limiting untuk mencegah serangan brute-force, dan header keamanan menggunakan Helmet.

Pengujian Backend Otomatis: Setiap endpoint API diuji secara otomatis menggunakan Jest dan Supertest untuk memastikan keandalan.

🛠️ Tumpukan Teknologi (Tech Stack)

<table>
<tr>
<td align="center"><strong>Frontend</strong></td>
<td align="center"><strong>Backend</strong></td>
<td align="center"><strong>Database</strong></td>
<td align="center"><strong>Pengujian</strong></td>
</tr>
<tr>
<td>
<ul>
<li>React.js</li>
<li>Vite</li>
<li>Tailwind CSS</li>
<li>Axios</li>
<li>DOMPurify</li>
</ul>
</td>
<td>
<ul>
<li>Node.js</li>
<li>Express.js</li>
<li>JSON Web Token (JWT)</li>
<li>Bcrypt.js</li>
<li>Express Validator</li>
<li>Helmet.js</li>
<li>Express Rate Limit</li>
</ul>
</td>
<td>
<ul>
<li>MongoDB Atlas</li>
<li>Mongoose</li>
</ul>
</td>
<td>
<ul>
<li>Jest</li>
<li>Supertest</li>
<li>MongoDB Memory Server</li>
</ul>
</td>
</tr>
</table>

🚀 Memulai (Getting Started)
Untuk menjalankan proyek ini di mesin lokal Anda, ikuti langkah-langkah berikut.

Prasyarat
Node.js (v16 atau lebih baru)

Akun MongoDB Atlas (tingkatan gratis sudah cukup)

Git

Instalasi
Clone repositori ini:

git clone [https://github.com/Harinzu47/notes-app.git]
cd notes-app

Setup Backend:

# Pindah ke direktori backend

cd back-end

# Instal dependensi

npm install

# Buat file .env dan isi dengan variabel Anda

cp .env.example .env

Buka file .env yang baru dibuat dan isi variabel berikut:

MONGO_URI=mongodb+srv://... # Connection string dari MongoDB Atlas Anda
JWT_SECRET=rahasia_super_aman_dan_panjang

Setup Frontend:

# Kembali ke root, lalu pindah ke direktori frontend

cd ../front-end-react

# Instal dependensi

npm install

Menjalankan Aplikasi
Jalankan server Backend:
Dari direktori /backend, jalankan:

npm run dev

Server akan berjalan di http://localhost:3001.

Jalankan server Frontend:
Buka terminal baru, lalu dari direktori /frontend, jalankan:

npm run dev

Aplikasi React akan terbuka di http://localhost:5173 (atau port lain yang tersedia).

🧪 Menjalankan Pengujian
Untuk menjalankan rangkaian pengujian otomatis untuk backend, jalankan perintah berikut dari direktori /backend:

npm test
