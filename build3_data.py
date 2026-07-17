#!/usr/bin/env python3
"""Wissenschaftsbarometer dashboard v3 — data pipeline (trendfile, waves 2016-2025)."""
import pyreadstat, json, re, os
from collections import Counter

HERE=os.path.dirname(os.path.abspath(__file__))
TREND=os.environ.get("WB_TREND","/mnt/user-data/uploads/WB_trendfile_2016_2025_DE_FINAL.sav")
SEG  =os.environ.get("WB_SEG","/mnt/user-data/uploads/243308_Wissbaro_Kundenfile_cleaned_segments.sav")
strip=lambda s:re.sub('<[^>]+>','',str(s)).replace('\xa0',' ').strip()

df,meta=pyreadstat.read_sav(TREND,apply_value_formats=False)
N=len(df); print("rows:",N)
WAVEYR={1:2016,2:2019,3:2020,4:2022,5:2025}
wave=[int(x) for x in df['welle']]
years=[WAVEYR[w] for w in wave]

# ---- variable curation ----
DEMO_TECH={'welle','jahr','modus','gewicht','ballot','quelle25','geschl','alter','jahrg','bildung','relig',
 'polor','sprache','plz','kanton','sprachreg','partei','hhgr','wemf_reg','grossregionen','agglomerationsgroesse',
 'wissbez_beruf','wissbez_familie','wissbez_kennt','wissbez_selbst'}
EXCL={'w16_beruf','w16_bildwissenschaft_ka','w16_bildwissenschaft_kommentar','w16_bildwissenschaft_kommentaranderes',
 'w16_datum','w16_geburtsland','w16_geburtsland_ko','w16_haushaltssituation','w16_ortsgroesse','w16_ortsgroesse_ag',
 'w16_siedlungsart','w16_stimmberechtig','w16_studienfach_ka','w16_studienfach_kommentar','w16_studienfach_kommentaranderes',
 'w16_wemf','w19_anzahl_personenhh','w19_ortsgroesse','w19_stadtland','w20_ortsgroesse','w20_stadtland',
 'w20_cov_betreuungs_che','w20_cov_betreuungs_che_2','w20_cov_betroffenheit','w20_cov_betroffenheit_2',
 'w22_gemeindetypo','w22_religionszugeh','w22_siedlungsart','w22_altquelle_ka','w22_altquelle_kommentar',
 'w22_desinfo_weissnicht','w25_einkommen','w25_siedlungsart','w25_subjschicht'}
cand=[c for c in meta.column_names if c not in DEMO_TECH and c not in EXCL]

def valkeys(c):
    s=meta.variable_to_label.get(c); d=meta.value_labels.get(s,{}) if s else {}
    return set(int(k) for k in d)
def scale_of(c):
    ks=valkeys(c)
    lab=strip(meta.column_names_to_labels.get(c,'')).lower()
    base=c.lower().split('_',1)[-1] if re.match(r'^w\d\d_',c) else c.lower()
    if ks=={1,2,3,4,98} or ks=={1,2,3,4,99} or ks=={1,2,3,4,98,99}: return 'know4',4
    if 7 in ks and 6 in ks and 5 in ks: return 'lr7',7
    if ks=={1,2,3,4,5,6}: return 'accept5',5           # 6 = DK (attackperc)
    # 5-point families by name/label
    if 'attackperc' in c: return 'accept5',5
    if c.startswith('w16_mot_'): return 'importance5',5
    if c.startswith('w20_cov_ver_'): return 'trust5',5
    if c.startswith(('w20_cov_med','w20_cov_socmed','w20_cov_kinder')) or c=='w20_cov_youtube': return 'freq5',5
    if c.startswith(('w22_altquelle_','w22_alternative')): return 'freq5',5
    if c=='aufmerksamkeit' or c=='w20_cov_aufmerksamkeit': return 'attention5',5
    if base.startswith(('med_','socmed_','nmm_','vermeidung','desinfo','alternative','fernsehen','podcasts')) or 'ki_nutzung' in c:
        return 'freq5',5
    if base.startswith(('vert_','ver_','meti_')) or c in('w25_ki_ver','w25_ki_ver_forschung'): 
        return ('meti5',5) if 'meti' in c else ('trust5',5)
    if base.startswith('int_') or c=='w25_int_ki' or base.startswith('fth_'): return 'intensity5',5
    if c=='bewmed_zufried': return 'satis5',5
    return 'agree5',5

# sections
def sec_of(c):
    b=c.lower()
    if b in('int_wiss','int_pol','int_wirt','int_sport','int_schicks') or b.startswith('w16_int_'): return 'interest'
    if b.startswith('fth_') or c=='w25_int_ki': return 'themes'
    if b.startswith(('vert_','w16_vert','w22_vert','w25_ver_')) or c in('w25_ki_ver','w25_ki_ver_forschung') or b.startswith('w19_meti'): return 'trust'
    if b.startswith(('ziel_','resprom_')) or c in('w16_ziel_oefftlmeinung','w16_ziel_volksabstimmung','w25_zukunft'): return 'attitudes'
    if b.startswith(('med_','w16_med_','w25_med_','bewmed','w16_bewmed')) or c in('w25_fernsehen_inkl','w25_podcasts','aufmerksamkeit'): return 'sources'
    if b.startswith(('socmed','nmm_','w16_nmm','w25_socmed','w25_vermeidung')): return 'activities'
    if b.startswith(('scilit','w16_scilit','w22_scilit','w25_scilit','self_','hsm_','w16_hsm','w25_norms')): return 'literacy'
    if b.startswith('w25_ki'): return 'ai'
    if b.startswith(('w25_attack','w25_polorwiss')): return 'criticism'
    if b.startswith(('scipop','w19_scipop')): return 'populism'
    if b.startswith('w20_'): return 'covid'
    if b.startswith(('w22_desinfo','w22_alternative','w22_altquelle')): return 'desinfo'
    if b.startswith('w16_pseudo'): return 'pseudo'
    if b.startswith('w16_mot_'): return 'motive'
    if b.startswith('w19_verdrossen'): return 'verdrossen'
    return 'other'

VARS={}; META={}
for c in cand:
    sk,npn=scale_of(c)
    col=df[c]
    enc=[]
    for x in col:
        if x!=x: enc.append('0'); continue
        v=int(x)
        if sk=='accept5' and v==6: enc.append('0'); continue
        enc.append(str(v) if 1<=v<=npn else '0')
    s=''.join(enc)
    wv=sorted({years[i] for i,ch in enumerate(s) if ch!='0'})
    if not wv: 
        print("  drop (no data):",c); continue
    sec=sec_of(c)
    if sec=='other': print("  WARN unsectioned:",c)
    META[c]={'scale':sk,'np':npn,'sec':sec,'waves':wv,'de':strip(meta.column_names_to_labels.get(c,''))}
    VARS[c]=s
print("chartable vars:",len(VARS),"| by sec:",dict(Counter(m['sec'] for m in META.values())))
print("trend-capable (>=2 waves):",sum(1 for m in META.values() if len(m['waves'])>1))

# ---- demographics ----
def col(name): return df[name] if name in df else None
def enc_map(series,mp,cond=None):
    out=[]
    for i,x in enumerate(series):
        if cond is not None and not cond[i]: out.append('0'); continue
        if x!=x: out.append('0'); continue
        out.append(str(mp.get(int(x),0)))
    return ''.join(out)

is5=[w==5 for w in wave]
lang=[]
sr=df['sprachreg']; sp=df['sprache']
for i in range(N):
    v = sp.iloc[i] if is5[i] else sr.iloc[i]
    lang.append(str(int(v)) if v==v and 1<=int(v)<=3 else '0')
lang=''.join(lang)
gender=enc_map(df['geschl'],{1:1,2:2,3:3})
age=''.join('0' if a!=a else ('1' if a<35 else '2' if a<55 else '3') for a in df['alter'])
edu=enc_map(df['bildung'],{1:1,2:1,3:2,4:2,5:2,6:2,7:3,8:3,9:3,10:3})
pol=enc_map(df['polor'],{1:1,2:1,3:1,4:2,5:3,6:3,7:3})
# --- party: per-wave code schemes (verified against the original 2016/2022/2025 files) ---
# unified ids: 1 svp,2 sp,3 fdp,4 mitte,5 cvp,6 bdp,7 gruene,8 glp,9 evp,10 edu,11 lega,12 mcg,
# 13 csp,14 pda,15 sol,16 al,17 piraten,18 gb,19 ldp,20 lps,21 sd,22 adg,23 andere/mehrere,24 keine,25 wn(2025)
P16={1:6,2:13,3:5,4:10,5:9,6:3,7:18,8:8,9:7,10:11,11:20,12:14,13:21,14:2,15:1,16:22,20:23,80:23,85:24,90:24,91:24}
P22={1:4,2:13,3:4,4:4,5:10,6:9,7:3,8:18,9:8,10:7,11:11,12:12,13:20,14:19,15:14,16:15,17:16,18:21,19:2,20:1,21:22,22:17,23:23,24:23,25:24,26:24}
P25={1:1,2:2,3:3,4:4,5:7,6:9,7:11,8:13,9:8,10:16,11:10,12:17,13:12,14:23,15:24,16:23,17:25}
B36='0123456789abcdefghijklmnopqrstuvwxyz'
party=[]
for i in range(N):
    x=df['partei'].iloc[i]; w=wave[i]
    if x!=x: party.append('0'); continue
    mp=P16 if w==1 else (P22 if w==4 else (P25 if w==5 else None))
    party.append(B36[mp.get(int(x),0)] if mp else '0')
party=''.join(party)
urban=[]
u19=col('w19_stadtland'); u20=col('w20_stadtland'); u22=col('w22_siedlungsart')
for i in range(N):
    w=wave[i]; v=None
    if w==2 and u19 is not None: v=u19.iloc[i]; mp={1:1,2:2,3:1,4:3}
    elif w==3 and u20 is not None: v=u20.iloc[i]; mp={1:1,2:2,3:1,4:3}
    elif w==4 and u22 is not None: v=u22.iloc[i]; mp={1:1,2:2,3:3}
    else: urban.append('0'); continue
    urban.append(str(mp.get(int(v),0)) if v==v else '0')
urban=''.join(urban)

# segment merge (wave 5, positional — verified age & gender match 100%)
seg=['0']*N
d2,m2=pyreadstat.read_sav(SEG,apply_value_formats=False)
idx5=[i for i in range(N) if is5[i]]
assert len(idx5)==len(d2), "wave5 rows != segments rows"
aok=sum(1 for k,i in enumerate(idx5) if (df['alter'].iloc[i]!=df['alter'].iloc[i] and d2['alter'].iloc[k]!=d2['alter'].iloc[k]) or df['alter'].iloc[i]==d2['alter'].iloc[k])
print("segment merge age agreement:",aok,"/",len(idx5))
assert aok==len(idx5)
for k,i in enumerate(idx5):
    v=d2['cluster_lg'].iloc[k]
    if v==v: seg[i]=str(int(v))
seg=''.join(seg)

out={'n':N,
 'wave':''.join(str(w) for w in wave),
 'weights':[round(float(x),3) for x in df['gewicht']],
 'demo':{'lang':lang,'gender':gender,'age':age,'edu':edu,'pol':pol,'party':party,'urban':urban,'segment':seg},
 'vars':VARS,'meta':META}
json.dump(out,open(os.path.join(HERE,'data3.json'),'w'),ensure_ascii=False,separators=(',',':'))
print("data3.json kB:",round(os.path.getsize(os.path.join(HERE,'data3.json'))/1024))

# validation
import numpy as np
W=out['weights']
def trend_strong(code,thresh=4):
    res={}
    s=VARS[code]
    for wv,yy in WAVEYR.items():
        num=den=0
        for i in range(N):
            if wave[i]!=wv or s[i]=='0': continue
            w=W[i]; den+=w
            if int(s[i])>=thresh: num+=w
        if den: res[yy]=round(num/den*100,1)
    return res
print("vert_wiss strong:",trend_strong('vert_wiss'))
print("int_wiss waves:",META['int_wiss']['waves'])
print("scipop_verstand strong:",trend_strong('scipop_verstand'))
