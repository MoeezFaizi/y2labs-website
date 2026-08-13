# Y2 LABS — Website

Pixel-faithful implementation of the Figma design **"Y2 LABS (Copy)"**
(file `zv56OBDDFBsS4nulpNeWUc`), including all prototype transitions and motion.

## Stack

- **Next.js 15.5** (App Router, static prerender, `output: "standalone"`)
- **React 19**, **TypeScript**
- **Tailwind CSS v4** (postcss)
- **motion** (`motion/react`, framer-motion successor) for animations
- No icon library — every icon/illustration is an exported Figma asset

## Run

```bash
npm install
npm run dev        # development → http://localhost:3000
npm run build      # production build (static + standalone server)
npm start          # serve the production build
```

Docker: `Dockerfile` and `docker-compose.yml` are included (standalone output).

## Pages

| Route                      | Source                          |
| -------------------------- | ------------------------------- |
| `/`                        | `app/page.tsx`                  |
| `/about`                   | `app/about/page.tsx`            |
| `/contact`                 | `app/contact/page.tsx`          |
| `/product/riam`            | `app/product/[slug]/page.tsx`   |
| `/product/it-operations`   | `app/product/[slug]/page.tsx`   |

## Structure

```
app/                  routes + globals.css (design tokens, keyframes)
components/site/      page sections (Hero, Services, Products, Footer, …)
components/motion/    reusable motion primitives
                      Reveal, TextReveal, Marquee, WordRotator, CountUp,
                      Magnetic, Parallax, PageTransition, ScrollProgress
components/ui/        Button, AssetImage, icons
lib/site.ts           ALL copy/content + asset paths (edit text here)
lib/motion.ts         shared easings & springs (Figma-matched)
public/               exported Figma assets, grouped by section
                      (see public/ASSETS.md for per-file provenance)
.shots/               Figma renders, spec dumps, diff/capture tooling
                      (dev-only; not needed in production)
```

## Figma motion spec (implemented & browser-verified)

| Element                          | Spec                                             |
| -------------------------------- | ------------------------------------------------ |
| Buttons / links hovers           | 350ms ease-in-out                                |
| Services accordion               | hover 550ms ease-in-out, click 300ms ease-out    |
| Landing & About big cards        | hover wash: 400ms delay, 1000ms, bezier(0.83, 0, 0.19, 0.99) |
| About team photos                | hover zoom 600ms ease-in-out                     |
| Contact FAQ                      | 300ms ease-in-out                                |
| Contact hero word ticker         | spring mass 1 / stiffness 100 / damping 15       |
| Expertise logo marquee           | 10s linear loop                                  |
| Landing hero globe               | 40s/rev CSS keyframe rotation                    |

All animations respect `prefers-reduced-motion`.

## Asset pipeline

Hero/section artwork was extracted from full-page Figma renders at 1× and
background-keyed (flood-fill + feather) into transparent PNGs — see
`.shots/keyart.py`. If the Figma API rate limit resets, higher-resolution
exports can replace `public/about/hero-city.png`, `public/products/cube.png`,
`public/contact/hero-headset.png`, etc. without code changes (components size
images via CSS, not intrinsic dimensions).

## Verification tooling (`.shots/`)

- `fullpage.js <url> <out.png>` — full-page capture (viewport 1935 → 1920 layout)
- `mobcap.js <url> <out.png>` — 390px mobile capture + overflow report
- `measure.js <url> <name>` — section y/height dump
- `pixeldiff.py <name>` — per-band mean diff vs Figma render
- `acceptance-sheet.jpg` — final side-by-side FIGMA vs BUILT comparison
