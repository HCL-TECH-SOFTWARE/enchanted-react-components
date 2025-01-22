# Changelog

## Unreleased

### Added
- Added `subTitle` to the `DataGridCell` component to display additional subtitle text in the row data.

### Fixed
- Fixed accessibility issue with `DataGrid` component
- Fixed the tooltip visibility for the `Panel` component to support keyboard access.
- Added `aria-erromessage` and `aria-describedby` to the `Autocomplete` component for improved screen reader accessibility.
- Added a default `id` value to the `Autocomplete` component for making helper text accessible.

### Changed

### Breaking changes

## 2.0.0

### Added
- Added keyboard accessibility to the header in `DataGrid` component
- Added the `favoritesToggleComponent` props to the `Header` component
- Added an inverse color variant to the `IconButton` component when `inversecolors` is enabled
- Added the `darkInverse`, `focusInverse`, and `selectedInverse` colors to the palette
- Added `Developer Notes` section in `Dialog` component's Storybook Docs
- Added `role="alert"` to the snackbar message text for improved screen reader accessibility.
- Added tooltip to the `Autocomplete` textfield for the truncated values.
- Added `aria-label` to the input fields for the pagination row label and page label to enhance screen reader accessibility.

### Changed
- Added keyboard accessibility to the header in `DataGrid` component
- Added focus to the input label in `TextField` and `SelectMultiple` components
- Added a configurable optional property for `Snackbar` position


### Fixed
- Corrected the focus styling of `preview icon` in the `Tile` component and `zoom buttons` in the `Preview` component to meet the required contrast ratio
- Corrected the focus styling of endActionButtons in `DataGrid` component.
- Fixed `TextField` accessibility attributes to read label
- Fixed the width of the `Tile` action menu and corrected the focus of nested-level `Accordion` component
- Fixed accessibility issue with `Autocomplete` required state

### Changed

### Breaking changes
- Added required `backButton` property in `tooltipTexts` to display tooltip for the back button in the `Preview` component.

## 1.2.0

### Added
- Added all new icons including icons package v1.3.0 to the icon preview
- Added the `ToggleButton` component
- Added the `HCLSoftwareBlue 07 (20P)` color
- Added the `selectedOpacityHover` in theme.palette.action
- Added the `Accordion` component.
- Added the `disableOpacityHover` color to the colors.
- Added the `List` component.
- Added the `Tab` component.
- Added the `ToggleButtonGroup` component.
- Added the `ProgressBar` component.
- Added `selected`, `showEndIcon`, `label` properties in `IconButton` component
- Added `PreviewAccordion` component

### Fixed
- corrected the hex value for HCLSOFTWAREBLUE06 to #003CE6

### Changed
- Added hasThumbnail and disabled properties to the Tile component. 
- Added as hover image preview icon for the Tile component.
- Adding props for error handling in Preview component.
- Adding handleClick, disabled and tooltip to the ActionProps interface in the InputLabelAndAction component.
- Added spacing, type and hoverBackground properties to the Link component.
- Added VisualTest to the Link stories.
- Adjusted height when subTitle is empty, added keyboard accessibility for click & preview actions of `Tile` component.
- Adjusted the width of dropdown menu of `Select` component when `fullWidth` is set `true`
- Added a toggle button to the panel component.
- Adjusted the text alignment of the Tab component.
- Added hover actions for the Accordion component.
- Added sync icon for the Tile component.
- Adjusted `IconButton` component styling
- Added tooltips to the icons in the pagination, dialog, header, and snackbar components.
- Added `withbackdrop` props to the circular progress component
- Added a prop to the `Preview` component for a version comparison.
- Updated breadcrumb icons to reflect directionality (RTL/LTR)
- Resolved spacing issues for icon buttons in the panel component.
- Updated Tooltip title type with React.ReactNode from string so as to accept string as well as html node.
- Added `isRowClickable` prop to the `DataGrid` component. 
- Added `tooltipPlacement` prop to the `MultipleSelectChip`, `Autocomplete` and `Panel` component. 
- Updated icon button spacing in Snackbar
- Adjusted checkbox alignment in `DataGrid` component
- Resolved tooltip issue of options in `Autocomplete` component

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
