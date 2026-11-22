# Aidan Reaves portfolio

A personal portfolio styled as **Guitar Hero III** menus. Vue 3 (`<script setup>`) + Vite 7, no
router library, no CSS framework. Deployed on Vercel from `main`.

## Commands

- `npm run dev`: dev server on http://localhost:5173 (also `.claude/launch.json` → "vite")
- `npm run build`: production build (run before every commit; there are no tests or linter)

## Screens and routing (`src/App.vue`)

Hash routing by hand. `screen` is one of these, and its hash is in `HASHES`:

| screen      | hash            | component                                                |
| ----------- | --------------- | -------------------------------------------------------- |
| `menu`      | (none)          | `menu/LandingMenu.vue`: title poster + main menu         |
| `setlist`   | `#careers`      | `setlist/Setlist.vue`: the setlist (Careers)             |
| `bonus`     | `#bonus`        | `setlist/BonusOverlay.vue`: About Me sheet over setlist  |
| `downloads` | `#downloads`    | `setlist/DownloadsOverlay.vue`: resume sheet over setlist |
| `skills`    | `#skills`       | `skills/SkillsPage.vue`                                  |
| `who`       | `#who-is-aidan` | `who/WhoIsAidan.vue` + `who/CharacterStage.vue` (three.js), **switched off** |

- `navigate(to)` pushes `{ screen, prev }` onto history. If `to === history.state.prev` it calls
  `history.back()` instead, so the in-page Back pill and the browser Back button stay in sync.
- Bonus/Downloads are laid on top of the setlist and **stay mounted** (`v-show`), so the setlist
  never moves under them. Each takes an `active` prop that switches its keyboard handling on or off.
- Back (red pill / Esc): sheet → setlist → menu. Skills and Who go back to the menu.
- The Skills page may only be left with its red Back pill (or Esc) and the browser's Back button.
  Don't add other navigation to it.
- `/schedule` (Vercel rewrite in `vercel.json`) opens the Calendly popup.
- **Who Is Aidan? is hidden in production** (`features.whoIsAidan = false` in `src/data/menu.js`): no
  menu option, and its hash opens the menu. Its code stays in the repo for later. Don't turn it on
  unless the user asks.

## Content lives in `src/data/`

Change content here, not in components.

- `setlist.js`
  - `sections`: Work Experience, Projects, School Projects. Track fields: `title`, `meta`
    (second line), `date` (under the stars), `href`.
  - `schoolProjects`: `course` and `courseName` make up the second line, and `tech` goes under
    the stars.
    - Their section is `static: true`. Rows highlight on hover but have no link and do nothing
      on click, for now.
    - `description` (an array of paragraphs) isn't rendered yet; it's saved for a future popup.
      Don't show it.
  - `aboutMe`: the Bonus sheet.
  - `resume`: the Downloads sheet (`public/resume.pdf`).
- `menu.js`: the title menu options, and `features` flags for pages that are built but hidden. `skills.js`: the skill groups, taken from the resume.
- `whoIsAidan.js`: `profile` and `outfits`.
  - Each outfit's `model` is a `.glb` path in `public/models/`.
  - While `model` is null, a stand-in mannequin colored with `colors` is shown.

## Visual rules (important)

- **Recreate GH3 faithfully.** Don't redesign or reinterpret the user's reference images.
  - No generic portfolio patterns: no cards, no hamburger menus.
  - Mobile keeps the same look.
- Art lives in `src/assets/`:
  - `setlist/`: row crops and the wood floor
  - `bonus/`: the blue sheet and paperclip
  - `landing/`: the title poster
- Shadows are baked into the images wherever possible.
- **Setlist frame:** 1800 units wide, `container-type: inline-size`, so 18 units = `1cqw`.
  Positions are percentages or cqw measured from the art.
  - Text sizes have px floors (`max(4.7cqw, 18px)`) so phones stay readable.
- Fonts (Google Fonts, `index.html`) and colors are CSS variables in `src/assets/base.css`:
  - Caveat Brush: titles
  - Pathway Gothic One: caps lines
  - Barlow Condensed italic 700: control pills and menu text
  - Pirata One: headings
- **Control pills (`.gh-pill`):** solid `#858585`, sitting edge to edge, no gradients.
  - Build them with `shared/ControlBar.vue`, which takes `{ label, icon, keys, kbd, action }`.
  - `kbd: true` hides a pill on touch screens.
- Highlight color on dark screens: `#ffd21f`, slightly enlarged.
  - **Menu highlights snap instantly, with no transitions.** The user wants a harsh PS2 feel,
    not smooth easing.
- `Track.vue` shrinks overlong titles and second lines to fit (`--title-fit` / `--meta-fit`).
  Check that new rows fit at about 375px wide and at desktop width.
- Title poster (`landing/title-poster.webp`, 1920x1080) always **fills the screen**, like
  `cover`, anchored to the bottom so the baked-in CONTINUE / UP/DOWN hints stay visible. Portrait
  screens zoom in on the logo and menu instead.
- Wood: `body` background `wood-floor.webp`, made by `scripts/generate-wood.py`. Boards are never
  stretched.

## Performance

- Avoid `filter: drop-shadow`, `mix-blend-mode` and `backdrop-filter` on large elements: they
  caused hover lag. Use baked shadows or `box-shadow` pseudo-elements instead.
- Heavy libraries are imported on demand:
  - pdf.js in `ResumeView.vue`
  - three.js in `CharacterStage.vue`
- Keep them out of the main bundle.

## Workflow preferences

- Work on `main` unless told otherwise.
- **Commit when the work is done, but only push when the user says so.** The user often tests
  locally first.
- Check changes in the preview at desktop width and at 375px (mobile preset):
  - no horizontal scroll (`scrollWidth === innerWidth`)
  - no console errors
