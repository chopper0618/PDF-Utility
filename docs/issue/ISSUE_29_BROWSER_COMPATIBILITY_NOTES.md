# ISSUE_29_BROWSER_COMPATIBILITY_NOTES

## Title

Document browser compatibility and Safari save limitations

## Background

During trial checks, Chrome worked for opening, loading, previewing, and saving PDFs. Safari can open and use the app, but save behavior is limited by the browser: file name and destination may not be selectable from the app flow, and the PDF may be saved according to Safari or OS download settings.

A previous attempt to make save behavior independent from browser limitations was not adopted because browser-based apps cannot fully control the native save dialog across all browsers. Reworking export again at this stage would risk destabilizing an otherwise usable beta.

## Decision

Keep the current save implementation.

Document the browser differences clearly:

- Chrome is the recommended browser for trial use.
- Edge should be checked when an environment is available.
- Safari is conditional support: PDF operations can work, but save name / save destination selection is limited.
- Safari users should rename or move the exported PDF after saving if needed.

## Scope

- Update `docs/release/KNOWN_LIMITATIONS.md`.
- Update `docs/release/RELEASE_CHECKLIST_1.0.0.md`.
- Update `docs/release/GOOGLE_SITES_LISTING.md`.
- Update project status and roadmap.
- Add this issue and Sprint 1.0.3 docs.

## Non-scope

- Reimplementing PDF export.
- Adding a custom save dialog.
- Trying to reproduce OS-level save destination selection in Safari.
- Adding Google Drive integration.
- Adding authentication or API-based storage.

## Acceptance criteria

- [ ] Chrome is documented as the recommended browser.
- [ ] Safari save limitation is documented in known limitations.
- [ ] Safari condition is included in the release checklist.
- [ ] Google Sites listing copy includes a short browser note.
- [ ] No app save logic is changed.
