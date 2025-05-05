# Demo 1: Animate the Circles (Processing.py)
# Step 4: Animated grid of circles
# For use in Processing IDE, Python mode.

cols = 10
rows = 10
diameter = 40
padding = 20

def setup():
    size(600, 600)
    noStroke()
    frameRate(30)

# Animate the circles in draw()
def draw():
    background(255)
    for y in range(rows):
        for x in range(cols):
            cx = padding + x * (diameter + padding)
            cy = padding + y * (diameter + padding)
            # Animate diameter with sin() for a pulsing effect
            t = frameCount * 0.1 + x + y
            d = diameter + 20 * sin(t)
            fill(80, 180, 255)
            ellipse(cx, cy, d, d)
