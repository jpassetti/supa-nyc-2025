# Step 3: Weather Data Grid Visualization (Processing.py)
# ------------------------------------------------------
# Visualize a year of daily high temperatures as a grid of colored circles.
# For use in Processing IDE, Python mode.
#
# This sketch loads a CSV file (e.g. 'syracuse-temps.csv') with 365 daily high
# temperatures (Fahrenheit) and arranges them in a grid. Each day is shown as a
# circle whose size and color are mapped to the temperature: cold days are small
# and blue, hot days are large and red/orange. The color spectrum blends smoothly
# from blue (cold) to red (hot), like a weather map. A color legend is drawn at
# the bottom.
#
# TEACHER NOTES:
# - Use this sketch to discuss data visualization, color mapping, and abstraction.
# - Challenge students to use other weather data (rainfall, low temps, etc) or try a different city by changing the data file.
# - Ask: How does the color mapping affect your perception of the data? What other color palettes could you use?
# - Try changing the grid size, color stops, or mapping for new effects.
# - Encourage students to explain the code logic in their own words, especially how the data is used.
#
# CODE WALKTHROUGH:
# - grid_cols/grid_rows: sets the grid (20x19 fits 365 days).
# - color_stops: defines the color spectrum for mapping temperatures.
# - Loads the CSV file, handling both one-value-per-line and comma-separated formats.
# - For each day:
#     1. Map temperature to circle size and color.
#     2. Draw the circle in the correct grid position.
# - draw_legend() draws a color bar legend at the bottom.
# - If the data file is missing, an error message is shown.
#
# DATA FILE:
# - Place a CSV file (e.g. 'syracuse-temps.csv') in your sketch folder.
# - The file should contain 365 daily high temperatures (F), one per line or comma-separated.
#
# Example CSV (one value per line):
# 32.1
# 35.2
# 40.0
# ...
#
# Example CSV (single line, comma-separated):
# 32.1,35.2,40.0,...

import csv

grid_cols = 20
grid_rows = 19
filename = "syracuse-temps.csv"  # Place this file in your sketch folder

temps = []
min_temp = 999
max_temp = -999

# --- Color stops for weather map (blue to red) ---
color_stops = [
    color(0, 80, 220),    # Blue (coldest)
    color(0, 200, 255),   # Cyan
    color(80, 220, 120),  # Green
    color(240, 220, 100), # Yellow
    color(255, 140, 0),   # Orange
    color(220, 40, 40)    # Red (hottest)
]

def setup():
    """
    Processing.py entry point. Loads temperature data, computes min/max, and draws the grid.
    """
    global temps, min_temp, max_temp
    size(800, 800)
    background(255)
    noStroke()
    # --- Load temperature data (handles both one-value-per-line and comma-separated single line) ---
    try:
        with open(filename, 'r') as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                # If the row is a single long string, split by comma
                if len(row) == 1 and ',' in row[0]:
                    values = row[0].split(',')
                    for v in values:
                        v = v.strip()
                        if v == '' or v.lower() == 'null':
                            continue
                        t = float(v)
                        temps.append(t)
                        if t < min_temp:
                            min_temp = t
                        if t > max_temp:
                            max_temp = t
                else:
                    for v in row:
                        v = v.strip()
                        if v == '' or v.lower() == 'null':
                            continue
                        t = float(v)
                        temps.append(t)
                        if t < min_temp:
                            min_temp = t
                        if t > max_temp:
                            max_temp = t
    except Exception as e:
        # Show error if data file is missing or invalid
        fill(200, 0, 0)
        textAlign(CENTER)
        textSize(24)
        text("Error loading data: " + str(e), width/2, height/2)
        return
    # --- Draw grid of circles ---
    cellW = width / grid_cols
    cellH = height / grid_rows
    for i in range(len(temps)):
        col = i % grid_cols
        row = i // grid_cols
        x = col * cellW + cellW / 2
        y = row * cellH + cellH / 2
        t = temps[i]
        # Map temp to size (d) and color (c)
        d = map(t, min_temp, max_temp, cellW * 0.3, cellW * 0.95)
        c = temp_to_color(t, min_temp, max_temp)
        fill(c)
        ellipse(x, y, d, d)
    # --- Add color legend ---
    draw_legend(min_temp, max_temp)

def temp_to_color(t, tmin, tmax):
    """
    Map a temperature value t to a color using the color_stops list.
    The mapping is smooth (interpolated) between color stops.
    """
    norm = (t - tmin) / float(tmax - tmin)
    n = len(color_stops) - 1
    idx = int(norm * n)
    idx = min(idx, n - 1)
    frac = (norm * n) - idx
    c1 = color_stops[idx]
    c2 = color_stops[idx + 1]
    return lerpColor(c1, c2, frac)

def draw_legend(tmin, tmax):
    """
    Draw a horizontal color bar legend at the bottom of the canvas, showing the temperature-color mapping.
    """
    legendW = 400
    legendH = 24
    x0 = width/2 - legendW/2
    y0 = height - 40
    for i in range(legendW):
        norm = i / float(legendW - 1)
        t = tmin + norm * (tmax - tmin)
        c = temp_to_color(t, tmin, tmax)
        stroke(c)
        line(x0 + i, y0, x0 + i, y0 + legendH)
    noStroke()
    fill(50)
    textAlign(CENTER)
    textSize(16)
    text(str(int(tmin)) + u"°F", x0, y0 + legendH + 18)
    text(str(int(tmax)) + u"°F", x0 + legendW, y0 + legendH + 18)
    text("Coldest", x0, y0 + legendH + 34)
    text("Hottest", x0 + legendW, y0 + legendH + 34)