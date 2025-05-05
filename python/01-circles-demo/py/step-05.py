# Demo 1: Save Your Art (Processing.py)
# Step 5: Animated grid of circles, with save feature
# For use in Processing IDE, Python mode.

cols = 10
rows = 10
diameter = 40
padding = 20
circles = []

class Circle:
    def __init__(self, x, y, d, r, g, b, growing):
        self.x = x
        self.y = y
        self.d = d
        self.r = r
        self.g = g
        self.b = b
        self.growing = growing

    def update(self):
        # Animate diameter: grow or shrink
        if self.growing:
            self.d += 1
            if self.d >= 100:
                self.growing = False
        else:
            self.d -= 1
            if self.d <= 20:
                self.growing = True

    def display(self):
        fill(self.r, self.g, self.b)
        ellipse(self.x, self.y, self.d, self.d)

def setup():
    size(600, 600)
    noStroke()
    global circles
    for y in range(rows):
        for x in range(cols):
            cx = padding + x * (diameter + padding)
            cy = padding + y * (diameter + padding)
            d = random(20, 60)
            r = random(60, 200)
            g = random(120, 220)
            b = random(200, 255)
            growing = random(1) > 0.5
            circles.append(Circle(cx, cy, d, r, g, b, growing))
    frameRate(30)

def draw():
    background(255)
    for c in circles:
        c.update()
        c.display()

def keyPressed():
    # Save the current frame as a PNG image
    saveFrame("circle-art-####.png")

def mousePressed():
    # Also allow saving by clicking the canvas
    saveFrame("circle-art-####.png")
