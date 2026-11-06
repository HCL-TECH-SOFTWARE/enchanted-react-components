# Design Tokens

Every token source file MUST conform to the [DTCG Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/#abstract). The project guide in [docs/DESIGN-TOKENS-GUIDE.md](../docs/DESIGN-TOKENS-GUIDE.md) defines the authoring rules. Do not use a custom JSON shape, YAML, Sass variables, or another token format as the source of truth.

Use `.tokens.json` files under this directory. The planned theme sources are `light.tokens.json` and `dark.tokens.json`; both must use matching token paths and types. No approved token values have been supplied yet, so do not create placeholder values or derive values from component styles. Add tokens only from an approved design source.

Token transformation is intentionally not configured. Do not add a generator or other dependency without explicit approval; until the workflow is approved, keep token values in the DTCG source and leave token-dependent component styles unimplemented.