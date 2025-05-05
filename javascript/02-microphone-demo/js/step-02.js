// Step 2: Perlin Noise Seismograph
// This sketch draws a line chart of noise() values over time, and also shows a smoothly moving circle for comparison

let t = 0; // Time variable for noise
let values = []; // Array to store recent noise values
let maxPoints = 800; // Number of points to display

function setup() {
 createCanvas(800, 400); // Create a canvas 800x400 pixels
 background(220); // Light gray background
}

function draw() {
 background(220); // Clear background each frame
 let n = noise(t) * height; // Get a smooth y value from Perlin noise
 values.push(n); // Add to array
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
 // Draw smoothly moving circle for comparison
 fill("#000000");
 noStroke();
 ellipse(width - 60, n, 40);
 fill(50);
 textAlign(LEFT);
 textSize(18);
 text("noise() seismograph", 10, 30);
 text("noise() value: " + nf(n, 1, 2), width - 200, 30);
 t += 0.01; // Step through noise for smooth animation
}

// Notice the smooth, organic motion of the line and the circle!
