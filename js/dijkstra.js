// dijkstra.js - Implementasi algoritma Dijkstra untuk maze solver
/**
 * Algoritma Dijkstra untuk menemukan jarak terpendek ke semua titik
 * Mirip dengan BFS tetapi memperhitungkan bobot (weight) jika ada
 */
class DijkstraSolver extends MazeSolver {
    constructor(canvas, maze, start, end) {
        super(canvas, maze, start, end);
        this.algorithm = 'dijkstra';
        
        // Dijkstra-specific properties
        this.distances = {}; // Untuk menyimpan jarak terpendek ke setiap titik
        this.priorityQueue = []; // Antrian prioritas sederhana
        
        // Gradient color untuk visualisasi jarak
        this.gradientColors = [
            '#00FF00', // Hijau (dekat)
            '#FFFF00', // Kuning
            '#FFA500', // Oranye
            '#FF0000'  // Merah (jauh)
        ];
        
        // Tetapkan jarak awal
        this.distances[this.posToKey(start)] = 0;
        this.reset();
    }
    
    reset() {
        super.reset();
        
        // Reset Dijkstra-specific properties
        this.distances = {};
        this.distances[this.posToKey(this.start)] = 0;
        
        // Initialize priority queue with start node
        this.priorityQueue = [this.start];
        
        // Peta distances untuk semua sel
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const pos = [row, col];
                const posKey = this.posToKey(pos);
                
                // Jika bukan titik awal, tetapkan jarak ke infinity
                if (posKey !== this.posToKey(this.start)) {
                    this.distances[posKey] = Infinity;
                }
            }
        }
    }
    
    // Override solveStep untuk algoritma Dijkstra
    solveStep() {
        if (!this.solving) return;
        
        // Jika antrian kosong, penyelesaian selesai
        if (this.priorityQueue.length === 0) {
            this.solving = false;
            
            // Jika kita mencapai titik akhir, rekonstruksi jalurnya
            if (this.distances[this.posToKey(this.end)] < Infinity) {
                this.reconstructPath();
            }
            return;
        }
        
        // Ambil simpul dengan jarak terpendek dari antrian
        let lowestDistIndex = 0;
        for (let i = 1; i < this.priorityQueue.length; i++) {
            const key1 = this.posToKey(this.priorityQueue[i]);
            const key2 = this.posToKey(this.priorityQueue[lowestDistIndex]);
            
            if (this.distances[key1] < this.distances[key2]) {
                lowestDistIndex = i;
            }
        }
        
        const current = this.priorityQueue[lowestDistIndex];
        this.priorityQueue.splice(lowestDistIndex, 1);
        
        const currentKey = this.posToKey(current);
        
        // Hapus dari currentExploration
        if (this.currentExploration.has(currentKey)) {
            this.currentExploration.delete(currentKey);
        }
        
        // Jika titik saat ini adalah titik akhir, kita telah menemukan jalur terpendek
        if (current[0] === this.end[0] && current[1] === this.end[1]) {
            this.reconstructPath();
            this.solved = true;
            this.solving = false;
            return;
        }
        
        // Jelajahi semua tetangga dari titik saat ini
        const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
        const [row, col] = current;
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            // Periksa batas dan pastikan bukan tembok
            if (
                newRow >= 0 && newRow < this.rows &&
                newCol >= 0 && newCol < this.cols &&
                this.maze[newRow][newCol] === 0
            ) {
                const neighbor = [newRow, newCol];
                const neighborKey = this.posToKey(neighbor);
                
                // Bobot default adalah 1, tetapi bisa diubah untuk sel tertentu
                const weight = 1;
                
                // Hitung jarak baru ke tetangga
                const tentativeDist = this.distances[currentKey] + weight;
                
                // Jika kita menemukan jarak yang lebih pendek, perbarui
                if (tentativeDist < this.distances[neighborKey]) {
                    this.distances[neighborKey] = tentativeDist;
                    this.visitedDict[neighborKey] = current;
                    
                    // Tambahkan ke antrian prioritas jika belum ada
                    let inQueue = false;
                    for (const node of this.priorityQueue) {
                        if (this.posToKey(node) === neighborKey) {
                            inQueue = true;
                            break;
                        }
                    }
                    
                    if (!inQueue) {
                        this.priorityQueue.push(neighbor);
                        this.visited.add(neighborKey);
                        this.currentExploration.add(neighborKey);
                    }
                }
            }
        }
    }
    
    // Rekonstruksi jalur dari titik akhir ke titik awal
    reconstructPath() {
        const path = [];
        let current = this.end;
        
        while (current) {
            path.push(current);
            current = this.visitedDict[this.posToKey(current)];
        }
        
        path.reverse();
        this.path = path;
        this.solved = true;
        this.steps = path.length - 1;
        this.cellsVisited = this.visited.size;
        
        // Update statistics
        const statsEl = document.getElementById('stats');
        if (statsEl) {
            statsEl.textContent = `Steps: ${this.steps} | Cells visited: ${this.cellsVisited}`;
        }
    }
    
    // Override draw method untuk visualisasi jarak
    draw() {
        this.ctx.fillStyle = COLORS.BLACK;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Temukan jarak maksimum untuk normalisasi warna
        let maxDist = 0;
        for (const key in this.distances) {
            if (this.distances[key] < Infinity && this.distances[key] > maxDist) {
                maxDist = this.distances[key];
            }
        }
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const pos = [row, col];
                const posKey = this.posToKey(pos);
                const x = col * (CELL_SIZE + MARGIN) + MARGIN;
                const y = row * (CELL_SIZE + MARGIN) + MARGIN;
                
                let color;
                if (pos[0] === this.start[0] && pos[1] === this.start[1]) {
                    color = COLORS.GREEN;
                } else if (pos[0] === this.end[0] && pos[1] === this.end[1]) {
                    color = COLORS.RED;
                } else if (this.solved && this.path.some(p => p[0] === row && p[1] === col)) {
                    color = COLORS.YELLOW;
                } else if (this.currentExploration.has(posKey)) {
                    color = COLORS.CYAN;
                } else if (this.visited.has(posKey)) {
                    // Gunakan warna gradient untuk jarak
                    if (this.distances[posKey] < Infinity) {
                        const ratio = Math.min(this.distances[posKey] / Math.max(maxDist, 1), 1);
                        color = this.getGradientColor(ratio);
                    } else {
                        color = COLORS.BLUE;
                    }
                } else if (this.maze[row][col] === 1) {
                    color = COLORS.BLACK;
                } else {
                    color = COLORS.WHITE;
                }
                
                this.ctx.fillStyle = color;
                this.ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
                
                // Jika sel telah dikunjungi dan bukan dinding, tampilkan jarak sebagai teks
                if (this.visited.has(posKey) && this.maze[row][col] === 0 
                    && this.distances[posKey] < Infinity
                    && !(pos[0] === this.start[0] && pos[1] === this.start[1])
                    && !(pos[0] === this.end[0] && pos[1] === this.end[1])) {
                    
                    this.ctx.fillStyle = 'black';
                    this.ctx.font = `${Math.floor(CELL_SIZE / 2.5)}px Arial`;
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.fillText(
                        this.distances[posKey].toString(),
                        x + CELL_SIZE / 2,
                        y + CELL_SIZE / 2
                    );
                }
            }
        }
        
        // Jika sudah selesai, tampilkan legenda warna jarak
        if (this.solved) {
            this.drawDistanceLegend();
        }
    }
    
    // Gambar legenda untuk warna jarak
    drawDistanceLegend() {
        const legendX = 10;
        const legendY = this.height + 10;
        const legendWidth = 200;
        const legendHeight = 20;
        
        // Gambar gradien untuk legenda
        const gradient = this.ctx.createLinearGradient(legendX, legendY, legendX + legendWidth, legendY);
        gradient.addColorStop(0, this.gradientColors[0]);
        gradient.addColorStop(0.33, this.gradientColors[1]);
        gradient.addColorStop(0.66, this.gradientColors[2]);
        gradient.addColorStop(1, this.gradientColors[3]);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(legendX, legendY, legendWidth, legendHeight);
        
        // Tambahkan teks di bawah legenda
        this.ctx.fillStyle = 'black';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Jarak dari titik awal', legendX + legendWidth / 2, legendY + legendHeight + 15);
        
        // Tambahkan label di kedua ujung
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Dekat', legendX, legendY + legendHeight + 30);
        this.ctx.textAlign = 'right';
        this.ctx.fillText('Jauh', legendX + legendWidth, legendY + legendHeight + 30);
    }
    
    // Fungsi untuk mendapatkan warna gradient berdasarkan rasio jarak
    getGradientColor(ratio) {
        // Konversi rasio ke indeks dalam array warna
        const index = Math.min(Math.floor(ratio * (this.gradientColors.length - 1)), this.gradientColors.length - 2);
        const remainder = (ratio * (this.gradientColors.length - 1)) - index;
        
        // Interpolasi antara dua warna terdekat
        const color1 = this.hexToRgb(this.gradientColors[index]);
        const color2 = this.hexToRgb(this.gradientColors[index + 1]);
        
        const r = Math.round(color1.r + remainder * (color2.r - color1.r));
        const g = Math.round(color1.g + remainder * (color2.g - color1.g));
        const b = Math.round(color1.b + remainder * (color2.b - color1.b));
        
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    // Helper untuk mengkonversi hex ke rgb
    hexToRgb(hex) {
        // Hilangkan # jika ada
        hex = hex.replace(/^#/, '');
        
        // Parse komponen hex
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        
        return { r, g, b };
    }
}