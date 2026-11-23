# Changelog

## Unreleased

### Added

### Fixed

- `ThemeProvider` with `shadowRootType="none"` now provides a portal container (the themed host element) through `usePortalContainer`, so portaled popups (select menus, dialogs) can render inside `[data-theme]` instead of `document.body` and keep tokens, `dir` and styles. `open` and `closed` behave as before and provide the shadow root through the same hook.

### Changed

### Breaking changes

- Removed `useBoundary` and `BoundaryContext`. Nothing in the library used them once `usePortalContainer` existed, and they were `null` without a shadow root. Use `usePortalContainer()` for portal containers.