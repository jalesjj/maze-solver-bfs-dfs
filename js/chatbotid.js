/**
 * Chatbot Asisten Algoritma - Dengan Animasi Typing
 * Memberikan informasi tentang algoritma BFS, DFS, dan Dijkstra
 */

class AlgorithmChatbot {
    constructor() {
        this.responses = {
            // BFS Related - Indonesia
            'bfs': {
                keywords: [
                    'bfs', 'breadth first', 'breadth-first', 'queue', 'antrian',
                    'apa itu bfs', 'what is bfs', 'jelaskan bfs', 'cara kerja bfs',
                    'algoritma bfs', 'pencarian melebar', 'pencarian breadth first'
                ],
                response: "🔍 **Apa itu BFS?**\n\n**Breadth-First Search (BFS)** adalah algoritma pencarian yang menjelajahi graf atau pohon level demi level, seperti gelombang air yang menyebar dari titik tengah.\n\n**Cara Kerja:**\n• Dimulai dari node awal\n• Kunjungi semua tetangga langsung terlebih dahulu\n• Baru kemudian kunjungi tetangga dari tetangga\n• Menggunakan **Queue (Antrian)** - sistem FIFO\n\n**Keunggulan:**\n• Selalu menemukan jalur terpendek\n• Cocok untuk graf tidak berbobot\n• Sistematis dan teratur\n\n**Kekurangan:**\n• Membutuhkan memori lebih banyak\n• Lebih lambat untuk graf yang dalam"
            },
            
            // DFS Related - Indonesia
            'dfs': {
                keywords: [
                    'dfs', 'depth first', 'depth-first', 'stack', 'tumpukan',
                    'apa itu dfs', 'jelaskan dfs', 'cara kerja dfs',
                    'algoritma dfs', 'pencarian mendalam', 'pencarian depth first'
                ],
                response: "🔍 **Apa itu DFS?**\n\n**Depth-First Search (DFS)** adalah algoritma pencarian yang menyelam sedalam mungkin ke satu jalur sebelum kembali dan mencoba jalur lain.\n\n**Cara Kerja:**\n• Dimulai dari node awal\n• Terus maju ke node yang belum dikunjungi\n• Jika menemui jalan buntu, mundur (backtrack)\n• Coba jalur alternatif\n• Menggunakan **Stack (Tumpukan)** - sistem LIFO\n\n**Keunggulan:**\n• Hemat memori\n• Cepat menemukan solusi jika beruntung\n• Cocok untuk deteksi siklus\n\n**Kekurangan:**\n• Tidak menjamin jalur terpendek\n• Bisa terjebak di jalur yang sangat dalam"
            },
            
            // Dijkstra Related - Indonesia
            'dijkstra': {
                keywords: [
                    'dijkstra', 'dijkstra\'s', 'algoritma dijkstra', 'shortest path', 'jalur terpendek',
                    'graf berbobot', 'weighted graph', 'apa itu dijkstra', 'cara kerja dijkstra',
                    'djiksa', 'djikstra'
                ],
                response: "🔍 **Apa itu Dijkstra?**\n\n**Algoritma Dijkstra** adalah algoritma untuk menemukan jalur terpendek dari satu titik ke semua titik lain dalam graf berbobot.\n\n**Cara Kerja:**\n• Dimulai dari node awal dengan jarak 0\n• Pilih node dengan jarak terpendek yang belum dikunjungi\n• Update jarak ke semua tetangganya\n• Ulangi sampai semua node dikunjungi\n• Menggunakan **Priority Queue**\n\n**Keunggulan:**\n• Menjamin jalur terpendek yang optimal\n• Bekerja dengan graf berbobot\n• Efisien untuk graf dengan bobot positif\n\n**Kekurangan:**\n• Tidak bisa menangani bobot negatif\n• Lebih kompleks dari BFS/DFS"
            },
            
            // Comparisons - Indonesia
            'compare': {
                keywords: [
                    'bandingkan', 'compare', 'perbedaan', 'difference', 'vs', 'versus', 
                    'lebih baik', 'better', 'bfs vs dfs', 'dfs vs bfs',
                    'perbandingan algoritma', 'mana yang lebih baik', 'bandingkan bfs dan dfs',
                    'perbedaan bfs vs dijkstra', 'mana yang lebih baik dfs atau bfs'
                ],
                response: "📊 **Perbandingan Algoritma**\n\n**🔥 Bandingkan BFS dan DFS:**\n\n**BFS (Breadth-First):**\n• ✅ Selalu menemukan jalur terpendek\n• ✅ Sistematis, level demi level\n• ❌ Membutuhkan lebih banyak memori\n• ❌ Lebih lambat untuk graf dalam\n\n**DFS (Depth-First):**\n• ✅ Hemat memori\n• ✅ Cepat jika solusi dekat\n• ❌ Tidak menjamin jalur terpendek\n• ❌ Bisa terjebak di jalur panjang\n\n**🏆 Mana yang lebih baik?**\n• **BFS**: Jika butuh jalur terpendek\n• **DFS**: Jika hemat memori penting\n\n**🔥 Perbedaan BFS vs Dijkstra:**\n• **BFS**: Graf tidak berbobot saja\n• **Dijkstra**: Graf berbobot, lebih akurat"
            },
            
            // Implementation - Indonesia
            'implementation': {
                keywords: [
                    'implementasi', 'implement', 'code', 'kode', 'programming', 'pemrograman',
                    'cara membuat', 'how to code', 'algoritma code', 'contoh kode'
                ],
                response: "💻 **Tips Implementasi**\n\n**Implementasi BFS:**\n• Gunakan Queue (array dengan push/shift)\n• Lacak node yang sudah dikunjungi\n• Proses level demi level\n• Contoh: queue.push(neighbor), current = queue.shift()\n\n**Implementasi DFS:**\n• Gunakan Stack atau rekursi\n• Tandai node yang dikunjungi\n• Jelajahi satu jalur sampai selesai\n• Contoh: stack.push(neighbor), current = stack.pop()\n\n**Implementasi Dijkstra:**\n• Priority queue untuk node berikutnya\n• Array jarak untuk jalur terpendek\n• Relaxation pada setiap edge"
            },
            
            // Applications - Indonesia
            'applications': {
                keywords: [
                    'aplikasi', 'penggunaan', 'contoh', 'kegunaan', 'manfaat',
                    'real world', 'dunia nyata', 'implementasi nyata',
                    'kegunaan bfs', 'aplikasi dfs di dunia nyata', 'contoh penggunaan dijkstra'
                ],
                response: "🌟 **Aplikasi Algoritma di Dunia Nyata**\n\n**🔥 Kegunaan BFS:**\n• 🌐 **Media Sosial**: Mencari teman dalam 6 derajat koneksi\n• 🗺️ **GPS Navigation**: Rute terpendek tanpa macet\n• 🕷️ **Web Crawling**: Google mengindex website\n• 🎮 **Game AI**: NPC mencari jalan terpendek\n• 📡 **Network Broadcasting**: Kirim data ke semua node\n\n**🔥 Aplikasi DFS di Dunia Nyata:**\n• 🧩 **Puzzle Games**: Sudoku, 8-puzzle solver\n• 🏃 **Maze Solving**: Robot navigasi dalam labirin\n• 🔍 **File System**: Cari file dalam folder dan subfolder\n• ⚡ **Cycle Detection**: Deteksi deadlock di sistem\n• 🌳 **Family Tree**: Penelusuran silsilah keluarga\n\n**🔥 Contoh Penggunaan Dijkstra:**\n• 🚗 **Google Maps**: Rute terpendek dengan pertimbangan macet\n• ✈️ **Booking Pesawat**: Cari penerbangan termurah\n• 📶 **Internet Routing**: Data internet cari jalur tercepat\n• 🚚 **Logistik**: Optimasi rute pengiriman barang"
            },
            
            // Complexity - Indonesia
            'complexity': {
                keywords: [
                    'kompleksitas', 'complexity', 'waktu', 'time', 'ruang', 'space', 
                    'big o', 'efisiensi', 'performa', 'kecepatan'
                ],
                response: "⏱️ **Kompleksitas Waktu & Ruang**\n\n**Kompleksitas Waktu:**\n• BFS: O(V + E) - Linear terhadap vertices dan edges\n• DFS: O(V + E) - Linear terhadap vertices dan edges  \n• Dijkstra: O(V²) atau O(E + V log V) dengan heap\n\n**Kompleksitas Ruang:**\n• BFS: O(V) - Menyimpan queue dan visited\n• DFS: O(h) - Kedalaman rekursi atau stack\n• Dijkstra: O(V) - Array jarak dan priority queue\n\n**Keterangan:**\nV = jumlah vertices (node), E = jumlah edges, h = tinggi pohon"
            },

            // Greeting - Indonesia
            'greeting': {
                keywords: [
                    'halo', 'hai', 'hello', 'hi', 'selamat', 'good morning', 'good afternoon',
                    'apa kabar', 'how are you', 'assalamualaikum'
                ],
                response: "👋 **Halo! Selamat datang!**\n\nSaya adalah Asisten Algoritma yang siap membantu Anda memahami algoritma pencarian graf seperti BFS, DFS, dan Dijkstra.\n\n**Anda bisa bertanya tentang:**\n• Cara kerja masing-masing algoritma\n• Perbandingan antar algoritma\n• Implementasi dan contoh kode\n• Aplikasi di dunia nyata\n\nSilakan tanyakan apa saja! 😊"
            },

            // Help - Indonesia  
            'help': {
                keywords: [
                    'help', 'bantuan', 'tolong', 'bisa apa', 'what can you do',
                    'fitur', 'kemampuan', 'fungsi'
                ],
                response: "🤖 **Saya bisa membantu Anda dengan:**\n\n📚 **Penjelasan Algoritma:**\n• BFS (Breadth-First Search)\n• DFS (Depth-First Search)  \n• Dijkstra's Algorithm\n\n🔄 **Perbandingan & Analisis:**\n• Perbedaan BFS vs DFS\n• Kapan menggunakan algoritma tertentu\n• Kompleksitas waktu dan ruang\n\n💡 **Contoh Praktis:**\n• Implementasi kode\n• Aplikasi dunia nyata\n• Tips dan trik\n\n**Contoh pertanyaan:**\n*\"Jelaskan cara kerja BFS\"* atau *\"Bandingkan DFS dengan BFS\"*"
            }
        };
        
        this.fallbackResponses = [
            "🤔 Saya khusus membantu dengan algoritma BFS, DFS, dan Dijkstra. Coba tanyakan tentang:\n• Cara kerja BFS\n• Perbandingan DFS vs BFS\n• Implementasi Dijkstra\n• Aplikasi algoritma pencarian",
            "💡 Saya bisa membantu Anda memahami algoritma pathfinding! Tanyakan tentang:\n• BFS (Breadth-First Search)\n• DFS (Depth-First Search)\n• Algoritma Dijkstra\n• Perbedaan dan kegunaannya",
            "🚀 Mari jelajahi algoritma bersama! Saya tahu tentang:\n• BFS untuk jalur terpendek\n• DFS untuk eksplorasi mendalam\n• Dijkstra untuk graf berbobot\n• Kapan menggunakan masing-masing algoritma"
        ];
        
        this.currentFallbackIndex = 0;
        this.isTyping = false;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.addInitialMessage();
    }
    
    bindEvents() {
        const toggle = document.getElementById('chatbotToggle');
        const container = document.getElementById('chatbotContainer');
        const closeBtn = document.getElementById('closeChatbot');
        const input = document.getElementById('chatbotInput');
        const sendBtn = document.getElementById('sendMessage');
        
        if (toggle) toggle.addEventListener('click', () => this.toggleChatbot());
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeChatbot());
        if (sendBtn) sendBtn.addEventListener('click', () => this.sendMessage());
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !this.isTyping) this.sendMessage();
            });
        }
        
        // Handle suggestion buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-btn') && !this.isTyping) {
                const question = e.target.getAttribute('data-question');
                this.addUserMessage(question);
                this.handleUserMessage(question);
            }
        });
    }
    
    addInitialMessage() {
        // Initial message is already in HTML
    }
    
    toggleChatbot() {
        const container = document.getElementById('chatbotContainer');
        if (container) {
            container.classList.toggle('active');
        }
    }
    
    closeChatbot() {
        const container = document.getElementById('chatbotContainer');
        if (container) {
            container.classList.remove('active');
        }
    }
    
    sendMessage() {
        if (this.isTyping) return; // Prevent sending while typing
        
        const input = document.getElementById('chatbotInput');
        if (!input) return;
        
        const message = input.value.trim();
        
        if (message) {
            this.addUserMessage(message);
            input.value = '';
            this.handleUserMessage(message);
        }
    }
    
    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p id="typingText"></p>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Start typing animation
        this.typeMessage(message, document.getElementById('typingText'));
    }
    
    typeMessage(message, element) {
        this.isTyping = true;
        const formattedMessage = this.formatMessage(message);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = formattedMessage;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        
        let index = 0;
        element.innerHTML = '';
        
        const typeInterval = setInterval(() => {
            if (index < plainText.length) {
                const char = plainText.charAt(index);
                
                // Create a temporary element to hold the current text
                const currentText = plainText.substring(0, index + 1);
                
                // Find the corresponding HTML position
                let htmlContent = '';
                let textIndex = 0;
                let inTag = false;
                let tempTextIndex = 0;
                
                for (let i = 0; i < formattedMessage.length; i++) {
                    const htmlChar = formattedMessage.charAt(i);
                    
                    if (htmlChar === '<') {
                        inTag = true;
                        htmlContent += htmlChar;
                    } else if (htmlChar === '>') {
                        inTag = false;
                        htmlContent += htmlChar;
                    } else if (inTag) {
                        htmlContent += htmlChar;
                    } else {
                        if (tempTextIndex < currentText.length) {
                            htmlContent += htmlChar;
                            tempTextIndex++;
                        } else {
                            break;
                        }
                    }
                }
                
                element.innerHTML = htmlContent + '<span class="typing-cursor">|</span>';
                index++;
                this.scrollToBottom();
            } else {
                // Typing complete
                clearInterval(typeInterval);
                element.innerHTML = formattedMessage;
                this.isTyping = false;
            }
        }, 30); // Speed: 30ms per character (adjustable)
    }
    
    handleUserMessage(message) {
        // Show enhanced typing indicator
        this.showEnhancedTypingIndicator();
        
        // Simulate thinking time (longer for more realistic feel)
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addBotMessage(response);
        }, 2000 + Math.random() * 1000); // 2-3 seconds thinking time
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check each response category
        for (const [category, data] of Object.entries(this.responses)) {
            for (const keyword of data.keywords) {
                if (lowerMessage.includes(keyword.toLowerCase())) {
                    return data.response;
                }
            }
        }
        
        // No match found, use fallback
        const response = this.fallbackResponses[this.currentFallbackIndex];
        this.currentFallbackIndex = (this.currentFallbackIndex + 1) % this.fallbackResponses.length;
        return response;
    }
    
    showEnhancedTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content typing-indicator">
                <span class="typing-text">Sedang mengetik</span>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    showTypingIndicator() {
        // Fallback to enhanced version
        this.showEnhancedTypingIndicator();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    formatMessage(message) {
        // Convert markdown-like formatting to HTML
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/• (.*)/g, '• $1') // Keep bullet points
            .replace(/\n/g, '<br>'); // Line breaks
    }
    
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AlgorithmChatbot();
});