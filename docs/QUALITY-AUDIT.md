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

## Always-visible project showcase

This revision replaces the tabbed gallery and project detail dialogs with three ordinary, visible project articles. Zeltic, Maestera, and Nimbus each show their real homepage preview, headline, description, category, and direct website link. Visitors browse by scrolling; no click, hover, swipe, or playback is required to reveal a project. Preview/title links and the explicit “Visit website” links go directly to the supplied sites in a new tab.

The separate reel, playback/fullscreen controls, reel scroll effects, and its Three.js scene code have been removed. The work introduction is shorter, and the decorative globe has been removed from this section to give the work more room. Desktop uses preview-and-description rows; narrow layouts stack the same content. Both reveal layers use identical article geometry. The hero background video is independent of the removed reel.

Production build and TypeScript pass. Browser review confirms three rendered articles, no project tabs, no project dialog, no reel, matching reveal-layer heights, and no horizontal overflow in the retained responsive preview. Existing contact/enquiry functionality is preserved.

## Abstract studio film

Replaced the programmer/desk footage with licensed reflective CGI motion: a fluid chrome sphere and droplets, enlarged and graded for the studio hero. Desktop and mobile use separate crops and contrast layers. The approach section uses the matching abstract still rather than the rejected desk poster.

The local derivative is a silent 720 × 720 H.264 MP4 at 24fps, approximately 18.8 seconds and 2,810,769 bytes. A 1.2-second wraparound blend joins the end to the start. Its poster is extracted from the final film. Source and license are documented in `MEDIA-SOURCES.md`; this is stock artwork, not an original agency production.

Browser checks cover a clean desktop load, the retained responsive preview, a 320px phone layout, decoded playback readiness, and pause/resume. The pause control was moved outside the parallax/clipped background so focus and clicks do not follow the moving artwork into the next section. The alternate hero keeps its orange background. Existing offscreen/hidden-tab pause and live reduced-motion poster behavior are retained. Production build and TypeScript pass; no physical-device frame-rate claim is made.

## Reference-style project index

A focused live review of Minh Pham’s Clients list confirmed the large uppercase names, horizontal dividers, and orange centre-out band that reveals a description. `REFERENCE-STUDY.md` records the observed mechanism separately from the prior static REA evidence.

The Astra showcase now uses full-width rows with oversized project names, a 400ms exit / 600ms entry centre-out orange wipe, and a short description in the revealed desktop view. Every default row retains a real screenshot and headline. Each row is a direct link to its supplied project URL. Keyboard focus has the same reveal treatment; mobile displays names, images, headlines, and live-site indicators directly with the hover overlay disabled. The reel, selection tabs, project dialogs, and large foreground globe remain absent.

Validation for the index revision: the production build and TypeScript completed successfully. Browser checks confirmed all three project names and supplied links, the orange hover/focus reveal, sequential Tab navigation, a single keyboard highlight even with the pointer parked over another row, and visible 320px previews. Desktop base/reveal layers both measured 7,239.39px with zero horizontal overflow in the checked state. Default figure margins were removed so phone previews remain clear of the live-site indicator. Reduced-motion transition suppression remains in the shared stylesheet.

## Original kinetic background (supersedes the stock film)

The hero now renders original ruled-surface geometry in Three.js: 48 twisting metal ribbons with orange seams, subtle independent fanning, and damped fine-pointer response. A restrained lighting vignette protects the five-line headline. The approach background uses related CSS contours; neither section references either rejected stock clip or its poster. No video element is rendered or loaded.

The sculpture is loaded as a separate client chunk after entry, owns one local canvas, and disposes its geometry, materials, environment, renderer, observers, and listeners on unmount. Rendering skips hidden tabs and offscreen artwork. The pause control freezes animation; reduced-motion preference changes produce a static composition. Mobile uses a 30fps scheduling target and capped pixel density, with no touch pointer capture. A CSS line composition is the WebGL-unavailable/context-loss fallback. Preference/failure branches were reviewed in source; no operating-system setting was changed and physical-device frame rates were not measured.

Validation: production build and TypeScript pass; ESLint has zero errors and three existing native-image recommendations. Browser review confirms desktop and 390px/320px responsive compositions, pause/resume state, a visible mobile pause control, one hero canvas, zero video elements, and an empty checked browser error log. At 1280 × 720 the hero fits the viewport, page layers both round to 7,208px, and horizontal overflow is zero. Temporary responsive QA markup is removed after checking.

## The Threshold: selected architectural direction

The owner selected the Unseen Studio direction after reviewing four live studio references. The resulting Astra environment uses original generated architectural artwork with a circular limestone portal, warm horizon, broad steps, and reflecting water. A separately composed portrait artwork preserves the scene on phones. The served desktop and mobile assets are approximately 136KB and 117KB respectively; production PNG originals and prompts are retained.

The hero now pairs an italic serif opening line with a clean sans-serif second line, clear software-service copy, and a direct work link. Navigation is restrained and horizontal, with an Astra wordmark on desktop. The orange cursor mask is suppressed inside the hero to preserve the scene. The project index and contact functionality are retained.

A lightweight image shader adds slow 2.5D camera drift, damped fine-pointer movement, and very small foreground-pool refraction. The architecture is baked artwork, not a navigable realtime model. Static artwork remains beneath the canvas. Reduced motion skips the rendering effect; live preference changes dispose/recreate it. Context loss retains the artwork. Offscreen and hidden-tab rendering is skipped; a visitor pause/resume control freezes the scene. Phone rendering targets 30fps with a 1.25 pixel-ratio cap. These limits are configured rather than measured on physical devices.

Validation: production build and TypeScript pass. Browser inspection covers a clean desktop entry, the retained 661px content viewport, and 390px/320px responsive frames. Pause/resume and the direct work link were exercised. The mobile motion control and work CTA fit the 700px test frame after correcting natural content growth. Desktop base/reveal layers measure 7,207.97px each, with zero horizontal overflow; the hero fits a 1280 × 720 viewport. The checked browser error log is empty. Reduced-motion and WebGL-failure branches were reviewed in source; no OS preference was changed. Temporary responsive markup is removed after review.

## Architectural hero with the signature text reveal

Restored the pointer-following reveal inside the new hero, as requested by the owner. “Ideas into experiences.” is the primary headline; the registered second layer reads “A little less ordinary.” with alternate supporting copy. A muted copper surface and dark ink give the second voice a palette related to the architecture. The image remains visible outside the lens. Interactive controls collapse the lens. This supersedes the prior hero-specific mask suppression.

The two desktop headline boxes both measure 685.26 × 186.68px at exactly the same coordinates. Both heroes measure 720px high; both page layers remain 7,207.97px, with zero horizontal overflow. Native browser pointer interaction visibly revealed the alternate headline inside a 166.67px-radius circle; moving to the motion control collapsed it to zero. The motion control remained usable. The production build and TypeScript pass.

Touch retains the existing hold-to-reveal interaction and its keyboard handlers. Coarse-pointer phone CSS places the ambient motion control opposite the hold control and hides the redundant scroll hint to prevent overlap. This branch was reviewed in source; no physical touch-device claim is made.

## Unified studio and gallery pass

Extended The Threshold's material, spacing and typography through the studio, services, approach, selected work, principles, closing and contact/enquiry sections. The palette now uses warm ivory and muted copper. Fine dividers, quiet gradients, restrained section entrances and alternating image compositions replace the disconnected visual treatments. The closing portal reprises the opening artwork; no eye image or floating coffee/mouse scene is loaded.

Projects remain fully visible. Each chapter includes a large actual homepage screenshot, summary, description, focus tags and direct live-site links. Desktop media has a subtle perspective/lift; phones use flat media and stacked copy. Each project description has registered hidden measurement copy so its alternate message does not move the second page layer. The original hero and statement reveals remain. Reduced motion skips the new entrance effects and removes perspective movement; narrow layouts avoid scroll parallax and use shorter once-only fades.

Browser checks cover the desktop gallery, services, closing portal and contact, a 320px service expansion and gallery, and a 390px gallery/contact layout. The enquiry dialog opens and closes, and project/navigation links point to the supplied destinations. Project hover visibly exposes its alternate description through the copper circle. Default phone content gutters were corrected, a legacy contact padding was removed, the fixed phone header now maintains contrast over light project images, and touch targets in the principle rail/contact links/close control were enlarged. Anchor offsets use the installed Lenis support for CSS scroll margins so they are not counted twice.

Desktop page layers both measure 8,539.94px, with three gallery chapters, no decorative Three.js model targets, and zero horizontal overflow. The retained 661px content viewport also has equal layer heights and zero overflow. The checked browser error log is empty. Production build and TypeScript pass. No physical-device frame-rate or touch-gesture measurement is claimed; motion preference and coarse-pointer branches were reviewed in source. Temporary responsive markup is removed after review.

## Desktop films and typography pass — October 17, 2026

- Replaced static project mockups with inline, muted widescreen project films. All exports are genuinely 1920 × 1080; no portrait capture was stretched to desktop size.
- Removed perspective/device framing so the real work occupies the media stage. Direct live-site links remain independent of the pause controls; no nested interactive elements, modals, tabs, or project click gates.
- Space Grotesk + Manrope are locally hosted with upright styling throughout, including hero, closing statement, enquiry, and Open Graph graphic.
- Films attach their source when visible; offscreen films and hidden documents pause. Reduced-motion and Save-Data initially retain a poster; explicit play is available. The alternate reveal layer loads no extra video elements.
- Desktop browser: verified Zeltic decoded at 1920 × 1080, autoplay, pause, resume, and equal base/mirror heights with zero horizontal overflow. Further responsive validation is recorded below.
- Editorial film limitations: Nimbus captures are retimed/interpolated; Maestera includes still discovery views with dissolves. These are portfolio previews rather than complete recordings of every feature.
- Responsive browser checks at 390 × 844 and 320 × 740: zero horizontal overflow; base/alternate heights match within 0.01px; inspected headline/emphasis styles are upright. All three films decoded at 1920 × 1080, muted and inline. Nimbus played while Zeltic and Maestera paused offscreen. Explicit Maestera playback and Zeltic pause/resume verified.
- All three MP4 files decoded to completion without errors. Final sizes: Zeltic 3.31MB / 10.96s, Maestera 0.68MB / 8.08s, Nimbus 2.56MB / 10.92s. These load independently on visibility, not together on initial landing.
- Production build and TypeScript passed. ESLint: zero errors, two native-image optimisation advisories (existing closing artwork and the precompressed film poster). No browser console errors in the retained local preview. Physical iOS/Android devices and device-level reduced-motion preferences were not exercised.
- Temporary capture and responsive-test HTML pages were removed from public output. Browser viewport override was reset after capture setup.

## Bold headings and studio voice — October 17, 2026

- Increased display headings to locally available Space Grotesk 700: hero, work introduction, project names, services, closing statement, contact invitation, and enquiry heading. The smallest hero size is 40px to retain comfortable spacing at 320px.
- Added restrained humour to the hero supporting copy, service reveals, process alternates, project captions, enquiry introduction, and hidden text. Project descriptions retain their factual feature summaries.
- Browser verified display weights at 700, zero horizontal overflow at 390px and 320px, and identical base/alternate page heights. No alternate copy exceeded its measured container at 320px. Desktop and phone screenshots reviewed.
- Production build and TypeScript passed; temporary responsive check page removed. No qualifying Next.js feedback issues encountered.

### Hero headline refinement

Replaced the main headline and page/social titles with “Let’s build the good stuff.” The underlying “A little less ordinary.” reveal remains. Desktop and 320px phone views inspected: headline fits, no horizontal overflow, base/alternate heights identical. Production build passed. No qualifying Next.js feedback issues encountered.

### Distinct hero and matched reveal

Replaced the hero with “From ‘what if’ to ‘holy shit.’” and paired its two lines with “Less blah blah. / More ta-da.” The contact invitation “Let’s build the good stuff.” stays at the bottom. Hero lines explicitly avoid wrapping. At 320px, both voices remain two lines, with matching per-line heights and identical total page geometry; all text remains within the phone viewport. Desktop and phone views inspected, TypeScript passed, and no qualifying Next.js feedback issues encountered.
