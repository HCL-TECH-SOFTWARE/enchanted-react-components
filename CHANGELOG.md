# Changelog

## Unreleased

### Added
- Add the `customIcon` props in InputLabelAndAction component.
- Added the new prop - customIcon - for alternative icon to helper icon to TextField, DatePicker, Autocomplete, SelectMultiple, SelectSingle, and MultiSelectChip components.

### Fixed

### Changed

### Breaking changes

## 2.3.2

### Fixed
- Fixed the CSS for ProgressItems to ensure the tooltip will not overflow outside of progressBar.

## 2.3.1

### Fixed
- Fixed ref forwarding support for the `ListItem` component, allowing access to the underlying DOM element.
- Fixed the issue where the `Autocomplete` tooltip was overwritten by transient input.  
- Fixed the issue where the `Autocomplete` text was truncating prematurely (ellipses) despite having available space.

## 2.3.0

### Added
- Added tooltip on hover for uploaded text in progressBar header.
- Added the `togglePanelLabel` props in Panel and PanelTabs components
- Added a new prop - enableHelpHoverEffect - to improve accessibility of help icon in input field components (Textfield, Select Single/Multiple, Autocomplete, MultipleSelectChip, DatePicker).

### Fixed
- Fixed Progress Bar Storybook update
- Fixed the CSS for ProgressBarHeader to ensure text displays in a single line.
- Fixed click on Select down arrow to open menu (https://github.com/HCL-TECH-SOFTWARE/enchanted-react-components/issues/302)

### Changed

### Breaking changes

## 2.2.1

### Fixed
- Fixed the disabled state CSS for the `cancel` All button, removed the `cancel all` button from the ProgressBar subheader, and removed focus from cancelled items in the ProgressBar.
- Fixed tab indicator not updating when tabValue changes in `Tabs` component
- Fixed the CSS for cancelled items in progress bar item list on hover.
- Fixed ref forwarding support for the List component to allow parent components to access the underlying DOM element.
- Fixed placeholder color for TextField component when multiline prop is passed.
- Fixed Progress bar cancelled item on hover css
- Fixed Tooltip on Tab hover by forwarding ref
- Fixed tooltip overflow on progress bars during hover and scroll of uploaded items.
- Fixed accordion to apply square prop
- Fixed ref forwarding support for the paper component

### Changed
- Upgraded dependency to Enchanted Icons v1.5.0

## 2.2.0

### Added
- Added tooltip to the close button in `Popper` component
- Added cancel all button to cancel all ongoing uploads in progress bar

### Fixed
- Fixed focus handling on open of `DatePicker` popper to address accessibility issues
- Fixed screen reader accessibility issue with the `label` in `Autocomplete` component
- Fixed position of UnitSelector button and menu when theme direction is RTL
- Fixed wrong rendered page number issue in Pagination by removing use of inputPropsValue in `Autocomplete`
- Fixed cannot type freesolo in MultiSelectChip by removing use of inputPropsValue in `Autocomplete`
- Fixed missing ellipsis in `DataGridCell` when text in cell is too long by making align-items normal with text-align left
- Fixed `Button` height to adjust again dynamically to content by removing static max-height value
- Fixed extra space below the `Popper` title

### Changed
- updated enchanted Icons to 1.4.0
- updated several npm dependencies

## 2.1.2

### Fixed
- Fixed console error by making sure the element exists before using classList

## 2.1.1

### Fixed
- Fixed flickering issue in the autocomplete component when going to the next or previous page using pagination
- Fixed accessibility issue with disabled row on `DataGrid` component.
- Fixed all Textfield based components helpertext position when text direction is RTL. (Textfield based components are DatePicker, Autocomplete, SelectSingle, SelectMultiple)
- Fixed the issue where the 'Learn more' button shifted when hovering over the list of progress items in the `ProgressBar` component.
- Fixed the focus issue when there are more than one date picker that are used side by side.

### Changed
- Changed `fontWeight` to `normal` for `neutral` size in the `Button` component.

## 2.1.0

### Added
- Added an inverse color property to the `Button` component when `inversecolors` is enabled.
- Added announcing status message for `zoom in` and `zoom out` button in `Preview` component.
- Added `subTitle` to the `DataGridCell` component to display additional subtitle text in the row data.
- Added jest-reporter-log-validator to report on max allowed log counts from component rendering during pull request test check
- Added `ActionButton` component designed to perform a specific action or task when clicked or tapped.
- Added `neutral` size control in the `Button` component.
- Added `UnitSelector` component in `prerequisite_components` to provide unit selection capabilities for the `TextField` component.
- Added examples of `UnitSelector` integration with `TextField` in storybook.

### Fixed
- Fixed accessibility issue with `DataGrid` component
- Fixed screen reader accessibility issue with `Select` component
- Fixed the tooltip visibility for the `Panel` component to support keyboard access.
- Added `aria-erromessage` and `aria-describedby` to the `Autocomplete` component for improved screen reader accessibility.
- Added a default `id` value to the `Autocomplete` component for making helper text accessible.
- Fixed helper text rendering based on condition in `Select` component
- Fixed screen reader accessibility issue with the pagination `label` in the `Pagination` component.
- Fixed screen reader accessibility issue with the zoom in & zoom out `button` in the `Preview` component.
- Fixed focus handling on the expand/collapse icon button in the `ProgressBar` component to address accessibility issues
- Fixed screen reader accessibility issue with the `label` in `Select` component
- Added `component` props in `Typography`. 
- Fixed focus issue for different status icon buttons in the `ProgressBar` component
- Fixed button height to align with design specifications
- Fixed Text spacing accessibility issue on `Pagination` component

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