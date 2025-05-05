
// Step 5: Animated grid of circles with random radius and color
// This sketch animates the circles by changing their size over time
// and uses random color and initial radius

// TEACHER NOTES:
// This step demonstrates animation, object-oriented programming, and interactivity in p5.js.
// Each circle is an object with its own properties and update logic.
// Students can experiment with animation speed, color, and saving outputs.

// CLASSROOM TIPS:
// - Ask students to change the animation speed or color range.
// - Discuss how each circle is an independent object (OOP concept).
// - Try adding sliders or buttons for more interactivity.
// - Press 'S' to save the canvas as an image to your computer (usually the Downloads folder).

let circles = [];
let numCols = 8;
let numRows = 8;
let spacingX, spacingY;

function setup() {
  createCanvas(800, 800); // Create a canvas 800x800 pixels
  spacingX = width / (numCols + 1); // Horizontal spacing between circles
  spacingY = height / (numRows + 1); // Vertical spacing between circles
  noStroke(); // No outline on circles
  // Create a grid of circle objects
  for (let i = 1; i <= numCols; i++) {
    for (let j = 1; j <= numRows; j++) {
      let x = i * spacingX; // X position
      let y = j * spacingY; // Y position
      let d = random(30, 100); // Random initial diameter
      let r = random(255); // Random red value
      let g = random(255); // Random green value
      let b = random(255); // Random blue value
      let growing = random() > 0.5; // Randomly start growing or shrinking
      circles.push(new Circle(x, y, d, r, g, b, growing)); // Add new Circle object
    }
  }
}

function draw() {
  background(220); // Clear background each frame
  for (let c of circles) {
    c.update(); // Update diameter (grow/shrink)
    c.display(); // Draw the circle
  }
}

// Save output to your computer (usually Downloads folder)
function keyPressed() {
  if (key === 's' || key === 'S') {
    // The browser will save the file to your default downloads folder.
    saveCanvas('animated-circles', 'jpg'); // Save canvas as image
  }
}

// Circle class definition (moved here for self-contained demo)
// Circle class for animated circles
class Circle {
  constructor(x, y, diameter, r, g, b, growing) {
    this.x = x; // X position
    this.y = y; // Y position
    this.diameter = diameter; // Current diameter
    this.r = r; // Red color value
    this.g = g; // Green color value
    this.b = b; // Blue color value
    this.growing = growing; // Whether the circle is growing or shrinking
  }

  update() {
    // Animate diameter: grow or shrink
    if (this.growing) {
      this.diameter += 1;
      if (this.diameter >= 100) {
        this.growing = false; // Start shrinking
      }
    } else {
      this.diameter -= 1;
      if (this.diameter <= 20) {
        this.growing = true; // Start growing
      }
    }
  }

  display() {
    fill(this.r, this.g, this.b); // Set fill color
    ellipse(this.x, this.y, this.diameter); // Draw the circle
  }
}
