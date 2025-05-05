# Demo 1: Circle Grid with Randomness (Processing.py)
# Step 2: Draw a grid of circles using loops
# This is the Python (Processing.py) version of the p5.js step-01 demo.
# For use in Processing IDE, Python mode.

def setup():
    size(600, 600)  # Set the canvas size (width, height)
    background(255) # White background
    noStroke()      # No outline for circles
    fill(80, 180, 255)  # Light blue fill
    cols = 10       # Number of columns
    rows = 10       # Number of rows
    diameter = 40   # Circle diameter
    padding = 20    # Space between circles
    for y in range(rows):
        for x in range(cols):
            cx = padding + x * (diameter + padding)
            cy = padding + y * (diameter + padding)
            ellipse(cx, cy, diameter, diameter)
