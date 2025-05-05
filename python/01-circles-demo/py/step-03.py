# Demo 1: Add Randomness to Size and Color (Processing.py)
# Step 3: Randomized grid of circles
# For use in Processing IDE, Python mode.

def setup():
    size(600, 600)
    background(255)
    noStroke()
    cols = 10
    rows = 10
    diameter = 40
    padding = 20
    for y in range(rows):
        for x in range(cols):
            cx = padding + x * (diameter + padding)
            cy = padding + y * (diameter + padding)
            # Randomize diameter and color
            d = random(20, 60)
            r = random(60, 200)
            g = random(120, 220)
            b = random(200, 255)
            fill(r, g, b)
            ellipse(cx, cy, d, d)
