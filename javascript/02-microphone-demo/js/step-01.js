// Step 1: Random Numbers Seismograph
// This sketch draws a line chart of random() values over time, and also shows a jumping circle for comparison

let values = []; // Array to store recent random values
let maxPoints = 800; // Number of points to display

function setup() {
  createCanvas(800, 400); // Create a canvas 800x400 pixels
  background(220); // Light gray background
}

function draw() {
  background(220); // Clear background each frame
  let r = random(height); // Get a random y value
  values.push(r); // Add to array
  if (values.length > maxPoints) {
    values.shift(); // Remove oldest value if array is too long
  }
  // Draw the line chart
  stroke(0); // Black line for high contrast
  noFill();
  beginShape();
  for (let x = 0; x < values.length; x++) {
    vertex(x, values[x]); // Plot each value
  }
  endShape();
  // Draw jumping circle for comparison
  fill("#000000");
  noStroke();
  ellipse(width-60, r, 40);
  fill(50);
  textAlign(LEFT);
  textSize(18);
  text('random() seismograph', 10, 30);
  text('random() value: ' + nf(r, 1, 2), width-200, 30);
}

// Notice the jagged, spastic motion of the line and the jumping circle!
