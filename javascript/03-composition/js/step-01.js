// Step 1: 12x12 Tile Grid Composition
// At each grid point, randomly draw a black circle, square, or line (all the same size, no rotation)

const gridSize = 12; // Number of rows and columns in the grid

function setup() {
  createCanvas(800, 800); // Set up a square canvas
  background(255); // White background
  noLoop(); // Only draw once
  rectMode(CENTER); // Draw rectangles from the center
  noStroke(); // No outline for shapes (except lines)
  fill(0); // Black fill for all shapes

  let cellW = width / gridSize; // Width of each grid cell
  let cellH = height / gridSize; // Height of each grid cell

  // Loop through each grid position
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x = i * cellW + cellW / 2; // Center x of cell
      let y = j * cellH + cellH / 2; // Center y of cell
      let shapeType = int(random(3)); // Randomly pick 0 (circle), 1 (square), or 2 (line)
      let size = cellW; // All shapes same size as cell width
      if (shapeType === 0) {
        ellipse(x, y, size); // Draw circle
      } else if (shapeType === 1) {
        rect(x, y, size, size); // Draw square
      } else {
        stroke(0); // Black line
        strokeWeight(4); // Thicker line
        line(x - size/2, y, x + size/2, y); // Draw horizontal line
        noStroke(); // Turn off stroke for next shape
      }
    }
  }
}

// All shapes are black for this step (constraint)
