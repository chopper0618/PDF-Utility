# SPRINT_1.0.2

## Theme

Neutral wording cleanup

## Sprint Goal

Make PDF Utility look like a general-purpose browser-based PDF page utility in public docs, without losing important privacy and operation notes.

## Background

Sprint 1.0.0 prepared the release checklist and trial-use docs. Sprint 1.0.1 aligned the app version display with `1.0.0-beta`.

Before linking the tool more broadly, the wording should avoid suggesting that the product is tied to a specific organization type or specialty. The tool should present itself as a lightweight PDF page utility that can be used in everyday work environments.

## Scope

- Clean up README wording.
- Clean up Project Docs wording.
- Clean up Google Sites listing wording.
- Replace sensitive-content wording with `個人情報`.
- Use neutral operational wording such as `所属先の情報管理ルール`.
- Keep the browser-side processing explanation.
- Keep the public GitHub Pages caution.

## Non-scope

- App feature changes
- Version bump
- Access control
- Google Drive integration
- Authentication
- Deployment changes

## Review points

- Public-facing docs should not imply a narrow industry-specific product.
- Privacy notes should not overstate safety just because processing is browser-side.
- The wording should still be simple enough for trial users.

## Acceptance criteria

- Removed environment-specific wording from source docs.
- Google Sites listing text is suitable for a general workplace tool.
- Release checklist uses `個人情報` wording.
- Known limitations use neutral privacy wording.
- No generated `dist` files are edited manually.
