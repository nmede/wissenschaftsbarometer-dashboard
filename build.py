#!/usr/bin/env python3
"""Wissenschaftsbarometer 2025 -> compact JSON for the dashboard.
Filter source in {2,3} (cross-sectional), weight = gewdef_red, strip HTML
from labels, recode demographics, export microdata + metadata."""
import pyreadstat, json, re, numpy as np

SAV = '/mnt/user-data/uploads/243308_Wissbaro_Kundenfile_cleaned.sav'
df, meta = pyreadstat.read_sav(SAV, apply_value_formats=False)
strip = lambda s: re.sub('<[^>]+>', '', str(s)).replace('\xa0',' ').strip()

# --- cross-sectional only ---
d = df[df['source'].isin([2, 3])].reset_index(drop=True)
W = d['gewdef_red'].astype(float).tolist()
N = len(d)
assert N == 1548, N

DK = {98, 6, 99}                      # don't-know / no-answer codes -> null
def col5(name):                       # 1..5 item, DK/missing -> None
    out = []
    for v in d[name]:
        out.append(int(v) if (v == v and int(v) in (1,2,3,4,5)) else None)
    return out

# --- substantive variables grouped by brochure section ---
SCALE = {}   # var -> scale id
SEC   = {}   # var -> section id
def reg(names, scale, sec):
    for n in names: SCALE[n] = scale; SEC[n] = sec

reg(['f1'], 'intensity5', 'interest')
reg([f'f2_{i}' for i in range(1,8)], 'intensity5', 'themes')
reg(['f3_1','f3_3','f3_5','f3_6','f5_2','f5_4','f5_5','f5_6','f5_7','f5_8','f5_9'], 'freq5', 'media')
reg(['f7_1','f7_2','f7_3','f7_4','f7_5'], 'freq5', 'nonmedia')
reg(['f4'], 'satis5', 'media')
reg(['f9_1','f9_2','f9_3','f9_4','f9_5','f9_6','f9_8'], 'agree5', 'attitudes')
reg(['f10_1','f10_2','f10_3','f10_4','f10_7','f10_8','f10_9'], 'agree5', 'attitudes')
reg(['f11_1','f11_2','f11_3','f11_4','a4'], 'trust5', 'trust')
reg(['a1'], 'freq5', 'ai')
reg(['a6b_1','a6b_2','a6b_3'], 'agree5', 'ai')
reg([f'b3_{i}' for i in range(1,10)], 'accept5', 'criticism')
reg(['b5_2','b5_3','b5_5'], 'agree5', 'society')

VARS = {v: col5(v) for v in SCALE}

# --- demographics (recoded to compact codes) ---
def recode(name, mapping):
    return [mapping.get(int(v), None) if v == v else None for v in d[name]]

demo = {
 'sprache': recode('sprache', {1:1,2:2,3:3}),                 # DCH/FCH/ICH
 'gender' : recode('s11', {1:1,2:2,3:3}),                     # m/w/divers
 'age'    : recode('alter_gruppiert', {1:1,2:2,3:3}),
 'edu'    : recode('bildung_gruppiert', {1:1,2:2,3:3}),
 'urban'  : recode('agglo2020', {1:1,2:2,3:3}),
 'pol'    : recode('f20_1', {1:1,2:1,3:1,4:2,5:3,6:3,7:3}),   # links/Mitte/rechts
 'party'  : recode('f21', {1:1,2:2,3:3,4:4,5:5,9:6,            # SVP SP FDP Mitte GRÜNE GLP
                           6:7,7:7,8:7,10:7,11:7,12:7,13:7,14:7, 15:8}),  # andere / keine
}

# --- historical trust series (high/very high trust f11>=4). 2025 from data;
#     earlier waves are EDITABLE placeholders to confirm against the time band. ---
w = np.array(W); f11 = np.array([x if x else 0 for x in VARS['f11_2']])
base = np.array([1 if x else 0 for x in VARS['f11_2']])
hi2025 = round(float((w*((f11>=4)&(base>0))).sum() / (w*base).sum())*100, 1)
trend = [{"year":"2016","val":None},{"year":"2019","val":None},
         {"year":"2020","val":None},{"year":"2022","val":None},
         {"year":"2025","val":hi2025}]

out = {
  "n": N, "weights": [round(x,4) for x in W],
  "demo": demo, "vars": VARS,
  "meta": {v: {"scale": SCALE[v], "sec": SEC[v],
               "de": strip(meta.column_names_to_labels.get(v,''))} for v in SCALE},
  "trend": trend,
}
json.dump(out, open('/home/claude/wb/wb_data.json','w'), ensure_ascii=False)

# ---------------- validation ----------------
def wpct(codes, sel):
    num = sum(W[i] for i,c in enumerate(codes) if c is not None and c in sel)
    den = sum(W[i] for i,c in enumerate(codes) if c is not None)
    return round(num/den*100,1)
def wmean(codes):
    num = sum(W[i]*c for i,c in enumerate(codes) if c is not None)
    den = sum(W[i] for i,c in enumerate(codes) if c is not None)
    return round(num/den,2)
print("N =", N, "| file kB:", round(len(json.dumps(out))/1024))
print("Vertrauen f11_2 stark/sehr stark (4+5):", wpct(VARS['f11_2'],{4,5}), "(Broschüre 60%)")
print("KI-Nutzung a1 'nie' (1):", wpct(VARS['a1'],{1}), "(Broschüre ~1/3)")
print("a6b_1 Schweiz braucht eigene KI (4+5):", wpct(VARS['a6b_1'],{4,5}), "(Broschüre 71%)")
print("Means p5: f1=%.2f f10_2=%.2f f10_7=%.2f f9_1=%.2f (Broschüre 3.34/3.83/2.73/4.01)"
      % (wmean(VARS['f1']),wmean(VARS['f10_2']),wmean(VARS['f10_7']),wmean(VARS['f9_1'])))
print("Media means: TV f3_1=%.2f Zeitung f3_5=%.2f Wikipedia f5_6=%.2f KI f5_9=%.2f"
      % (wmean(VARS['f3_1']),wmean(VARS['f3_5']),wmean(VARS['f5_6']),wmean(VARS['f5_9'])))
print("b3 means: Fehler=%.2f Beleidigung=%.2f Gewaltandrohung=%.2f koerperl.=%.2f"
      % (wmean(VARS['b3_1']),wmean(VARS['b3_5']),wmean(VARS['b3_6']),wmean(VARS['b3_7'])))
print("a1 n (split):", sum(1 for x in VARS['a1'] if x is not None),
      "| b3_1 n (split):", sum(1 for x in VARS['b3_1'] if x is not None))
