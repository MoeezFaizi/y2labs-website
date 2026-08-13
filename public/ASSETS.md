# Assets to export from Figma

**Quickest path — run this from the project root:**

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\fetch-figma-assets.ps1
```

That downloads all six files below in one pass. Claude's Linux sandbox reaches
the internet through an egress proxy with a domain allowlist, and `figma.com`
isn't on it (`HTTP 403 from proxy after CONNECT`), so the sandbox can't fetch
them — but your machine can. The URLs in the script are short-lived Figma MCP
links (~7 days); if they expire, ask Claude to regenerate the script.

Failing that, export them by hand from Figma using the node IDs below.
Everything is already wired up in code — the components use `AssetImage`, which
renders nothing when a file is absent, so the site stays intact either way.

Figma file: `Y2-LABS--Copy---Copy-` → page `Design`

| Save to | Figma node | Node ID | Export |
|---|---|---|---|
| `public/hero/globe.png` | `image 285` (glowing network sphere) | `1394:6454` | PNG @2x |
| `public/logos/logoipsum.png` | Mask group 1 in the customer row | `1081:11556` | PNG, 188×40 |
| `public/logos/logo-2.png` | Mask group 2 | `1081:11559` | PNG, 123×40 |
| `public/logos/logo-3.png` | Mask group 3 | `1081:11562` | PNG, 232×40 |
| `public/icons/video.svg` | `video-02` icon in the CTA | `1045:4502` | SVG |
| `public/logo.svg` | `Y2lab Logo` wordmark | `1681:4524` | SVG |

## Testimonial avatars — only one of the three exists

**The design has exactly one testimonial**: "Sarah Johnson / Product Manager,
TechNova", node `I1045:8152;1045:4944`, an 80×80 avatar inside the `Testimonial`
instance `1045:8152`. Its role string matches `lib/site.ts` verbatim, so that
entry was taken from Figma. The other two — Daniel Okafor and Aisha Rahman —
are sample copy someone wrote; neither name appears anywhere in the file and
there is no avatar for either. Confirmed by walking all 15,748 nodes.

| Save to | Used by | Status |
|---|---|---|
| `public/testimonials/sarah-johnson.png` | `testimonials[0].avatar` | fetched, 2× |
| `public/testimonials/daniel-okafor.png` | `testimonials[1].avatar` | **no source — invented name** |
| `public/testimonials/aisha-rahman.png` | `testimonials[2].avatar` | **no source — invented name** |

Those two 404. `ContactCta.tsx` renders avatars through `AssetImage`, which
drops the `<img>` on error and leaves the `bg-white/15` rounded square showing —
degraded, not broken, which is why it went unnoticed. Decide whether to cut the
two invented testimonials, commission real ones, or keep placeholder tiles.

Fetch them with:

```powershell
$env:FIGMA_TOKEN = '<your token>'
powershell -ExecutionPolicy Bypass -File .\scripts\fetch-testimonial-avatars.ps1
```

That script goes through the Figma **REST API**, not the MCP server — the MCP
tool-call cap on the Starter plan blocks the automated route, and REST has its
own quota. Token: figma.com → Settings → Security → Personal access tokens,
scope `File content: Read`; a View seat is enough. File key
`zv56OBDDFBsS4nulpNeWUc` is baked into the script's default parameter.

Nobody recorded node IDs for these, so the script discovers them: it finds the
TEXT node spelling each person's name and takes the nearest image-filled,
roughly-square node under 400px. If those names turn out to be sample copy
rather than design content, it exports every avatar-shaped image it found to
`public/testimonials/_candidates/` to pick from by eye instead.

## Notes

**Keep `fetch-figma-assets.ps1` saved as UTF-8 *with* BOM.** It contains em
dashes; Windows PowerShell 5.1 reads a BOM-less file as CP1252, which turns each
`—` into `â€"` — and that trailing `"` (U+201D) is a character PS accepts as a
string delimiter, so the script dies with a misleading `Missing closing '}'`.

**Customer logos are recoloured with a CSS mask**, mirroring the Figma mask
groups — the PNG supplies the alpha channel and the `grey-100` token supplies
the ink. So export them as solid-shape PNGs with transparency (exactly as they
sit in Figma), not as full-colour logos. If you'd rather use real full-colour
client logos later, drop the mask in `components/site/Hero.tsx` and swap the
`<span>` for `<AssetImage>`.

**Two things are deliberately CSS, not images.** In Figma the hero background
is a pair of full-bleed 1921×1029 PNGs (`1081:11536`, `1395:7390`) that bake in
both the navy gradient and the curved bottom-left transition. I rebuilt those as
the `.hero-field` utility in `app/globals.css` plus a `rounded-bl` on the hero
section — it scales to any viewport, costs no download, and stays crisp. The
curve is an approximation of the drawn shape; if you want it exact, export
`1081:11536` and set it as a background image on the hero instead.

**The header logo** currently renders a `Y2LABS` text wordmark. Once
`public/logo.svg` exists, replace the `<Link>` contents in
`components/site/Header.tsx` with an `<AssetImage src="/logo.svg" width={146.5}
height={40} />`.
