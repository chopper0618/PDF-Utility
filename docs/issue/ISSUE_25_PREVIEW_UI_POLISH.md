# Issue #25: Preview UI polish

## Purpose

Improve the thumbnail preview overlay so it can be used for practical page confirmation, not only as a larger thumbnail.

## Requirements

- Initial preview should fit the PDF page to the available window height.
- Users should be able to see the whole page without vertical scrolling on initial open.
- The preview header should be compact so the PDF display area is larger.
- Preview zoom controls should allow users to enlarge details and return to fit view.
- The fit reset control should remain clearly labeled even after zooming.
- Zoomed previews must allow access to the left edge of the page.
- Existing preview navigation and shortcut safety must remain intact.

## Scope

### In scope

- Compact preview header.
- Larger PDF display area.
- Fit-to-window-height initial preview.
- Zoom in, zoom out, and fit reset controls.
- Disabled visual states for unavailable navigation/zoom buttons.

### Out of scope

- Mouse wheel zoom.
- Drag-to-pan.
- Double-click zoom toggle.
- Rotation controls inside preview.
- Printing from preview.

## Acceptance criteria

- Opening preview shows the whole page without needing vertical scrolling in normal window sizes.
- Header is smaller than the previous preview header.
- PDF display area is larger than before.
- Zoom in makes the preview larger and allows scrolling when needed.
- Zoom out returns toward the fit state.
- Fit reset returns to the initial fit view and remains labeled as Fit.
- Zoomed preview can be scrolled to the left edge.
- Previous/next preview navigation still works.
- Delete/Backspace and other page operation shortcuts still do not fire while preview is open.
