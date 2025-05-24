// compare.js
/**
 * Algorithm Comparison Script
 * This script handles the side-by-side comparison of BFS and DFS algorithms
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Comparison page loaded');
    
    // DOM elements
    const bfsCanvas = document.getElementById('bfsCanvas');
    const dfsCanvas = document.getElementById('dfsCanvas');
    const bfsStats = document.getElementById('bfsStats');
    const dfsStats = document.getElementById('dfsStats');
    const mazeSelect = document.getElementById('mazeSelect');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const customMazeControls = document.getElementById('customMazeControls');
    const customSizeSelect = document.getElementById('customSizeSelect');
    const createCustomMazeBtn = document.getElementById('createCustomMazeBtn');
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    const comparisonResults = document.getElementById('comparisonResults');
    
    // Solvers and custom maze
    let bfsSolver = null;
    let dfsSolver = null;
    let customMaze = null;
    
    // Comparison state
    let bfsDone = false;
    let dfsDone = false;
    let comparisonStartTime = 0;
    let bfsEndTime = 0;
    let dfsEndTime = 0;
    
    /**
     * Initialize solvers based on selected maze
     */
    function initializeSolvers() {
        const choice = mazeSelect.value;
        
        if (choice === 'custom') {
            customMazeControls.style.display = 'block';
            
            if (!customMaze) {
                const size = parseInt(customSizeSelect.value);
                // Menggunakan bfsCanvas sebagai dasar untuk custom maze
                customMaze = new CustomMaze(size);
                customMaze.canvas = bfsCanvas;
                customMaze.ctx = bfsCanvas.getContext('2d');
                customMaze.width = size * (CELL_SIZE + MARGIN) + MARGIN;
                customMaze.height = size * (CELL_SIZE + MARGIN) + MARGIN;
                customMaze.canvas.width = customMaze.width;
                customMaze.canvas.height = customMaze.height;
                customMaze.setupEvents();
                customMaze.draw();
            }
            
            startButton.disabled = true;
        } else {
            customMazeControls.style.display = 'none';
            
            const mazeData = createMaze(parseInt(choice));
            
            // Create BFS solver
            bfsSolver = new MazeSolver(bfsCanvas, mazeData.maze, mazeData.start, mazeData.end);
            bfsSolver.setAlgorithm('bfs');
            bfsSolver.draw();
            
            // Create DFS solver with a deep copy of the maze
            const mazeCopy = mazeData.maze.map(row => [...row]);
            dfsSolver = new MazeSolver(dfsCanvas, mazeCopy, [...mazeData.start], [...mazeData.end]);
            dfsSolver.setAlgorithm('dfs');
            dfsSolver.draw();
            
            startButton.disabled = false;
        }
        
        bfsStats.textContent = 'BFS: Waiting to start...';
        dfsStats.textContent = 'DFS: Waiting to start...';
        resetComparisonResults();
    }
    
    /**
     * Reset the comparison results panel
     */
    function resetComparisonResults() {
        comparisonResults.querySelector('.results-content').innerHTML = 
            '<p>Click "Start Comparison" to see which algorithm performs better for this maze!</p>';
        
        // Reset state
        bfsDone = false;
        dfsDone = false;
        bfsEndTime = 0;
        dfsEndTime = 0;
    }
    
    /**
     * Start the comparison between BFS and DFS
     */
    function startComparison() {
        // If using custom maze, create solvers from it
        if (mazeSelect.value === 'custom' && customMaze) {
            const mazeData = customMaze.getData();
            
            // Create BFS solver
            bfsSolver = new MazeSolver(bfsCanvas, mazeData.maze, mazeData.start, mazeData.end);
            bfsSolver.setAlgorithm('bfs');
            
            // Create DFS solver with a deep copy of the maze
            const mazeCopy = mazeData.maze.map(row => [...row]);
            dfsSolver = new MazeSolver(dfsCanvas, mazeCopy, [...mazeData.start], [...mazeData.end]);
            dfsSolver.setAlgorithm('dfs');
        }
        
        if (!bfsSolver || !dfsSolver) {
            console.error('Solvers not initialized');
            return;
        }
        
        // Set speed for both solvers
        const speed = parseInt(speedSlider.value);
        bfsSolver.setDelay(speed);
        dfsSolver.setDelay(speed);
        
        // Reset state
        bfsDone = false;
        dfsDone = false;
        comparisonStartTime = performance.now();
        
        // Start solving
        startButton.disabled = true;
        bfsSolver.onSolveComplete = () => {
            bfsDone = true;
            bfsEndTime = performance.now();
            bfsStats.textContent = `BFS: Steps: ${bfsSolver.steps} | Cells visited: ${bfsSolver.cellsVisited}`;
            
            // Pastikan jalur kuning (solved path) terlihat dengan menggambar ulang
            bfsSolver.draw();
            
            checkCompletion();
        };
        
        dfsSolver.onSolveComplete = () => {
            dfsDone = true;
            dfsEndTime = performance.now();
            dfsStats.textContent = `DFS: Steps: ${dfsSolver.steps} | Cells visited: ${dfsSolver.cellsVisited}`;
            
            // Pastikan jalur kuning (solved path) terlihat dengan menggambar ulang
            dfsSolver.draw();
            
            checkCompletion();
        };
        
        bfsSolver.startSolving();
        dfsSolver.startSolving();
    }
    
    /**
     * Check if both algorithms have completed and show results
     */
    function checkCompletion() {
        if (bfsDone && dfsDone) {
            // Pastikan kedua solver menampilkan jalur solusi
            bfsSolver.draw();
            dfsSolver.draw();
            
            showComparisonResults();
            startButton.disabled = false;
        }
    }
    
    /**
     * Show the comparison results
     */
    function showComparisonResults() {
        const bfsTime = bfsEndTime - comparisonStartTime;
        const dfsTime = dfsEndTime - comparisonStartTime;
        
        let resultsHTML = '';
        
        // Path length comparison
        resultsHTML += createComparisonRow(
            'Path Length', 
            bfsSolver.steps, 
            dfsSolver.steps, 
            bfsSolver.steps <= dfsSolver.steps ? 'BFS' : 'DFS'
        );
        
        // Cells visited comparison
        resultsHTML += createComparisonRow(
            'Cells Visited', 
            bfsSolver.cellsVisited, 
            dfsSolver.cellsVisited, 
            bfsSolver.cellsVisited <= dfsSolver.cellsVisited ? 'BFS' : 'DFS'
        );
        
        // Time comparison
        resultsHTML += createComparisonRow(
            'Time to Solution (ms)', 
            Math.round(bfsTime), 
            Math.round(dfsTime), 
            bfsTime <= dfsTime ? 'BFS' : 'DFS'
        );
        
        // Overall conclusion
        let bfsWins = 0;
        let dfsWins = 0;
        
        if (bfsSolver.steps <= dfsSolver.steps) bfsWins++;
        else dfsWins++;
        
        if (bfsSolver.cellsVisited <= dfsSolver.cellsVisited) bfsWins++;
        else dfsWins++;
        
        if (bfsTime <= dfsTime) bfsWins++;
        else dfsWins++;
        
        const winner = bfsWins > dfsWins ? 'BFS' : 'DFS';
        const winnerText = bfsWins === dfsWins ? 'It\'s a tie!' : `${winner} performs better for this maze!`;
        
        resultsHTML += `<div class="conclusion">${winnerText}</div>`;
        
        // Add explanation
        resultsHTML += `
            <p>
                <strong>Path Length:</strong> Jumlah langkah pada lintasan akhir dari awal hingga akhir.<br>
                <strong>Cells Visited:</strong> Jumlah total sel yang dieksplorasi selama pencarian.<br>
                <strong>Time to Solution:</strong> Berapa lama waktu yang dibutuhkan untuk menemukan jalannya.
            </p>
        `;
        
        comparisonResults.querySelector('.results-content').innerHTML = resultsHTML;
    }
    
    /**
     * Create a comparison row for the results panel
     */
    function createComparisonRow(metricName, bfsValue, dfsValue, winner) {
        return `
            <div class="result-item">
                <span class="metric-name">${metricName}:</span>
                <div>
                    <span class="bfs-value ${winner === 'BFS' ? 'winner' : ''}">
                        BFS: ${bfsValue}${winner === 'BFS' ? '<span class="winner-badge">BETTER</span>' : ''}
                    </span>
                    &nbsp;|&nbsp;
                    <span class="dfs-value ${winner === 'DFS' ? 'winner' : ''}">
                        DFS: ${dfsValue}${winner === 'DFS' ? '<span class="winner-badge">BETTER</span>' : ''}
                    </span>
                </div>
            </div>
        `;
    }
    
    /**
     * Reset both solvers
     */
    function resetSolvers() {
        if (bfsSolver) {
            bfsSolver.reset();
        }
        
        if (dfsSolver) {
            dfsSolver.reset();
        }
        
        bfsStats.textContent = 'BFS: Waiting to start...';
        dfsStats.textContent = 'DFS: Waiting to start...';
        resetComparisonResults();
        startButton.disabled = false;
    }
    
    // Event Listeners
    mazeSelect.addEventListener('change', initializeSolvers);
    
    createCustomMazeBtn.addEventListener('click', () => {
        const size = parseInt(customSizeSelect.value);
        customMaze = new CustomMaze(size);
        customMaze.canvas = bfsCanvas;
        customMaze.ctx = bfsCanvas.getContext('2d');
        customMaze.width = size * (CELL_SIZE + MARGIN) + MARGIN;
        customMaze.height = size * (CELL_SIZE + MARGIN) + MARGIN;
        customMaze.canvas.width = customMaze.width;
        customMaze.canvas.height = customMaze.height;
        customMaze.setupEvents();
        customMaze.draw();
        startButton.disabled = false;
    });
    
    speedSlider.addEventListener('input', () => {
        const value = speedSlider.value;
        speedValue.textContent = `${value}ms`;
        
        if (bfsSolver) bfsSolver.setDelay(value);
        if (dfsSolver) dfsSolver.setDelay(value);
    });
    
    startButton.addEventListener('click', startComparison);
    resetButton.addEventListener('click', resetSolvers);
    
    // Add onSolveComplete method to MazeSolver prototype if it doesn't exist
    if (!MazeSolver.prototype.hasOwnProperty('onSolveComplete')) {
        // Store the original solveStep method
        const originalSolveStep = MazeSolver.prototype.solveStep;
        
        // Override the solveStep method to add callback functionality
        MazeSolver.prototype.solveStep = function() {
            originalSolveStep.call(this);
            
            // If solving is complete, call the callback if provided
            if (this.solved && typeof this.onSolveComplete === 'function') {
                this.onSolveComplete();
            }
        };
    }
    
    // Initialize on page load
    initializeSolvers();
});