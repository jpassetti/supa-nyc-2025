# Step 7: Microphone Recording to Circles (Processing.py)
# Visualize a pre-recorded audio file as a series of circles
# For use in Processing IDE, Python mode.

# --- Teacher Notes ---
# - Real-time mic input is not available in Processing.py by default.
# - This demo loads a CSV or text file with audio levels and visualizes them.
# - Place your data file (e.g., 'audio-levels.txt') in the sketch folder.

levels = []

def setup():
    size(800, 400)
    background(220)
    noStroke()
    frameRate(60)
    global levels
    # Load data from a text file (one value per line, 0-1 range)
    try:
        with open("audio-levels.txt", "r") as f:
            for line in f:
                val = float(line.strip())
                levels.append(val)
    except:
        # If file not found, fill with random data as a fallback
        for i in range(200):
            levels.append(random(0, 1))


def draw():
    background(220)
    n = len(levels)
    if n == 0:
        fill(50)
        textAlign(CENTER)
        textSize(18)
        text("No data loaded.", width/2, height/2)
        return
    spacing = width / (n + 1)
    for i in range(n):
        y = map(levels[i], 0, 1, height, 0)
        fill(0)
        ellipse((i+1)*spacing, y, 20, 20)
    fill(50)
    textAlign(CENTER)
    textSize(18)
    text("Audio levels visualized as circles", width/2, 30)
