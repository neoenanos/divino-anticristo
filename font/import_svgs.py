import fontforge
import os
import sys

# Check arguments
if len(sys.argv) < 2:
    print("Usage: fontforge -script import_svgs.py <svg_directory> [output_file]")
    sys.exit(1)

svg_dir = sys.argv[1]
output_file = sys.argv[2] if len(sys.argv) > 2 else "output.sfd"

# Create a new font
font = fontforge.font()

# Loop through SVG files
for file in os.listdir(svg_dir):
    if file.endswith(".svg"):
        name = os.path.splitext(file)[0]

        if len(name) == 1:
            codepoint = ord(name)
        else:
            print(f"Skipping {file} (not a single character)")
            continue

        glyph = font.createChar(codepoint)
        glyph.importOutlines(os.path.join(svg_dir, file))

# Generate font needs .ttf
# font.generate(output_file)

# Save .sfd (fontforge format)
font.save(output_file)

print(f"Font generated: {output_file}")