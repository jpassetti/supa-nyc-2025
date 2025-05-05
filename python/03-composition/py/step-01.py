# Step 1: Tile Grid with Random Black Shapes (Processing.py)
# ----------------------------------------------------------
# Create a grid of tiles, each with a random black shape (circle, square, or line)
# For use in Processing IDE, Python mode.
#
# This sketch introduces grid iteration, randomness, and basic shape drawing.
# Each cell in the grid randomly draws a black circle, square, or line (all the same size, no rotation).
#
# TEACHER NOTES:
# - Use this to discuss iteration, randomness, and constraints in art and design.
# - Ask students to predict what will happen if you change the grid size or shape selection logic.
# - Challenge students to remix: add color, change grid size, or add new shapes (triangles, arcs, etc).
# - Discuss how randomness can be used for both art and science, and how constraints shape creativity.
#
# CODE WALKTHROUGH:
# - gridSize: sets the number of rows/columns (12x12 by default).
# - For each cell:
#     1. Randomly pick a shape: 0 = circle, 1 = square, 2 = line.
#     2. Draw the shape centered in the cell, all black.
# - All drawing is done in setup(), so the grid is static (not animated).

gridSize = 12  # Number of rows and columns

def setup():
    """
    Processing.py entry point. Draws a grid of tiles, each with a random black shape (circle, square, or line).
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
            shapeType = int(random(3))  # 0 = circle, 1 = square, 2 = line
            fill(0)
            if shapeType == 0:
                ellipse(x, y, cellW * 0.7, cellH * 0.7)
            elif shapeType == 1:
                rectMode(CENTER)
                rect(x, y, cellW * 0.7, cellH * 0.7)
            else:
                stroke(0)
                strokeWeight(4)
                line(x - cellW * 0.3, y, x + cellW * 0.3, y)
                noStroke()