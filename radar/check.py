"""Sanity-check tech_radar.json against the values BYOR expects (see README)."""

import json
import sys
from collections import Counter
from pathlib import Path

RINGS = {"use", "learn", "evaluate", "hold"}
QUADRANTS = {"tools", "languages & frameworks", "platforms", "techniques"}
IS_NEW = {"TRUE", "FALSE"}
FIELDS = {"name", "ring", "quadrant", "isNew", "description"}

path = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).with_name("tech_radar.json"))
entries = json.loads(path.read_text(encoding="utf-8"))

errors = []
for i, entry in enumerate(entries):
    label = f"#{i} ({entry.get('name', '?')})"
    if set(entry) != FIELDS:
        errors.append(f"{label}: fields {sorted(entry)}, expected {sorted(FIELDS)}")
    if not str(entry.get("name", "")).strip():
        errors.append(f"{label}: empty name")
    if entry.get("ring") not in RINGS:
        errors.append(f"{label}: invalid ring {entry.get('ring')!r}")
    if entry.get("quadrant") not in QUADRANTS:
        errors.append(f"{label}: invalid quadrant {entry.get('quadrant')!r}")
    if entry.get("isNew") not in IS_NEW:
        errors.append(f"{label}: invalid isNew {entry.get('isNew')!r}")

for name, count in Counter(e.get("name") for e in entries).items():
    if count > 1:
        errors.append(f"duplicate name {name!r} ({count}x)")

for error in errors:
    print(error)
print(f"{path}: {len(entries)} entries, {len(errors)} errors")
sys.exit(1 if errors else 0)
