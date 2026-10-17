# Astra devs

A software studio portfolio closely reconstructing the motion architecture of the requested reference. Built with Next.js, React, GSAP, Lenis, Three.js, and locally hosted Space Grotesk and Manrope fonts.

```sh
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000), then select **Start**. Move the pointer across large text to reveal the alternate page. On phones and touch devices, hold the bottom-centred finger button: the ring charges, the copper alternate view opens, and release returns to the original. Keyboard hold and an assistive click toggle are supported.

```sh
npm run build
npx tsc --noEmit
```

## Main source

- `app/components/portfolio.tsx`: shared dark/alternate page, intro, cursor, GSAP/Lenis integration, navigation, and the work section.
- `app/components/work-showcase.tsx`: an editorial project gallery with large visible previews, direct live links, and alternate description text beneath the cursor reveal.
- `app/components/project-film.tsx`: visibility-aware inline playback, explicit pause/resume, reduced-motion and Save-Data support, poster fallback.
- `app/data/projects.ts`: project facts, feature notes, and desktop film/poster paths.
- `app/studio-polish.css`: shared interaction and responsive foundations.
- `app/studio-direction.css`: copper/ivory typography, chapter spacing, section transitions, and responsive services, principles, contact, and enquiry styling.
- `app/work-showcase.css`: alternating project compositions, widescreen film stages, accessible playback controls, and stacked phone layouts.
- `app/architectural-scene.css`: architectural art direction, responsive hero composition, typography, and navigation.
- `app/components/architectural-scene.tsx`: original artwork with lightweight 2.5D camera drift, pool refraction, and an accessible motion control.
- `app/components/hold-reveal.tsx`: charge feedback, pointer capture, keyboard/assistive activation, and cancellation of the mobile reveal gesture.
- `app/hold-reveal.css`: safe-area control placement, orbiting type, progress ring, and reduced-motion styling.
- `app/components/brand-mark.tsx`: original interactive SVG A character, pointer tracking, greeting, and press response.
- `app/components/visual-scenes.tsx`: retired procedural scenes, retained as source but no longer imported by the page.
- `app/components/enquiry.tsx`: native project enquiry dialog and local brief creation.
- `app/globals.css`: reference-scale layout, masks, responsive rules, and reduced-motion behavior.
- `docs/REFERENCE-STUDY.md`: evidence, reconstruction map, verification, and explicit differences.
- `docs/ASSET-PROMPTS.md`: original generated imagery and prompts.
- `docs/QUALITY-AUDIT.md`: visual and interaction corrections, with verification scope.

The hero presents “The Threshold”, original architectural artwork with separately composed landscape and portrait assets. A lightweight WebGL pass adds a slow 2.5D camera drift and subtle pool refraction. This is an illustrated environment with ambient motion, not a navigable 3D world. Reduced motion and WebGL failure retain the static artwork. Rendering skips offscreen artwork and hidden tabs, with a lower phone resolution/frame budget. The visitor can pause or resume. Desktop and phone WebP assets total approximately 254KB; only the matching composition loads. No background video is loaded. The aligned second text layer is retained: hovering the hero reveals “Less blah blah. More ta-da.” in a warm copper circle beneath “From ‘what if’ to ‘holy shit.’” Touch devices retain hold-to-reveal. The project showcase displays all three previews and descriptions directly in the page, with no selection step or reel. Selected work features the supplied Zeltic, Maestera, and Nimbus websites with genuine Full HD desktop films and live links. See `docs/MEDIA-SOURCES.md` for provenance. Enquiries use the supplied address, kalesahil565@gmail.com. The brief flow prepares a mailto draft for the visitor to review and send in their email app; copy and download are also available. The site does not send mail from a backend. Drafts remain in React state and clear on reload.

## Sharing and production URL

The site includes a generated 1200 × 630 sharing image, a branded ICO favicon, and a PNG Apple icon. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin before a production build. Vercel’s `VERCEL_PROJECT_PRODUCTION_URL` is used automatically when available; local development defaults to localhost.

The Three.js experience is dynamically loaded after entry. The closing image is served as a 109 KB WebP instead of the 2.3 MB source PNG. Original PNGs remain for provenance.

The architectural direction continues through all chapters: drawing dividers, quiet surface gradients, restrained project entrances, and a closing reprise of The Threshold. All three projects remain visible without selection or a modal. Project media now uses flat widescreen film stages at every breakpoint, retaining the desktop composition on phones and native scrolling. The two text layers share the same content geometry, including hidden measurement copy behind the alternate project descriptions.
