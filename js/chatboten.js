/**
 * Chatbot for Algorithm Assistance - DEBUG VERSION
 * Provides information about BFS, DFS, and Dijkstra algorithms
 */

class AlgorithmChatbot {
    constructor() {
        this.responses = {
            // BFS Related
            'bfs': {
                keywords: ['bfs', 'breadth first', 'breadth-first', 'queue', 'what is bfs'],
                response: "🔍 **Breadth-First Search (BFS)**\n\nBFS explores nodes level by level, like ripples in water. It uses a **Queue** (FIFO) and guarantees the shortest path in unweighted graphs.\n\n**Key features:**\n• Uses Queue data structure\n• Explores all neighbors before going deeper\n• Finds shortest path\n• Time complexity: O(V + E)"
            },
            
            // DFS Related
            'dfs': {
                keywords: ['dfs', 'depth first', 'depth-first', 'stack', 'explain dfs'],
                response: "🔍 **Depth-First Search (DFS)**\n\nDFS dives deep into one path before exploring alternatives. It uses a **Stack** (LIFO) and is memory efficient.\n\n**Key features:**\n• Uses Stack data structure\n• Goes as deep as possible first\n• Memory efficient\n• Good for maze solving and tree traversal\n• Time complexity: O(V + E)"
            },
            
            // Dijkstra Related
            'dijkstra': {
                keywords: ['dijkstra', 'dijkstra\'s', 'shortest path', 'weighted graph'],
                response: "🔍 **Dijkstra's Algorithm**\n\nDijkstra finds the shortest path in weighted graphs. It uses a priority queue and maintains distance estimates.\n\n**Key features:**\n• Works with weighted graphs\n• Uses priority queue\n• Guarantees shortest path\n• Cannot handle negative weights\n• Time complexity: O(V²) or O(E + V log V)"
            },
            
            // Comparisons
            'compare': {
                keywords: ['compare', 'difference', 'vs', 'versus', 'better', 'compare bfs and dfs', 'bfs vs dfs'],
                response: "📊 **Algorithm Comparison**\n\n**BFS vs DFS:**\n• BFS: Shortest path, more memory\n• DFS: Less memory, may not find shortest\n\n**BFS vs Dijkstra:**\n• BFS: Unweighted graphs only\n• Dijkstra: Handles weighted graphs\n\n**When to use:**\n• BFS: Shortest path in unweighted graphs\n• DFS: Tree traversal, topological sorting\n• Dijkstra: Shortest path with weights"
            }
        };
        
        this.fallbackResponses = [
            "🤔 I specialize in BFS, DFS, and Dijkstra algorithms. Try asking about:\n• How BFS works\n• DFS vs BFS comparison\n• Dijkstra implementation\n• Algorithm applications",
            "💡 I can help you understand pathfinding algorithms! Ask me about:\n• BFS (Breadth-First Search)\n• DFS (Depth-First Search)\n• Dijkstra's algorithm\n• Their differences and use cases"
        ];
        
        this.currentFallbackIndex = 0;
        this.init();
    }
    
    init() {
        console.log('Chatbot initializing...');
        this.bindEvents();
        this.addInitialMessage();
        console.log('Chatbot initialized successfully');
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
                if (e.key === 'Enter') this.sendMessage();
            });
        }
        
        // Handle suggestion buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-btn')) {
                console.log('Suggestion button clicked');
                const question = e.target.getAttribute('data-question');
                console.log('Question from button:', question);
                
                // Add the user message first
                this.addUserMessage(question);
                
                // Then handle the response
                this.handleUserMessage(question);
            }
        });
        
        console.log('Events bound successfully');
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
        const input = document.getElementById('chatbotInput');
        if (!input) return;
        
        const message = input.value.trim();
        console.log('Sending message:', message);
        
        if (message) {
            this.addUserMessage(message);
            input.value = '';
            this.handleUserMessage(message);
        }
    }
    
    addUserMessage(message) {
        console.log('Adding user message:', message);
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) {
            console.error('Messages container not found!');
            return;
        }
        
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
        console.log('User message added successfully');
    }
    
    addBotMessage(message) {
        console.log('Adding bot message:', message);
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) {
            console.error('Messages container not found!');
            return;
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${this.formatMessage(message)}</p>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        console.log('Bot message added successfully');
    }
    
    handleUserMessage(message) {
        console.log('Handling user message:', message);
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate thinking time
        setTimeout(() => {
            console.log('Processing response...');
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            console.log('Generated response:', response);
            this.addBotMessage(response);
        }, 1500); // Reduced delay for testing
    }
    
    generateResponse(message) {
        console.log('Generating response for:', message);
        const lowerMessage = message.toLowerCase();
        console.log('Lowercase message:', lowerMessage);
        
        // Check each response category
        for (const [category, data] of Object.entries(this.responses)) {
            console.log('Checking category:', category);
            for (const keyword of data.keywords) {
                console.log('Checking keyword:', keyword);
                if (lowerMessage.includes(keyword.toLowerCase())) {
                    console.log('Match found! Category:', category, 'Keyword:', keyword);
                    return data.response;
                }
            }
        }
        
        // No match found, use fallback
        console.log('No match found, using fallback');
        const response = this.fallbackResponses[this.currentFallbackIndex];
        this.currentFallbackIndex = (this.currentFallbackIndex + 1) % this.fallbackResponses.length;
        console.log('Fallback response:', response);
        return response;
    }
    
    showTypingIndicator() {
        console.log('Showing typing indicator');
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) {
            console.error('Messages container not found for typing indicator!');
            return;
        }
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
        console.log('Typing indicator shown');
    }
    
    hideTypingIndicator() {
        console.log('Hiding typing indicator');
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
            console.log('Typing indicator removed');
        } else {
            console.log('Typing indicator not found');
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
    console.log('DOM loaded, initializing chatbot...');
    try {
        new AlgorithmChatbot();
    } catch (error) {
        console.error('Error initializing chatbot:', error);
    }
});