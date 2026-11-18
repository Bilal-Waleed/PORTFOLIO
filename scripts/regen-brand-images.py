from PIL import Image, ImageDraw
from pathlib import Path

root = Path(__file__).resolve().parents[1] / "public"
src = Image.open(root / "profile.png").convert("RGBA")
w, h = src.size

# Face sits slightly left of geometric center in profile.png
face_cx = int(w * 0.47)
face_cy = int(h * 0.30)


def circular_icon(size: int, shift_x: int = 0) -> Image.Image:
    # Positive shift_x crops further right => face moves left in the circle
    side = int(min(w, h) * 0.70)
    left = face_cx - side // 2 + shift_x
    top = face_cy - int(side * 0.42)
    left = max(0, min(left, w - side))
    top = max(0, min(top, h - side))
    crop = src.crop((left, top, left + side, top + side)).resize(
        (size, size), Image.Resampling.LANCZOS
    )

    bg = Image.new("RGBA", (size, size), (11, 19, 32, 255))
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((1, 1, size - 2, size - 2), fill=255)
    bg.paste(crop, (0, 0), mask)
    return bg.convert("RGB")


shift = int(w * 0.065)
circular_icon(48, shift).save(root / "favicon.png", optimize=True)
circular_icon(32, shift).save(root / "favicon-32.png", optimize=True)
circular_icon(180, shift).save(root / "apple-touch-icon.jpg", quality=92)
circular_icon(180, shift).save(root / "apple-touch-icon.png", optimize=True)
circular_icon(192, shift).save(root / "icon-192.png", optimize=True)
circular_icon(512, shift).save(root / "icon-512.png", optimize=True)

# OG 1200x630 — face centered for WhatsApp / social square+landscape crops
og_w, og_h = 1200, 630
og = Image.new("RGB", (og_w, og_h), (11, 19, 32))
# Fit full portrait with breathing room (not flush to bottom edge)
pad = 36
target_h = og_h - pad * 2
scale = target_h / h
tw, th = int(w * scale), target_h
resized = src.resize((tw, th), Image.Resampling.LANCZOS)

face_x_resized = int(face_cx * scale)
x = og_w // 2 - face_x_resized
y = (og_h - th) // 2
x = max(pad, min(og_w - tw - pad, x))
og.paste(resized.convert("RGB"), (x, y), resized.split()[-1])
og.save(root / "og-image.jpg", quality=92, optimize=True)
print(f"regenerated favicons + og-image.jpg (paste_x={x}, tw={tw})")
