# Design Tokens

Every token source file MUST conform to the [DTCG Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/#abstract). The project guide in [docs/DESIGN-TOKENS-GUIDE.md](../docs/DESIGN-TOKENS-GUIDE.md) defines the authoring rules. Do not use a custom JSON shape, YAML, Sass variables, or another token format as the source of truth.

Use `.tokens.json` files under this directory. The theme sources are `light.tokens.json` and `dark.tokens.json`; both must use matching token paths and types. `font.family` is the approved Inter font-family token. Do not create placeholder values or derive other values from component styles. Add tokens only from an approved design source.

Run `npm run tokens:build` to generate the CSS custom properties from these sources. The first-party generator is already configured; do not add another generator or dependency without explicit approval. Keep token-dependent component styles backed by the DTCG source.