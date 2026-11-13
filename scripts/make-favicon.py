from PIL import Image, ImageDraw
from pathlib import Path

public = Path(r"E:\web development practice\Reactjs projects\portfolio\public")
img = Image.open(public / "profile.png").convert("RGBA")
w, h = img.size

# Head-focused region (upper half of portrait)
head_bottom = int(h * 0.52)
head = img.crop((0, 0, w, head_bottom))
hw, hh = head.size

# Square around the face — shift crop left so the face sits slightly right of center
side = min(hw, hh)
left = (hw - side) // 2 - int(side * 0.14)
left = max(0, left)
if left + side > hw:
    left = hw - side
top = max(0, (hh - side) // 2 - int(side * 0.04))
if top + side > hh:
    top = hh - side
crop = head.crop((left, top, left + side, top + side))


def make_icon(size, opaque=False):
    face = crop.resize((size, size), Image.Resampling.LANCZOS)
    # Dark theme disc behind the photo
    bg_color = (11, 18, 32, 255) if opaque else (11, 18, 32, 255)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    disc = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    disc_draw = ImageDraw.Draw(disc)
    disc_draw.ellipse((0, 0, size - 1, size - 1), fill=bg_color)

    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)

    round_face = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    round_face.paste(face, (0, 0), mask)

    canvas.paste(disc, (0, 0), disc)
    canvas.paste(round_face, (0, 0), round_face)
    return canvas


for size, name in [
    (32, "favicon-32.png"),
    (48, "favicon.png"),
    (192, "icon-192.png"),
    (512, "icon-512.png"),
]:
    make_icon(size).save(public / name, optimize=True)
    print(name, "ok")

apple = make_icon(180, opaque=True)
apple.convert("RGB").save(public / "apple-touch-icon.jpg", quality=90, optimize=True)
apple.save(public / "apple-touch-icon.png", optimize=True)
print("apple-touch ok")
print("done")
