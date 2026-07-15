# Wissenschaftsbarometer Schweiz — Data Dashboard (v3, 2016–2025)

Interactive four-language dashboard (DE/FR/IT/EN) for the Wissenschaftsbarometer Schweiz.
Everything is ONE file: **`index.html`** — survey data (five waves), translations and logo embedded.
No server, no database. Host it anywhere; GitHub Pages recommended.

## What it does
- Three tabs: **Analyse: Querschnittbefragungen** (single years 2016 / 2019 / 2020 COVID-19-Edition / 2022 / 2025),
  **Analyse: Trend (2016–2025)**, and **Über die Daten** (methods of all five waves).
- Two-level selection: **Thema** (10 master topics + wave-specific topics) → **Frage**.
- **Vergleichen**: additional "Frage 2…N" dropdowns compare items of the same battery
  (max. 10 questions in cross-sections, 9 in trends) — rows in one chart, or one line each in the trend view.
- Break down by language region, gender, age, education, political leaning, party (2016/22/25),
  settlement type (2019/20/22) and the **Publika der Wissenschaftskommunikation** (2025 only).
- **Multi-filters** (checkboxes): OR within a dimension, AND across dimensions.
- Trend views: stacked distribution columns, mean lines with ±1 SE whiskers, top-2 share lines —
  with value annotations at each point and a **Y-Achse Volle Skala / Ausschnitt** toggle.
  Connections to 2020 and 2025 are **dashed** (survey-mode changes: 2020 online, 2025 online/paper WAPI/PAPI).
- Every view has a **shareable link** (state is stored in the URL), PNG and CSV download,
  and a data table with M, SE, SD and n.

## Hosting on GitHub Pages
1. github.com → New repository (public), e.g. `wissenschaftsbarometer-dashboard`.
2. Add file → Upload files → drop `index.html` → Commit.
3. Settings → Pages → Source: `main`, folder `/ (root)` → Save.
4. URL: `https://USERNAME.github.io/wissenschaftsbarometer-dashboard/`
5. WordPress embed:
   `<iframe src="https://USERNAME.github.io/wissenschaftsbarometer-dashboard/" style="width:100%;height:1400px;border:0;" loading="lazy"></iframe>`

Updating = upload a new `index.html` over the old one (same name, repo root).

## Regenerating from the data (only when data changes)
Requires Python 3 with `pyreadstat` (`pip install pyreadstat`) and the source files:
```
WB_TREND=/path/WB_trendfile_2016_2025_DE_FINAL.sav \
WB_SEG=/path/243308_Wissbaro_Kundenfile_cleaned_segments.sav \
WB_LOGO=/path/Wissenschaftsbarometer_CH_Logo.jpg \
python3 build_all3.py --data
```
`build3_data.py` → `data3.json` (compact, all 5 waves, weighted with `gewicht`,
segment typology merged for 2025); `build_all3.py` assembles `index.html`.

## Files
- `index.html` — the deliverable
- `template3.html` — dashboard source (edit UI/charts here, then re-run `build_all3.py`)
- `translations.js` — 2025 item wordings (DE/FR/IT/EN)
- `translations3.js` — trend/wave-specific wordings, topics, aliases, METI anchors
- `data3.json` — data extract (5,773 respondents, 283 items)
- `build3_data.py`, `build_all3.py` — pipeline

Data recipe: weight `gewicht`; "weiss nicht" (98; 6 for the acceptance item) excluded per item;
SE uses the Kish effective sample size. Validated against published results
(e.g. trust in science, top-2: 57.1 / 56.4 / 66.7 / 58.5 / 60.0 % for 2016→2025).
