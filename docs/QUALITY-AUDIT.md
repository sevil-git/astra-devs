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

## Motion and mobile refinement

The motion pass follows the reference study’s long deceleration and short stagger rhythm, with timings adapted for Astra’s content.

- Project panels share a stable grid footprint and use interruptible opacity transitions (380ms exit / 650ms entry), with an 850ms preview lift. Inactive panels are inert and hidden from assistive technology. Keyboard selection preserves scroll position; touch previews support directional swipes without capturing vertical scrolling.
- Native dialogs retain their focus trap and backdrop through a 520ms entrance and 260ms exit. Escape can interrupt the entrance; interrupted animations resume from their current presentation. Focus returns to the opener after closing. Project changes and the local form-to-brief step have their own restrained content entrances.
- Desktop text wipes, parallax, and reel framing use short scrub damping. Phone layouts reveal text once, omit large scroll parallax and reel clipping, and use a shorter hero entrance. Touch scrolling stays native. Service expansion animates its height over 550ms, with scroll measurements refreshed after it settles.
- Motion preference and pointer/breakpoint changes are observed live. The hero does not replay when those settings change. Reduced motion removes CSS transitions, disables scroll effects and smoothing, and completes dialog transitions immediately. Browser chrome height changes no longer trigger the custom resize refresh; input focus also avoids keyboard-driven refreshes.
- Cursor coordinates are written only to the clipping layer, using non-inherited registered properties. Reading progress updates its own element, and unused pointer variables were removed. Idle cursor values are not rewritten. The zero-radius write is retained when a touch reveal ends immediately.
- GPU contexts and lighting environments are allocated as their artwork approaches the viewport, rather than during hero entry. Scene rotation uses time-based damping. The frame gate now targets display-compatible 60fps on fine pointers and 30fps on coarse pointers, with lower coarse-pointer pixel density. These are scheduling targets, not measured device frame rates.
- Reel screenshots remain mounted and crossfade between chapters rather than being abruptly replaced. Title changes have a short entrance; direct seeking and pause remain available.

### Motion verification

- Production build, TypeScript, and ESLint complete with no errors. ESLint retains seven existing recommendations to replace native image elements.
- Browser exercises include rapid gallery changes, Escape during dialog entry, focus restoration and reopening, next-project browsing, reel seeking and lazy scene creation, reversing service expansion, and local enquiry preparation without sending email.
- Visual checks cover desktop, 390px and 320px phone layouts, plus the retained 672px preview. Desktop base/reveal heights matched at 8,569.48px; the retained preview’s 661px content viewport matched at 8,461.72px after entry, with zero horizontal overflow. Only the globe had an allocated canvas while reviewing the work introduction in the checked desktop state.
- Reduced-motion and touch-gesture branches were reviewed in code. No OS preference was changed, and no physical-device performance or swipe test is claimed. Temporary phone QA markup is removed after review.
