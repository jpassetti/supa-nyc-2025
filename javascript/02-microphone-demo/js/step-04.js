// Step 4: 2D Perlin Noise Island Map
// This sketch creates a 100x100 grid of blocks on a 1000x1000px canvas.
// Each block uses Perlin noise to decide if it's ocean, sand, land, or mountain.
// For STEAM/Art-Tech: This is a classic way to generate "islands" or terrain in games and art!

// --- COLORS ---
let oceanColor, sandColor, landColor, mountainColor;

function setup() {
  createCanvas(1000, 1000);
  noStroke();
  // Define colors for each terrain type
  oceanColor = color(30, 120, 200);      // Deep blue (ocean)
  sandColor = color(240, 220, 130);      // Sand (beach)
  landColor = color(120, 90, 50);        // Dirt/land
  mountainColor = color(180, 180, 180);  // Mountain (gray)
  drawIslandMap();
}

// Draws the island map using 2D Perlin noise
function drawIslandMap() {
  background(oceanColor); // Fill with ocean
  let gridSize = 100;     // 100x100 blocks
  let blockSize = width / gridSize; // Each block is 10x10 px
  let noiseScale = 0.07;  // Controls "zoom" of the noise (smaller = more islands)

  // Loop through each grid cell
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      // Get a Perlin noise value for this (x, y) position
      let nx = x * noiseScale;
      let ny = y * noiseScale;
      let n = noise(nx, ny); // n is between 0 and 1

      // Decide what to draw based on noise value
      // Ocean: n <= 0.4
      // Sand:  0.4 < n <= 0.6
      // Land:  0.6 < n <= 0.8
      // Mountain: n > 0.8
      if (n > 0.8) {
        fill(mountainColor); // Mountain
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
      } else if (n > 0.6) {
        fill(landColor);     // Land
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
      } else if (n > 0.4) {
        fill(sandColor);     // Sand
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // Else: leave as ocean (background)
    }
  }
}

/*
Classroom/Teacher Notes:
- This demo shows how 2D Perlin noise can be used for procedural map generation.
- Ocean blocks are now n <= 0.4, sand is 0.4 < n <= 0.6, land is 0.6 < n <= 0.8, and mountain is n > 0.8.
- Try changing the thresholds or colors for different effects.
- Challenge: Animate the map by adding a time offset to noise(), or use mouseX/mouseY to pan.
- This is a great intro to how games and generative art create "natural" looking terrain!
*/