# Customization Guide

Consumers can restyle components without forking them, but only through the routes below. Component styles live inside the `ThemeProvider` shadow-root boundary, so the page's CSS does not reach them unless a consumer uses one of these routes deliberately. The boundary and its initialization are defined in [COMPONENT-GUIDE.md](COMPONENT-GUIDE.md#theme-provider-boundary); the Button ([Button.shadow.scss](../src/components/Button/Button.shadow.scss)) is the reference implementation.

> **Status: proof of concept.** The routes below follow from the shadow DOM rules and have not yet been verified across browsers.

## Customization levels

| Need | Use | Example |
|---|---|---|
| Re-theme an app or a region | Set the `--color-*` tokens on the `ThemeProvider` host, or on a wrapper element inside it | `<ThemeProvider style={{ '--color-primary-main': '#b4237a' }}>` |
| Change one instance | The component's `style` prop | `<Button style={{ borderRadius: 999 }}>` |
| Restyle every instance in one provider | `::part(root)` on the provider's host | `.brand::part(root) { border-radius: 999px; }` with `<ThemeProvider className="brand">` |
| Keep the page's normal CSS in charge | `shadowRootType={ShadowRootType.None}` on `ThemeProvider`, then plain unlayered CSS | `.cta { border-radius: 999px; }` on a `className` you pass. Unlayered CSS beats the library's layered rules regardless of specificity or load order. |

- Tokens must be set on the provider host or on an element inside it. A token set on an ancestor of the provider has no effect, because the host declares its own.
- Inline `style` is the safest instance-level route. Do not set `background` or the component's own custom properties inline: an inline value also beats the hover and disabled paint.
- `::part(root)` applies to every matching part inside that provider, not to a single instance. Each exposed part is public API, so rename or remove one only as a breaking change.

## Not available inside the boundary

- Global selectors from the page, such as `.page button { ... }`, and `!important` on them.
- `className` rules in the page stylesheet, because the element is inside the shadow root. The `className` prop is merged onto the root element, but only styles inside the boundary can match it.

Use `shadowRootType={ShadowRootType.None}` for a region that must follow the page's CSS.

## The cascade layer

All component rules are wrapped in the cascade layer `enchanted.components`. Inside a shadow root the layer only orders the library's own rules, because the page's CSS cannot reach the elements anyway. With `shadowRootType={ShadowRootType.None}` the styles are in the document, and the layer is what lets a consumer's unlayered rule win.

```scss
@layer enchanted.components {
  .buttonRoot { /* ... */ }
}
```

- Put **every** rule of `<Component>.shadow.scss` inside the layer, with no exceptions.
- Do not use `!important` and do not raise specificity to win against consumer CSS.
- Order the library's own rules from rest to hover, selected, and disabled at equal specificity, so the last rule wins.
- Trade-off: an unlayered consumer reset such as `button { padding: 0 }` also beats the layered library styles. Consumers put resets in a layer declared before ours: `@layer reset, enchanted.components;`.
- The design tokens are not layered, so re-declaring them follows the normal cascade rules.

## Rules for new components

1. Write the styles in `<Component>.shadow.scss`, with plain, component-prefixed class names (`buttonRoot`) and tokens for every design value. Wrap every rule in `@layer enchanted.components { ... }`. No `!important`.
2. Register the stylesheet in `src/theme/boundaryStyles.ts` with `?inline`.
3. Put `part="root"` on the root element, and add further parts only when a design needs them.
4. Merge the consumer's `className` onto the root element with `cn('<component>Root', className)` and keep it last.
5. Once the component is approved for tests and variant stories (see [TESTING-GUIDE.md](TESTING-GUIDE.md)), add an `Overrides` story that shows each route above: global CSS (blocked), `className` (blocked), `::part(root)`, tokens, and inline `style`. Add the page CSS to `document.head` from the story, outside the boundary, and give each case its own nested `ThemeProvider` host so the rules stay scoped to that case.
