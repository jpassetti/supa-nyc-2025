# Demo 1: Draw One Circle (Processing.py)
# Step 1: Draw a single circle in the center
# This is the Python (Processing.py) version of the p5.js "draw one circle" example.
# For use in Processing IDE, Python mode.

def setup():
    size(800, 800)      # Create a canvas 800x800 pixels
    background(220)     # Light gray background
    noStroke()          # No outline on the circle
    fill(100, 150, 255) # Set fill color (blue-ish)
    ellipse(width/2, height/2, 100, 100) # Draw a circle at the center
