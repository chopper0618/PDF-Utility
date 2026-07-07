# SPRINT_1.0.3 - Browser compatibility notes

## Goal

Clarify browser support for the 1.0.0-beta trial without changing the current save implementation.

## Why

Trial checks confirmed that the app works in Chrome and Safari for basic use, but Safari has a save limitation: file name and save destination may not be selectable during export. This is a browser limitation, not a PDF Utility page operation failure.

The safest 1.0.x approach is to document this clearly and keep the stable save flow unchanged.

## Scope

- Add Safari save limitation to known limitations.
- Add Safari conditional support to the release checklist.
- Update Google Sites listing text with recommended browser notes.
- Mark Chrome as the recommended browser for trial use.
- Keep Edge as a check item when an environment is available.

## Non-scope

- Save dialog redesign.
- Browser-independent save picker implementation.
- Google Drive save integration.
- Any change to PDF import, page operation, preview, or export logic.

## Trial browser position

| Browser | Position | Notes |
|---|---|---|
| Chrome | Recommended | Primary trial browser. |
| Edge | Expected compatible | Check when an environment is available. |
| Safari | Conditional | Can be used, but save name / destination selection is limited. |
| Firefox | Not primary | Not part of 1.0.0-beta trial target. |

## Acceptance checklist

- [ ] `KNOWN_LIMITATIONS` explains Safari save behavior.
- [ ] `RELEASE_CHECKLIST_1.0.0` includes Safari as conditional support.
- [ ] `GOOGLE_SITES_LISTING` includes a short browser note.
- [ ] `CURRENT_STATUS` and `ROADMAP` reflect Sprint 1.0.3.
- [ ] No source code save logic is changed.
