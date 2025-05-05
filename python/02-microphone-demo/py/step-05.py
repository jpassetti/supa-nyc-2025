# Step 5: Microphone Input Demo (Processing.py)
# Processing.py does not support real-time microphone input natively.
# This is a placeholder for discussion and extension.
# For use in Processing IDE, Python mode.

# --- Teacher Notes ---
# - Real-time mic input is not available in Processing.py by default.
# - You can simulate input with random values, pre-recorded data, or use Java libraries (advanced).
# - See the comments below for ideas.

# --- Simulated mic input using random values ---

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
    fill(0)
    ellipse(width/2, y, 80, 80)
    fill(50)
    textAlign(CENTER)
    textSize(18)
    text('Simulated mic level: ' + str(round(mic_level, 2)), width/2, 30)

# --- For real mic input, see Processing (Java) Sound library or external Python audio libraries ---
