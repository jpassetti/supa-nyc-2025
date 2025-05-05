# Step 2: Color Triad Grid Remix (Processing.py)
# -----------------------------------------------
# Create a colorful grid composition using a color triad and random layering.
# For use in Processing IDE, Python mode.
#
# This sketch builds on Step 1 by introducing color theory (color triads),
# layering, and more complex random choices. Each cell in the grid is filled
# with either a colored or white square, and may have a half-circle (with a
# different color) on top, randomly rotated. Some cells are left blank on top,
# creating negative space. The result is a playful, abstract pattern with both
# color and shape variety.
#
# TEACHER NOTES:
# - Use this sketch to discuss color theory (triads), layering, and abstraction.
# - Challenge students to remix: change the triad, grid size, or add new shapes.
# - Ask: What happens if you use analogous or complementary colors instead?
# - Try making all backgrounds white, or all backgrounds colored, for different effects.
# - Encourage students to explain the random logic in their own words.
#
# CODE WALKTHROUGH:
# - gridSize: sets the number of rows/columns (12x12 by default).
# - triad: a list of three colors spaced evenly on the color wheel.
# - For each cell:
#     1. Randomly pick background: colored (from triad) or white.
#     2. Randomly decide if a half-circle is drawn on top (or left blank).
#     3. If drawing a half-circle, pick a color (never matching the background if colored),
#        and randomly rotate it (90, 180, or 270 degrees).
# - All drawing is done in setup(), so the grid is static (not animated).

gridSize = 12  # Number of rows and columns
triad = [color(220, 80, 80), color(80, 180, 220), color(240, 220, 100)]  # Example color triad

def setup():
    """
    Processing.py entry point. Draws a colorful grid using a color triad and random layering.
    Each cell is filled with a colored or white square, and may have a half-circle (with a different color) on top.
    """
    size(600, 600)
    background(255)
    noStroke()
    cellW = width / gridSize
    cellH = height / gridSize
    for i in range(gridSize):
        for j in range(gridSize):
            x = i * cellW + cellW / 2
            y = j * cellH + cellH / 2
            # --- Background: randomly colored or white ---
            bgType = int(random(2))  # 0 = colored, 1 = white
            if bgType == 0:
                bgColor = triad[int(random(len(triad)))]
            else:
                bgColor = color(255)
            fill(bgColor)
            rectMode(CENTER)
            rect(x, y, cellW, cellH)
            # --- Top shape: randomly half-circle or blank ---
            topShape = int(random(2))  # 0 = half-circle, 1 = blank
            if topShape == 0:
                # Pick a color for the half-circle, different from bg if possible
                fgColorIdx = int(random(len(triad)))
                fgColor = triad[fgColorIdx]
                # Avoid same color as background (if bg is colored)
                if bgType == 0 and fgColor == bgColor:
                    fgColor = triad[(fgColorIdx + 1) % len(triad)]
                fill(fgColor)
                # Random rotation: 90, 180, or 270 degrees
                rot = int(random(1, 4)) * HALF_PI
                pushMatrix()
                translate(x, y)
                rotate(rot)
                # Draw the half-circle (arc from 0 to PI)
                arc(0, 0, cellW, cellH, 0, PI, PIE)
                popMatrix()