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

## Mobile hold reveal — October 17, 2026

- Replaced the old delayed, bottom-left hold control with a bottom-centred SVG hand, orbiting instructions, a visible charge ring, press compression, and a soft halo. Safe-area spacing and compact hero controls prevent overlap, including at 320px.
- The copper reveal grows from the actual button centre and uses the viewport's farthest-corner distance. It charges in 550ms, opens in 800ms, and returns in 600ms. Main and alternate text geometry remains aligned.
- Pointer capture supports release outside the button. Short taps cancel; repeated keydown does not restart the hold. Blur, page hiding, pointer cancellation, viewport and pointer-mode changes, and modal opening all clear the gesture. Mask cleanup clears stale hold state when responsive effects rebuild.
- Screen-reader click activation can toggle without a sustained gesture. Native Return-key hold/release and real pointer holds were verified. Optional 12ms haptic feedback runs only where the browser supports it.
- Actual DOM event log: charging to reveal approximately 558ms, reveal to full-screen approximately 836ms; after release, the mask returned to 0px. A 120ms tap recorded charging → idle with no committed reveal. Dragging off the control returned idle/unpressed. Focus loss also closed an active reveal.
- At 320px and 390px, no horizontal overflow; base and mirror heights match. At 320px, the 88px motion control ends at x104, the hold control begins at x114.5, and the scroll arrow begins at x227. The centred control is 80px. Reduced-motion branches and CSS were reviewed; device-level preferences and physical iOS/Android hardware were not exercised.
- Final production build and TypeScript passed. ESLint: zero errors and the same two native-image advisories. Temporary reference/gesture instrumentation page removed; no production test controls or event logs are shipped. No qualifying Next.js feedback issues encountered.

## Cinematic portal journey — October 17, 2026

- Added a native sticky hero chapter driven by the existing GSAP/Lenis scroll pipeline. The headline clears, the near stone moves past the lens, a separate ocean plate opens behind the actual window aperture, and a brief scroll-controlled black cut precedes the studio section. Reversing scroll reverses the entire sequence. Navigation links can skip the journey.
- This is a layered 2.5D reconstruction using original artwork, not a navigable 3D room. Desktop and mobile use independently authored SVG aperture mattes. The replacement sun is registered during the early dissolve to avoid a double image; the distant view then moves independently of the stone.
- Desktop travel is 180svh; mobile travel is shortened to 135svh. Reduced motion removes the extended sticky chapter and WebGL motion. The original picture remains underneath WebGL and is the asset/context-failure fallback. Ambient pause continues to freeze water/time while intentional scroll can move the scene. All new textures are disposed on cleanup.
- Both text layers share native sticky geometry, avoiding pin-spacer drift. Text reveal remains at the hero's resting position and returns on reverse scroll. The lens and hold control clear during travel; navigation remains available until the brief black cut. Faded controls become inert.
- Browser review: full 1920 × 1080 desktop frame and 390 × 720 / 320 × 720 phone frames. Phone page heights match exactly; desktop differs by less than 0.01px. No horizontal overflow. Two hero lines in both voices at 320px. Reviewed aperture, open ocean, full black, following studio chapter, and reverse/home navigation. The checked phone error log is empty. Physical-device frame rates and OS reduced-motion settings were not measured; reduced-motion and failure paths were reviewed in source.
- Final verification: production build and TypeScript passed; ESLint reports zero errors and the same two existing native-image advisories. Temporary review HTML removed. A native Return-key hold after returning home finished idle with a zero-radius mask. Desktop review error log is empty. Next.js feedback reporting pass: no qualifying framework issues retained.

## Direct studio handoff — October 17, 2026

The studio introduction now overlaps the end of the architectural journey. Its text fades into a vertically centred sticky reading stage while the ocean fades out, removing the former full black viewport and the extra scroll needed to bring the next section up from below. Further scrolling runs the original left-to-right line reveal in sequence on desktop and mobile, then releases the text into services. The alternate voice shares the same sticky geometry. Reduced motion retains a normal, fully visible introduction without the overlap or extra reading stage.

Browser review at 1280 × 800, 390 × 720, and 320 × 720 confirms the introduction at viewport top 0, visible during the final scene fade, and sequential line clips progressing from unrevealed to fully revealed. Base and mirror heights match exactly; phone widths have no horizontal overflow. Corrected the studio anchor's CSS specificity so its negative scroll margin lands after the fade, on the centred visible introduction. Tested the actual studio link: intro top 0 and opacity 1. Checked desktop error log is empty. Temporary responsive review page removed.

Final validation: production build and TypeScript passed; ESLint has zero errors and the same two native-image advisories. No qualifying Next.js feedback issues were retained in this request's reporting pass.

## Stable hero entry framing — October 17, 2026

Reproduced the sideways entry shift: at a 900px viewport, the scene host settled at 889px while its canvas retained a 929px inline display width. The renderer had sampled transformed bounds during the entrance zoom, and the tablet picture used a different crop from the shader. The shader also started 2.5% closer than the picture.

The renderer now uses untransformed client dimensions and leaves display sizing to CSS. Entry fades without scaling the background. Picture and shader both use centred cover framing at every breakpoint, and the shader begins at scale 1 before its very small ambient drift. The scrollbar gutter is reserved during the intro, preserving the content width when Enter unlocks scrolling. The first render also receives the current scroll progress.

Temporary browser instrumentation sampled actual DOM dimensions from approximately 290ms to 2.5s after Enter. At 900px, all post-fix host/canvas widths were 889px; at 390px they were 379px; at 1280px they were 1269px. No inline canvas display width remains; all image crops are 50% 50%. The body already had those same widths before entry. Desktop and phone compositions were visually checked; the checked browser error log is empty. Temporary entry-review HTML was removed.

Final validation: production build and TypeScript passed. ESLint reports zero errors and the same two native-image advisories. The cinematic scroll still updates after the entry correction. This request's Next.js feedback reporting pass found no qualifying framework issues.

## Decoded background fade — October 17, 2026

The architectural picture is now prerendered and mounted behind the entry screen instead of first mounting after Enter. The preloader awaits image decoding. The scene separately confirms its displayed image is decoded and painted before permitting the entrance fade. WebGL prepares its first frame behind the entry screen; ambient time and pointer motion stay paused until entry. The picture remains the fallback when motion is reduced or WebGL fails.

The old mount-time background animation is replaced by an Enter-triggered 1.6s opacity transition with an 80ms lead-in and a gentle ease. The animated canvas has a separate 1.2s dissolve over the already aligned still image. There are no background transforms in the fade. Reduced motion uses an immediate reveal.

Browser checks at 1280 × 800 and 390 × 720 found the decoded image and prepared canvas behind the entry screen at opacity 0. After Enter, observed opacity progressed through approximately 0.014 at 200ms, 0.134 at 400ms, 0.435 at 600ms, 0.704 at 800ms, 0.938 at 1.2s, and 1 by 1.8s. Image/canvas widths stayed equal and transforms remained none. The checked browser error log is empty. These are local-browser measurements; physical-device performance and throttled remote networks were not measured. Temporary instrumentation removed.

Final validation: production build and TypeScript passed. ESLint reports zero errors and the same two native-image advisories. The Next.js feedback reporting pass retained no qualifying framework issues.

## Mobile navigation and interaction polish — October 17, 2026

Adapted the reference's always-visible vertical mobile menu with rolling labels, an active section state, and 100 × 44px touch targets. The Astra logo now compresses as the hold charges, then tilts, winks, smiles, and turns its spark when the alternate view opens. Release restores its normal expression. The floating caption above the hold circle has been removed; circular instructions, screen-reader guidance, and the gesture remain.

Removed the orange Start focus ring while retaining a visible ivory filled keyboard focus state. The fixed header is transparent without backdrop blur in both normal and revealed modes. Wheel scrolling now uses Lenis interpolation with modest wheel damping, while touch retains native inertia. Reduced motion disables smooth-wheel animation. Reduced the portal's additional scrub delay to avoid compounded lag.

Browser checks at 390 × 720 and 320 × 720 confirmed no caption, 44px menu targets, and no horizontal overflow. Work and Contact links landed correctly and updated aria-current. Actual pointer holds recorded charging → revealed after approximately 533–566ms → idle on release; a 120ms tap returned idle without revealing. The revealed logo's smile reached opacity 1 and the header's computed backdrop filter was none with a transparent background. Physical-device frame rates were not measured.

Production build and TypeScript passed. ESLint has zero errors and the same two existing native-image advisories. Temporary responsive instrumentation was removed. Next.js feedback reporting pass: no qualifying framework issues retained.

## Readable supporting typography — October 17, 2026

A runtime audit found desktop labels at 7–11px and mobile controls at 6px. Added a consistent final typography scale: 16px descriptions and body copy, 14–15px supporting text and actions, and 12–13px small labels. Increased muted copy contrast, retained dark ink on the alternate copper layer, and added navigation text shadows over bright artwork without reintroducing a header background or blur. Display headings remain unchanged.

Project categories, tags, film captions, process descriptions, principle captions, contact labels, footer credits, the loading screen, and enquiry controls are all larger. Shortened the film caption and circular hold instruction to fit legibly. The mobile motion control uses a readable 12px label within a 96px button, clear of the central hold control. Larger service copy has additional vertical room; the enquiry Close button now occupies its own row above the label.

Browser verified at 1280 × 720, 390 × 720, and 320 × 720. Desktop and mobile pages have no horizontal overflow. At 320px, expanded service copy fits within its 331px panel, form labels are 15px, fields 16px, and helper text 14px; the dialog has no horizontal overflow. The mobile motion button ends at x108 and the hold circle starts at x114.5. Base and alternate layer heights match exactly at 320px and 1280px. A computed text audit found no remaining sub-12px ordinary text (the small principle navigation arrow is decorative). Reviewed hero, project details, expanded services, and enquiry form visually. Physical devices and browser zoom were not exercised.

Production build and TypeScript passed; ESLint has zero errors and the two existing native-image advisories. Temporary responsive review fixture removed. Next.js feedback reporting pass: no qualifying framework issues retained.

## Refined hold seal and ambient control removal — October 17, 2026

Reworked the mobile hold control as an 84px etched seal with a fingerprint centre and small, balanced circular instructions. Its slower 28-second text orbit pauses during charging and reveal. Pressing compresses the centre, fills the progress ring, and emits a restrained halo. The revealed state turns copper and replaces the fingerprint with an outlined Astra spark; release reverses the expression and resumes the orbit. The header logo remains connected to the same phases. No caption pill was reintroduced. Keyboard, pointer-capture, cancellation, and assistive-toggle behavior remain intact; reduced motion disables decorative movement.

Removed the ambient motion on/off button and its React pause state from the architectural scene. The scene still honours reduced motion, page visibility, intersection visibility, and the entry preparation state. Project-film playback controls are unchanged.

Browser verified at 390 × 720 and 320 × 720: no motion-toggle element, no horizontal overflow, and an 84px hold target. A real 120ms tap returned charging → idle; a real 1.5-second hold reached revealed after about 545ms and returned idle on release. Settled reveal showed fingerprint opacity 0, spark opacity 1, paused orbit, and the logo in its revealed phase. After release, progress reset to 100, fingerprint returned, spark hid, and orbit resumed. Final idle and reveal screenshots retained outside public output. Physical-device haptics and frame rates were not measured.

Production build and TypeScript passed. ESLint reports zero errors and the two existing native-image advisories. Removed the temporary hold-review fixture. Next.js feedback reporting pass retained no qualifying framework issues.

## Complete mobile spacing and motion review — October 17, 2026

Reviewed the portal journey, centred studio handoff, every service expansion, process copy, all three project films, principle navigation, closing statement, footer links, enquiry form, local brief preview/editing, and return-to-top flow. Browser layouts checked: 320 × 568, 390 × 720, 430 × 720, 667 × 375, and 844 × 390. These are browser viewport checks, not physical-device or frame-rate measurements.

Fixed overlapping invisible mobile navigation hit areas by removing the old pseudo-element expansion; each link already has its own 100 × 44px area. Restricted desktop cursor-reveal tracking to noncompact layouts, preserving the explicit mobile hold interaction. Principle jumps now use the shared Lenis anchor pipeline with centred destinations instead of a competing native smooth-scroll call.

At 320 × 568, the old 700px pinned hero placed its primary action behind the fixed hold control. Short portrait screens now use their actual viewport height and a reserved lower control area: the settled work action ends at y421.48, with the hold control starting at y466. The footer's own index now temporarily replaces floating chrome only while its links or credits cross the header band, avoiding duplicate overlapping navigation. Returning to the hero restores the chrome. Added a subtle shadow behind the hero eyebrow over bright sky.

Short landscape phones use a normal 600px hero and studio flow instead of a pinned journey whose early fade could hide the CTA before it became reachable. The hold control becomes 68px in the lower-right corner; sound has a 44px target in the opposite corner. Desktop hover hints and shortcut controls are suppressed in this layout. Landscape changes are tracked by media queries so the motion pipeline rebuilds when the orientation layout changes.

All reviewed base and alternate layers matched in height; scans found no horizontally outlying text or page overflow. Service descriptions fit their expanded panels. Project films reported 1920 × 1080, with the visible film playing and the other two paused. The enquiry form generated a local brief from dummy review data, and editing restored the entered values; no email was sent. A real 1.6-second hold on the smallest portrait layout recorded charging → revealed → idle, restored the logo, and left a zero-radius mask. The checked browser error log was empty.

Final production build and TypeScript passed. ESLint reports zero errors and the same two existing native-image advisories. Temporary responsive review instrumentation removed. Next.js feedback reporting pass: no qualifying framework issues retained.

## Zeltic particle interaction film — October 17, 2026

Replaced the active Zeltic product-animation montage with a dedicated particle-wordmark cinematic. Used native browser cursor sweeps on the actual supplied project in a 1920 × 1080 desktop layout. The browser's raster capture surface was 1872 × 1072. The delivered 1920 × 1080 H.264 film uses a 1672 × 940 crop that removes the site navigation, a restrained 2.5% camera push, frame-blended 30fps delivery, and an 800ms wraparound dissolve. This is edited live-site footage, not generated product imagery or a claim of native 30fps recording. Discarded an incomplete continuous-capture experiment; the delivered film uses the complete sequential sweep across the wordmark.

The new active assets are `public/videos/projects/zeltic-particles.mp4` (8.766667 seconds, approximately 2.9MB) and `public/images/projects/zeltic-particles.webp` (1920 × 1080, approximately 62KB). Old Zeltic assets remain archived but are no longer referenced by the project data. Keyed ProjectFilm by the selected film path so changing the asset remounts playback and clears any stale ready/failed state.

Decoded the entire finished film without errors and visually inspected a frame with a pronounced particle trail. Browser verified actual playback on desktop and at 390 × 720: videoWidth 1920, videoHeight 1080, readyState 4, advancing currentTime, no media error, and object-fit contain on mobile. Pause/resume controls worked. The desktop preview error log was empty. Captured final desktop/mobile evidence outside public output. Temporary film review page removed and the browser viewport override reset; the source capture tab was closed.

Production build and TypeScript passed. ESLint has zero errors and the same two existing native-image advisories. Next.js feedback reporting pass retained no qualifying framework issues.

## Owner-supplied Zeltic recording — October 17, 2026

Reviewed the supplied 13.75-second MOV at multiple points across its cursor sweeps and recovery. Its continuous captured motion and larger particle trails were stronger than the preceding screenshot-sequence edit, so it is now the active gallery film. The supplied original was not modified.

Removed the top navigation, preserved the full horizontal recording area, and scaled proportionally with a small letterbox to 1920 × 1080. Moved a one-second settled-wordmark moment to the opening, followed it with the actual sweep/recovery sequence using a 300ms introductory dissolve, and removed excess idle time. The 11.5-second loop ends at the same source moment used at its beginning. Playback speed and particle motion are unchanged; source frames are converted to constant 60fps without motion synthesis. Audio is stripped for the silent project-card loop.

The new active film is `public/videos/projects/zeltic-cursor-cinematic.mp4` (approximately 6.5MB versus the supplied approximately 88MB MOV), with a new 1920 × 1080 poster `zeltic-cursor-cinematic.webp`. Final encoding was explicitly checked as H.264 High, Level 4.2, yuv420p, 60fps, with fast-start metadata. Added the final yuv420p conversion after the dissolve to avoid the filter's automatic 4:4:4 output. Previous film assets remain inactive for history.

The complete final file decoded without errors. Browser checked the new recording on desktop and at 390 × 720: source path correct, videoWidth 1920, videoHeight 1080, duration 11.5, currentTime advancing, paused false, no media error, and object-fit contain on mobile. Production build and TypeScript passed. The temporary responsive review fixture was removed. Next.js feedback reporting pass retained no qualifying framework issues.

## Moving water treatment — October 17, 2026

Reviewed the installed Three.js Water and Water2 implementations and the official Water documentation. Their reflected/refracted render targets depend on scene geometry; adding them directly to the illustrated room would not reconstruct its reflections. Kept the existing Three.js renderer and replaced its two screen-space sine distortions with a four-direction wave spectrum projected into water-plane coordinates. Wavelengths compress toward the shore, multiple periods keep the motion from moving as a single sheet, and restrained luminance modulation follows the original sunset reflections. This remains a 2.5D treatment of the original still artwork, not a physical ocean simulation.

Added separate desktop and mobile water mattes with foreground and distant-water channels. Sample the matte before and after displacement to avoid pulling stonework into the water. Steps, pier, shoreline, sky, and mountains are excluded. Applied the same motion model at a smaller scale to the ocean continuation so it remains animated during the scroll-through. Wave calculations skip dry pixels, and the continuation branch skips completely until it is visible. No new runtime dependency or external texture request was added. Existing reduced-motion, context-loss, visibility, cleanup, and mobile scheduling behavior remain in place.

Inspected consecutive native browser captures of the reflection movement, then checked the hero at 1280 × 720 and 390 × 720 and the mobile ocean transition. Both layouts reported a ready canvas, matching layout bounds, and no horizontal overflow. Browser error/warning log was empty. Production build including TypeScript and focused component ESLint passed. This was browser-based verification; physical-device performance was not measured. Next.js feedback reporting pass: no qualifying framework issues retained.

## Simpler projects and clearer waves — October 17, 2026

Reduced each project information panel to its name, a short descriptive sentence with personality, and one Visit website action. Removed the second title arrow/link, separate marketing headline, focus tags, repeated agency credit, and film caption. Kept the actual product film clickable and its accessible playback control. The single category/index label remains visible at every breakpoint. Base and alternate copy retain the shared reveal geometry.

Increased water displacement from .0075/.0028 to .018/.008 in source-image UV space, raised the pool's phase speed from .8 to 1.35, and strengthened reflected-light modulation. Distant water and the continuation ocean received proportionate increases. Retained the protective water mattes and distance fade so increased motion cannot deform the stonework or horizon.

Reviewed the simpler desktop and mobile cards and captured consecutive frames of the stronger water motion. All three cards reported exactly one information-panel arrow and no tags. At 390px and 320px, there was no horizontal overflow; base/alternate description heights matched and the alternate text fit. The browser warning/error log was empty. Production build including TypeScript, focused ESLint, and diff whitespace checks passed. Next.js feedback reporting pass retained no qualifying framework issues.
