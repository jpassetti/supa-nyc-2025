
// Step 3: Draw a grid of circles using nested loops
// This sketch shows how to use two for loops to draw a grid

function setup() {
  createCanvas(800, 800); // Create a canvas 800x800 pixels
  background(220); // Light gray background
  noStroke(); // No outline on circles
  fill(100, 150, 255); // Set fill color
  let numCols = 8; // Number of columns
  let numRows = 8; // Number of rows
  let spacingX = width / (numCols + 1); // Horizontal spacing
  let spacingY = height / (numRows + 1); // Vertical spacing
  for (let i = 1; i <= numCols; i++) {
    for (let j = 1; j <= numRows; j++) {
      ellipse(i * spacingX, j * spacingY, 60); // Draw each circle in the grid
    }
  }
}

// No animation in this step
