# Changelog

## Unreleased

### Added

- `Checkbox` component built on Base UI Checkbox, with `variant`, `error`, `showLabel`, `helperText`, `showHelperText`, `errorMessage` and `showErrorMessage` props, shadow-boundary styles, stories, unit tests and a Code Connect template.
- Design tokens from the Checkbox Figma design: `padding`, `cornerRadius`, `stroke`, `typography` and `checkbox` groups in both themes.
- `@hcl-software/enchanted-icons-react` 2.1.0 as a dev dependency (approved icon source).

### Fixed

- `ThemeProvider` with `shadowRootType="none"` now provides a portal container (the themed host element) through `usePortalContainer`, so portaled popups (select menus, dialogs) can render inside `[data-theme]` instead of `document.body` and keep tokens, `dir` and styles. `open` and `closed` behave as before and provide the shadow root through the same hook.

### Changed

### Breaking changes