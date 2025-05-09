# Maze Solver Visualization

Aplikasi visualisasi untuk algoritma BFS (Breadth-First Search) dan DFS (Depth-First Search) dalam memecahkan labirin.

## Cara Instalasi

### Prasyarat

- [Node.js](https://nodejs.org/) (Versi 12.x atau lebih baru)
- NPM (biasanya terinstal bersamaan dengan Node.js)

### Langkah-langkah

1. **Clone atau download repository ini**

2. **Buka terminal dan navigasikan ke direktori proyek**

3. **Instal dependencies**
   ```
   npm install
   ```

4. **Jalankan server**
   ```
   npm start
   ```

5. **Buka browser dan akses aplikasi**
   
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda

## Fitur

- Visualisasi algoritma BFS dan DFS
- Pemilihan berbagai ukuran labirin (5x5, 15x15, 20x20, 30x30)
- Pembuatan labirin kustom
- Pengaturan kecepatan animasi
- Statistik penyelesaian (jumlah langkah dan sel yang dikunjungi)

## Struktur Folder

```
maze-solver/
├── index.html          # File HTML utama
├── styles.css          # File CSS untuk styling
├── js/                 # Direktori untuk file JavaScript
│   ├── constants.js    # Konstanta yang digunakan di seluruh aplikasi
│   ├── maze-solver.js  # Algoritma BFS dan DFS
│   ├── custom-maze.js  # Fungsi untuk membuat labirin kustom
│   ├── maze-data.js    # Data labirin yang telah didefinisikan
│   ├── app.js          # Script utama aplikasi
│   └── dropdown.js     # Fungsi untuk menangani dropdown
├── server.js           # Server Node.js sederhana
├── 404.html            # Halaman error 404
└── package.json        # File konfigurasi Node.js
```

## Pengembangan

Untuk pengembangan dengan hot-reload, gunakan:

```
npm run dev
```

Ini memerlukan Nodemon yang akan secara otomatis diinstal saat Anda menjalankan `npm install`.

## Perbedaan Algoritma

### BFS (Breadth-First Search)
- Menggunakan struktur data Queue (antrian)
- Menjelajahi semua node pada kedalaman yang sama sebelum pindah ke level berikutnya
- Cocok untuk menemukan jalur terpendek karena menjelajahi node berdasarkan "jarak" dari titik awal

### DFS (Depth-First Search)
- Menggunakan struktur data Stack (tumpukan)
- Menjelajahi satu jalur sampai tidak bisa lagi sebelum kembali dan mencoba jalur alternatif
- Lebih cepat dalam menemukan solusi di beberapa kasus, tetapi tidak menjamin jalur terpendek
