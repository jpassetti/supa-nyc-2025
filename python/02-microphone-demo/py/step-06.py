# Step 6: Microphone Color Lerp (Processing.py)
# Simulate mic input and use it to interpolate between two colors
# For use in Processing IDE, Python mode.

# --- Teacher Notes ---
# - Real-time mic input is not available in Processing.py by default.
# - This demo uses random values to simulate mic input.
# - You can use pre-recorded data or advanced Java/Python audio libraries for real input.

c1 = color(0, 200, 255)  # Quiet color (blue)
c2 = color(255, 50, 50)  # Loud color (red)


def setup():
    size(800, 400)
    background(220)
    noStroke()
    frameRate(60)


def draw():
    background(220)
    # Simulate mic input with random value (replace with real data if available)
    mic_level = random(0, 1)
    y = map(mic_level, 0, 1, height, 0)
    c = lerpColor(c1, c2, mic_level)
    fill(c)
    ellipse(width/2, y, 80, 80)
    fill(50)
    textAlign(CENTER)
    textSize(18)
    text('Simulated mic level: ' + str(round(mic_level, 2)), width/2, 30)
