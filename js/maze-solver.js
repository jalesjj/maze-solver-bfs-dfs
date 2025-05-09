/**
 * MazeSolver class - handles the maze solving algorithms and visualization
 */
class MazeSolver {
    constructor(canvas, maze, start, end) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.maze = maze;
        this.start = start;
        this.end = end;
        this.rows = maze.length;
        this.cols = maze[0].length;
        
        // Set canvas dimensions
        this.width = this.cols * (CELL_SIZE + MARGIN) + MARGIN;
        this.height = this.rows * (CELL_SIZE + MARGIN) + MARGIN;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Solver state
        this.visited = new Set([this.posToKey(start)]);
        this.currentExploration = new Set([this.posToKey(start)]);
        this.path = [];
        this.solving = false;
        this.solved = false;
        this.algorithm = 'bfs';
        
        // BFS/DFS data structures
        this.queue = [];
        this.stack = [];
        this.visitedDict = {};
        this.visitedDict[this.posToKey(start)] = null;
        
        // Animation
        this.delay = 50;
        this.animationFrame = null;
        
        // Stats
        this.steps = 0;
        this.cellsVisited = 0;
    }
    
    posToKey(pos) {
        return `${pos[0]},${pos[1]}`;
    }
    
    keyToPos(key) {
        return key.split(',').map(Number);
    }
    
    setAlgorithm(algorithm) {
        this.algorithm = algorithm;
        this.reset();
    }
    
    setDelay(delay) {
        this.delay = delay;
    }
    
    reset() {
        this.visited = new Set([this.posToKey(this.start)]);
        this.currentExploration = new Set([this.posToKey(this.start)]);
        this.path = [];
        this.solving = false;
        this.solved = false;
        this.queue = [this.start];
        this.stack = [this.start];
        this.visitedDict = {};
        this.visitedDict[this.posToKey(this.start)] = null;
        this.steps = 0;
        this.cellsVisited = 0;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.draw();
    }
    
    solveStep() {
        if (!this.solving) return;
        
        let current;
        if (this.algorithm === 'bfs') {
            if (this.queue.length === 0) {
                this.solving = false;
                return;
            }
            current = this.queue.shift();
        } else {
            if (this.stack.length === 0) {
                this.solving = false;
                return;
            }
            current = this.stack.pop();
        }
        
        const currentKey = this.posToKey(current);
        if (this.currentExploration.has(currentKey)) {
            this.currentExploration.delete(currentKey);
        }
        
        if (current[0] === this.end[0] && current[1] === this.end[1]) {
            // Found the end - reconstruct path
            const path = [];
            let pos = current;
            while (pos) {
                path.push(pos);
                pos = this.visitedDict[this.posToKey(pos)];
            }
            path.reverse();
            this.path = path;
            this.solved = true;
            this.solving = false;
            this.steps = path.length - 1;
            this.cellsVisited = this.visited.size;
            document.getElementById('stats').textContent = 
                `Steps: ${this.steps} | Cells visited: ${this.cellsVisited}`;
            return;
        }
        
        const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
        const [row, col] = current;
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            const newPos = [newRow, newCol];
            const newPosKey = this.posToKey(newPos);
            
            if (newRow >= 0 && newRow < this.rows && 
                newCol >= 0 && newCol < this.cols && 
                this.maze[newRow][newCol] === 0 && 
                !this.visitedDict.hasOwnProperty(newPosKey)) {
                
                if (this.algorithm === 'bfs') {
                    this.queue.push(newPos);
                } else {
                    this.stack.push(newPos);
                }
                this.visitedDict[newPosKey] = current;
                this.visited.add(newPosKey);
                this.currentExploration.add(newPosKey);
            }
        }
    }
    
    startSolving() {
        this.solving = true;
        this.animate();
    }
    
    animate() {
        if (!this.solving) return;
        
        this.solveStep();
        this.draw();
        
        setTimeout(() => {
            this.animationFrame = requestAnimationFrame(() => this.animate());
        }, this.delay);
    }
    
    draw() {
        this.ctx.fillStyle = COLORS.BLACK;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
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
                    color = COLORS.BLUE;
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
}