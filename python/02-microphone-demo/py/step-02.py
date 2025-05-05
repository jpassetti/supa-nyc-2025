# Step 2: Perlin Noise Seismograph (Processing.py)
# Visualize Perlin noise as a smooth seismograph and a moving circle
# For use in Processing IDE, Python mode.

values = []
maxPoints = 200
t = 0  # Time variable for noise

def setup():
    size(800, 400)
    background(220)
    noStroke()
    frameRate(60)
    global t
    t = 0

def draw():
    global t
    background(220)
    n = noise(t) * height  # Get a smooth y value from Perlin noise
    values.append(n)
    if len(values) > maxPoints:
        values.pop(0)
    # Draw the line chart
    stroke(0)
    noFill()
    beginShape()
    for x in range(len(values)):
        vertex(x, values[x])
    endShape()
    # Draw smoothly moving circle for comparison
    fill(0)
    noStroke()
    ellipse(width-60, n, 40, 40)
    fill(50)
    textAlign(LEFT)
    textSize(18)
    text('noise() seismograph', 10, 30)
    text('noise() value: ' + str(round(n, 2)), width-200, 30)
    t += 0.01
