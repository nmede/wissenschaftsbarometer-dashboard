# CLAUDE.md — Wissenschaftsbarometer Dashboard v3 (trend edition)

## What this is
Self-contained 4-language dashboard `index.html` for the Wissenschaftsbarometer Schweiz,
covering five waves (2016, 2019, 2020 COVID-19-Edition, 2022, 2025) + trend analysis.
Hosted on GitHub Pages, embedded via iframe on wissenschaftsbarometer.ch. User is non-technical.

## Files & pipeline
- `template3.html` = source (HTML/CSS/JS, placeholders __WB_DATA__/__WB_TRANSLATIONS__/__WB_TRANSLATIONS3__/__WB_LOGO__)
- `translations.js` = 2025 wordings keyed by f-codes (f1…b5_7); `translations3.js` = WB_T3
  {alias trendcode→f-code, sec, prefix, stem, blockOf, lab (152 new items), anchors (METI), fullText (vignette)}
- `build3_data.py` reads WB_TREND (.sav) + WB_SEG (segments, merged by row position for wave 5,
  verified vs age+gender) → `data3.json` {n, wave, weights, demo (1-char strings), vars (1-char strings), meta}
- `build_all3.py` assembles `index.html` (env WB_LOGO for the logo)

## Key decisions (user-confirmed)
- Single source of truth = trendfile; old per-wave 2025 file dropped.
- 10 master topics (user's DE headings) + wave-specific topics shown only for their year
  (COVID-19 2020, Desinfo 2022, Pseudowissenschaft/Motive 2016, Medienverdrossenheit 2019).
- Trend = items with ≥2 waves (73); views: stacked dist columns, mean line ±1 SE, top-2 share line;
  connections touching 2020/2025 dashed (mode breaks).
- Compare: max 4 items of one battery; group breakdown disabled during compare.
- Filters: multi-checkbox, OR within dim, AND across dims. Weighted only (no unweighted option).
- Publika der Wissenschaftskommunikation = segment, 2025 only; party 2016/22/25; Siedlungsart 2019/20/22.
- Numbered anchors "1 – … 5 – …" for 5-point scales only (NOT know4, NOT lr7). METI uses pole anchors.
- % labels ≥5% in stacked/diverging/grouped/donut; SE note explains it's not a 95% CI; FR "Erreur standard".
- Share links via URL hash (l,m,y,s,v,c,g,f,d,t,z) + "Link kopieren". m=q|t (tab), z=1 (y-axis zoom).
- v3.1 UI: three tabs (Querschnitt / Trend / Über die Daten; Erhebung dropdown only in Querschnitt);
  Frage row spans full controls width (panel wraps long items); compare = extra "Frage 2..N" dropdown
  rows with X-remove + "+ Frage hinzufügen" (same battery, max 10 total); trend mean/top2 charts have
  point-value annotations and a Y-Achse toggle Volle Skala/Ausschnitt; filter panel width = its button,
  sticky "Zurücksetzen" on top, options in regular case; one-line footer.
- Brand: red #ED1C24, ramp #FCD2C1→#ED1C24, Bebas Neue (headings, ALL CAPS), Univers w/ fallback.

## Party coding (IMPORTANT discovery)
The trendfile `partei` carries the ORIGINAL per-wave codes but only the 2022 value-label set —
labels are WRONG for 2016 and 2025. Verified per-wave schemes (from original .sav files
Wissenschaftsbarometer_2016/2022/2025.sav, uploads):
2016 F30: 1 BDP,2 CSP,3 CVP,4 EDU,5 EVP,6 FDP,7 GB,8 GLP,9 Grüne,10 Lega,11 LPS,12 PdA,13 SD,
14 SP,15 SVP,16 AdG,20 andere,80 mehrere,85/90/91 keine-Varianten.
2022 F44: labels in file are correct (19 SP, 20 SVP, 7 FDP, 4 Mitte, 3 CVP, 1 BDP, 10 Grüne, 9 GLP …).
2025 f21: 1 SVP,2 SP,3 FDP,4 Mitte,5 GRÜNE,6 EVP,7 Lega,8 CSP,9 GLP,10 AL,11 EDU,12 Piraten,
13 MCG,14 andere,15 keine,16 mehrere,17 weiss nicht.
Pipeline maps to unified ids 1-25 (base36 chars in demo.party; see P16/P22/P25 in build3_data.py).
Dashboard: parties with n>=30 per year shown individually sorted by n desc (PARTY_MIN_N in template),
smaller pooled into "andere/mehrere Parteien"; tail order andere -> keine -> wn (wn 2025 only, NOT
treated as missing per user request). Official party colours in PARTIES constant. 2022 CVP/BDP/Mitte
merged into "Die Mitte"; 2016 keeps CVP separate. Party filter values = category indices per year.

## Validation anchors
vert_wiss top-2 by wave: 57.1/56.4/66.7/58.5/60.0. int_wiss 2025 mean 3.34.
scipop_verstand top-2: 38.4/27.5/19.4. 283 chartable vars; segment split 2025: 48/22/12/17. Party big-six per year: 2016 SP119/FDP100/SVP90/CVP71/GRÜNE46/GLP39; 2022 SP110/FDP90/Mitte77/SVP71/GRÜNE66/GLP60; 2025 SP176/FDP145/SVP138/Mitte126/GRÜNE70/GLP67.
