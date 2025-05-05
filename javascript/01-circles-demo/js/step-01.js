
// Step 1: Draw one circle
// This sketch shows how to draw a single circle in p5.js
// p5.js automatically calls setup() once, then draw() repeatedly

function setup() {
  createCanvas(800, 800); // Create a canvas 800x800 pixels
  background(220); // Light gray background
  noStroke(); // No outline on the circle
  fill(100, 150, 255); // Set fill color (blue-ish)
  ellipse(width/2, height/2, 100); // Draw a circle at the center of the canvas
}

// No animation in this step, so draw() is not needed
