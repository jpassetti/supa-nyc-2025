// Step 2: Draw a row of circles using a loop
// This sketch shows how to use a for loop to draw a row of circles

let tx = 0; // Time variable for x noise

function setup() {
 createCanvas(800, 800); // Create a canvas 800x800 pixels
 background(220); // Light gray background
 noStroke(); // No outline on circles
 fill(100, 150, 255); // Set fill color
 let numCircles = 20; // Number of circles in the row
 let spacing = width / (numCircles + 1); // Even spacing between circles
 let noiseStep = 0.3; // Step size for noise
 let t = 0; // Local noise variable for diameters
 for (let i = 1; i <= numCircles; i++) {
  let diameter = map(noise(t), 0, 1, 5, 100); // Map noise to diameter range
  ellipse(i * spacing, height / 2, diameter); // Draw each circle with different diameter
  t += noiseStep; // Step through noise for each circle
 }
}
// No animation in this step
