# Step 4: 2D Perlin Noise Island Map (Processing.py)
# Generate an island map using 2D Perlin noise
# For use in Processing IDE, Python mode.

def setup():
    size(600, 600)
    noStroke()
    cols = 100
    rows = 100
    scl = 0.07  # Scale for noise
    for y in range(rows):
        for x in range(cols):
            n = noise(x * scl, y * scl)
            if n <= 0.4:
                fill(70, 130, 200)  # Ocean
            elif n <= 0.6:
                fill(240, 220, 130)  # Sand
            elif n <= 0.8:
                fill(100, 200, 100)  # Land
            else:
                fill(180, 180, 180)  # Mountain
            rect(x * 6, y * 6, 6, 6)
