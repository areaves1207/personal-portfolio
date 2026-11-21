# Usage: python scripts/generate-wood.py src/assets/setlist/wood-floor.webp [seed=9] [planks=12] [width_ref_px=3200]
# Needs numpy, scipy, pillow.
"""Procedural GH3-style wood planks, matched to the reference: 4 flat tones sampled from the
screenshots, long thin tapering dark streaks, gentle grain waves, occasional cathedral knots,
and the soft light gap between boards. Every plank is unique; nothing is stretched."""
import sys, warnings
warnings.filterwarnings("ignore")
import numpy as np
from PIL import Image
from scipy import ndimage

OUT = sys.argv[1]
SEED = int(sys.argv[2]) if len(sys.argv) > 2 else 4
N_PLANKS = int(sys.argv[3]) if len(sys.argv) > 3 else 12
W = int(sys.argv[4]) if len(sys.argv) > 4 else 3000      # reference px (1080p scale)
SCALE = 0.8                                              # display scale, matches the paper
rng = np.random.default_rng(SEED)

TONES = np.array([(30, 21, 13), (45, 30, 20), (61, 40, 27), (78, 50, 34)], float)
GAP = np.array([(42, 32, 21), (62, 48, 35), (85, 66, 52), (99, 77, 62), (106, 82, 66), (108, 83, 67),
                (108, 83, 68), (108, 83, 68), (108, 82, 68), (104, 79, 65), (99, 74, 60), (91, 67, 53),
                (79, 56, 42), (66, 46, 32)], float)

def noise2(h, w, sy, sx, octaves=3):
    """value noise with separate y/x feature sizes (anisotropic), roughly unit variance"""
    out = np.zeros((h, w)); amp, tot = 1.0, 0.0
    for o in range(octaves):
        fy, fx = max(1.0, sy / 2 ** o), max(1.0, sx / 2 ** o)
        gh, gw = int(h / fy) + 4, int(w / fx) + 4
        g = rng.standard_normal((gh, gw))
        up = ndimage.zoom(g, (fy, fx), order=3)[:h, :w]
        out += amp * up; tot += amp; amp *= 0.5
    return out / tot

def noise1(n, scale, octaves=4):
    out = np.zeros(n); amp, tot = 1.0, 0.0
    for o in range(octaves):
        s = max(1.0, scale / 2 ** o)
        g = rng.standard_normal(int(n / s) + 4)
        out += amp * ndimage.zoom(g, s, order=3)[:n]; tot += amp; amp *= 0.5
    return out / tot

def plank(h):
    yy, xx = np.mgrid[0:h, 0:W].astype(float)
    # gentle large waves + medium wobble in the grain
    warp = noise2(h, W, 320, 700, 2) * rng.uniform(9, 15) + noise2(h, W, 50, 160, 2) * 3.5
    # occasional cathedral knot: bands arch over a point
    if rng.random() < 0.5:
        for _ in range(rng.integers(1, 3)):
            x0, y0 = rng.uniform(0, W), rng.uniform(0.2 * h, 0.8 * h)
            sx, amp = rng.uniform(150, 260), rng.uniform(28, 55) * rng.choice([-1, 1])
            warp += amp * np.exp(-((xx - x0) / sx) ** 2) * np.exp(-((yy - y0) / (h * 0.9)) ** 2)
    yw = yy + warp
    # 1D band structure across the grain (irregular widths)
    span = int(yw.max() - yw.min()) + 10
    bands = noise1(span, rng.uniform(11, 17), 4)
    v = np.interp(yw - yw.min(), np.arange(span), bands)
    # long thin streaks that taper and break (strongly anisotropic noise)
    v += 0.5 * noise2(h, W, 4, rng.uniform(120, 260), 3)
    v += 0.12 * noise2(h, W, 2, 14, 1)             # ragged edges
    # posterize into the 4 tones, keeping the reference's proportions
    bias = rng.uniform(-0.06, 0.06)
    q = np.quantile(v, [0.41 + bias, 0.67 + bias, 0.80 + bias])
    idx = np.digitize(v, q)
    img = TONES[idx]
    img = ndimage.gaussian_filter(img, (0.45, 0.6, 0))
    # slight darkening toward the plank edges, per-plank tone
    edge = 1 - 0.18 * np.exp(-np.minimum(yy, h - 1 - yy) / 6)
    img *= edge[..., None] * rng.uniform(0.92, 1.07)
    return img

rows = []
for i in range(N_PLANKS):
    rows.append(np.repeat(GAP[:, None, :], W, axis=1) * rng.uniform(0.95, 1.05))
    rows.append(plank(int(rng.uniform(360, 410))))
img = np.vstack(rows).clip(0, 255).astype(np.uint8)
im = Image.fromarray(img)
im = im.resize((round(W * SCALE), round(im.height * SCALE)), Image.LANCZOS)
im.save(OUT, quality=78, method=6)
print(im.size)
