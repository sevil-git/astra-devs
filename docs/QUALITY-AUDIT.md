# Visual and interaction audit — October 17, 2026

## Corrections

- **Unbounded 3D overlay:** a fixed renderer sat above all text, while the globe box occupied 66–150% of the viewport. All scenes now render into owned, local canvases. The globe sits beside the work introduction, its box is capped at 420px on desktop and 180px on phones, and camera distance fits its sphere to that box. Section stacking and clipping now apply normally.
- **Canvas lifecycle:** every effect setup creates fresh owned canvases, including the reel. Cleanup removes listeners, disposes textures/materials/geometries/environments/renderers, releases contexts, and removes the canvases. This avoids reusing a forcibly released WebGL context during development remounts.
- **Work visibility:** project rows have real screenshot thumbnails, project numbers, consistent hover typography, and readable type labels. The showcase now features Zeltic, Maestera, and Nimbus with live links rather than only generic text and 3D artwork.
- **Showcase clipping:** transformed artwork used to enlarge an overflow-hidden scroll area. Focusing controls could internally scroll the frame. Overflow clipping now prevents that scroll area. Preview images also use automatic height to preserve their aspect ratio.
- **Mobile service descriptions:** expanded services use a stacked title and description. Expanded state is shared by both page layers so their geometry remains aligned. Lenis and ScrollTrigger refresh after expansion.
- **Typography:** bounded desktop root scaling, larger dialog body text and form labels, narrow-screen service and principle sizes, explicit spaces in animated headings, and improved dim-text contrast.
- **Spacing:** shorter repeated empty intervals while retaining the cinematic section rhythm. Project previews and service descriptions have their own reserved room.
- **Navigation:** Work targets the actual projects; Contact targets contact details; approach has its own anchor. Internal links transfer keyboard focus and preserve history, with back/forward scroll handling.
- **Enquiries:** the confirmed address is visible and linked. Visitors can prepare a brief, open it as an email draft, copy it, or download it. Nothing is sent automatically. Switching between form and brief resets the dialog scroll position; close controls remain available while scrolling.
- **Entry:** the loader only preloads the hero poster and fonts, with a four-second readiness fallback. The closing image loads lazily.

## Verification scope

Production build and TypeScript checks are run against the final source. Browser checks cover desktop and phone layouts, bounded and visible 3D scenes, equal base/reveal layer heights, service expansion, navigation, project dialogs and sticky close controls, local brief preparation, correctly encoded email recipient/subject/body, and showcase playback/controls. Email sending is intentionally not triggered during testing. Reduced-motion paths are reviewed in code; no operating-system preference is changed.

Temporary responsive QA pages are removed before delivery. The project remains on its local preview; no public deployment is made.

## Presentation refinement

- Replaced small project rows with a large, three-project gallery. The tablist supports click, Left/Right arrows, Home/End, proper selection state, and labelled panels. Desktop tabs remain available while viewing the project. Preview tilt is restrained and disabled for reduced motion.
- Shared gallery state keeps both reveal layers aligned. Reserved caption space and scroll-anchor exclusions reduce layout movement between projects.
- Added original editorial headlines, three observable feature notes per project, a second genuine screenshot, and next-project navigation inside each detail dialog. No client metrics, testimonials, or unverified implementation roles were invented.
- Refined the globe using detailed public-domain coastline data. Added a quiet reading-progress line and clearer studio identification on entry and in the hero.
- Added an explicit closing invitation and improved mobile header/control placement. Project previews retain colour palettes drawn from the corresponding work.
- Deferred the Three.js scene bundle until entry. The production dynamic import manifest lists a separate 563,240-byte raw visual chunk for this version; this is a bundle-size observation, not a measured loading-time claim.
- The served closing image changed from 2,305,381 bytes to 109,236 bytes (about 95% smaller).
- Added a generated branded social image and matching favicon/Apple icons. Metadata resolves the final origin through environment configuration instead of inventing a public domain.

This pass uses the [Awwwards agency gallery](https://www.awwwards.com/websites/design-agencies/) as an additional presentation reference. Visual direction is an editorial judgement; no award or external score is claimed.

### External project observation

During this session, Zeltic’s deployed `/products` page displayed an empty catalogue. The portfolio therefore focuses on its verified brand presentation; no checkout or sales outcomes are asserted. The external project is outside this checkout and was not modified.

### Final verification

- Browser review at 320px and 390px phone widths, plus desktop and the retained 672px preview. Gallery switching, arrow-key selection, project opening, next-project browsing, dialog scrolling, and entry were exercised.
- Base/reveal heights matched at 8,569px on the desktop check and 8,408px in the retained responsive preview. The latter had a 661px content viewport and 661px document width, with no horizontal overflow. These are observations for the checked states, not guarantees for every device.
- A development refresh exposed a stale loader overlay. Entry visibility is now controlled by the entered CSS state; GSAP no longer owns loader visibility. Animated text has a readable default beneath its active GSAP wipe. Clean entry and refresh checks confirmed the overlay hidden after Start.
- The final build and TypeScript checks pass. The sharing-image route is statically generated with the local studio font. The checked desktop browser error log was empty. No production deployment or external email sending was performed.
