// Step 3: Weather Data Grid Visualization (with live Open-Meteo API)
// Visualizes 365 days of Syracuse, NY high temperatures as a grid of colored circles.
// Small circles = cold days, large circles = hot days. Colors use a weather-map style gradient.

// --- GLOBAL VARIABLES ---
let weatherData = null; // Will hold array of daily high temps (°F)
let loading = true;     // True while data is being fetched

// --- SETUP: p5.js entry point ---
function setup() {
  createCanvas(800, 800); // Create a square canvas
  background(255);        // White background
  textAlign(CENTER, CENTER); // Center text for loading/error
  textSize(32);
  fill(80);
  noLoop();               // Only draw when needed
  colorMode(RGB);         // Use RGB color mode
  ellipseMode(CENTER);    // Draw ellipses from the center
  // Start fetching weather data for Syracuse, NY
  fetchWeatherData();
}

// --- DRAW: p5.js main draw loop ---
function draw() {
  background(255);
  if (loading) {
    // Show loading message while data is being fetched
    fill(80);
    text('Loading Syracuse weather data...', width/2, height/2);
    return;
  }
  if (!weatherData) {
    // Show error if data failed to load
    fill(200,0,0);
    text('Failed to load weather data.', width/2, height/2);
    return;
  }

  // --- GRID LAYOUT ---
  // We want to fit all 365 days in a grid (20 columns x 19 rows)
  const cols = 20;
  const rows = ceil(weatherData.length / cols);
  const cellW = width / cols;
  const cellH = height / rows;

  // --- FIND MIN/MAX TEMPERATURES ---
  // We'll use these to map values to size and color
  const minTemp = min(weatherData);
  const maxTemp = max(weatherData);

  // --- DRAW EACH DAY AS A CIRCLE ---
  for (let i = 0; i < weatherData.length; i++) {
    let temp = weatherData[i]; // High temp for this day (°F)
    let col = i % cols;        // Column in the grid
    let row = floor(i / cols); // Row in the grid
    let x = col * cellW + cellW / 2; // Center x
    let y = row * cellH + cellH / 2; // Center y

    // --- MAP TEMPERATURE TO CIRCLE SIZE ---
    // Cold = small, hot = large
    let d = map(temp, minTemp, maxTemp, cellW * 0.3, cellW * 0.95);

    // --- MAP TEMPERATURE TO COLOR (weather map style) ---
    // We'll blend through blue → cyan → green → yellow → orange → red
    // using lerpColor for smooth transitions
    let cold = color(30, 90, 200);      // Blue (coldest)
    let cool = color(0, 200, 255);     // Cyan
    let mild = color(80, 220, 120);    // Green
    let warm = color(255, 230, 0);     // Yellow
    let hot = color(255, 120, 0);      // Orange
    let scorch = color(220, 30, 30);   // Red (hottest)
    // Normalize temp to 0-1 for blending
    let tNorm = map(temp, minTemp, maxTemp, 0, 1);
    let c;
    if (tNorm < 0.2) {
      c = lerpColor(cold, cool, tNorm / 0.2); // Blue to cyan
    } else if (tNorm < 0.4) {
      c = lerpColor(cool, mild, (tNorm - 0.2) / 0.2); // Cyan to green
    } else if (tNorm < 0.6) {
      c = lerpColor(mild, warm, (tNorm - 0.4) / 0.2); // Green to yellow
    } else if (tNorm < 0.8) {
      c = lerpColor(warm, hot, (tNorm - 0.6) / 0.2); // Yellow to orange
    } else {
      c = lerpColor(hot, scorch, (tNorm - 0.8) / 0.2); // Orange to red
    }

    // --- DRAW THE CIRCLE ---
    noStroke();
    fill(c);
    ellipse(x, y, d);
  }
}

// --- FETCH WEATHER DATA FROM OPEN-METEO API ---
// This function gets the last 365 days of daily high temps for Syracuse, NY
// and stores them in the global weatherData array.
function fetchWeatherData() {
  // Syracuse, NY: latitude=43.0481, longitude=-76.1474
  // Dates: 2024-05-04 to 2025-05-04 (change as needed)
  const url = 'https://archive-api.open-meteo.com/v1/archive?latitude=43.0481&longitude=-76.1474&start_date=2024-05-04&end_date=2025-05-04&daily=temperature_2m_max&temperature_unit=fahrenheit&timezone=America/New_York';
  // Use fetch() to get the data from the API
  fetch(url)
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      // Check if the data is valid and contains the temperature array
      if (data && data.daily && data.daily.temperature_2m_max) {
        weatherData = data.daily.temperature_2m_max; // Array of 365 numbers
        loading = false;
        redraw(); // Trigger draw() to update the canvas
      } else {
        weatherData = null;
        loading = false;
        redraw();
      }
    })
    .catch(err => {
      // If there's an error (e.g., network), show error message
      weatherData = null;
      loading = false;
      redraw();
    });
}

/*
  This sketch visualizes a year of Syracuse, NY high temperatures using live data from Open-Meteo.
  - Each day is a circle in a grid (20 columns x 19 rows).
  - Small blue circles = coldest days, large red/orange circles = hottest days.
  - Colors blend smoothly from blue (cold) to red (hot) like a weather map.
  - Try swapping in real data for your city by changing the latitude/longitude!
  - The code uses fetch() to get JSON data from the API, then draws the grid.
  - All mapping (size, color) is done with p5.js functions for clarity.
*/
