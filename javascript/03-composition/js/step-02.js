// Step 2: Color Triad Grid Remix
// 12x12 grid. Each cell randomly draws a half-circle, half-square, line, or blank, using a color triad.
// Half-circles and half-squares are randomly rotated (90, 180, 270 degrees). Lines are at 90 or 180 degrees.

const gridSize = 12; // Number of rows and columns in the grid

function setup() {
  createCanvas(800, 800); // Create a square canvas
  background(255);        // Set background to white
  noLoop();               // Only draw once
  rectMode(CENTER);       // Draw rectangles from the center
  angleMode(DEGREES);     // Use degrees for rotation

  // Define the color triad *after* p5.js is initialized
  // These are three colors spaced evenly on the color wheel
  const triad = [
    color(220, 70, 70),   // Red
    color(70, 180, 90),   // Green
    color(70, 120, 220)   // Blue
  ];

  let cellW = width / gridSize;  // Width of each grid cell
  let cellH = height / gridSize; // Height of each grid cell

  // Loop through every cell in the grid
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Calculate the center position of the current cell
      let x = i * cellW + cellW / 2;
      let y = j * cellH + cellH / 2;

      // Randomly choose the background type:
      // 0 = colored square (from triad), 1 = white (blank)
      let bgType = int(random(2));
      // Pick a color from the triad or use white
      let bgColor = (bgType === 0) ? triad[int(random(triad.length))] : color(255);

      // Pick a color for the half-circle (foreground) from the triad
      let fgColorIdx = int(random(triad.length));

      // Randomly pick a rotation for the half-circle (90, 180, or 270 degrees)
      let rot = int(random(1, 4)) * 90;

      // Size of the shapes (fills the cell, no gap)
      let size = cellW;

      // Randomly decide if the top shape is a half-circle or blank
      // 0 = half-circle, 1 = blank (no shape on top)
      let topShape = int(random(2));

      push();
      translate(x, y); // Move to the center of the cell

      // --- Draw the background square (either color or white) ---
      fill(bgColor);
      noStroke();
      rect(0, 0, size, size);

      // --- Draw the top shape (half-circle or blank) ---
      if (topShape === 0) {
        // Half-circle on top
        rotate(rot); // Random rotation for variety

        // Make sure the half-circle is not the same color as the background (if bg is color)
        let fgColor = triad[fgColorIdx];
        if (bgType === 0 && fgColor.levels.toString() === bgColor.levels.toString()) {
          // If the color matches, pick a different color from the triad
          let otherColors = triad.filter((col, idx) => idx !== fgColorIdx);
          fgColor = otherColors[int(random(otherColors.length))];
        }
        fill(fgColor);
        arc(0, 0, size, size, 0, 180, PIE); // Draw the half-circle
      }
      // If topShape === 1, do nothing (blank)

      pop(); // Restore drawing state
    }
  }
}

/*
  This sketch creates a colorful grid composition using a color triad and random layering.
  - Each cell is filled with either a colored or white square.
  - On top, a half-circle (with a different color) may be drawn, randomly rotated.
  - Some cells are left blank on top, creating negative space.
  - The result is a playful, abstract pattern with both color and shape variety.
*/
