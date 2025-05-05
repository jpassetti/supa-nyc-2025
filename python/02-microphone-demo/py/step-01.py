# Step 1: Random Numbers Seismograph (Processing.py)
# Visualize random values as a seismograph and a jumping circle
# For use in Processing IDE, Python mode.

values = []
maxPoints = 200

def setup():
    size(800, 400)
    background(220)
    noStroke()
    frameRate(60)


def draw():
    background(220)
    r = random(height)  # Get a random y value
    values.append(r)
    if len(values) > maxPoints:
        values.pop(0)
    # Draw the line chart
    stroke(0)
    noFill()
    beginShape()
    for x in range(len(values)):
        vertex(x, values[x])
    endShape()
    # Draw jumping circle for comparison
    fill(0)
    noStroke()
    ellipse(width-60, r, 40, 40)
    fill(50)
    textAlign(LEFT)
    textSize(18)
    text('random() seismograph', 10, 30)
    text('random() value: ' + str(round(r, 2)), width-200, 30)
