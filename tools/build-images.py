#!/usr/bin/env python3
"""Processa assets do site HN Transportes: logos transparentes, favicons, fotos WebP, OG image."""
import os
from PIL import Image

ROOT = "/Users/renatovalente/Websites/HN_Transportes"
RAW = os.path.join(ROOT, "assets/img/raw")
IMG = os.path.join(ROOT, "assets/img")
FROTA = os.path.join(ROOT, "assets/img/frota")
FAV = os.path.join(ROOT, "assets/favicon")
for d in (FROTA, FAV):
    os.makedirs(d, exist_ok=True)

def trim_alpha(im):
    bbox = im.split()[-1].getbbox()
    return im.crop(bbox) if bbox else im

def clean_alpha(alpha, thr=14):
    # zera ruido de fundo abaixo do limiar para remover halo
    return alpha.point(lambda a: 0 if a < thr else a)

# ---------- LOGOS TRANSPARENTES ----------
# logo escuro (tinta preta) a partir do logo de fundo branco -> usar em fundos claros
src = Image.open(os.path.join(RAW, "logo-branco.jpg")).convert("L")
alpha = clean_alpha(src.point(lambda p: 255 - p))   # quanto mais escuro, mais opaco
dark = Image.new("RGBA", src.size, (17, 17, 17, 0))
dark.putalpha(alpha)
dark = trim_alpha(dark)
dark.save(os.path.join(IMG, "logo.png"))
print("logo.png (escuro)", dark.size)

# logo claro (tinta branca) a partir do logo de fundo preto -> usar em fundos escuros
src2 = Image.open(os.path.join(RAW, "logo-preto.jpg")).convert("L")
alpha2 = clean_alpha(src2)                            # quanto mais claro, mais opaco
light = Image.new("RGBA", src2.size, (255, 255, 255, 0))
light.putalpha(alpha2)
light = trim_alpha(light)
light.save(os.path.join(IMG, "logo-light.png"))
print("logo-light.png (claro)", light.size)

# ---------- FAVICON / ICONES (monograma HN) ----------
# recorta o monograma (parte de cima, sem o selo TRANSPORTES) do logo claro
w, h = light.size
mono = trim_alpha(light.crop((0, 0, w, int(h * 0.78))))
print("monograma", mono.size)

def make_icon(size, bg=(0, 0, 0, 255), frac=0.72, round_corners=False):
    canvas = Image.new("RGBA", (size, size), bg)
    m = mono.copy()
    maxd = int(size * frac)
    m.thumbnail((maxd, maxd), Image.LANCZOS)
    x = (size - m.width) // 2
    y = (size - m.height) // 2
    canvas.paste(m, (x, y), m)
    if round_corners:
        from PIL import ImageDraw
        mask = Image.new("L", (size, size), 0)
        d = ImageDraw.Draw(mask)
        d.rounded_rectangle([0, 0, size, size], radius=int(size * 0.22), fill=255)
        canvas.putalpha(mask)
    return canvas

ico512 = make_icon(512)
ico512.save(os.path.join(FAV, "icon-512.png"))
make_icon(192).save(os.path.join(FAV, "icon-192.png"))
make_icon(180, round_corners=True).save(os.path.join(FAV, "apple-touch-icon.png"))
ico512.resize((32, 32), Image.LANCZOS).save(os.path.join(FAV, "favicon-32.png"))
ico512.resize((16, 16), Image.LANCZOS).save(os.path.join(FAV, "favicon-16.png"))
# favicon.ico multi-tamanho
ico512.resize((48, 48), Image.LANCZOS).save(
    os.path.join(ROOT, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
print("favicons gerados")

# ---------- FOTOS -> WEBP OTIMIZADO ----------
photos = {
    "img carrinha 6.webp": ("hero-farol", 1100, 88),   # farol (retrato) -> hero
    "img carrinhas 5.webp": ("frota-dia", 1400, 82),   # frota de dia (paisagem)
    "img carrinhas 9.webp": ("frota-noite", 1400, 82),
    "img carrinha 7.webp": ("detalhe", 1100, 85),
    "img carrinha 8.webp": ("traseira", 1100, 85),
    "img carrinha.jpeg": ("palacio", 1000, 82),
    "img carrinha 2.jpeg": ("campo", 1200, 82),
    "img carrinha 3.jpeg": ("castelo", 1200, 82),
    "img carrinha 4.jpeg": ("ponte", 1300, 82),
    "img carrinha e equipa.jpeg": ("equipa", 1080, 82),
}
for fname, (out, maxw, q) in photos.items():
    p = os.path.join(RAW, fname)
    if not os.path.exists(p):
        print("FALTA", fname); continue
    im = Image.open(p).convert("RGB")
    if im.width > maxw:
        nh = round(im.height * maxw / im.width)
        im = im.resize((maxw, nh), Image.LANCZOS)
    dest = os.path.join(FROTA, out + ".webp")
    im.save(dest, "WEBP", quality=q, method=6)
    print(f"{out}.webp", im.size, f"{os.path.getsize(dest)//1024}KB")

# ---------- OG IMAGE (1200x630 JPEG) ----------
def cover(im, tw, th):
    sw, sh = im.size
    scale = max(tw / sw, th / sh)
    im = im.resize((round(sw * scale), round(sh * scale)), Image.LANCZOS)
    l = (im.width - tw) // 2; t = (im.height - th) // 2
    return im.crop((l, t, l + tw, t + th))

og = Image.open(os.path.join(RAW, "img carrinhas 5.webp")).convert("RGB")
og = cover(og, 1200, 630)
og.save(os.path.join(IMG, "og-image.jpg"), "JPEG", quality=86, optimize=True)
print("og-image.jpg", og.size, f"{os.path.getsize(os.path.join(IMG,'og-image.jpg'))//1024}KB")
print("DONE")
