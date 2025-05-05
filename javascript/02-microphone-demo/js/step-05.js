// Step 5: Microphone Input with Color Lerp
// This sketch uses the microphone to control both the size and color of a circle.
// The color transitions from blue (quiet) to magenta (loud) using lerpColor.

let analyser, dataArray, audioContext, source;
let micEnabled = false;
let amplitude = 0;

let quietColor, loudColor;

function setup() {
  createCanvas(800, 800); // Larger canvas
  background(0);
  textAlign(CENTER);
  textSize(20);
  fill(255);
  text('Click to enable microphone', width/2, height/2);
  // Define base colors
  quietColor = color(50, 120, 255);    // Blue
  loudColor  = color(255, 0, 200);     // Magenta
}

function draw() {
  background(0);

  if (!micEnabled) {
    fill(255);
    text('Click to enable microphone', width/2, height/2);
    return;
  }

  // --- Microphone Amplitude Analysis ---
  // Fill dataArray with the latest audio samples from the microphone (raw waveform data, 0-255)
  analyser.getByteTimeDomainData(dataArray);
  let sum = 0; // We'll use this to accumulate the total amplitude
  // Loop through each sample in the audio buffer
  for (let i = 0; i < dataArray.length; i++) {
    // Convert the sample from 0-255 (unsigned byte) to -1 to 1 (audio waveform)
    // 128 is the "center" (no sound), so subtract 128 and divide by 128
    let v = (dataArray[i] - 128) / 128;
    // Take the absolute value (distance from center) to measure loudness, not direction
    sum += Math.abs(v);
  }
  // Average amplitude: sum of all absolute values divided by number of samples
  amplitude = sum / dataArray.length;

  // --- Color Interpolation (LERP) ---
  // Map amplitude (0 = quiet, 0.5+ = loud) to a value between 0 and 1 for lerpColor
  // If amplitude is 0, lerpAmt = 0 (all blue). If amplitude is 0.5 or higher, lerpAmt = 1 (all magenta).
  let lerpAmt = constrain(map(amplitude, 0, 0.5, 0, 1), 0, 1);
  // Interpolate between quietColor (blue) and loudColor (magenta) based on lerpAmt
  let c = lerpColor(quietColor, loudColor, lerpAmt);

  // Draw a circle whose size and color depend on the mic amplitude
  let d = map(amplitude, 0, 0.5, 80, 700, true); // Larger range for big canvas
  fill(c);
  noStroke();
  ellipse(width/2, height/2, d);

  // Show the current amplitude value as text
  fill(255);
  text('Mic amplitude: ' + amplitude.toFixed(3), width/2, 60);
  text('Color: blue (quiet) → magenta (loud)', width/2, 90);
}

// This function runs when the user clicks the canvas
function mousePressed() {
  if (micEnabled) return;
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    micEnabled = true;
  }).catch(err => {
    alert('Microphone access denied or not supported.');
  });
}
