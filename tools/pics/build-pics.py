"""Build the photo gallery assets for hochware.com.

Reads the source folder (default: C:/Users/marho/Documents/pics), resizes every image to
max 1600 px on the long edge, writes them to src/assets/pics/<same structure> with
URL-safe file names and produces src/assets/pics/manifest.json describing the tree.

Usage:  python tools/pics/build-pics.py [source-folder]
"""
import json
import os
import re
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageOps

SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Documents" / "pics"
REPO = Path(__file__).resolve().parents[2]
OUT = REPO / "src" / "assets" / "pics"
MAX_EDGE = 1600
JPEG_QUALITY = 82
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"}


def slug(name: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return s or "img"


def build_folder(src_dir: Path, rel: Path) -> dict:
    out_dir = OUT / rel
    out_dir.mkdir(parents=True, exist_ok=True)
    folders, images = [], []
    used = set()
    for entry in sorted(src_dir.iterdir(), key=lambda p: p.name.lower()):
        if entry.is_dir():
            folders.append(build_folder(entry, rel / slug(entry.name) if str(rel) != "." else Path(slug(entry.name))))
            folders[-1]["name"] = entry.name
        elif entry.suffix.lower() in IMAGE_EXT:
            base = slug(entry.stem)
            n = 1
            while base in used:
                n += 1
                base = f"{slug(entry.stem)}-{n}"
            used.add(base)
            ext = ".jpg" if entry.suffix.lower() in (".jpg", ".jpeg") else entry.suffix.lower()
            target = out_dir / (base + ext)
            w, h = convert(entry, target)
            images.append({
                "name": entry.stem,
                "src": "assets/pics/" + (target.relative_to(OUT)).as_posix(),
                "width": w,
                "height": h,
            })
    return {"name": src_dir.name, "path": rel.as_posix() if str(rel) != "." else "", "folders": folders, "images": images}


def convert(src: Path, target: Path):
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)
    im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
    if target.suffix == ".jpg":
        im.convert("RGB").save(target, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    else:
        im.save(target, optimize=True)
    return im.size


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    tree = build_folder(SRC, Path("."))
    tree["name"] = "Pics"
    (OUT / "manifest.json").write_text(json.dumps(tree, indent=2, ensure_ascii=False), encoding="utf-8")
    total = sum(f.stat().st_size for f in OUT.rglob("*") if f.is_file())
    count = sum(1 for f in OUT.rglob("*") if f.is_file() and f.suffix != ".json")
    print(f"{count} Bilder, {total / 1024 / 1024:.1f} MB -> {OUT}")


if __name__ == "__main__":
    main()
