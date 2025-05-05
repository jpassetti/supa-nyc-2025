# Step 3: Perlin Noise Demo (2D) (Processing.py)
# Move a circle smoothly in two dimensions using 2D Perlin noise
# For use in Processing IDE, Python mode.

tx = 0  # Time variable for x noise
ty = 1000  # Offset for y noise (so x and y are independent)

def setup():
    size(800, 400)
    background(220)
    noStroke()
    frameRate(60)
    global tx, ty
    tx = 0
    ty = 1000

def draw():
    global tx, ty
    background(220)
    x = noise(tx) * width
    y = noise(ty) * height
    fill(0)
    ellipse(x, y, 80, 80)
    fill(50)
    textAlign(CENTER)
    textSize(18)
    text('2D noise: x=' + str(round(x, 2)) + ' y=' + str(round(y, 2)), width/2, 30)
    tx += 0.01
    ty += 0.01
