// The Game class represents the grid for Conway's Game of Life

class Game {

   constructor(rows, cols, cellSize) {

       this.rows = rows;
       this.cols = cols;
       this.cellSize = cellSize;
       this.grid = this.createEmptyGrid();
       this.isRunning = false;

   }

   // Creates a 2D array filled with 'false' (all cells initially dead)

   createEmptyGrid() {

       return Array(this.rows).fill().map(() => Array(this.cols).fill(false));

   }

   // Randomly populates the grid with live cells (15% probability)

   randomize() {

       this.grid = this.grid.map(row => row.map(() => Math.random() > 0.85));

   }

   // Inserts the Gosper Glider Gun pattern

   drawGliderGun() {

      const pattern = [

           [26, 1], [24, 2], [26, 2], [14, 3], [15, 3], [22, 3], [23, 3], [36, 3], [37, 3],
           [13, 4], [17, 4], [22, 4], [23, 4], [36, 4], [37, 4], [2, 5], [3, 5], [12, 5],
           [18, 5], [22, 5], [23, 5], [2, 6], [3, 6], [12, 6], [16, 6], [18, 6], [19, 6],
           [24, 6], [26, 6], [12, 7], [18, 7], [26, 7], [13, 8], [17, 8], [14, 9], [15, 9]

      ];

      pattern.forEach(([x, y]) => {
       this.grid[y][x] = true;

      });

   }

   // Inserts the Pulsar pattern

   drawPulsar() {

      const pattern = [

           [4, 2], [5, 2], [6, 2], [10, 2], [11, 2], [12, 2],
           [2, 4], [7, 4], [9, 4], [14, 4],
           [2, 5], [7, 5], [9, 5], [14, 5],
           [2, 6], [7, 6], [9, 6], [14, 6],
           [4, 8], [5, 8], [6, 8], [10, 8], [11, 8], [12, 8]

      ];

      pattern.forEach(([x, y]) => {

           this.grid[y][x] = true;

      });

   }

   // Inserts the Penta-Decathlon pattern

   drawPentaDecathlon() {

      const pattern = [

           [6, 3], [7, 3], [5, 4], [8, 4], [5, 5], [8, 5],
           [5, 6], [8, 6], [5, 7], [8, 7], [6, 8], [7, 8]

      ];

      pattern.forEach(([x, y]) => {

           this.grid[y][x] = true;

       });

   }

   // Counts the number of live neighbors for a cell

   countNeighbors(x, y) {

      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {

         for (let dx = -1; dx <= 1; dx++) {

               if (dx === 0 && dy === 0) continue;
               const nx = (x + dx + this.cols) % this.cols;
               const ny = (y + dy + this.rows) % this.rows;
               if (this.grid[ny][nx]) count++;

         }
         
      }

      return count;

   }

   // Updates the grid based on Game of Life rules

   update() {

      const newGrid = this.createEmptyGrid();

      for (let y = 0; y < this.rows; y++) {

         for (let x = 0; x < this.cols; x++) {

               const neighbors = this.countNeighbors(x, y);
               const isAlive = this.grid[y][x];

               newGrid[y][x] = (isAlive && (neighbors === 2 || neighbors === 3)) ||
                   (!isAlive && neighbors === 3);
         }

      }

      this.grid = newGrid;

   }

}

// Renderer class for drawing the game grid

class Renderer {

   constructor(canvas, game) {

       this.canvas = canvas;
       this.ctx = canvas.getContext('2d');
       this.game = game;
       canvas.width = game.cols * game.cellSize;
       canvas.height = game.rows * game.cellSize;

   }

   // Draws the grid and fills live cells with color

   draw() {

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let y = 0; y < this.game.rows; y++) {

         for (let x = 0; x < this.game.cols; x++) {

             if (this.game.grid[y][x]) {

                  this.ctx.fillStyle = '#8A2BE2'; // Purple glow effect
                  this.ctx.fillRect(
                  x * this.game.cellSize,
                  y * this.game.cellSize,
                  this.game.cellSize - 1,
                  this.game.cellSize - 1
                   );

            }
           
         
         }

      }

   }

}

// Wait until the DOM is fully loaded

document.addEventListener('DOMContentLoaded', () => {

   // Adjusted grid size 

   const game = new Game(50, 100, 10);
   const canvas = document.getElementById('gridCanvas');
   const renderer = new Renderer(canvas, game);
   let intervalId = null;

   // Start/Stop Button

   document.getElementById('startBtn').addEventListener('click', () => {

      game.isRunning = !game.isRunning;
      document.getElementById('startBtn').textContent =
      game.isRunning ? 'Stop' : 'Start';

      if (game.isRunning) {

         intervalId = setInterval(() => {

            game.update();
            renderer.draw();
         }  , 100); // Speed of the game (100ms)

      } 
      
      else {
           clearInterval(intervalId);
      }

   });

   // Clear Grid Button

   document.getElementById('clearBtn').addEventListener('click', () => {

       game.grid = game.createEmptyGrid();
       renderer.draw();

   });

   // Randomize Grid Button

   document.getElementById('randomBtn').addEventListener('click', () => {

       game.randomize();
       renderer.draw();

   });

   // Insert Glider Gun Pattern

   document.getElementById('gliderGunBtn').addEventListener('click', () => {

       game.drawGliderGun();
       renderer.draw();

   });

   // Insert Pulsar Pattern

   document.getElementById('pulsarBtn').addEventListener('click', () => {

       game.drawPulsar();
       renderer.draw();

   });

   // Insert Penta-Decathlon Pattern

   document.getElementById('pentaDecathlonBtn').addEventListener('click', () => {

       game.drawPentaDecathlon();
       renderer.draw();

   });

   renderer.draw();
   
});
