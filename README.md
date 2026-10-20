# Jasonni — Photography

A buildless, responsive photography portfolio starter. It is intentionally local-only and contains no stock or AI-generated photographs. Image areas remain blank until the owner's own photographs are added.

## Preview

Open `index.html` directly, or serve this folder with any static file server. For example, from this folder:

```powershell
py -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project photographs

The page expects the award image at `images/queensland-competition/award-landscape.jpg` and the three calendar images at `images/uqgcaa-calendar/photo-01.jpg` through `photo-03.jpg`. It hides a project's image area when its files are missing, so it never displays empty or broken image tiles. The gallery keeps the supplied photos' proportions and does not apply generated edits or location captions.

## Content to confirm before public release

- The Queensland Multicultural Photography Competition's official English name and the exact award wording/category, from the certificate.
- The selected photographs and the owner's approval to display them publicly.
- Any contact link or photographer biography desired on the finished portfolio.

The award entry uses only the user's self-reported fact that a landscape-category award was received; it does not state an award level or assert an official English competition name. The calendar entry uses the supplied project name, `UQGCAA 2026 Calendar Project`.

## Files

- `index.html` — semantic page and two project entries.
- `styles.css` — responsive monochrome editorial layout and accessible lightbox styling.
- `script.js` — image discovery for the documented filenames, gallery navigation, and click-to-zoom.
- `images/` — empty folders reserved for the user's project photographs.
