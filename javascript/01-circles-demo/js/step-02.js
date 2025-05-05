
// Step 2: Draw a row of circles using a loop
// This sketch shows how to use a for loop to draw a row of circles

function setup() {
  createCanvas(800, 800); // Create a canvas 800x800 pixels
  background(220); // Light gray background
  noStroke(); // No outline on circles
  fill(100, 150, 255); // Set fill color
  let numCircles = 8; // Number of circles in the row
  let spacing = width / (numCircles + 1); // Even spacing between circles
  for (let i = 1; i <= numCircles; i++) {
    ellipse(i * spacing, height/2, 80); // Draw each circle in the row
  }
}

// No animation in this step
