# Astra devs media sources

## Active background: The Threshold

Original architectural artwork generated October 17, 2026 with the built-in `image_gen__imagegen` tool, inspired by the immersive architectural direction selected by the agency owner. No Unseen Studio imagery, models, textures, or code have been copied. Full production prompts are recorded in `ASSET-PROMPTS.md`.

- `public/images/threshold/threshold-desktop-source.png`: original landscape artwork, 1672 × 941.
- `public/images/threshold/threshold-mobile-source.png`: separately generated portrait composition, 941 × 1672.
- `public/images/threshold/threshold-desktop.webp`: served landscape derivative, 1672 × 941, 136,198 bytes.
- `public/images/threshold/threshold-mobile.webp`: served portrait derivative, 900 × 1601, 117,420 bytes.
- WebP conversion uses the local Sharp dependency. The `<picture>` and matching texture choose the applicable viewport asset; originals are retained for provenance and are not requested by the page.

The background uses a lightweight 2.5D image shader for slow camera breathing, fine-pointer parallax, and a directional wave spectrum applied to the existing water reflections. Separate authored desktop/mobile RGB mattes protect the foreground steps, stone pier, and distant mountain silhouette. Perspective compresses the waves toward shore; reflected light shifts with the surface. The continuation ocean uses the same wave field at a different scale. This is an animated photographic treatment, not real-time architectural geometry or a navigable 3D scene. The artwork remains visible when WebGL is unavailable, on context loss, or under reduced motion. Live preference changes are observed. Phones use a 30fps scheduling target and 1.25 pixel-ratio cap; no physical-device frame-rate claim is made. Motion pauses offscreen and in hidden tabs, and respects reduced motion. No background video is used.

The rejected ribbon component and its stylesheet have been replaced. Earlier procedural and stock background revisions are historical.

### Retired stock assets

The former `public/videos/studio-sculpture.mp4` and `public/images/studio-sculpture-poster.jpg` are no longer referenced by the page. Source: [Abstract Floating Metal Sphere](https://www.pexels.com/video/abstract-floating-metal-sphere-37859039/) by [Rostislav Uzunov](https://www.pexels.com/@rostislav/), Pexels item 37859039, under the [Pexels license](https://www.pexels.com/license/). Retrieved October 17, 2026 and edited locally. Earlier desk footage is also unused. Both remain in the repository for provenance.

## Project previews

Homepage screenshots captured October 17, 2026 from the project URLs supplied by the agency owner:

- `public/images/projects/zeltic.png`: [Zeltic](https://zeltic-turbo-zeltic-frontend-nine.vercel.app/), an electrolyte drink storefront.
- `public/images/projects/maestera.png`: [Maestera](https://maestera.com/), music teacher discovery and education.
- `public/images/projects/nimbus.png`: [Nimbus](https://nimbus-keyboard.vercel.app/), an interactive 3D keyboard product website.

Descriptions reflect observable public features. No unverified metrics, results, technology stacks, or client testimonials have been added. All three projects display directly in the page and link to their live websites in a new tab.

## Other assets

The closing section now reprises the original Threshold artwork. The former eye image and procedural coffee/mouse objects remain archived in source, but are not loaded by the page. The project gallery uses the supplied homepage screenshots listed above, staged entirely with CSS; no fake client work or outcomes were added.

## Art-direction pass

Additional live-page captures were taken from Zeltic’s product-story section, Maestera’s teacher-discovery section, and Nimbus’s 3D product view. They are the corresponding `*-detail.png` files beside the homepage captures. These are genuine site views; the portfolio adds no performance or sales claims.

The globe now uses coastline polygons from [Natural Earth’s 1:110m land dataset](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson), rasterised locally into a custom 2048 × 1024 atlas with a subtle graticule. [Natural Earth terms](https://www.naturalearthdata.com/about/terms-of-use/) place this map data in the public domain. The rendered atlas is `public/textures/earth.png`. Retrieved October 17, 2026.

The closing image’s served derivative is `public/images/studio-eye.webp`. Its original generated PNG and prompt remain available.

## Desktop project films — October 17, 2026

The gallery serves three silent H.264 MP4 films at **1920 × 1080**, with fast-start metadata. The Zeltic cursor film is 60fps; Maestera and Nimbus are 24fps. These are edited previews of the actual supplied projects, not invented product interfaces. The full 16:9 composition remains contained within the gallery on mobile.

- `public/videos/projects/zeltic-cursor-cinematic.mp4`: edited from the agency owner’s supplied “Screen Recording 2026-10-17 at 8.21.27 PM.mov”, a 2940 × 1684, 13.75-second live capture of the actual particle interaction. The full width below the navigation is preserved, scaled proportionally and gently letterboxed within 1920 × 1080. A settled wordmark opens the 11.5-second loop, followed by the cursor sweeps and the return to readable text, with a 300ms introductory dissolve. Delivery is silent H.264 High / yuv420p at 60fps with fast-start metadata. No synthesized particle motion or frame blending is applied. The preceding `zeltic-particles.mp4`, original `zeltic-desktop.mp4`, and source `zeltic-product.webm` remain archived and are not used by the gallery.
- `public/videos/projects/nimbus-desktop.mp4`: live Nimbus 3D opening, followed by actual Dreamboard and Cherry Navy keycap states. Recorded from a fixed desktop iframe, not a narrow in-app panel. Screenshot sequences were retimed and interpolated during editing; this is not a claim of a native 24 fps screen recording.
- `public/videos/projects/maestera-desktop.mp4`: a concise editorial walkthrough using the live homepage carousel and genuine captured teacher-discovery and filter views. The discovery views are edited stills with dissolves; no fabricated interactions or teacher data were added.

The corresponding `*-film.webp` images, and the updated `zeltic-cursor-cinematic.webp`, are compressed desktop posters from the same captures. Playback starts only when a film is sufficiently visible, pauses offscreen and when the document is hidden, and respects reduced-motion and data-saving preferences. A separate accessible play/pause button allows explicit playback. Failed or blocked autoplay keeps the poster available. The mirrored text-reveal layer uses posters only, avoiding duplicate video decoding.

### Typography

Locally hosted **Space Grotesk** (display) and **Manrope** (supporting text), Latin subsets, upright weights only. Fontsource packages carry the SIL Open Font License 1.1: [Space Grotesk](https://fontsource.org/fonts/space-grotesk), [Manrope](https://fontsource.org/fonts/manrope). No external font requests. Georgia, serif italics, and Urbanist references were removed from the rendered page and the Open Graph artwork.

## Portal ocean continuation — October 17, 2026

`public/images/threshold/ocean-continuation.webp` is original AI-generated supporting scenery, created with the built-in image-generation tool using the existing Astra architectural illustration as a reference. Its PNG original and full production prompt are retained in the repository; see `docs/ASSET-PROMPTS.md`. The 1672 × 941 served WebP is approximately 130 KiB. The companion aperture SVGs are authored geometric masks, not third-party imagery.

## After hours moonlit ocean — October 17, 2026

`public/images/threshold/ocean-after-hours.webp` is a 1672 × 941 original AI-generated night edit of the ocean continuation, created with the built-in imagegen tool. It is 151,724 bytes and loads only when the visitor discovers the three-tap logo gesture. The generated master is retained as `ocean-after-hours-source.png`. The complete prompt set and scene integration details are in `docs/AFTER-HOURS.md`. The original architecture and water reflections are relit in the existing shader; they are not replaced by independently generated stonework, so the composition stays registered during the dissolve. No external stock media or new background video is used.
