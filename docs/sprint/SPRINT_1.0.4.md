# SPRINT_1.0.4 - Preview render quality improvement

## Goal

Improve readability in the preview overlay when zooming into detailed PDF pages.

## Why

Trial use showed that the preview overlay works, but detailed pages with small text and table lines can look blurry when zoomed. This reduces the usefulness of the preview for checking page contents before exporting.

A small quality improvement is appropriate before adding larger future features.

## Scope

- Render the active preview page at a higher width.
- Keep thumbnail rendering unchanged.
- Keep export, page operation, save behavior, and browser compatibility behavior unchanged.
- Update project docs for the sprint.

## Non-scope

- Full PDF viewer rewrite.
- High-resolution rendering for all pages.
- Thumbnail quality changes.
- Annotation, stamp, signature, image insertion, split export, or print layout features.

## Implementation note

The preview overlay continues to use the existing image-based preview flow. Only the render width for the active preview page is increased.

## Acceptance checklist

- [ ] Preview image generation uses the new preview render width.
- [ ] Thumbnail generation remains unchanged.
- [ ] Preview zoom is visibly less blurry on text-heavy or table-heavy pages.
- [ ] `npm run build` succeeds.
