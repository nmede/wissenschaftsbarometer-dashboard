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

## Validation anchors
vert_wiss top-2 by wave: 57.1/56.4/66.7/58.5/60.0. int_wiss 2025 mean 3.34.
scipop_verstand top-2: 38.4/27.5/19.4. 283 chartable vars; segment split 2025: 48/22/12/17.
