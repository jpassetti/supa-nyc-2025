// Save output to your computer (usually Downloads folder)
function keyPressed() {
  if (key === 's' || key === 'S') {
    // The browser will save the file to your default downloads folder.
    saveCanvas('animated-circles', 'jpg'); // Save canvas as image
  }
}

// Step 4: Grid of circles with random radius and color
// This sketch uses random() to vary the size and color of each circle

function setup() {
  createCanvas(800, 800); // Create a canvas 800x800 pixels
  background(220); // Light gray background
  noStroke(); // No outline on circles
  let numCols = 8; // Number of columns
  let numRows = 8; // Number of rows
  let spacingX = width / (numCols + 1); // Horizontal spacing
  let spacingY = height / (numRows + 1); // Vertical spacing
  for (let i = 1; i <= numCols; i++) {
    for (let j = 1; j <= numRows; j++) {
      let d = random(30, 100); // Random diameter for each circle
      let r = random(255); // Random red value
      let g = random(255); // Random green value
      let b = random(255); // Random blue value
      fill(r, g, b); // Set fill color
      ellipse(i * spacingX, j * spacingY, d); // Draw circle
    }
  }
}

// No animation in this step
