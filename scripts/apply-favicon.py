"""Apply circular mask to public/favicon.png and write apple-touch only."""
from PIL import Image, ImageDraw
from pathlib import Path

public = Path(__file__).resolve().parents[1] / "public"
src = Image.open(public / "favicon.png").convert("RGBA")
src = src.resize((512, 512), Image.Resampling.LANCZOS)

mask = Image.new("L", (512, 512), 0)
ImageDraw.Draw(mask).ellipse((0, 0, 511, 511), fill=255)

out = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
out.paste(src, (0, 0), mask)
out.save(public / "favicon.png", optimize=True)

apple = out.resize((180, 180), Image.Resampling.LANCZOS)
# JPG needs opaque background
bg = Image.new("RGB", (180, 180), (11, 19, 32))
bg.paste(apple.convert("RGB"), (0, 0), apple.split()[-1])
bg.save(public / "apple-touch-icon.jpg", quality=92, optimize=True)

print("favicon.png (round 512) + apple-touch-icon.jpg (180) ready")
