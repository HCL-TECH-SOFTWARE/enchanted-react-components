# @hcl-software/enchanted-react-components

Enchanted React Components is a collection of ui components that are being used in HCL Software products. This package depends on the [Material UI Component Library](https://github.com/mui-org/material-ui/tree/master/packages/material-ui).

(C) 2024 HCL America Inc. Apache-2.0 license [https://www.apache.org/licenses/LICENSE-2.0](https://www.apache.org/licenses/LICENSE-2.0)

[![npm](https://nodei.co/npm/@hcl-software/enchanted-react-components.png)](https://www.npmjs.com/package/@hcl-software/enchanted-react-components)
## Usage

```sh
npm install @hcl-software/enchanted-react-components
```

```typescript
import Button, { ButtonVariants } from '@hcl-software/enchanted-react-components/dist/Button/Button';

...

return (
  <Button
    id="button-id"
    variant={ButtonVariants.CONTAINED}
    onClick={() => {
      console.log('click');
    }}
  >
    Button
  </Button>,
);

```

## Development

### NPM targets

We provide the following utility development commands:

| taks | command | description |
|--|--|--|
| `install` | `npm ci` | Initial installation of the project dependencies. Run this to get started. |
| `clean` | `rm -rf node_modules` and `rm -rf dist` | Removes all node_modules etc |
| `build lib` | `npm run build` | Builds the package |
| `lint` | `npm run lint` | Run the linting task |
| `build storybook` | `npm run build-storybook` | Builds a storybook |
| `storybook` | `npm run storybook` | Runs a storybook instance |
| `unit and integration` | `npm run test` | Run unit and integration tests |
| `storyshots` | `npm run test-storyshots` | Run storyshots test. The env parameter `DONT_EXIT_ON_DIFF=true` provides a feature that the tests are not failing if some deviations are detected. |

### Component structure

#### Atomic component
An atomic component is the smallest unit of a component. For example, a Button or Panel.

#### Composite component
A composite component is a combination of atomic components to create a bigger component. For example a specific Form.

#### Prerequisite component
A prerequisite component is a component which only exists to be consumed in higher level components. This component should not be used standalone.

### Module exporting best practices
  - Each component folder structure has its own index.ts file acting as a local module which exports the default and named exports.
  - The `src` folder contains a global index.ts file which exports the components globally and points to each component folder's local index.ts file.
  - Ensure newly created components are exported globally for concise and readable exports when using the Enchanted React Component library across projects.

### Theming

The library supports a `LightNeutralGrey` and `LightCoolGrey` theme. In the future a `DarkNeutralGrey` and `DarkCoolGrey` theme should also be supported.
The `LightNeutralGrey` and `LightCoolGrey` theme can be create via the `createEnchantedTheme()` method. 

```typescript
// e.g.
createEnchantedTheme(ThemeDirectionType.RTL, ThemeModeType.LIGHT_COOL_GREY);
// or
createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);
```

The ThemeProvider needs to be the first component in the component hierarchy.

```typescript
import { ThemeProvider } from '@mui/material/styles';
import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '@hcl-software/enchanted-react-components/dist/theme';

const enchantedTheme = createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);

return (
  <ThemeProvider theme={enchantedTheme}>
    ...
  </ThemeProvider>
)
```

### RTL support

The library fully supports a RTL mode. Each new implemented component also needs to support the RTL mode.

A `ltr` and `rtl` theme can be create via the `createEnchantedTheme()` method.

For 'rtl' support the `DirectionStyleProvider` is also needed. This component should wrap the `ThemeProvider`. Here is a short example, how this could look like:

```typescript
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import DirectionStyleProvider from '@hcl-software/enchanted-react-components/dist/DirectionStyleProvider';
import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '@hcl-software/enchanted-react-components/dist/theme';

const themeDirection = ThemeDirectionType.LTR;
const enchantedTheme = createEnchantedTheme(themeDirection, ThemeModeType.LIGHT_NEUTRAL_GREY);

return (
  <DirectionStyleProvider direction={themeDirection}>
    <ThemeProvider theme={enchantedTheme}>
      <div dir={themeDirection}>
        <CssBaseline />
        <App />
      </div>
    </ThemeProvider>
  </DirectionStyleProvider>
)
```

### Tokenizing - Typographies and Colors

#### Typographies

The default Material UI Typography variant was extend with four additional variants. The typography variants names are aligned with the design typography names.

Default Material UI variants:
- h1
- h2
- h3
- h4
- h5
- h6
- subtitle1
- subtitle2
- body1
- body1bold
- body1italic
- body2
- body2bold
- body2italic
- caption

Extended variants:
- body1bold
- body1italic
- body2bold
- body2italic


The `Inter, sans-serif` is currently configured as the default font family for all typographies.

#### Colors

All used colors have been tokenized with a specific name. Those color tokens are aligned with the design color tokens. 

### Styling overrides

Material UI offers four different ways to override component specific stylings:

- [One-off customization](https://mui.com/material-ui/customization/how-to-customize/#1-one-off-customization)
- [Reusable component](https://mui.com/material-ui/customization/how-to-customize/#2-reusable-component)
- [Global theme override](https://mui.com/material-ui/customization/how-to-customize/#3-global-theme-overrides)
- [Global CSS override](https://mui.com/material-ui/customization/how-to-customize/#4-global-css-override)

Within the enchanted react component library we limit those options to the following three:

- One-off customization > sx prop
- Reusable component
- Global theme override

The preferred and mandatory method for CSS customization is the `Global theme override`. The alternatives shall only be used if the `Global theme override` is not working for the specific problem.


#### One-off customization

More information about the `sx prop` can be found [here](https://mui.com/system/getting-started/the-sx-prop/).

#### Reusable component

More information about the `styled() method` can be found [here](https://mui.com/system/styled/).

```typescript
export const StyledInputLabel = styled(MuiInputLabel)((theme) => {
  return {
    ...theme.theme.typography.subtitle2,
    color: theme.theme.palette.text.secondary,
    margin: '0px',
    span: {
      paddingRight: '4px',
    },
    ...
  };
});
```

#### Global theme override

More information about the `theme components override` can be found [here](https://mui.com/material-ui/customization/theme-components/).

The basic idea is to add to each component a specific method (`getMui<COMP-NAME>ThemeOverrides`) which is collecting all needed CSS adjustments. This method should have this logic:

```typescript
/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override <COMP-NAME> component styles and prop
 */
export const getMui<COMP-NAME>ThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    Mui<COMP-NAME>: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return ({
            backgroundColor: 'red', // this is only an example
          });
        },
      },
    },
  };
};
```

The output can than be added to the `components` attribute of the `ThemeOptions` like that.

```typescript
  const themeOptions: ThemeOptions = {
    components: {
      ...getMui<COMP-NAME>ThemeOverrides(),
    },
    ...
  };
```

> **_NOTE:_** Each MUI component can only be one time declared due to the fact that the Global Theme Override accepts one key-value per MUI component.

### Storybook

For isolated building of the enchanted react components library we are using [Storybook](https://storybook.js.org/). Storybook helps us to provide, testing, documentation, and review the enchanted components in an industrial standard way. Storybook is open source and free and is it used by thousands of teams. 

Currently we have grouped our components in five different section. Under each group the component are placed.

- Navigation
- Feedback
- Inputs
- Data Display
- Surfaces

A Introduction page is also part of each storybook instance.

Each component should have two specific component examples:

- Interactive Example > The controls section are enabled and the components can be tested in different variations/permutations.
- Visual test > The controls section are disabled. This example is only used by the visual test (storyshots), to identify styling changes. This example provide the majority of reasonable variations/permutations of a component on a single page.

#### Visual testing (snapshot testing)

This process is detecting some UI diviations and it will create some comparison screenshots.

##### Run it locally

- Clean the storyshots image folder `./src/__tests__/unit/__image_snapshots__`

- Run storybook locally.
  ```
  npm run storybook
  ```

- Create the baseline set. All images will be stored under the folder `./src/__tests__/unit/__image_snapshots__`
  ```
  npm run test-storyshots
  ```

- Do some UI changes, like: adjust the primary color or increase the size of border, padding, marging.

- Run the `test-storyshots` command again to get all UI diviations. The detected diviations will be store under the folder `./src/__tests__/unit/__image_snapshots__/__diff_output__`
  ```
  npm run test-storyshots
  ```
