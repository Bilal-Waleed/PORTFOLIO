from PIL import Image
from pathlib import Path

public = Path(r"E:\web development practice\Reactjs projects\portfolio\public")
img = Image.open(public / "profile.png").convert("RGBA")
print("profile size", img.size)


def fit_square(im, size, bg=(11, 18, 32, 255)):
    w, h = im.size
    side = min(w, h)
    left = (w - side) // 2
    top = max(0, int(h * 0.05))
    if top + side > h:
        top = h - side
    crop = im.crop((left, top, left + side, top + side))
    canvas = Image.new("RGBA", (size, size), bg)
    resized = crop.resize((size, size), Image.Resampling.LANCZOS)
    canvas.paste(resized, (0, 0), resized)
    return canvas


fav32 = fit_square(img, 32)
fav48 = fit_square(img, 48)
fav180 = fit_square(img, 180)
fav192 = fit_square(img, 192)
fav512 = fit_square(img, 512)

fav32.save(public / "favicon-32.png", optimize=True)
fav48.save(public / "favicon.png", optimize=True)
fav180.convert("RGB").save(public / "apple-touch-icon.jpg", quality=88, optimize=True)
fav192.save(public / "icon-192.png", optimize=True)
fav512.save(public / "icon-512.png", optimize=True)

og = Image.new("RGB", (1200, 630), (7, 11, 18))
portrait = img.copy()
target_h = 560
ratio = target_h / portrait.height
target_w = int(portrait.width * ratio)
portrait = portrait.resize((target_w, target_h), Image.Resampling.LANCZOS)
px = 1200 - target_w - 40
py = (630 - target_h) // 2
og.paste(portrait, (px, py), portrait)
og.save(public / "og-image.jpg", quality=82, optimize=True)

hero = img.copy()
if hero.width > 720:
    nh = int(hero.height * (720 / hero.width))
    hero = hero.resize((720, nh), Image.Resampling.LANCZOS)
hero.save(public / "profile.webp", quality=82, method=6)
fit_square(img, 400).convert("RGB").save(public / "profile-card.jpg", quality=85, optimize=True)

for name in [
    "favicon.png",
    "favicon-32.png",
    "apple-touch-icon.jpg",
    "og-image.jpg",
    "profile.webp",
    "icon-192.png",
    "icon-512.png",
    "profile-card.jpg",
]:
    p = public / name
    print(f"{name}: {p.stat().st_size / 1024:.1f} KB")
