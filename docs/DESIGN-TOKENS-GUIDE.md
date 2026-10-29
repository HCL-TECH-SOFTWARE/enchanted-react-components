# Design Tokens Guide

## Requirement

All design token source files MUST conform to the [DTCG Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/#abstract). This is the only approved token source format for Enchanted. Do not author token sources as Sass variables, CSS custom-property files, YAML, or a project-specific JSON shape. CSS custom properties may be generated or mapped for consumption, but the DTCG JSON remains the source of truth.

Use `.tokens.json` as the project file extension. Place theme sources under `tokens/`, using `light.tokens.json` and `dark.tokens.json` when approved token values are available. Keep token paths and `$type` values aligned between themes; theme-specific values may differ.

## Authoring Rules

- Use valid JSON and the DTCG 2025.10 token/group structure. A token is an object with `$value`; an object without `$value` is a group.
- Give every token an explicit `$type` on the token itself. Do not rely on inferred types or group-level type inheritance in project token files.
- Token and group names must not begin with `$` or contain `.`, `{`, or `}`; these characters are reserved by the format.
- Use only types and value shapes defined by DTCG 2025.10. For example, a dimension value is an object containing a numeric `value` and a `unit` of `px` or `rem`.
- Use DTCG curly-brace references for token aliases and JSON Pointer `$ref` references where a reference to a specific value property is needed. Do not create custom reference syntax or embed implementation-specific values in token data.
- Use `$description` for useful human-readable context. Only use `$extensions` for nonessential metadata, with a namespaced key; consumers must not need extension data to interpret a token.
- Do not invent values. Add or change token values only from an approved design source.
- Do not add a token generator, schema package, or other third-party dependency without explicit approval. Until the transformation workflow is approved, DTCG files are the authoritative source and token-dependent component styles remain unimplemented.

## Example

This is valid DTCG JSON illustrating a color and a dimension token:

```json
{
	"color": {
		"text-primary": {
			"$type": "color",
			"$value": {
				"colorSpace": "srgb",
				"components": [0.08, 0.08, 0.08],
				"hex": "#141414"
			}
		}
	},
	"space": {
		"small": {
			"$type": "dimension",
			"$value": {
				"value": 4,
				"unit": "px"
			}
		}
	}
}
```

The values above are format examples only, not approved Enchanted design tokens. Do not copy them into theme files.

## Consumption and Review

SCSS must consume design-system values through CSS custom properties backed by approved DTCG token sources. The custom property name is the token path with each segment kebab-cased and joined by hyphens, for example `color.primary.darkInverse` becomes `--color-primary-dark-inverse` and `typography.lineHeight.body1` becomes `--typography-line-height-body1`. `npm run tokens:build` runs `scripts/build-tokens.mjs`, which follows this naming and writes `src/styles/_tokens.generated.scss` (generated and git-ignored). It supports the `color`, `dimension`, `fontFamily`, `fontWeight` and `number` types; extend it only for another type that a token needs. Do not hand-maintain duplicate token values in SCSS. When reviewing a token change, verify that the file is valid JSON, each token has a valid explicit `$type` and `$value`, all references resolve, and the source matches the approved design. Use the standard DTCG 2025.10 specification as the authority for type-specific value rules.