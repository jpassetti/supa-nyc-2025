// Step 3: Perlin Noise Demo (2D)
// This sketch uses 2D noise to move a circle smoothly in both x and y

let tx = 0; // Time variable for x noise
let ty = 1000; // Offset for y noise (so x and y are independent)

function setup() {
 createCanvas(800, 400); // Create a canvas 800x400 pixels
 background(220); // Light gray background
 noStroke(); // No outline on circles
}

function draw() {
 background(220); // Clear background each frame
 let x = noise(tx) * width; // Get smooth x from Perlin noise
 let y = noise(ty) * height; // Get smooth y from Perlin noise
 fill("#000000"); // Set fill color
 ellipse(x, y, 80); // Draw circle at noise-based x, y
 textAlign(CENTER);
 textSize(18);
 fill(50);
 text("2D noise: x=" + nf(x, 1, 2) + " y=" + nf(y, 1, 2), width / 2, 30); // Display values
 tx += 0.01; // Step through x noise
 ty += 0.01; // Step through y noise
}

// The circle now moves smoothly in two dimensions!
