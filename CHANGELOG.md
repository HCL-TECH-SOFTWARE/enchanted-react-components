# Changelog

## Unreleased

### Added
- Added the `list--edit` icon to the icons preview
- Added the `ToggleButton` component
- Added the `HCLSoftwareBlue 07 (20P)` color
- Added the `selectedOpacityHover` in theme.palette.action
- Added the `Accordion` component.
- Added the `disableOpacityHover` color to the colors.
- Added the `List` component.
- Added the `Tab` component.
- Added the `ToggleButtonGroup` component.
- Added the `ProgressBar` component.

### Fixed

### Changed
- Added hasThumbnail and disabled properties to the Tile component. 
- Added as hover image preview icon for the Tile component.
- Adding props for error handling in Preview component.
- Adding handleClick to the ActionProps interface in the InputLabelAndAction component.
- Added spacing, type and hoverBackground properties to the Link component.
- Added VisualTest to the Link stories.
- Adjusted height when subTitle is empty, added keyboard accessibility for click & preview actions of `Tile` component.
- Adjusted the width of dropdown menu of `Select` component when `fullWidth` is set `true`
- Added a toggle button to the panel component.
- Adjusted the text alignment of the Tab component.
- Added hover actions for the Accordion component.
- Added sync icon for the Tile component.

### Breaking changes

## 1.1.0

### Added
- Adding the `items--search--empty` icon to the icons preview
- PR checks for build, lint and test

### Fixed
- Fixing console error - Warning: Received `false` for a non-boolean attribute `focus`.
- hardened test cases

### Changed
- Cleanup Storybook controls and description
- refactored tests to no longer use deprecated theme creation
- Change the Tooltip background


## 1.0.0

### Added
Initial release.
