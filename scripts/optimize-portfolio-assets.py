"""Compress heavy public images. Updates ProjectsData.jsx paths for converted files."""
from pathlib import Path
import re
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
DATA = ROOT / "src" / "components" / "ProjectsData.jsx"

DISPLAY_MAX_W = 1400
FULL_MAX_W = 1600
replacements: dict[str, str] = {}


def to_webp(path: Path, max_w: int, quality: int = 80) -> Path:
    img = Image.open(path)
    if img.mode in ("P", "LA"):
        img = img.convert("RGBA")
    elif img.mode == "CMYK":
        img = img.convert("RGB")

    w, h = img.size
    if w > max_w:
        img = img.resize((max_w, int(h * (max_w / w))), Image.Resampling.LANCZOS)

    out = path.with_suffix(".webp")
    before = path.stat().st_size
    save_kwargs = {"format": "WEBP", "quality": quality, "method": 6}
    if img.mode == "RGBA":
        img.save(out, **save_kwargs)
    else:
        img.convert("RGB").save(out, **save_kwargs)
    after = out.stat().st_size
    print(f"{path.name} -> {out.name}: {before/1024:.0f}KB -> {after/1024:.0f}KB")
    replacements[f"/{path.name}"] = f"/{out.name}"
    return out


def to_jpg(path: Path, max_w: int, quality: int = 78) -> Path:
    img = Image.open(path).convert("RGB")
    w, h = img.size
    if w > max_w:
        img = img.resize((max_w, int(h * (max_w / w))), Image.Resampling.LANCZOS)
    out = path.with_suffix(".jpg")
    before = path.stat().st_size
    img.save(out, format="JPEG", quality=quality, optimize=True)
    after = out.stat().st_size
    print(f"{path.name} -> {out.name}: {before/1024:.0f}KB -> {after/1024:.0f}KB")
    replacements[f"/{path.name}"] = f"/{out.name}"
    path.unlink(missing_ok=True)
    return out


def compress_favicon() -> None:
    path = PUBLIC / "favicon.png"
    if not path.exists():
        return
    img = Image.open(path).convert("RGBA")
    if max(img.size) > 192:
        img = img.resize((192, 192), Image.Resampling.LANCZOS)
    before = path.stat().st_size
    img.save(path, format="PNG", optimize=True)
    print(f"favicon.png: {before/1024:.0f}KB -> {path.stat().st_size/1024:.0f}KB")


def main() -> None:
    # CMS full-page monsters
    for path in sorted(PUBLIC.glob("*-full.png")):
        to_jpg(path, FULL_MAX_W, quality=76)

    # Large display PNGs used in projects / achievements
    for path in sorted(PUBLIC.glob("*.png")):
        if path.name in {"favicon.png", "vite.svg"}:
            continue
        if path.stat().st_size < 220_000:
            continue
        to_webp(path, DISPLAY_MAX_W, quality=80)

    # Large non-full jpgs/pngs already ok; compress tomato-level leftovers as webp if png left
    compress_favicon()

    # Hero uses profile.webp first; keep a lean PNG fallback
    profile = PUBLIC / "profile.png"
    if profile.exists():
        img = Image.open(profile).convert("RGBA")
        if img.width > 720:
            img = img.resize((720, int(img.height * (720 / img.width))), Image.Resampling.LANCZOS)
        before = profile.stat().st_size
        img.save(PUBLIC / "profile.webp", format="WEBP", quality=80, method=6)
        img.save(profile, format="PNG", optimize=True)
        print(
            f"profile: png {before/1024:.0f}KB -> {profile.stat().st_size/1024:.0f}KB, "
            f"webp {(PUBLIC/'profile.webp').stat().st_size/1024:.0f}KB"
        )

    if replacements:
        src_files = list((ROOT / "src").rglob("*.{jsx,js,tsx,ts}".replace("{", "").replace("}", "")))
        # rglob with brace doesn't work — patch known files
        src_files = [
            DATA,
            ROOT / "src" / "components" / "Achievements.jsx",
        ]
        for file in src_files:
            if not file.exists():
                continue
            text = file.read_text(encoding="utf-8")
            original = text
            for old, new in replacements.items():
                text = text.replace(f"'{old}'", f"'{new}'")
                text = text.replace(f'"{old}"', f'"{new}"')
            if text != original:
                file.write_text(text, encoding="utf-8")
                print(f"Updated paths in {file.name}")



if __name__ == "__main__":
    main()
