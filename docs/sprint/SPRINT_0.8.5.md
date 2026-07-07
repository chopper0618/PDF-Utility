# Sprint 0.8.5: Preview UI polish

## Goal

Make the preview overlay more useful for checking PDF content by giving more space to the page and adding simple zoom controls.

## Implemented

- Changed the preview overlay to use a compact header and a larger PDF display area.
- Moved preview navigation and zoom controls into the header.
- Removed the large footer from the preview card.
- Added fit-to-window-height initial display.
- Added zoom in, zoom out, and fit reset controls.
- Kept the fit reset control explicitly labeled and separated the current zoom percentage.
- Adjusted zoomed preview scrolling so the left edge remains reachable.
- Reverted Page Map filenames to a simpler leading-text ellipsis for stability.
- Improved disabled visual feedback for preview navigation and zoom buttons.

## Product decision

The preview should first show the whole page. Users can then zoom in only when they need to inspect details.

This keeps the default behavior safe and predictable for page confirmation work.

## Not included

- Ctrl/Command + wheel zoom.
- Drag-to-pan.
- Double-click zoom toggle.
- Rotation controls inside preview.

These can be considered later if the current button-based zoom is not enough.

## Review checklist

- Preview opens with the page fitted to the window height.
- The initial preview does not require vertical scrolling to see the whole page.
- Header is compact and PDF display area is larger.
- Zoom in works.
- Zoom out works.
- Fit reset returns to the initial fit view.
- Fit control remains recognizable after zooming.
- Zoomed preview can be scrolled to the left edge.
- Previous/next navigation still works.
- Preview shortcut safety is preserved.
