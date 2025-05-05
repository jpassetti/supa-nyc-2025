// Step 6: 4-Second Sound Landscape with Circles
// This sketch records 4 seconds of sound, then draws a row of circles.
// Each circle's vertical position, size, and color are based on the loudness (amplitude) at that moment.
// The result is a "sound landscape" that visually represents your voice or noise over time.

// --- Audio and Recording Variables ---
let audioContext, analyser, source, dataArray, micStream; // Web Audio API objects
let amplitudes = [];        // Array to store amplitude (loudness) values
let isRecording = false;    // True while recording is in progress
let recordingComplete = false; // True after 4 seconds of recording
let recordStartTime = 0;    // When the recording started (ms)

// p5.js setup: runs once at the start
function setup() {
  createCanvas(800, 400);         // Set up a wide canvas
  background(0);                  // Black background
  textAlign(CENTER);              // Center text
  textSize(22);                   // Large text
  fill(255);
  text('Click to record 4 seconds of sound', width/2, height/2); // Instructions
  noLoop();                       // Only draw when needed
}

// p5.js draw: runs when needed (not every frame)
function draw() {
  background(0); // Clear the canvas

  // --- Recording Phase ---
  if (!recordingComplete) {
    if (isRecording) {
      fill(255, 100, 100);
      text('Recording... Make some noise!', width/2, height/2);
      // Get the latest audio samples from the mic (0-255)
      analyser.getByteTimeDomainData(dataArray);
      // Calculate the average amplitude (loudness) for this moment
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        // Convert sample to -1 to 1 range (128 is "center")
        let v = (dataArray[i] - 128) / 128;
        /*
          Example:
          If dataArray[i] = 128 (center, silence), then v = 0
          If dataArray[i] = 255 (max positive), then v = (255-128)/128 ≈ 0.99
          If dataArray[i] = 0 (max negative), then v = (0-128)/128 = -1
          Math.abs(v) always gives a value from 0 (quiet) to 1 (loud),
          no matter if the wave is above or below the center.
        */
        sum += Math.abs(v); // Use absolute value for loudness
      }
      let amp = sum / dataArray.length; // Average amplitude (0-1)
      /*
        We add up the absolute value of every sample in this audio frame (sum),
        then divide by the number of samples (dataArray.length) to get the average loudness.
        This gives us a single number between 0 (quiet) and 1 (loud) for this moment in time.

        Example:
        If sum = 32 and dataArray.length = 128, then amp = 32 / 128 = 0.25
        This means the average amplitude for this frame is 0.25 (on a scale from 0 to 1).
      */
      amplitudes.push(amp);             // Store for later
      // Stop after 4 seconds
      if (millis() - recordStartTime > 4000) {
        isRecording = false;
        recordingComplete = true;
        redraw(); // Draw the visualization once
      }
    } else {
      fill(255);
      text('Click to record 4 seconds of sound', width/2, height/2);
    }
    return;
  }

  // --- Visualization Phase: Draw a row of circles based on amplitude ---
  // Each circle represents a moment in the 4-second recording
  let gap = width / amplitudes.length; // Horizontal spacing between circles
  console.log(amplitudes);
  for (let i = 0; i < amplitudes.length; i++) {
    let a = amplitudes[i]; // Amplitude (0 = quiet, 1 = loud)
    let x = i * gap;       // X position across the canvas
    // Map amplitude to vertical position: quiet = bottom, loud = top
    let y = map(a, 0, 1, height - 40, 40);
    // Map amplitude to circle size: quiet = small, loud = big
    let d = map(a, 0, 1, 10, 60);
    // Map amplitude to color: lerp from blue (quiet) to magenta (loud)
    // lerpColor blends two colors smoothly based on a value from 0 to 1
    let c = lerpColor(color(50,120,255), color(255,0,200), constrain(a*2,0,1));
    noStroke();
    fill(c);
    ellipse(x, y, d);
  }
}

// When the user clicks the canvas, start a new 4-second recording
function mousePressed() {
  if (isRecording || recordingComplete) return; // Prevent double recording
  amplitudes = [];           // Clear previous data
  recordingComplete = false;
  redraw();                  // Clear the canvas
  // Ask for microphone access
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    micStream = stream;
    isRecording = true;
    recordStartTime = millis();
    loop(); // Start animation for recording
  }).catch(err => {
    alert('Microphone access denied or not supported.');
  });
}