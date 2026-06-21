# Wissenschaftsbarometer Schweiz 2025 — Daten-Dashboard

A self-contained, four-language (DE / FR / IT / EN) interactive dashboard for the
**Wissenschaftsbarometer Schweiz 2025** survey. Everything — data, translations and the
project logo — is embedded in a single `index.html`, so it can be dropped onto GitHub Pages
and embedded as a subpage of wissenschaftsbarometer.ch with no build step or server.

## What the tool does

One **Analysis** tab plus an **About the data** tab. In the analysis tab the user can:

- pick **any** of the 130 survey items from `f1` to `b5_7` (grouped by topic);
- **break down by** (*Aufschlüsseln nach*) language region, gender, age, education, settlement
  type, political leaning, party, or **Segment** (the four-group typology, `cluster_lg`);
- **filter** to any subgroup;
- switch between **Distribution** and **Means**, and choose a **chart type** for each:
  - Distribution -> 100 % stacked / grouped bars / diverging (Likert-centred) / donut (no breakdown);
  - Means -> bars with +/-1 SE / lollipop with +/-1 SE / radar (across subgroups);
- toggle **weighted / unweighted**;
- read informative **titles and subtitles** taken from the questionnaires
  (e.g. "Priorisierte Forschungsthemen: Kommunikation und Digitalisierung" with the full
  question as subtitle);
- download the chart as **PNG** or the underlying numbers as **CSV**.

Every subgroup shows its case count as `(n = ...)`, and means show `M (SE)` with an error bar.

## Data recipe (validated)

- Source file: `243308_Wissbaro_Kundenfile_cleaned_segments.sav` (cross-sectional, **n = 1 548**).
- Weight: **`gewdef_red`** (default on).
- "Weiss nicht / no answer" codes (98, and 6 on the acceptance/populism blocks) are excluded
  from each item's base. Knowledge items (`f13_*`, `a3_*`) keep their native **4-point** scale;
  `b2_1` keeps its **7-point** left-right scale; everything else is **5-point**.
- The **AI** module (`a*`) and the **criticism & attacks** module (`b*`) are split-ballot
  (each asked of ~half the sample); the tool flags this and reports the correct base.
- Standard errors for the mean are **design-based** (Kish effective N:
  n_eff = (sum w)^2 / sum(w^2), SE = sqrt(weighted variance / n_eff)).

Reproduces the brochure exactly: trust `f11_2` = **60.0 %** strong/very strong;
means f1 = 3.34, f10_2 = 3.83, f10_7 = 2.73, f9_1 = 4.01; weighted Segment split
**48 / 22 / 12 / 17 %** (Passive supporters / Science-philes / Critically interested / Disengaged).

> Note on labels: the dataset names the fourth segment **"Disengaged"** (the brochure called the
> analogous group "Skeptische"). Group names are translated in `template2.html`
> (`I18N.demo.segment`) and can be renamed there.

## Files

| File | Purpose |
|---|---|
| **`index.html`** | The deliverable - open it or host it as-is. |
| `template2.html` | Dashboard source (HTML/CSS/JS) with `__WB_DATA__`, `__WB_TRANSLATIONS__`, `__WB_LOGO__` placeholders. |
| `translations.js` | DE/FR/IT/EN item labels, question stems and title prefixes. DE/FR/IT follow the official questionnaires; EN is authored. |
| `data2.json` | Compact data extract built from the `.sav`. |
| `build_all.py` | Rebuilds `data2.json` and re-assembles `index.html`. |

## Regenerating

    pip install pyreadstat numpy pillow
    python3 build_all.py        # writes data2.json and index.html

Set `WB_SAV` / `WB_LOGO` env vars to point at the source files if they live elsewhere.
To edit wording, change `translations.js` (item text) or `template2.html` (UI labels, scale
anchors, segment names) and re-run the script.

## Hosting on GitHub Pages + embedding

1. Create a **public** repo and upload `index.html`.
2. **Settings -> Pages -> Branch:** `main` / root -> Save. The page goes live at
   `https://<user>.github.io/<repo>/`.
3. Embed it as a WordPress subpage with an iframe:

       <iframe src="https://<user>.github.io/<repo>/" title="Wissenschaftsbarometer Dashboard"
               style="width:100%;border:0;height:1100px" loading="lazy"></iframe>

   (Use a fixed height, or add a small postMessage height script later for auto-resize.)

---
*Wissenschaftsbarometer Schweiz 2025*, University of Zurich (IKMZ), with gfs.bern and the FSO.
Cross-sectional n = 1 548, weighted. Please cite the source when using the figures.
