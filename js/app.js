/**
 * Main application script - initializes and manages the application
 */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mazeCanvas');
    const mazeSelect = document.getElementById('mazeSelect');
    const algorithmSelect = document.getElementById('algorithmSelect');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const customMazeControls = document.getElementById('customMazeControls');
    const customSizeSelect = document.getElementById('customSizeSelect');
    const createCustomMazeBtn = document.getElementById('createCustomMazeBtn');
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    const stats = document.getElementById('stats');
    
    let solver = null;
    let customMaze = null;
    
    // Initialize the solver based on the selected maze
    function initializeSolver() {
        const choice = mazeSelect.value;
        
        if (choice === 'custom') {
            customMazeControls.style.display = 'block';
            
            if (!customMaze) {
                const size = parseInt(customSizeSelect.value);
                customMaze = new CustomMaze(size);
            }
            
            // Disable solving until custom maze is created
            startButton.disabled = true;
        } else {
            customMazeControls.style.display = 'none';
            
            const mazeData = createMaze(parseInt(choice));
            solver = new MazeSolver(canvas, mazeData.maze, mazeData.start, mazeData.end);
            solver.setAlgorithm(algorithmSelect.value);
            solver.draw();
            startButton.disabled = false;
        }
        
        stats.textContent = '';
    }
    
    // Handle custom maze size change
    createCustomMazeBtn.addEventListener('click', () => {
        const size = parseInt(customSizeSelect.value);
        customMaze = new CustomMaze(size);
        
        // Enable solving for the custom maze
        startButton.disabled = false;
    });
    
    // Handle speed slider change
    speedSlider.addEventListener('input', () => {
        const value = speedSlider.value;
        speedValue.textContent = `${value}ms`;
        
        if (solver) {
            solver.setDelay(value);
        }
    });
    
    // Event Listeners
    mazeSelect.addEventListener('change', initializeSolver);
    algorithmSelect.addEventListener('change', () => {
        if (solver) {
            solver.setAlgorithm(algorithmSelect.value);
        }
    });
    
    startButton.addEventListener('click', () => {
        if (mazeSelect.value === 'custom' && customMaze) {
            // Create solver from custom maze
            const mazeData = customMaze.getData();
            solver = new MazeSolver(canvas, mazeData.maze, mazeData.start, mazeData.end);
            solver.setAlgorithm(algorithmSelect.value);
            solver.setDelay(parseInt(speedSlider.value));
            solver.startSolving();
            startButton.disabled = true;
        } else if (solver && !solver.solving && !solver.solved) {
            solver.startSolving();
            startButton.disabled = true;
        }
    });
    
    resetButton.addEventListener('click', () => {
        if (mazeSelect.value === 'custom' && customMaze) {
            // Just redraw the custom maze without solving
            customMaze.draw();
            startButton.disabled = false;
        } else if (solver) {
            solver.reset();
            startButton.disabled = false;
        }
        
        stats.textContent = '';
    });
    
    // Initialize first maze
    initializeSolver();
});