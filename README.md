# Astra devs

A software studio portfolio closely reconstructing the motion architecture of the requested reference. Built with Next.js, React, GSAP, Lenis, Three.js, and local Urbanist fonts.

```sh
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000), then select **Start**. Move the pointer across large text to reveal the alternate page. On touch devices, hold the circular button to reveal it.

```sh
npm run build
npx tsc --noEmit
```

## Main source

- `app/components/portfolio.tsx`: shared dark/alternate page, intro, cursor, GSAP/Lenis integration, reel controls, navigation, and real project previews.
- `app/components/work-gallery.tsx`: keyboard-accessible project gallery with art-directed previews and restrained pointer tilt.
- `app/data/projects.ts`: project facts, feature notes, and imagery.
- `app/studio-polish.css`: gallery, case-study, responsive navigation, and contact presentation.
- `app/components/brand-mark.tsx`: original interactive SVG A character, pointer tracking, greeting, and press response.
- `app/components/visual-scenes.tsx`: original Three.js coffee cup, mouse, globe, and reel scene.
- `app/components/enquiry.tsx`: native project enquiry dialog and local brief creation.
- `app/globals.css`: reference-scale layout, masks, responsive rules, and reduced-motion behavior.
- `docs/REFERENCE-STUDY.md`: evidence, reconstruction map, verification, and explicit differences.
- `docs/ASSET-PROMPTS.md`: original generated imagery and prompts.
- `docs/QUALITY-AUDIT.md`: visual and interaction corrections, with verification scope.

The hero uses a locally hosted, muted developer-workspace video from Mixkit, with a pause control and reduced-motion poster fallback. It pauses offscreen and in hidden tabs. The project showcase combines actual project captures with original procedural 3D artwork. Selected work features the supplied Zeltic, Maestera, and Nimbus websites with genuine homepage captures and live links. See `docs/MEDIA-SOURCES.md` for provenance. Enquiries use the supplied address, kalesahil565@gmail.com. The brief flow prepares a mailto draft for the visitor to review and send in their email app; copy and download are also available. The site does not send mail from a backend. Drafts remain in React state and clear on reload.

## Sharing and production URL

The site includes a generated 1200 × 630 sharing image, a branded ICO favicon, and a PNG Apple icon. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin before a production build. Vercel’s `VERCEL_PROJECT_PRODUCTION_URL` is used automatically when available; local development defaults to localhost.

The Three.js experience is dynamically loaded after entry. The closing image is served as a 109 KB WebP instead of the 2.3 MB source PNG. Original PNGs remain for provenance.
