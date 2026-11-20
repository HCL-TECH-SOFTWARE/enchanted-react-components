# Changelog

## Unreleased

### Added

- `Button` component built on the Base UI `Button`, with `variant`, `color`, `size`, `inverseColors`, `selected`, `startIcon`, and `endIcon` props, a `Default` story, and a Code Connect template.
- Light and dark color tokens from the Figma `Theme` collection, plus spacing, radius, stroke, and typography tokens used by the `Button`.

### Fixed

- `ThemeProvider` with `shadowRootType="none"` now provides a portal container (the themed host element) through `usePortalContainer`, so portaled popups (select menus, dialogs) can render inside `[data-theme]` instead of `document.body` and keep tokens, `dir` and styles. `open` and `closed` behave as before and provide the shadow root through the same hook.

### Changed

### Breaking changes