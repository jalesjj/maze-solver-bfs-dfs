/**
 * Algorithm Chatbot with Gemini AI - WITH STOP FUNCTIONALITY
 * Smart chatbot powered by Google Gemini API
 */

class GeminiChatbot {
    constructor() {
        // API Configuration
        this.apiKey = 'AIzaSyBWvfxaZSWl3Ndj81DQpe7jtciU-xROz3s';
        this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
        
        // System prompt untuk context algoritma
        this.systemPrompt = `Anda adalah Asisten Algoritma yang ahli dalam algoritma pencarian graf, khususnya BFS (Breadth-First Search), DFS (Depth-First Search), dan Dijkstra's Algorithm.

INSTRUKSI PENTING:
- Jawab dalam Bahasa Indonesia yang ramah dan mudah dipahami
- Fokus pada algoritma BFS, DFS, dan Dijkstra
- Berikan penjelasan yang praktis dengan contoh nyata
- Gunakan emoji untuk membuat jawaban lebih menarik
- Jika ditanya di luar topik algoritma, arahkan kembali ke topik utama
- Berikan jawaban yang tidak terlalu panjang (maksimal 300 kata)
- Gunakan bullet points untuk penjelasan yang terstruktur

GAYA JAWABAN:
- Mulai dengan emoji yang relevan
- Gunakan formatting **bold** untuk istilah penting
- Berikan contoh aplikasi dunia nyata
- Akhiri dengan pertanyaan balik jika perlu

Contoh topik yang bisa dijawab:
- Penjelasan cara kerja BFS, DFS, Dijkstra
- Perbandingan antar algoritma
- Implementasi dan kompleksitas
- Aplikasi di dunia nyata
- Tips optimasi

Jika user menyapa, sambut dengan ramah dan jelaskan kemampuan Anda.`;

        this.isTyping = false;
        this.isProcessing = false;
        this.currentRequest = null;
        this.typingInterval = null;
        this.conversationHistory = [];
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.addInitialMessage();
        this.createStopButton();
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
                if (e.key === 'Enter' && !this.isProcessing) this.sendMessage();
            });
        }
        
        // Handle suggestion buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-btn') && !this.isProcessing) {
                const question = e.target.getAttribute('data-question');
                this.addUserMessage(question);
                this.handleUserMessage(question);
            }
        });
    }
    
    createStopButton() {
        // Add stop button to chatbot input area
        const inputContainer = document.querySelector('.chatbot-input');
        if (!inputContainer) return;
        
        // Create button container if it doesn't exist
        let buttonContainer = inputContainer.querySelector('.button-group');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-group';
            buttonContainer.style.cssText = `
                display: flex;
                gap: 10px;
                align-items: center;
                flex-shrink: 0;
            `;
            
            // Move send button to container
            const sendBtn = document.getElementById('sendMessage');
            if (sendBtn) {
                inputContainer.removeChild(sendBtn);
                buttonContainer.appendChild(sendBtn);
            }
            
            inputContainer.appendChild(buttonContainer);
        }
        
        const stopBtn = document.createElement('button');
        stopBtn.id = 'stopAI';
        stopBtn.className = 'stop-btn';
        stopBtn.innerHTML = '<i class="fas fa-stop"></i>';
        stopBtn.title = 'Stop AI Response';
        stopBtn.style.cssText = `
            width: 40px;
            height: 40px;
            background: #f44336;
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            flex-shrink: 0;
            min-width: 40px;
            min-height: 40px;
        `;
        
        stopBtn.addEventListener('click', () => this.stopAI());
        
        // Add hover effect
        stopBtn.addEventListener('mouseenter', () => {
            stopBtn.style.background = '#d32f2f';
            stopBtn.style.transform = 'scale(1.05)';
        });
        stopBtn.addEventListener('mouseleave', () => {
            stopBtn.style.background = '#f44336';
            stopBtn.style.transform = 'scale(1)';
        });
        
        // Insert before send button in the container
        const sendBtn = buttonContainer.querySelector('#sendMessage');
        if (sendBtn) {
            buttonContainer.insertBefore(stopBtn, sendBtn);
        } else {
            buttonContainer.appendChild(stopBtn);
        }
        
        this.stopButton = stopBtn;
    }
    
    showStopButton() {
        if (this.stopButton) {
            this.stopButton.classList.add('show');
        }
    }
    
    hideStopButton() {
        if (this.stopButton) {
            this.stopButton.classList.remove('show');
        }
    }
    
    stopAI() {
        console.log('🛑 User requested to stop AI');
        
        // Stop current API request
        if (this.currentRequest) {
            this.currentRequest.abort();
            this.currentRequest = null;
        }
        
        // Stop typing animation
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
        }
        
        // Reset states
        this.isTyping = false;
        this.isProcessing = false;
        
        // Hide typing indicator
        this.hideTypingIndicator();
        
        // Hide stop button
        this.hideStopButton();
        
        // Add stopped message
        this.addBotMessage("⏹️ **Percakapan Dihentikan**");
        
        // Re-enable input
        this.enableInput();
    }
    
    disableInput() {
        const input = document.getElementById('chatbotInput');
        const sendBtn = document.getElementById('sendMessage');
        if (input) input.disabled = true;
        if (sendBtn) sendBtn.disabled = true;
    }
    
    enableInput() {
        const input = document.getElementById('chatbotInput');
        const sendBtn = document.getElementById('sendMessage');
        if (input) input.disabled = false;
        if (sendBtn) sendBtn.disabled = false;
    }
    
    addInitialMessage() {
        // Initial message sudah ada di HTML
        setTimeout(() => {
            this.addBotMessage("👋 **Halo! Saya Asisten Algoritma bertenaga AI!**\n\nSaya bisa membantu Anda memahami algoritma **BFS**, **DFS**, dan **Dijkstra** dengan penjelasan yang detail dan contoh praktis.\n\n🤖 *Ditenagai oleh Google Gemini AI*\n\n💡 *Tip: Gunakan tombol ⏹️ untuk menghentikan respons saya kapan saja*");
        }, 1000);
    }
    
    toggleChatbot() {
        const container = document.getElementById('chatbotContainer');
        if (container) {
            container.classList.toggle('active');
        }
    }
    
    closeChatbot() {
        // Stop any ongoing process first
        this.stopAI();
        
        const container = document.getElementById('chatbotContainer');
        if (container) {
            container.classList.remove('active');
        }
    }
    
    async sendMessage() {
        if (this.isProcessing) return;
        
        const input = document.getElementById('chatbotInput');
        if (!input) return;
        
        const message = input.value.trim();
        
        if (message) {
            this.addUserMessage(message);
            input.value = '';
            await this.handleUserMessage(message);
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
        
        // Add to conversation history
        this.conversationHistory.push({
            role: 'user',
            parts: [{ text: message }]
        });
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
                <p id="typingText-${Date.now()}"></p>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Start typing animation
        const typingElement = messageDiv.querySelector('p');
        
        // Use setTimeout to ensure proper timing
        setTimeout(() => {
            this.typeMessage(message, typingElement);
        }, 100);
    }
    
    async handleUserMessage(message) {
        this.isProcessing = true;
        this.disableInput();
        this.showStopButton();
        this.showTypingIndicator();
        
        try {
            const controller = new AbortController();
            this.currentRequest = controller;
            
            const response = await this.callGeminiAPI(message, controller.signal);
            
            // Check if stopped during API call
            if (!this.isProcessing) {
                console.log('🛑 Process was stopped during API call');
                return;
            }
            
            this.hideTypingIndicator();
            
            if (response) {
                this.addBotMessage(response);
                // Add to conversation history
                this.conversationHistory.push({
                    role: 'model',
                    parts: [{ text: response }]
                });
            } else {
                this.addBotMessage("😅 **Maaf, terjadi kesalahan**\n\nSaya mengalami kendala dalam memproses pertanyaan Anda. Silakan coba lagi atau tanyakan hal lain tentang algoritma BFS, DFS, atau Dijkstra.");
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('🛑 Request aborted by user');
                return; // Don't show error for user-initiated stops
            }
            
            console.error('Error calling Gemini API:', error);
            
            // Only show error if still processing
            if (this.isProcessing) {
                this.hideTypingIndicator();
                this.addBotMessage("🔧 **Koneksi Bermasalah**\n\nSeperti nya ada masalah dengan koneksi ke AI. Pastikan internet stabil dan coba lagi! 🚀");
            }
        } finally {
            // Only reset if still processing (not stopped by user)
            if (this.isProcessing) {
                this.isProcessing = false;
                this.currentRequest = null;
                // Don't hide stop button or enable input here - let typing animation handle it
            }
        }
    }
    
    async callGeminiAPI(userMessage, signal) {
        try {
            const requestBody = {
                contents: [
                    {
                        parts: [
                            { text: this.systemPrompt + "\n\nUser: " + userMessage }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH", 
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            };

            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
                signal: signal // Add abort signal
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch (e) {
                    // Error parsing JSON
                }
                
                if (response.status === 400) {
                    return "⚠️ **Request Invalid**\n\nFormat permintaan bermasalah. Coba tanyakan dengan kata-kata yang lebih sederhana.";
                } else if (response.status === 403) {
                    return "🔑 **API Key Bermasalah**\n\nAPI Key tidak valid atau mencapai limit. Periksa kembali API Key Anda.";
                } else if (response.status === 429) {
                    return "⏰ **Rate Limit**\n\nTerlalu banyak request. Tunggu sebentar dan coba lagi.";
                } else {
                    return `❌ **Server Error (${response.status})**\n\nTerjadi kesalahan pada server Gemini. Detail: ${errorData?.error?.message || 'Unknown server error'}`;
                }
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                return "🤔 **Response Tidak Terduga**\n\nFormat respons dari AI tidak sesuai. Coba tanyakan dengan cara lain.";
            }
            
        } catch (error) {
            if (error.name === 'AbortError') {
                throw error; // Re-throw abort errors
            }
            console.error('Network/Fetch error:', error);
            throw error;
        }
    }
    
    typeMessage(message, element) {
        this.isTyping = true;
        const formattedMessage = this.formatMessage(message);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = formattedMessage;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        
        let index = 0;
        element.innerHTML = '';
        
        this.typingInterval = setInterval(() => {
            // Check if stopped - ONLY check isTyping, not isProcessing
            if (!this.isTyping) {
                clearInterval(this.typingInterval);
                this.typingInterval = null;
                return;
            }
            
            if (index < plainText.length) {
                // Create progressive HTML content
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
                        if (tempTextIndex <= index) {
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
                clearInterval(this.typingInterval);
                this.typingInterval = null;
                element.innerHTML = formattedMessage;
                this.isTyping = false;
                
                // Only hide stop button if not processing anymore
                if (!this.isProcessing) {
                    this.hideStopButton();
                    this.enableInput();
                }
            }
        }, 30); // 30ms per character
    }
    
    showTypingIndicator() {
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
                <span class="typing-text">🤖 AI sedang berpikir</span>
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
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    formatMessage(message) {
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\* (.*)/g, '• $1')
            .replace(/• (.*)/g, '• $1')
            .replace(/\n/g, '<br>');
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

// Initialize Gemini chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GeminiChatbot();
});