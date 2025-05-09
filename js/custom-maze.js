/**
 * CustomMaze class - handles the creation of custom mazes
 */
class CustomMaze {
    constructor(size) {
        this.size = size;
        this.maze = Array(size).fill().map(() => Array(size).fill(0));
        this.start = [0, 0];
        this.end = [size-1, size-1];
        this.drawingMode = 'wall'; // 'wall', 'path', 'start', or 'end'
        this.canvas = document.getElementById('mazeCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas dimensions
        this.width = size * (CELL_SIZE + MARGIN) + MARGIN;
        this.height = size * (CELL_SIZE + MARGIN) + MARGIN;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Drawing state
        this.isDrawing = false;
        this.lastCell = null;

        // Setup event listeners
        this.setupEvents();
        this.draw();
    }
    
    setupEvents() {
        this.canvas.addEventListener('click', this.handleCanvasClick.bind(this));

        // Drag events for continuous drawing
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleMouseUp.bind(this));
        
        document.getElementById('wallToolBtn').addEventListener('click', () => this.setDrawingMode('wall'));
        document.getElementById('pathToolBtn').addEventListener('click', () => this.setDrawingMode('path'));
        document.getElementById('startToolBtn').addEventListener('click', () => this.setDrawingMode('start'));
        document.getElementById('endToolBtn').addEventListener('click', () => this.setDrawingMode('end'));
        
        document.getElementById('clearCustomMazeBtn').addEventListener('click', () => this.clear());
    }
    
    setDrawingMode(mode) {
        this.drawingMode = mode;
        
        // Update active button
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const btnId = mode + 'ToolBtn';
        document.getElementById(btnId).classList.add('active');
    }
    
    handleMouseDown(event) {
        this.isDrawing = true;
        this.drawCell(event);
    }
    
    handleMouseMove(event) {
        if (!this.isDrawing) return;
        this.drawCell(event);
    }
    
    handleMouseUp() {
        this.isDrawing = false;
        this.lastCell = null;
    }
    
    drawCell(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Convert to grid coordinates
        const col = Math.floor(x / (CELL_SIZE + MARGIN));
        const row = Math.floor(y / (CELL_SIZE + MARGIN));
        
        // Check if we're on the same cell as before
        const cellKey = `${row},${col}`;
        if (this.lastCell === cellKey) return;
        this.lastCell = cellKey;
        
        // Make sure we're within bounds
        if (row >= 0 && row < this.size && col >= 0 && col < this.size) {
            if (this.drawingMode === 'wall') {
                this.maze[row][col] = 1;
            } else if (this.drawingMode === 'path') {
                this.maze[row][col] = 0;
            } else if (this.drawingMode === 'start') {
                // Only change start point on click, not drag
                if (!this.isDrawing || (this.isDrawing && !this.lastCell)) {
                    this.start = [row, col];
                }
            } else if (this.drawingMode === 'end') {
                // Only change end point on click, not drag
                if (!this.isDrawing || (this.isDrawing && !this.lastCell)) {
                    this.end = [row, col];
                }
            }
            
            this.draw();
        }
    }
    
    handleCanvasClick(event) {
        this.drawCell(event);
    }
    
    clear() {
        this.maze = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.start = [0, 0];
        this.end = [this.size-1, this.size-1];
        this.draw();
    }
    
    draw() {
        this.ctx.fillStyle = COLORS.BLACK;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const x = col * (CELL_SIZE + MARGIN) + MARGIN;
                const y = row * (CELL_SIZE + MARGIN) + MARGIN;
                
                let color;
                if (row === this.start[0] && col === this.start[1]) {
                    color = COLORS.GREEN;
                } else if (row === this.end[0] && col === this.end[1]) {
                    color = COLORS.RED;
                } else if (this.maze[row][col] === 1) {
                    color = COLORS.BLACK;
                } else {
                    color = COLORS.WHITE;
                }
                
                this.ctx.fillStyle = color;
                this.ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            }
        }
    }
    
    getData() {
        return {
            maze: this.maze,
            start: this.start,
            end: this.end
        };
    }
}