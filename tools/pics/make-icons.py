"""Draws the pixel-art icons for the photo gallery (Win95 palette) into src/assets."""
from pathlib import Path

from PIL import Image

OUT = Path(__file__).resolve().parents[2] / "src" / "assets"

PAL = {
    ".": None,
    "w": (255, 255, 255), "k": (0, 0, 0), "g": (192, 192, 192), "d": (128, 128, 128),
    "y": (255, 255, 0), "o": (128, 128, 0), "b": (0, 0, 255), "n": (0, 0, 128),
    "e": (0, 128, 0), "l": (0, 255, 0), "t": (0, 128, 128), "c": (0, 255, 255),
    "r": (255, 0, 0), "s": (255, 255, 224),
}

PRINTER = """
................
....wwwwwwwwk...
....wddddddwk...
....wwwwwwwwk...
....wdddddwwk...
....wwwwwwwwk...
..gggggggggggg..
.gggggggggggggdk
.ggggggggggglgdk
.gggggggggggggdk
.ddddddddddddddk
.gwwwwwwwwwwwgdk
.gwddddddddddgdk
.gwwwwwwwwwwwgdk
..ddddddddddddk.
................
"""

IMAGE_FILE = """
.wwwwwwwwwwk....
.wwwwwwwwwwwk...
.wwwwwwwwwwwwk..
.wwwwwwwwwwwkkk.
.wwccccccccccwk.
.wwccccyyccccwk.
.wwccccyyccccwk.
.wwccccccccccwk.
.wwcccceecccwwk.
.wwcceeeeeeccwk.
.wweeeeeeeeeewk.
.wweeeoeeeoeewk.
.wwwwwwwwwwwwwk.
.wwwwwwwwwwwwwk.
.kkkkkkkkkkkkkk.
................
"""

FOLDER_UP = """
................
.yyyyy..........
yssssyyyyyyyyyy.
ysssssssssssssk.
yssssss.kssssk..
ysssss.k.kssssk.
yssss.kkkkkssssk
ysssssykysssssk.
ysssssykysssssk.
ysssssykysssssk.
yssssssssssssk..
yssssssssssssk..
.kkkkkkkkkkkkk..
................
................
................
"""

ARROW_LEFT = """
................
........k.......
.......kk.......
......kkk.......
.....kkkk.......
....kkkkkkkkkk..
...kkkkkkkkkkk..
..kkkkkkkkkkkk..
...kkkkkkkkkkk..
....kkkkkkkkkk..
.....kkkk.......
......kkk.......
.......kk.......
........k.......
................
................
"""


def draw(spec: str, name: str, scale: int):
    rows = [r for r in spec.strip("\n").split("\n")]
    h, w = len(rows), max(len(r) for r in rows)
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    px = im.load()
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            col = PAL[ch]
            if col:
                px[x, y] = col + (255,)
    if scale > 1:
        im = im.resize((w * scale, h * scale), Image.NEAREST)
    im.save(OUT / name)
    print(name, im.size)


draw(PRINTER, "printer.png", 3)
draw(IMAGE_FILE, "image-file.png", 3)
draw(FOLDER_UP, "folder-up.png", 1)
draw(ARROW_LEFT, "arrow-left.png", 1)
left = Image.open(OUT / "arrow-left.png")
left.transpose(Image.FLIP_LEFT_RIGHT).save(OUT / "arrow-right.png")
print("arrow-right.png", left.size)
