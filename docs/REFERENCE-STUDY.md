# Astra devs — motion reconstruction

Reference: [Minh Pham](https://minhpham.design/), inspected October 17, 2026. The second implementation replaces the first independent visual direction with the reference's section sequence, proportions, palette, and interaction architecture.

## Evidence

The reverse-engineer-anything skill guided the investigation. REA MCP was unavailable, so its CLI analyzed the public application bundle as inert JavaScript.

- REA Evidence: `ev_1c3e6cf95a0e5502862d0ba7012b3890a0c7c3d47274c4041f4f079dbb08902e`
- Artifact-tree SHA-256: `970d3371b7f5286e0f5de948c81a162ddf69c112a89e2803ce3fd7068639c910`
- Scope: one 113,755-byte application bundle, 31,766 visited AST nodes, zero parse failures.
- Complete Evidence: `/tmp/astra-rea-evidence.json` during this session.
- Additional public HTML, CSS, and vendor bundle were inspected separately in `/tmp/astra-reference-v2`. A parallel, read-only motion audit corroborated the source mechanics. Those ordinary static observations are distinct from REA Evidence.
- Runtime browser checks observed the intro, hero, enlarged pointer reveal, anchor navigation, scrolling, work introduction, and closing image. Not every reference hover state, media frame, or viewport was exhaustively observed.

Static analysis does not prove execution. Public bundles are minified; exact dependency versions remain unverified. No reference implementation code or identity assets are shipped in this repository.

## Observed mechanism → reconstruction

| Reference mechanism                           | Astra devs implementation                                                                                      |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Progress indicator, manual entry, staged exit | Font/poster preload, percentage display, Start gate, state-driven CSS loader exit                                           |
| Character entry                               | Character masks, 105–115% vertical entry, 20-degree rotation, 1.4-second power3 easing and .015-second stagger |
| Taupe / orange / near-black                   | `#b7ab98` / `#eb5939` / `#0d0d0d`                                                                              |
| Narrow, five-line central title               | Five-line agency statement, local geometric font, responsive reference-scale type                              |
| Full orange alternate document                | Shared `PageLayer` rendered twice; alternate text reserves the original geometry                               |
| Pointer-following reveal                      | Document-coordinate circle, scroll offset compensation, time-correct interpolation, tweened diameter           |
| Pointer sizes                                 | Normal diameter40/1728 and enlarged450/1728 of desktop width, with small-screen minimums                       |
| Cursor contracts over links and rows          | Hover-kind detection on pointer movement and scrolling                                                         |
| Scroll text wipes                             | Dim text beneath sequential line clips, GSAP ScrollTrigger scrub                                               |
| Wide orange row wipes                         | Center-out inset reveal, .6-second enter and .4-second leave                                                   |
| Smooth scrolling                              | Lenis1.1-second duration, exponential easing, GSAP ticker integration                                          |
| Parallax image layers                         | Hero, work, and motto background translations tied to section progress                                         |
| Floating coffee/mouse                         | Original procedural Three.js meshes, scroll-driven rotation                                                    |
| Rotating Earth                                | Original procedural world texture on a Three.js sphere                                                         |
| Expanding media section                       | 20%→0% viewport inset, 18-second project showcase with original 3D artwork                                     |
| Playback controls                             | Play/pause, timeline seeking, chapter changes, fullscreen and Escape fallback                                  |
| Pinned thumbnail indicator                    | Sticky three-item rail, ScrollTrigger active state, moving orange indicator                                    |
| Closing image and type entrance               | Original macro-eye background and character reveal                                                             |
| Mobile alternate layer                        | 500ms hold, viewport-covering circle, release/cancel/blur cleanup                                              |
| Sound control                                 | Optional locally synthesized ambient tone; off until explicitly enabled                                        |

## Adaptations and limitations

The hero now uses a local developer-workspace video from Mixkit with scroll parallax, playback controls, and a reduced-motion poster. The work introduction uses its poster; the closing eye is an original generated still. The reel features supplied project captures over original live Three.js artwork. Coffee, mouse, and globe geometry are original procedural substitutes for the reference's GLTF models. Urbanist is an openly licensed geometric substitute for its proprietary typeface. These visual assets are not pixel-identical.

Agency content follows the confirmed offering: websites, apps, automations, and related software. Process rows replace personal career history; the supplied Zeltic, Maestera, and Nimbus projects replace concept entries; studio principles replace testimonials. The contact flow prepares a local project brief. The supplied address is kalesahil565@gmail.com; visitors can open a prepared email draft to this address, or copy/download their brief. There is no backend mail delivery.

## Accessibility and performance

The alternate document is inert and hidden from accessibility APIs. Native dialogs restore focus and allow internal scrolling through Lenis exclusions. Reduced-motion settings disable entrances/parallax and reel autoplay; explicit reel playback remains available. WebGL caps pixel density and frame rate, renders only visible scenes, and disposes resources on unmount. Every 3D scene has its own DOM-contained canvas so section stacking, clipping, and fullscreen preserve compositing order.

## Verification

Production build and TypeScript checks are run after changes. Browser checks cover the entry gate, alternate hero text, sequential text wipes, row reveals, 3D rendering, fixed anchor navigation, project detail dialog, enquiry creation, Escape dismissal, sticky principle state, and desktop/phone layout. Remaining differences are the asset adaptations above, not a claim of an exact copy.

## Logo follow-up

A focused inspection of the reference HTML found `assets/images/logo.gif` on the entry screen and `assets/icons/logo.svg` in the header. Its public header script applies a smoothed pointer translation around the pointer, while CSS changes its fill on hover. These are static-source observations; a browser screenshot corroborated the entry mark's appearance. No reference logo asset was copied.

Astra devs now uses an original SVG A character with a small visor and orange spark. The entry mark greets and blinks for 4.8 seconds. Active marks look toward the pointer, lean as it approaches, wink on hover or keyboard focus, and spring on press/tap. The header retains its home-link behavior. Inactive marks have no pointer listener; decorative thumbnails remain static. Reduced-motion preferences disable all logo animation and tracking. The favicon uses the same static artwork.
