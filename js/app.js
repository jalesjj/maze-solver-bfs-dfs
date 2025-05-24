// Modifikasi app.js untuk mendukung algoritma Dijkstra
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized');
    
    // DOM Elements
    const mazeCanvas = document.getElementById('mazeCanvas');
    const mazeSelect = document.getElementById('mazeSelect');
    const algorithmSelect = document.getElementById('algorithmSelect');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const customMazeControls = document.getElementById('customMazeControls');
    const customSizeSelect = document.getElementById('customSizeSelect');
    const createCustomMazeBtn = document.getElementById('createCustomMazeBtn');
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    const statsElement = document.getElementById('stats');
    
    // Global objects
    let mazeSolver = null;
    let customMaze = null;
    
    /**
     * Initialize the solver with the selected maze
     */
    function initializeSolver() {
        const choice = mazeSelect.value;
        const algorithm = algorithmSelect.value;
        
        if (choice === 'custom') {
            customMazeControls.style.display = 'block';
            
            if (!customMaze) {
                const size = parseInt(customSizeSelect.value);
                customMaze = new CustomMaze(size);
                customMaze.setupEvents();
                customMaze.draw();
            }
            
            startButton.disabled = true;
        } else {
            customMazeControls.style.display = 'none';
            
            const mazeData = createMaze(parseInt(choice));
            
            // Buat solver berdasarkan algoritma yang dipilih
            if (algorithm === 'dijkstra') {
                mazeSolver = new DijkstraSolver(mazeCanvas, mazeData.maze, mazeData.start, mazeData.end);
            } else {
                mazeSolver = new MazeSolver(mazeCanvas, mazeData.maze, mazeData.start, mazeData.end);
                mazeSolver.setAlgorithm(algorithm);
            }
            
            mazeSolver.draw();
            startButton.disabled = false;
        }
        
        // Reset stats
        statsElement.textContent = '';
    }
    
    /**
     * Start solving the maze
     */
    function startSolving() {
        if (mazeSelect.value === 'custom' && customMaze) {
            const mazeData = customMaze.getData();
            
            // Buat solver berdasarkan algoritma yang dipilih
            const algorithm = algorithmSelect.value;
            if (algorithm === 'dijkstra') {
                mazeSolver = new DijkstraSolver(mazeCanvas, mazeData.maze, mazeData.start, mazeData.end);
            } else {
                mazeSolver = new MazeSolver(mazeCanvas, mazeData.maze, mazeData.start, mazeData.end);
                mazeSolver.setAlgorithm(algorithm);
            }
        }
        
        if (!mazeSolver) {
            console.error('Maze solver not initialized');
            return;
        }
        
        // Set speed
        const speed = parseInt(speedSlider.value);
        mazeSolver.setDelay(speed);
        
        // Enable/disable buttons
        startButton.disabled = true;
        resetButton.disabled = false;
        
        // Start solving
        mazeSolver.startSolving();
    }
    
    /**
     * Reset the maze solver
     */
    function resetSolver() {
        if (mazeSolver) {
            mazeSolver.reset();
            startButton.disabled = false;
            statsElement.textContent = '';
        }
    }
    
    // Event Listeners
    mazeSelect.addEventListener('change', initializeSolver);
    algorithmSelect.addEventListener('change', initializeSolver);
    
    startButton.addEventListener('click', startSolving);
    resetButton.addEventListener('click', resetSolver);
    
    createCustomMazeBtn.addEventListener('click', () => {
        const size = parseInt(customSizeSelect.value);
        customMaze = new CustomMaze(size);
        customMaze.setupEvents();
        customMaze.draw();
        startButton.disabled = false;
    });
    
    speedSlider.addEventListener('input', () => {
        const value = speedSlider.value;
        speedValue.textContent = `${value}ms`;
        
        if (mazeSolver) {
            mazeSolver.setDelay(value);
        }
    });
    
    // Initialize on page load
    initializeSolver();
});