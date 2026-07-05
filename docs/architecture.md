# Architecture

PDF Utility uses a modular browser application architecture.

## Layers

- Core: application state and event bus.
- UI: layout components and rendering.
- PDF: loading, thumbnails, editing, and export.
- Plugins: future extension points.

## State Model

Pages will be managed as independent objects so that rotation, deletion, duplication, ordering, and undo/redo remain simple.
