#!/usr/bin/env python3
"""
36 Squires Path — Site Plan Generator v2
Positions traced from Benz survey + aerial photos.
Roads shown as actual features. Setback zones shaded.
Pool is to the LEFT of the pond (both east/NE of house).
"""

from PIL import Image, ImageDraw, ImageFont

W, H = 1400, 1700
img = Image.new('RGB', (W, H), '#f5f4f0')
draw = ImageDraw.Draw(img)

try:
    ft = lambda s: ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', s)
    F36, F24, F20, F18, F16, F14, F12, F10 = ft(36), ft(24), ft(20), ft(18), ft(16), ft(14), ft(12), ft(10)
except:
    F36 = F24 = F20 = F18 = F16 = F14 = F12 = F10 = ImageFont.load_default()

# ── LOT LAYOUT ────────────────────────────────────────────────────
# Lot area on canvas. v = east-west (0=west, 110=east). u = south-north (0=road, 190=north).
LOT_L, LOT_T = 250, 200
LOT_W_PX, LOT_H_PX = 850, 1100
SC = LOT_W_PX / 110.0  # ~7.73 px/ft

def px(v, u):
    """Lot coords to pixel. v=east-west (0=west edge), u=south-north (0=south edge)."""
    return (int(LOT_L + v * SC), int(LOT_T + LOT_H_PX - u * SC))

def rect(v1, u1, v2, u2):
    p1, p2 = px(v1, u1), px(v2, u2)
    return [min(p1[0],p2[0]), min(p1[1],p2[1]), max(p1[0],p2[0]), max(p1[1],p2[1])]

# ── TITLE ─────────────────────────────────────────────────────────
draw.text((LOT_L, 30), "36 Squires Path — Site Plan", fill='#1a1a1a', font=F36)
draw.text((LOT_L, 75), "East Hampton, NY  ·  Lot 6, Fox Hollow Estates  ·  0.502 acres  ·  Survey: Gary Benz, L.S. (2021)", fill='#888', font=F14)
draw.text((LOT_L, 100), "Option A: Wide Court + Detached Garage (Recommended)", fill='#b45309', font=F24)

# ── ROADS (hard constraints) ──────────────────────────────────────

# Squires Path — south of lot
road_s = LOT_T + LOT_H_PX + 8
draw.rectangle([LOT_L - 80, road_s, LOT_L + LOT_W_PX + 80, road_s + 65], fill='#d5d0c8', outline='#b0aa9e', width=1)
draw.text((LOT_L + LOT_W_PX//2 - 70, road_s + 18), "SQUIRES PATH", fill='#7a7568', font=F20)
draw.text((LOT_L + LOT_W_PX//2 - 55, road_s + 42), "(public road — south)", fill='#9a958d', font=F12)

# Stephen Hands Path — west of lot (runs along the west boundary)
draw.rectangle([LOT_L - 80, LOT_T - 30, LOT_L - 8, LOT_T + LOT_H_PX + 8], fill='#d5d0c8', outline='#b0aa9e', width=1)
# Vertical text
for i, ch in enumerate("STEPHEN HANDS PATH"):
    draw.text((LOT_L - 60, LOT_T + 250 + i * 22), ch, fill='#7a7568', font=F16)

# ── LOT BOUNDARY ──────────────────────────────────────────────────
lot_box = [LOT_L, LOT_T, LOT_L + LOT_W_PX, LOT_T + LOT_H_PX]
draw.rectangle(lot_box, outline='#333', width=3, fill=None)

# Corner dots
for cx, cy in [(lot_box[0], lot_box[1]), (lot_box[2], lot_box[1]),
               (lot_box[2], lot_box[3]), (lot_box[0], lot_box[3])]:
    draw.ellipse([cx-5, cy-5, cx+5, cy+5], fill='#333')

# ── SETBACK ZONES (shaded) ────────────────────────────────────────
# Use semi-transparent overlay via a separate image
overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
odraw = ImageDraw.Draw(overlay)

# Front setback: 35' from Squires Path (south edge)
sb_front = rect(0, 0, 110, 35)
odraw.rectangle(sb_front, fill=(204, 68, 68, 30))

# Side setback west: 15' from west boundary
sb_west = rect(0, 0, 15, 190)
odraw.rectangle(sb_west, fill=(204, 68, 68, 30))

# Side setback east: 15' from east boundary (110-15=95)
sb_east = rect(95, 0, 110, 190)
odraw.rectangle(sb_east, fill=(204, 68, 68, 30))

# Rear setback: 25' from north boundary (190-25=165)
sb_rear = rect(0, 165, 110, 190)
odraw.rectangle(sb_rear, fill=(204, 68, 68, 30))

img.paste(Image.alpha_composite(Image.new('RGBA', img.size, (0,0,0,0)), overlay), (0, 0), overlay)

# Setback labels
draw.text((px(50, 17)[0], px(50, 17)[1]), "35' FRONT SETBACK", fill='#cc4444', font=F12)
draw.text((px(1, 100)[0], px(1, 100)[1]), "15'", fill='#cc4444', font=F10)
draw.text((px(97, 100)[0], px(97, 100)[1]), "15'", fill='#cc4444', font=F10)
draw.text((px(50, 172)[0], px(50, 172)[1]), "25' REAR SETBACK", fill='#cc4444', font=F12)

# Setback dashed lines (at the buildable zone edges)
for u_val in [35, 165]:  # front, rear
    y = px(0, u_val)[1]
    for x in range(LOT_L, LOT_L + LOT_W_PX, 14):
        draw.line([(x, y), (x+7, y)], fill='#cc4444', width=1)
for v_val in [15, 95]:  # sides
    x = px(v_val, 0)[0]
    for y in range(LOT_T, LOT_T + LOT_H_PX, 14):
        draw.line([(x, y), (x, y+7)], fill='#cc4444', width=1)

# ── BOUNDARY LABELS ───────────────────────────────────────────────
draw.text((LOT_L + 150, LOT_T + 10), "NATURE PRESERVE (Town of East Hampton)", fill='#2d8a2d', font=F14)
draw.text((LOT_L + LOT_W_PX + 15, LOT_T + LOT_H_PX//2 - 60), "N\nA\nT\nU\nR\nE\n \nP\nR\nE\nS\nE\nR\nV\nE", fill='#2d8a2d', font=F12)

# Dimensions
draw.text((LOT_L + LOT_W_PX//2 - 25, LOT_T + LOT_H_PX - 25), "110.00'", fill='#666', font=F16)
draw.text((LOT_L + LOT_W_PX//2 - 25, LOT_T - 25), "111.38'", fill='#666', font=F16)
draw.text((LOT_L + 5, LOT_T + LOT_H_PX//2), "190.37'", fill='#666', font=F14)
draw.text((LOT_L + LOT_W_PX - 70, LOT_T + LOT_H_PX//2), "207.84'", fill='#666', font=F14)

# ── NORTH ARROW ───────────────────────────────────────────────────
nax = LOT_L + LOT_W_PX - 60
nay = LOT_T + 60
draw.line([(nax, nay + 45), (nax, nay)], fill='#555', width=3)
draw.polygon([(nax, nay - 12), (nax - 8, nay + 4), (nax + 8, nay + 4)], fill='#555')
draw.text((nax - 6, nay - 32), "N", fill='#555', font=F24)

# ══════════════════════════════════════════════════════════════════
# STRUCTURES
# ══════════════════════════════════════════════════════════════════

# ── HOUSE ─────────────────────────────────────────────────────────
# 2-story (south/lower, wider): v=30→65, u=42→70
r2 = rect(30, 42, 65, 70)
draw.rectangle(r2, fill='#e8e4de', outline='#555', width=2)
draw.text(((r2[0]+r2[2])//2-30, (r2[1]+r2[3])//2-8), "2-STORY", fill='#555', font=F18)

# 1-story (north/upper, extends further west): v=22→55, u=70→95
r1 = rect(22, 70, 55, 95)
draw.rectangle(r1, fill='#e8e4de', outline='#555', width=2)
draw.text(((r1[0]+r1[2])//2-28, (r1[1]+r1[3])//2-8), "1-STORY", fill='#555', font=F18)

# Brick porch (south of 2-story): v=35→58, u=38→42
rp = rect(35, 38, 58, 42)
draw.rectangle(rp, fill='#d8c8b8', outline='#999', width=1)
draw.text(((rp[0]+rp[2])//2-42, (rp[1]+rp[3])//2-6), "BRICK PORCH", fill='#888', font=F10)

# Front door
door = px(46, 39)
draw.rectangle([door[0]-10, door[1]-5, door[0]+10, door[1]+5], fill='#8B4513', outline='#5a2d0c')
draw.text((door[0]-14, door[1]+8), "ENTRY", fill='#8B4513', font=F12)

# RESIDENCE label
draw.text(((r1[0]+r2[2])//2-55, (r2[1]+r2[3])//2-45), "RESIDENCE", fill='#444', font=F24)
draw.text(((r1[0]+r2[2])//2-95, (r2[1]+r2[3])//2-20), "3,424 sf · 5 bed / 4.5 bath", fill='#777', font=F14)

# Chimney
ch = px(42, 69)
draw.rectangle([ch[0]-5, ch[1]-5, ch[0]+5, ch[1]+5], fill='#999', outline='#666')

# ── POOL — East of house, LEFT of pond ────────────────────────────
# Pool: v=58→72, u=75→100 (between house and east boundary, north of 2-story)
pool_r = rect(58, 75, 72, 100)
draw.rectangle(pool_r, fill='#b8d4e8', outline='#7ba7c9', width=2)
draw.text(((pool_r[0]+pool_r[2])//2-18, (pool_r[1]+pool_r[3])//2-8), "POOL", fill='#4a7a9a', font=F18)

# ── POND — NE corner, RIGHT of pool ──────────────────────────────
# Pond: centered at v=82, u=110
pond_c = px(82, 115)
draw.ellipse([pond_c[0]-45, pond_c[1]-30, pond_c[0]+45, pond_c[1]+30], fill='#c5dae8', outline='#8bb5cc', width=1)
draw.text((pond_c[0]-18, pond_c[1]-8), "Pond", fill='#5a8aaa', font=F18)

# Stone wall between pool and pond
sw1, sw2 = px(70, 103), px(78, 112)
draw.line([sw1, sw2], fill='#888', width=2)
draw.text((sw1[0]-55, sw1[1]+3), "Stone Wall", fill='#999', font=F10)

# ── BURIED PROPANE — North of 1-story ─────────────────────────────
lpg = px(30, 100)
draw.ellipse([lpg[0]-10, lpg[1]-10, lpg[0]+10, lpg[1]+10], outline='#e8a020', width=1)
draw.text((lpg[0]-10, lpg[1]+12), "LPG", fill='#c08020', font=F10)

# ── TREES — Inside old horseshoe (west of house, ~22' from boundary) ─
# Trees are between the driveway arms, roughly v=22 (same as house west face)
for u_pos, r in [(32, 48), (62, 40)]:
    tc = px(22, u_pos)
    draw.ellipse([tc[0]-r, tc[1]-r, tc[0]+r, tc[1]+r], fill='#c8e8c8', outline='#5a9a5a', width=1)
    draw.ellipse([tc[0]-r//2, tc[1]-r//2, tc[0]+r//2, tc[1]+r//2], fill='#a8d8a8')
    draw.ellipse([tc[0]-6, tc[1]-6, tc[0]+6, tc[1]+6], fill='#5a4a3a', outline='#4a3a2a')
    draw.text((tc[0]-30, tc[1]+r+4), "PRESERVE", fill='#2d6a2d', font=F10)

# ══════════════════════════════════════════════════════════════════
# EXISTING DRIVEWAY — Horseshoe, west of house
# ══════════════════════════════════════════════════════════════════
# West arm: v≈17 (~17' from boundary), going from u=5 north to u=80
drive_w = [px(17, u) for u in range(5, 82, 3)]
# Top curve: v=17 to v=30 at u≈82
drive_t = [px(v, 82) for v in range(17, 32, 2)]
# East arm: v≈30, going from u=82 south to u=30
drive_e = [px(30, u) for u in range(82, 28, -3)]
# Bottom of U: v=30 back to v=17 at u≈28, sweeping across front of house
drive_b = [px(v, 28) for v in range(30, 16, -2)]
drive_all = drive_w + drive_t + drive_e + drive_b

for i in range(0, len(drive_all)-1, 2):
    if i+1 < len(drive_all):
        draw.line([drive_all[i], drive_all[i+1]], fill='#cc3333', width=5)

dlbl = px(3, 52)
draw.text((dlbl[0]-15, dlbl[1]-5), "EXISTING", fill='#cc3333', font=F12)
draw.text((dlbl[0]-15, dlbl[1]+12), "DRIVEWAY", fill='#cc3333', font=F12)
draw.text((dlbl[0]-20, dlbl[1]+28), "(TO REMOVE)", fill='#cc3333', font=F10)

# ══════════════════════════════════════════════════════════════════
# PROPOSED LAYOUT (Option A)
# ══════════════════════════════════════════════════════════════════

# ── Parking court: v=26→62, u=18→36 (in front of house) ──────────
court = rect(26, 18, 62, 36)
draw.rectangle(court, fill='#f0e6d4', outline='#d4a030', width=3)
ccx, ccy = (court[0]+court[2])//2, (court[1]+court[3])//2
draw.text((ccx-60, ccy-16), "PARKING COURT", fill='#8a6a20', font=F18)
draw.text((ccx-28, ccy+6), "3–4 cars", fill='#a08040', font=F14)

# ── Entrance from road: v=40→50, u=0→18 ──────────────────────────
ent = rect(38, 0, 52, 18)
draw.rectangle(ent, fill='#f0e6d4', outline='#d4a030', width=2)
draw.text((px(38, 9)[0]+5, px(38, 9)[1]-8), "18' ENTRANCE", fill='#8a6a20', font=F12)
# Arrow
ax = (ent[0]+ent[2])//2
draw.line([(ax, ent[3]-5), (ax, ent[1]+5)], fill='#d4a030', width=3)
draw.polygon([(ax, ent[1]+2), (ax-6, ent[1]+12), (ax+6, ent[1]+12)], fill='#d4a030')

# ── Drive lane: from court to garage ──────────────────────────────
lane = [px(26, 36), px(24, 42), px(22, 48), px(22, 54)]
for i in range(len(lane)-1):
    draw.line([lane[i], lane[i+1]], fill='#d4a030', width=8)
draw.text((lane[1][0]-65, lane[1][1]-8), "drive lane", fill='#8a6a20', font=F10)

# ── Detached garage: v=16→28, u=50→62 (between trees, inside buildable zone) ─
# 10' accessory setback from west boundary = v≥10. Placed at v=16 for clearance.
gar = rect(16, 50, 28, 62)
draw.rectangle(gar, fill='#f0e6d4', outline='#d4a030', width=3)
gcx, gcy = (gar[0]+gar[2])//2, (gar[1]+gar[3])//2
draw.text((gcx-32, gcy-20), "DETACHED", fill='#8a6a20', font=F14)
draw.text((gcx-25, gcy-4), "GARAGE", fill='#8a6a20', font=F14)
draw.text((gcx-18, gcy+14), "576 sf", fill='#a08040', font=F12)
# Garage doors (face south toward drive lane)
draw.line([(gar[0]+6, gar[3]), (gcx-4, gar[3])], fill='#444', width=4)
draw.line([(gcx+4, gar[3]), (gar[2]-6, gar[3])], fill='#444', width=4)

# ── EV conduit ────────────────────────────────────────────────────
ev1, ev2 = px(22, 72), px(22, 62)
for i in range(0, 20, 2):
    t1, t2 = i/20, (i+1)/20
    draw.line([(int(ev1[0]+(ev2[0]-ev1[0])*t1), int(ev1[1]+(ev2[1]-ev1[1])*t1)),
               (int(ev1[0]+(ev2[0]-ev1[0])*t2), int(ev1[1]+(ev2[1]-ev1[1])*t2))], fill='#e8a020', width=2)
draw.text(((ev1[0]+ev2[0])//2-35, (ev1[1]+ev2[1])//2-12), "EV CONDUIT", fill='#c08020', font=F10)

# ══════════════════════════════════════════════════════════════════
# SCALE BAR & LEGEND
# ══════════════════════════════════════════════════════════════════
sb_x = LOT_L + LOT_W_PX - 260
sb_y = LOT_T + LOT_H_PX + 90
sb_30 = int(30 * SC)
draw.line([(sb_x, sb_y), (sb_x + sb_30, sb_y)], fill='#666', width=2)
draw.line([(sb_x, sb_y-5), (sb_x, sb_y+5)], fill='#666', width=2)
draw.line([(sb_x+sb_30, sb_y-5), (sb_x+sb_30, sb_y+5)], fill='#666', width=2)
draw.text((sb_x + sb_30//2 - 15, sb_y + 8), "30 ft", fill='#666', font=F14)

# Legend
ly = LOT_T + LOT_H_PX + 130
draw.text((LOT_L, ly), "LEGEND", fill='#333', font=F18)
items = [
    ('#e8e4de', '#555', "Existing structure"),
    ('#f0e6d4', '#d4a030', "Proposed (Option A)"),
    ('#c8e8c8', '#5a9a5a', "Preserved trees"),
    ('#b8d4e8', '#7ba7c9', "Water features"),
]
for i, (f, o, l) in enumerate(items):
    bx, by = LOT_L + (i % 2) * 350, ly + 30 + (i // 2) * 28
    draw.rectangle([bx, by, bx+20, by+16], fill=f, outline=o, width=1)
    draw.text((bx+28, by-1), l, fill='#555', font=F14)

# Driveway + setback legend
draw.line([(LOT_L, ly+90), (LOT_L+25, ly+90)], fill='#cc3333', width=4)
draw.text((LOT_L+32, ly+84), "Existing driveway (to remove)", fill='#555', font=F14)

# Setback zone
draw.rectangle([LOT_L+350, ly+84, LOT_L+370, ly+100], fill='#f5dddd', outline='#cc4444', width=1)
draw.text((LOT_L+378, ly+84), "Setback zone (no building)", fill='#555', font=F14)

# Road
draw.rectangle([LOT_L, ly+110, LOT_L+25, ly+125], fill='#d5d0c8', outline='#b0aa9e', width=1)
draw.text((LOT_L+32, ly+110), "Public road", fill='#555', font=F14)

# ══════════════════════════════════════════════════════════════════
# SAVE
# ══════════════════════════════════════════════════════════════════
out = '/Users/vikramclaw/claude-workspace/projects/36-squires/site_plan_option_a.png'
img.save(out, quality=95)
print(f"Saved: {out} ({W}x{H})")
