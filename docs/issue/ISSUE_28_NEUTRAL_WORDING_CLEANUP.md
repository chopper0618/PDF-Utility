# ISSUE_28_NEUTRAL_WORDING_CLEANUP

## Title

Neutral wording cleanup for public docs

## Background

PDF Utility is published on a public GitHub repository and GitHub Pages URL.

The product is intended to be a general browser-based PDF page utility. Public-facing docs should not make the app look tied to a specific organization type, specialty, or workflow.

Before wider trial use, wording in README and Project Docs should be made neutral.

## Problem

Some docs used organization-specific wording for the original use case.

This creates two issues:

- The public repository appears less general than the actual product.
- Safety notes may sound tied to a specific environment instead of general information management practice.

## Goal

Make README and Project Docs use neutral wording while keeping important safety guidance.

## Scope

- Replace organization-specific wording with neutral wording.
- Use `個人情報` instead of narrower wording for sensitive PDF contents.
- Keep the explanation that PDFs are processed in the browser.
- Keep the note that the GitHub Pages URL is public.
- Keep Google Drive / API key / authentication non-integration notes.
- Update Google Sites listing copy.
- Update release checklist and known limitations.
- Update AI role / product mission wording to a general daily-work PDF tool.

## Non-scope

- Functional app changes
- Version number change
- Deployment workflow changes
- PDF processing logic changes
- Access control implementation

## Acceptance criteria

- README no longer uses the removed environment-specific wording.
- Project Docs no longer use the removed environment-specific wording.
- Google Sites listing uses `個人情報` and `所属先の情報管理ルール` wording.
- Safety wording remains clear: browser-side processing does not remove responsibility for save/share handling.
- App behavior is unchanged.
