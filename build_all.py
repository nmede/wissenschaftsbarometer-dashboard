#!/usr/bin/env python3
"""
Wissenschaftsbarometer Schweiz 2025 — Dashboard build script.
Rebuilds data2.json from the SPSS file and assembles the self-contained index.html
(template2.html + translations.js + data2.json + logo).

Usage:  python3 build_all.py
Requires: pyreadstat, numpy, pillow   (pip install pyreadstat numpy pillow)
"""
import pyreadstat, json, re, base64, os
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
SAV  = os.environ.get("WB_SAV", "/mnt/user-data/uploads/243308_Wissbaro_Kundenfile_cleaned_segments.sav")
LOGO = os.environ.get("WB_LOGO","/mnt/user-data/uploads/WiB_Logo.png")

strip = lambda s: re.sub('<[^>]+>', '', str(s)).replace('\xa0', ' ').strip()

def build_data():
    df, meta = pyreadstat.read_sav(SAV, apply_value_formats=False)
    if 'source' in df:                       # keep cross-sectional sample (defensive; file is already 1548)
        df = df[df['source'].isin([2, 3])].reset_index(drop=True)
    N = len(df)
    W = df['gewdef_red'].astype(float).tolist()

    names = meta.column_names
    block = names[names.index('f1'):names.index('b5_7') + 1]
    block = [v for v in block if v != 'f8']  # drop attention-check trap

    def sig(v):
        setn = meta.variable_to_label.get(v); vl = meta.value_labels.get(setn, {}) if setn else {}
        return set(int(k) for k in vl)

    def scale_of(v):
        s = sig(v)
        if s == {1, 2, 3, 4, 98}:             return 'know4', 4
        if s == {1, 2, 3, 4, 5, 6, 7, 98}:    return 'lr7', 7
        if v == 'f1' or v.startswith('f2_'):  return 'intensity5', 5
        if v == 'f4':                         return 'satis5', 5
        if v.startswith(('f3_','f5_','f6_','f7_','b1_')) or v == 'a1': return 'freq5', 5
        if v.startswith('f11_') or v == 'a4': return 'trust5', 5
        if v.startswith('b3_'):               return 'accept5', 5
        return 'agree5', 5

    SEC = {}
    def setsec(prefs, sec):
        for v in block:
            if any(v == p or v.startswith(p) for p in prefs): SEC[v] = sec
    setsec(['f1'], 'interest');            setsec(['f2_'], 'themes')
    setsec(['f11_', 'a4'], 'trust');       setsec(['f9_', 'f10_'], 'attitudes')
    setsec(['f3_', 'f4', 'f5_'], 'media'); setsec(['f6_', 'f7_'], 'participation')
    setsec(['f12_', 'f13_'], 'literacy')
    setsec(['a1', 'a2_', 'a3_', 'a5a', 'a5b', 'a6a', 'a6b'], 'ai')
    setsec(['b1_', 'b2_', 'b3_', 'b4_'], 'criticism'); setsec(['b5_'], 'populism')

    VARS, META = {}, {}
    for v in block:
        sk, npn = scale_of(v)
        VARS[v] = [int(x) if (x == x and 1 <= int(x) <= npn) else None for x in df[v]]
        META[v] = {'scale': sk, 'np': npn, 'sec': SEC.get(v, 'other'),
                   'de': strip(meta.column_names_to_labels.get(v, ''))}

    def rc(name, mp):
        return [mp.get(int(x), None) if x == x else None for x in df[name]]
    demo = {
        'sprache': rc('sprache', {1:1,2:2,3:3}), 'gender': rc('s11', {1:1,2:2,3:3}),
        'age': rc('alter_gruppiert', {1:1,2:2,3:3}), 'edu': rc('bildung_gruppiert', {1:1,2:2,3:3}),
        'urban': rc('agglo2020', {1:1,2:2,3:3}),
        'pol': rc('f20_1', {1:1,2:1,3:1,4:2,5:3,6:3,7:3}),
        'party': rc('f21', {1:1,2:2,3:3,4:4,5:5,9:6,6:7,7:7,8:7,10:7,11:7,12:7,13:7,14:7,15:8}),
        'segment': rc('cluster_lg', {1:1,2:2,3:3,4:4}),
    }
    out = {'n': N, 'weights': [round(x, 4) for x in W], 'demo': demo, 'vars': VARS, 'meta': META}
    json.dump(out, open(os.path.join(HERE, 'data2.json'), 'w'), ensure_ascii=False)
    print(f"data2.json: n={N}, {len(VARS)} vars, scales={dict(Counter(m['scale'] for m in META.values()))}")
    return out

def assemble():
    tpl   = open(os.path.join(HERE, 'template2.html')).read()
    data  = open(os.path.join(HERE, 'data2.json')).read()
    trans = open(os.path.join(HERE, 'translations.js')).read()
    b64   = base64.b64encode(open(LOGO, 'rb').read()).decode()
    html  = (tpl.replace('__WB_DATA__', data)
                .replace('/* __WB_TRANSLATIONS__ */', trans)
                .replace('__WB_LOGO__', 'data:image/png;base64,' + b64))
    open(os.path.join(HERE, 'index.html'), 'w').write(html)
    print(f"index.html: {round(len(html)/1024)} kB (self-contained)")

if __name__ == '__main__':
    build_data()
    assemble()
    print("Done. Open index.html in a browser.")
