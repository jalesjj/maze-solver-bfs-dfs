# 🧩 Advanced Maze Solver - BFS, DFS & Dijkstra Visualization

Aplikasi web interaktif untuk memvisualisasikan dan membandingkan algoritma pencarian graf: **Breadth-First Search (BFS)**, **Depth-First Search (DFS)**, dan **Dijkstra's Algorithm** dalam memecahkan labirin.

## 🌟 Fitur Utama

### 🎮 Visualisasi Algoritma
- **BFS (Breadth-First Search)** - Pencarian melebar level demi level
- **DFS (Depth-First Search)** - Pencarian mendalam hingga ujung
- **Dijkstra's Algorithm** - Pencarian jalur terpendek dengan bobot

### 🎨 Maze Options
- **Pre-built Mazes** - 5x5, 15x15, 20x20, 30x30
- **Custom Maze Builder** - Buat labirin sendiri dengan drag & drop
- **Drawing Tools** - Wall, Path, Start Point, End Point

### 🤖 AI Chatbot Assistant
- **Powered by Google Gemini AI** - Chatbot cerdas berbahasa Indonesia
- **Algorithm Expert** - Menjawab pertanyaan tentang BFS, DFS, Dijkstra
- **Interactive Q&A** - Penjelasan detail dengan contoh praktis
- **Stop Function** - Kontrol penuh percakapan AI

### ⚡ Interactive Controls
- **Speed Control** - Atur kecepatan animasi (1-200ms)
- **Step-by-Step** - Lihat proses algoritma secara detail
- **Statistics** - Perbandingan efisiensi algoritma
- **Real-time Visualization** - Animasi smooth dan responsif

## 🚀 Demo

**Live Demo:** [https://jalesjj.github.io/maze-solver-bfs-dfs/](https://jalesjj.github.io/maze-solver-bfs-dfs/)

AI GEMINI Cant use becouse i have removed, if u want AI GEMINI just use your API gemini in [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🛠️ Teknologi

### Frontend
- **HTML5** - Structure dan Canvas untuk visualisasi
- **CSS3** - Styling modern dengan flexbox dan animations
- **Vanilla JavaScript** - Logic algoritma dan interaksi UI

### AI Integration
- **Google Gemini API** - Chatbot AI untuk pembelajaran
- **RESTful API** - Komunikasi dengan Gemini 1.5 Flash model

### Deployment
- **GitHub Pages** - Hosting statis gratis
- **Progressive Web App** - Responsive di semua device

## 🎯 Cara Penggunaan

### 1. **Memilih Maze**
- Pilih ukuran maze dari dropdown (5x5 hingga 30x30)
- Atau buat custom maze dengan tools yang tersedia

### 2. **Memilih Algoritma**
- **BFS** - Untuk jalur terpendek yang terjamin
- **DFS** - Untuk eksplorasi mendalam
- **Dijkstra** - Untuk jalur optimal dengan bobot

### 3. **Menjalankan Visualisasi**
- Klik tombol "Start" untuk memulai
- Atur kecepatan dengan slider
- Amati perbedaan cara kerja setiap algoritma

### 4. **Menggunakan AI Chatbot**
- Klik ikon robot di pojok kanan atas
- Tanyakan tentang algoritma BFS, DFS, atau Dijkstra
- Gunakan tombol Stop untuk menghentikan AI kapan saja

## 🎓 Nilai Edukasi

### Konsep yang Dipelajari
- **Graph Traversal Algorithms** - Cara menjelajahi graf
- **Time & Space Complexity** - Analisis efisiensi algoritma
- **Data Structures** - Queue, Stack, Priority Queue
- **Algorithm Visualization** - Memahami algoritma melalui visual

### Target Audience
- **Mahasiswa Informatika** - Belajar algoritma secara visual
- **Guru/Dosen** - Teaching tool yang interaktif
- **Self-learners** - Autodidak programming dan algoritma
- **Interview Preparation** - Persiapan technical interview

## 🔧 Setup Local Development

### Prerequisites
- Web browser modern (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Git untuk version control

### Installation
```bash
# Clone repository
git clone https://github.com/jalesjj/maze-solver-bfs-dfs.git

# Navigate to project directory
cd maze-solver-bfs-dfs

# Open in browser
# Buka index.html di browser atau gunakan live server
# ketik node server.js di terimnal
```

### AI Chatbot Setup
1. Dapatkan API Key dari [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Edit `js/chatbotgemini.js`:
```javascript
this.apiKey = 'YOUR_API';
```
3. Replace dengan API key Anda

## 🌈 Screenshots

### Main Interface
![Main Interface](https://via.placeholder.com/600x400/2196F3/FFFFFF?text=Main+Interface)

### BFS Visualization
![BFS Algorithm](https://via.placeholder.com/600x400/4CAF50/FFFFFF?text=BFS+Algorithm)

### Custom Maze Builder
![Maze Builder](https://via.placeholder.com/600x400/FF9800/FFFFFF?text=Custom+Maze)

### AI Chatbot
![AI Chatbot](https://via.placeholder.com/600x400/9C27B0/FFFFFF?text=AI+Chatbot)

## 📊 Algorithm Comparison

| Algoritma | Time Complexity | Space Complexity | Jalur Terpendek | Use Case |
|-----------|----------------|------------------|-----------------|----------|
| **BFS** | O(V + E) | O(V) | ✅ Ya | Graf tidak berbobot |
| **DFS** | O(V + E) | O(h) | ❌ Tidak | Eksplorasi mendalam |
| **Dijkstra** | O(V²) | O(V) | ✅ Ya | Graf berbobot |

## 👤 Author

**Jales JND**
- GitHub: [@jalesjj](https://github.com/jalesjj)\

## 🙏 Acknowledgments

- **Google Gemini AI** - Untuk teknologi chatbot
- **Font Awesome** - Untuk icons yang digunakan
- **GitHub Pages** - Untuk hosting gratis
- **Komunitas Open Source** - Untuk inspirasi dan pembelajaran

**⭐ Jika project ini membantu, jangan lupa kasih star! ⭐**

Made with ❤️ by [Jales JND](https://github.com/jalesjj)

</div>
