# Asada Tacos AZ — Website

Authentic carne asada street tacos + catering, Phoenix East Valley. *Sabor Original.*

Static site (zero build step). Five pages on a shared design system.

## Structure
- `index.html`, `menu.html`, `catering.html`, `find-us.html`, `story.html`
- `css/site.css` — shared design system
- `js/site.js` — shared behavior (loader, nav, schedule, reveals)
- `assets/img/` — logo
- `assets/generated/` — photography (web JPEGs) + hero video

## Deploy
Static — Vercel framework preset **Other**, no build command, output = repo root.
`vercel.json` sets clean URLs.

## Notes
- Catering "Reserve" emails a request; live payment needs a processor (Stripe/Square) wired later.
- Built by Anchondo Designs.
