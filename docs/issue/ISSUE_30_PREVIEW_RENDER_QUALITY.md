# ISSUE_30_PREVIEW_RENDER_QUALITY

## Title

Improve preview render quality when zooming

## Background

The preview overlay is useful for checking page contents, but text and table lines become blurry when the user zooms in. The current preview image is generated at a fixed width that is much larger than thumbnails, but it can still be too low for detailed documents when the preview zoom is raised.

The goal is not to build a full PDF viewer or to render every page at high resolution. The app should remain lightweight and focused on page editing.

## Decision

Increase the render width used only for the active preview page.

Keep thumbnail rendering unchanged so the main grid stays lightweight.

## Scope

- Increase preview overlay render resolution.
- Keep the change limited to the preview image generation path.
- Add this issue and Sprint 1.0.4 docs.
- Update project status, roadmap, and changelog.

## Non-scope

- Replacing the preview overlay with a full PDF viewer.
- Rendering all pages at high resolution in advance.
- Changing thumbnail quality or thumbnail generation speed.
- Adding annotation, stamp, signature, or other editing features.

## Acceptance criteria

- [ ] Preview uses a higher-resolution image than before.
- [ ] Thumbnails are not affected.
- [ ] Preview zoom makes text and lines easier to read than before.
- [ ] PDF loading, page operations, and export behavior are unchanged.
