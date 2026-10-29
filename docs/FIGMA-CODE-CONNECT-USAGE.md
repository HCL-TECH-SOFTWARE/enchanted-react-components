# Figma Code Connect Usage Guide

## Purpose

This guide covers the day-to-day workflow of creating, maintaining, and validating Figma Code Connect mappings. It assumes setup is already complete — if not, follow [FIGMA-CODE-CONNECT-SETUP.md](FIGMA-CODE-CONNECT-SETUP.md) first.

Two prerequisites gate the work in this guide, in order: a connected [MCP server](#mcp-connection-prerequisite-mandatory--every-session), then [design tokens](#design-tokens-prerequisite-mandatory--before-any-styling) for anything that affects styling. Token sources and authoring rules are owned by [DESIGN-TOKENS-GUIDE.md](DESIGN-TOKENS-GUIDE.md); Figma authentication is owned by [REPO-SETUP-GUIDE.md](REPO-SETUP-GUIDE.md#vs-code-and-figma).

> **IMPORTANT: Publishing to Figma is FORBIDDEN in this phase.** Do not run `figma connect publish`, `figma connect unpublish`, or any command that writes data back to Figma. Figma is the **read-only source of truth** — all context (props, styling, component structure) flows **from** Figma **to** code, never the reverse. Templates are created and validated locally only. This restriction applies to all agents and developers and will be revisited in a future phase when explicitly approved.

This guide serves two audiences:

1. **AI agents** (Copilot, Claude Code) — follow the workflows below automatically. All required information is derived from the Figma component URL, the project structure, and MCP metadata. Do not ask the user for anything that can be determined automatically.
2. **Human developers** — use the reference sections for authoring rules, validation, CI, and troubleshooting.

---

## MCP Connection Prerequisite (MANDATORY — Every Session)

> **Before performing ANY operation in this guide — creating, updating, or validating a template — the Figma MCP server MUST be connected and authorized.**

This is not optional. Every session, every agent, every developer must verify the MCP connection before touching `.figma.ts` files. The MCP server is the **single source of truth** for Figma component metadata.

### Verification Procedure

1. **Check that the MCP server is running** in your IDE (VS Code/Cursor: the MCP panel shows `figma` as connected; Claude Code: `/mcp` lists `figma`).
2. **Test the connection** by calling `get_context_for_code_connect` on any known component URL. The call must return property metadata (variant options, booleans, text properties, instance swaps).
3. **If the connection fails:**
   - Re-run the Figma OAuth sign-in: VS Code/Cursor — stop and restart `figma` from `MCP: List Servers`; Claude Code — reconnect through `/mcp`. There is no token to re-enter.
   - Confirm your Figma account can open the design file and that your plan allows Dev Mode MCP access.
   - Do **NOT** paste `FIGMA_ACCESS_TOKEN` into an MCP prompt — that credential is for the Code Connect CLI and the MCP endpoint rejects it.
   - Do **NOT** proceed without a working MCP connection. Do **NOT** fall back to the Figma REST API or CLI-only generation as a substitute.

### For AI Agents — Hard Gate

```
IF MCP server is not connected or not authorized:
    STOP. Do NOT create, modify, or validate any .figma.ts template.
    Tell the user:
        "The Figma MCP server is not connected. Please start the MCP server
         in your IDE and complete authorization before I can proceed.
         See FIGMA-CODE-CONNECT-SETUP.md Step 3 for instructions."
    Do NOT fall back to REST API or CLI-only generation.
    Do NOT guess property names or values.
    Wait for the user to confirm MCP is connected, then re-verify.
```

---

## Design Tokens Prerequisite (MANDATORY — Before Any Styling)

> **Tokens come first.** Pull the design tokens for a component *before* writing its styles. A component whose tokens are missing must be left unstyled — never fill the gap with literal values.

Code Connect maps a component's **API**; it carries no styling. Styling comes from approved DTCG tokens, so if `tokens/` has no entry for a value the design needs, there is nothing legitimate to style with. This is the usual cause of a component that ends up with an empty `.module.scss`: the template was authored before the tokens existed.

[DESIGN-TOKENS-GUIDE.md](DESIGN-TOKENS-GUIDE.md) is the authority for token format and authoring rules. This section only defines **when** to pull them.

### Token Workflow

Run this before styling a component, and again whenever a design adds a value the tokens do not cover.

1. **Inspect the Figma variables** bound to the component with the MCP tool `get_variable_defs`. This returns the variables the design actually references — the authoritative list. Use `get_design_context` for raw visual values that are not bound to a variable.
2. **Check `tokens/` for each value.** Resolve every variable to a token path in `light.tokens.json` and `dark.tokens.json`.
3. **Add any missing tokens** from the Figma variable values, following [DESIGN-TOKENS-GUIDE.md](DESIGN-TOKENS-GUIDE.md): DTCG 2025.10, an explicit `$type` on every token, matching paths and types across both themes. Never invent a value, and never derive one from a screenshot or a rendered pixel.
4. **Regenerate the CSS custom properties** with `npm run tokens:build`, then consume them in SCSS by token path (`color.primary.darkInverse` becomes `var(--color-primary-dark-inverse)`).
5. **Only then write `<Component>.module.scss`.**

### For AI Agents — Styling Gate

```
BEFORE writing any component style:
    Resolve every design value to an approved token in tokens/.
    IF a required token is missing AND its Figma variable is available:
        Add it per DESIGN-TOKENS-GUIDE.md, then run npm run tokens:build.
    IF a required token is missing AND no approved design source defines it:
        STOP styling that value. Leave <Component>.module.scss empty.
        Report exactly which tokens are missing and which component
        styles are blocked on them.
        Do NOT hard-code hex, px, rem, font, or shadow literals.
        Do NOT approximate a value from a screenshot or a nearby token.
```

The `.figma.ts` template and the component's props do not depend on tokens, so Code Connect work may proceed while styling stays blocked. Say so explicitly when reporting, rather than leaving the component looking finished.

---

## Standards at a Glance

- **Pull design tokens before styling.** Resolve every design value to an approved DTCG token first; see the [Design Tokens Prerequisite](#design-tokens-prerequisite-mandatory--before-any-styling). Leave styles unimplemented when tokens are missing.
- Figma is the **read-only source of truth** for component properties and styling. Code implements what Figma defines. Resolve mismatches by updating code to match Figma, not the reverse.
- Connect only stable, reusable library components, starting with high-use primitives. Do not connect one-off screens, exploratory variants, or deprecated components.
- Store one small `.figma.ts` template beside, or in the same feature folder as, the code component it represents. Commit it with the component change.
- Map API-level decisions: variants, sizes, booleans, content, slots, and instance swaps. Do not expose browser interaction states such as hover or focus as component props.
- Use the exact Figma property names and enum values **as returned by the MCP server** in the template. Do not rename, guess, or assume property names.
- Generate concise, idiomatic code that a developer can paste into the application. The Dev Mode snippet is documentation, not a dump of internal implementation details.
- Validate every template locally. Do not publish to Figma — publishing is forbidden in this phase.
- **Every template must be built from MCP metadata, not from guesses or assumptions.** If a property exists in Figma but is not returned by MCP, investigate via `get_metadata` or `get_design_context` before adding it to the template.

---

## Creating a `.figma.ts` Template

### Step 1: Verify MCP Connection

Before anything else, confirm the Figma MCP server is connected and authorized. See [MCP Connection Prerequisite](#mcp-connection-prerequisite-mandatory--every-session) above.

**If the MCP server is not connected, STOP. Do not proceed to Step 2.**

### Step 2: Identify the Figma Component

The Figma component URL must point to the **published component set**, not a screen instance or a single variant. In Figma, select the component or component set and use **Copy link to selection**.

Example URL: `https://www.figma.com/design/FILEID/Design-System?node-id=123-456`

### Step 3: Inspect the Component via MCP (MANDATORY)

> **This step is MANDATORY.** Do not skip it. Do not substitute it with the Figma REST API. Do not proceed to template generation without completing this step.

Call the MCP tool `get_context_for_code_connect` with the Figma component URL (extract `fileKey` and `nodeId` from the URL). This returns:

- All variant properties and their allowed values
- Boolean properties
- String (text) properties
- Instance-swap properties
- Descendant component instances and their properties
- Text node references

**Record every property returned.** This is the authoritative list of properties that must be mapped in the template. Any property in this response that is relevant to the component's public API must appear in the `.figma.ts` file.

**If this MCP call fails:**
- Re-authenticate the MCP server (see Setup Guide Step 3).
- If re-authentication fails, STOP and tell the user. Do not proceed with CLI-only generation.

### Step 4: Generate the Template File

Run the CLI to scaffold the initial template file next to the code component:

```bash
npx figma connect create "<FIGMA_COMPONENT_URL>" --outDir src/components/<ComponentName>
```

Example:

```bash
npx figma connect create "https://www.figma.com/design/FILEID/Design-System?node-id=123-456" --outDir src/components/Button
```

This creates a `<ComponentName>.figma.ts` file as a starting point.

### Step 5: Refine the Template Using MCP Metadata (MANDATORY)

The generated file is a starting point, not a finished mapping. **You MUST refine it using the metadata from the MCP `get_context_for_code_connect` response in Step 3:**

1. **Cross-reference every property** from the MCP response against the generated template. Add any missing properties. Remove any properties that don't exist in the MCP response.
2. **Verify every `getEnum()`** maps all supported Figma values explicitly — use the exact variant option strings from the MCP response. An unmapped Figma value is a contract gap.
3. **Verify `getString()`, `getBoolean()`, and `getInstanceSwap()`** use the exact property names from the MCP response (the `name` field, not the `key` field with the hash suffix).
4. **Set the `imports` array** to use the public package import path (e.g., `@hcl-software/enchanted-react-components`), not a private relative path.
5. **Set a stable, unique `id`**. Do not change it during cosmetic rewrites — it identifies the template to Code Connect.
6. **Omit interaction states** (hover, focus, pressed) — these are CSS/runtime states, not component props.
7. **Omit default props** when doing so improves readability and does not obscure a meaningful design choice.
8. **Keep the `source` and `component` metadata comments accurate** — these make the code component and source location visible in Figma.

### Property Mapping Checklist (must verify against MCP response)

For each property returned by `get_context_for_code_connect`:

- [ ] **VARIANT** properties: mapped with `getEnum()` — every option value from `variantOptions` is listed
- [ ] **BOOLEAN** properties: mapped with `getBoolean()` — exact property name used
- [ ] **TEXT** properties: mapped with `getString()` — exact property name used
- [ ] **INSTANCE_SWAP** properties: mapped with `getInstanceSwap()` — exact property name used
- [ ] **Interaction-state variants** (state=hover/focus/pressed): intentionally omitted from template
- [ ] **FigmaOnly variants** (names ending in `_FigmaOnly`): intentionally omitted from template

### Template Example

```ts
// url=https://www.figma.com/design/<file-id>/Design-System?node-id=<node-id>
// source=src/components/Button/Button.tsx
// component=Button
import figma from 'figma'

const instance = figma.selectedInstance
const label = instance.getString('label')
const showLabel = instance.getBoolean('showLabel')
const disabled = instance.getEnum('disabled', {
  False: false,
  True: true,
})
const variant = instance.getEnum('variant', {
  contained: 'contained',
  outlined: 'outlined',
  text: 'text',
})
const color = instance.getEnum('color', {
  primary: 'primary',
  neutral: 'neutral',
  error: 'error',
})
const size = instance.getEnum('size', {
  medium: 'medium',
  small: 'small',
})

export default {
  example: figma.code`<Button variant="${variant}" color="${color}" size="${size}" disabled={${disabled}}>
  ${showLabel ? label : ''}
</Button>`,
  imports: ['import { Button } from "@hcl-software/enchanted-react-components"'],
  id: 'button',
}
```

### Step 6: Validate the Template

Run these commands and verify the output:

```bash
# Parse and validate all templates
npx figma connect parse --exit-on-unreadable-files
```

The command must exit without errors before the template is considered ready.

---

## Property Accessors Reference

Use the narrowest accessor that describes the Figma property:

| Accessor | Use When | MCP Property Type |
|----------|----------|-------------------|
| `getString()` | The property is a component text property | `TEXT` |
| `getBoolean()` | The property is an exposed boolean | `BOOLEAN` |
| `getEnum()` | The property is a variant — map every supported Figma value explicitly | `VARIANT` |
| `getInstanceSwap()` | The property is a nested component chosen through an instance-swap property | `INSTANCE_SWAP` |

The MCP `get_context_for_code_connect` response tells you the exact `type` for each property. Use it to choose the correct accessor. Do not guess.

For text overrides that are not component properties, use the template API's text-content support. For nested components, connect the nested component separately so Dev Mode can resolve it to its own code snippet. Use slots where the design system intentionally supports freeform composition.

---

## Design-to-Code Contract

Before writing or updating a template, the author should be able to answer these questions:

| Concern | Required Decision |
|---------|-------------------|
| Component identity | Which published component set URL represents this code component? |
| Public API | Which code props are supported, and what are their defaults? |
| Variants | Which exact Figma values map to which code values? (from MCP `variantOptions`) |
| Content | Is text a Figma string property, a text-layer override, or a child/slot? (from MCP `TEXT` type) |
| Nested components | Are icons or child components independently connected? (from MCP `INSTANCE_SWAP` type) |
| States | Which values are props, and which are CSS or runtime interaction states? (omit `state` variant) |
| Tokens | Does the component use shared tokens rather than copied visual values? |

Keep the component set tidy in Figma: property names should be stable, values should use consistent casing, and unused axes should be removed. Prefer a property such as `Size=Small|Medium|Large` over ambiguous or duplicated variants. Do not encode disabled, hover, focus, or pressed behavior as separate code components unless the public code API genuinely does so.

---

## Authoring Rules

- Keep displayed imports public and stable. Prefer the package entry point over a private relative path.
- Omit default props when doing so improves readability and does not obscure a meaningful design choice.
- Map all supported values explicitly. An unmapped Figma value is a contract gap, not something to silently render as an incorrect default.
- Keep conditions in the template only when different design values truly produce different public snippets. Template files run as TypeScript or JavaScript, so ordinary conditionals are supported.
- Use a stable, unique `id`. Do not change it during a cosmetic rewrite because it identifies the template to Code Connect.
- Keep sensitive values, fixture data, feature flags, and environment-specific URLs out of snippets.
- Do not claim token parity through Code Connect alone. Token changes still require their normal design-token review and build validation.
- Use `.figma.ts` template files for every new mapping. Do not create parser-based `.figma.tsx` mappings for new work.
- **Every property name and enum value in the template MUST come from the MCP `get_context_for_code_connect` response.** Do not invent property names or guess enum values. If the MCP response does not include a property, it does not belong in the template.

---

## Validation

Validation happens at three levels.

### 1. Local Template Validation

Parse and validate all templates:

```bash
npx figma connect parse --exit-on-unreadable-files
```

Also run the owning package's existing type-check, unit tests, and visual or Storybook review commands. Code Connect verifies snippet construction; it does not prove the component itself behaves correctly.

### 2. Cross-Reference with MCP Metadata

After local validation passes, re-call `get_context_for_code_connect` via MCP and verify:

- Every variant option from the MCP response has a corresponding `getEnum()` mapping.
- Every boolean, text, and instance-swap property is accounted for.
- No property names were misspelled or assumed.
- Interaction states (hover, focus, pressed) are omitted from props.

### 3. Publishing (FORBIDDEN)

> **Publishing to Figma is FORBIDDEN in this phase.** Do not run `figma connect publish`, `figma connect unpublish`, `figma connect publish --dry-run`, or any command that writes data back to Figma. Do not add publish scripts to `package.json`. Do not publish "preview" or "temporary" mappings.
>
> Figma is the **read-only source of truth**. All context flows from Figma to code. Templates are created and validated locally only. This restriction will be revisited in a future phase when explicitly approved.

---

## Validating Styles Against Figma

Code Connect maps component APIs to Figma, but it does not verify that CSS values match the design. Before considering a template complete, validate that the component's styling matches the Figma source of truth.

This section assumes the [Design Tokens Prerequisite](#design-tokens-prerequisite-mandatory--before-any-styling) is already satisfied. Validation compares the **token values** behind a style against Figma; it is not a licence to hard-code a value that validation reveals as missing. When a check below fails because no token exists, add the token from the approved design source — do not patch the SCSS with a literal.

### Using MCP for Style Inspection

Use the MCP tool `get_design_context` to inspect visual properties of a specific node. This is the preferred method for style validation.

### Using the Figma REST API (for style validation only)

The Figma REST API may be used **only for CSS-level style validation** (colors, spacing, typography values). It is **not an acceptable substitute** for MCP `get_context_for_code_connect` when inspecting component properties for template creation.

```bash
curl -s -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/<FILE_ID>/nodes?ids=<NODE_ID>&depth=5"
```

Key fields to check per node type:

| Node Type | Fields to Validate |
|-----------|-------------------|
| Frame / Component | `fills[].color`, `fills[].opacity`, `strokes[].color`, `strokeWeight`, `cornerRadius`, `paddingTop/Right/Bottom/Left` |
| Text | `style.fontSize`, `style.fontWeight`, `style.lineHeightPx`, `style.letterSpacing`, `style.fontFamily`, `fills[].color`, `fills[].opacity` |

### Common Pitfalls

1. **RGBA opacity vs solid hex**: Figma stores colors as floating-point RGBA. A fill of `{r:0, g:0, b:0}` with `opacity: 0.87` is `rgba(0,0,0,0.87)`, not `#161616` or any other solid hex approximation. Always check the `opacity` field on both `fills` and `strokes`.
2. **Variant-specific values**: Different size variants may use entirely different font sizes, line heights, and padding — not just scaled-down versions of the default. Check each variant node individually.
3. **Token scope limitations**: The `file_variables:read` scope is required for `GET /v1/files/{fileId}/variables`. Without it, extract styling from the component node geometry data directly. This is equally accurate for validation purposes.
4. **Nested component values differ**: Child elements like menus, dropdowns, and popovers may use different border-radius, padding, or colors than the parent component. Inspect each nested frame independently.

### Validation Checklist

Before considering a Code Connect template complete, confirm:

- [ ] Every design value in the component's SCSS resolves to an approved DTCG token, with no literal hex, px, rem, font, or shadow values
- [ ] Any styling left unimplemented for missing tokens is recorded and reported
- [ ] Background colors match (including opacity)
- [ ] Border/stroke colors, widths, and opacity match
- [ ] Border radius matches (may differ between component body and child elements)
- [ ] Padding values match for each size variant
- [ ] Font family, size, weight, and line-height match for each text element
- [ ] Text colors match (including opacity) for default, disabled, error, and focus states
- [ ] Disabled state uses the correct background and text colors from Figma
- [ ] Error state uses the exact error color from Figma (do not assume standard palette values)

---

## Publishing (FORBIDDEN)

> **Publishing to Figma is FORBIDDEN in this phase.** This section exists to document the restriction clearly for all agents and developers.

The following commands are **not permitted** and must never be run:

- `figma connect publish` (including `--dry-run` and `--force`)
- `figma connect unpublish`
- Any script, CI job, or automation that invokes these commands

**Rationale:** In this phase, Figma is the **read-only source of truth**. All component properties, styling, and structure flow **from** Figma **to** code. Publishing would write code-side templates back into Figma Dev Mode, which could create confusion about which side is authoritative and potentially overwrite design-team-authored content.

**When this changes:** Publishing will be enabled in a future phase when:
1. The design team explicitly approves bi-directional sync.
2. A controlled CI workflow with proper review gates is in place.
3. This section is updated to remove the restriction.

Until then, templates are **local artifacts only** — they are validated with `figma connect parse` and used as development reference, but never pushed to Figma.

---

## CI and Release Policy

Recommended pipeline behavior:

1. On every pull request that changes a `.figma.ts`, run `parse --exit-on-unreadable-files` and the owning package's normal checks (lint, typecheck, test, build).
2. Require a reviewer who owns the code component; require design-system review when the Figma property contract or component API changes.
3. **Do not add any publish job to CI.** Publishing is forbidden in this phase. CI validates templates only.

> **Reminder:** No CI workflow should run `figma connect publish` or `figma connect unpublish`. If a future phase enables publishing, this section will be updated with the appropriate safeguards.

---

## Change Management

Treat any change to a Figma component property, public code prop, component URL, import path, or displayed snippet as a contract change:

1. Update the code component to match the Figma design. Figma is the source of truth — code follows Figma, not the reverse.
2. Update the `.figma.ts` template in the same pull request.
3. **Re-inspect the component via MCP** `get_context_for_code_connect` to verify current properties before updating the template. Do not update based on memory or assumptions.
4. Re-run `parse` validation for every changed template.
5. Remove local template files when the code component is deprecated; do not leave stale templates.

For legacy parser-based mappings, migrate with `npx figma connect migrate`, review the generated templates, test them under a temporary label, then remove the old parser files and parser-only configuration. Treat migration output as generated starting material, not final production documentation.

---

## Agent Workflow: Creating a New Component Mapping

This is the complete end-to-end workflow for an AI agent when asked to create a Code Connect mapping. Follow every step automatically. Do not ask the user for anything that can be determined from the project or MCP.

### Required Input

The agent needs exactly one thing from the user:

- **Figma component URL** — the URL of the published component or component set.

Everything else is derived automatically:

- **Token** — read exclusively from `.env` (`FIGMA_ACCESS_TOKEN`). If the file is missing or the variable is absent/empty, stop and tell the user: *"Please add your Figma access token to the `.env` file in the project root before continuing."* Do not accept the token directly in conversation or as a command argument — the `.env` file is the only accepted method.
- **Component source path** — determined by matching the Figma component name to the project's `src/components/` directory structure.
- **Package import path** — determined from the project's package.json `name` field or existing import conventions.

### Workflow Steps

```
1. VERIFY MCP CONNECTION (MANDATORY — HARD GATE)
   - Confirm the Figma MCP server is connected and authorized.
   - Call get_context_for_code_connect on a known component to test.
   - IF the MCP server is NOT connected or NOT authorized:
       STOP IMMEDIATELY. Do NOT proceed.
       Tell the user: "The Figma MCP server is not connected.
       Please start the MCP server and complete authorization.
       See FIGMA-CODE-CONNECT-SETUP.md Step 3."
       Do NOT fall back to REST API or CLI-only generation.
       Do NOT guess property names or values.

2. Read the Figma component URL provided by the user.

3. Verify setup is complete:
   - .env exists AND contains a non-empty FIGMA_ACCESS_TOKEN.
     If missing or empty, STOP and tell the user:
     "Please add your Figma access token to the .env file."
     Do NOT accept the token in conversation or as a command argument.
   - @figma/code-connect is installed (check node_modules or package.json)
   - figma.config.json exists
   If the CLI or config are missing, follow FIGMA-CODE-CONNECT-SETUP.md first.

4. Inspect the component via MCP (MANDATORY — NO EXCEPTIONS):
   - Call get_context_for_code_connect with the URL.
   - Record ALL variant properties, boolean properties, string properties,
     instance swaps, and text nodes from the response.
   - This is the authoritative property list for the template.
   - IF this call fails, STOP. Re-authenticate and retry.
     Do NOT proceed without MCP metadata.

5. Determine the code component:
   - Match the Figma component name to an existing component in src/components/.
   - If no match exists, tell the user which component is needed.

6. Pull design tokens BEFORE any styling:
   - Call get_variable_defs for the component node to list the Figma
     variables its design references.
   - Resolve each one to a token path in tokens/light.tokens.json and
     tokens/dark.tokens.json.
   - Add any missing tokens per DESIGN-TOKENS-GUIDE.md, then run
     npm run tokens:build.
   - IF a required value has no approved design source:
       Do NOT style it. Leave <Component>.module.scss empty and record
       which tokens are missing. Do NOT hard-code literals.
   - Template and prop work may continue regardless.

7. Generate the template:
   - Run: npx figma connect create "<URL>" --outDir src/components/<ComponentName>

8. Refine the template using MCP metadata (MANDATORY):
   - Map EVERY variant value from the MCP response.
   - Use EXACT property names from the MCP response.
   - Omit interaction states (hover, focus, pressed).
   - Omit FigmaOnly variants.
   - Set imports to the public package entry point.
   - Set a stable id.
   - Omit default props where appropriate.

9. Validate:
   - Run: npx figma connect parse --exit-on-unreadable-files

10. Report to the user:
   - What files were created or modified.
   - Full property mapping (which Figma properties were mapped to which code props).
   - Any tokens added, and any styling left unimplemented for missing tokens.
   - Validation results.
   - Do NOT suggest or mention publishing. Publishing is forbidden.
```

### Agent Decision Tree

```
START
  |
  v
Check MCP server is connected ---------> NOT connected? --> STOP.
  |                                       Tell user to start MCP server
  |                                       and complete authorization.
  |                                       Do NOT proceed. Do NOT fall back
  |                                       to REST API or CLI-only.
  |
  v
Read Figma URL from user request
  |
  v
Check .env for FIGMA_ACCESS_TOKEN ----> Missing/empty? --> STOP: "Add FIGMA_ACCESS_TOKEN to .env"
  |                                      (never accept token in conversation)
  |
  v
Check @figma/code-connect installed --> Missing? --> Run setup guide first
  |
  v
Check figma.config.json exists -------> Missing? --> Run setup guide first
  |
  v
Call MCP get_context_for_code_connect -> Call FAILED? --> Re-authenticate MCP.
  |                                       Still failing? --> STOP. Tell user.
  |                                       Do NOT proceed without MCP metadata.
  |
  v
Record ALL properties from MCP response
  |
  v
Match Figma component to code component
  |
  v
Call get_variable_defs; resolve each design value to a token in tokens/
  |
  +--> Token missing, Figma variable available? --> Add per DESIGN-TOKENS-GUIDE.md,
  |                                                 run npm run tokens:build
  |
  +--> Token missing, no approved source? -------> Leave .module.scss empty.
  |                                                Report blocked styles.
  |                                                Do NOT hard-code literals.
  |                                                (Template work continues.)
  |
  v
Run figma connect create
  |
  v
Refine template (MUST use MCP metadata — no guessing)
  |
  v
Run parse validation
  |
  v
Report results to user (include full property mapping)
  |
  v
DONE (do NOT publish — publishing is FORBIDDEN)
```

---

## Agent Behavior Rules

These rules apply to all AI agents during usage workflows. They are **non-negotiable and must not be bypassed under any circumstance**.

1. **The MCP server MUST be connected and authorized before any template operation.** This is a hard gate. If the MCP server is not connected, the agent must STOP and tell the user to connect it. The agent must NOT fall back to the Figma REST API, CLI-only generation, or guessing. There are NO exceptions to this rule.
2. **Never ask the user for a Figma credential.** The Code Connect CLI token is read exclusively from `.env`; if `.env` is missing or `FIGMA_ACCESS_TOKEN` is absent/empty, stop and tell the user to add it. Do not accept it in conversation, as a command argument, or through any other channel — some agent environments do not support secure token input, so the `.env` file is the only accepted method. MCP needs no token from the agent: the user signs in through OAuth in their IDE. Never reuse `FIGMA_ACCESS_TOKEN` for MCP.
3. **Pull design tokens before styling, and never hard-code a design value.** Resolve every value to an approved DTCG token in `tokens/` first, adding missing ones per [DESIGN-TOKENS-GUIDE.md](DESIGN-TOKENS-GUIDE.md). When no approved source defines a value, leave the style unimplemented and report it. Do not substitute literals, screenshot-derived values, or a "close enough" token.
4. **Never ask the user which IDE they use.** The MCP connection is already configured.
5. **Never ask the user for the component source path** if it can be determined from the project directory structure.
6. **Never ask the user for the package import path** if it can be determined from `package.json` or existing templates.
7. **Publishing to Figma is FORBIDDEN.** Never run `figma connect publish`, `figma connect unpublish`, or any command that writes data back to Figma. Never suggest publishing to the user. Never add publish scripts. Figma is the read-only source of truth in this phase.
8. **Never modify existing component source code** when creating a `.figma.ts` template. The template maps the existing API — it does not change the component.
9. **Always call `get_context_for_code_connect` via MCP** before creating or updating any `.figma.ts` template. This is not optional. Templates built without MCP metadata are considered invalid.
10. **Always use the exact Figma property names** from the MCP response. Do not rename, guess, abbreviate, or assume property names. The MCP response is the authoritative source.
11. **Always validate** with `parse --exit-on-unreadable-files` before reporting completion.
12. **Never use the Figma REST API as a substitute for MCP** during template authoring. The REST API is permitted only for CSS-level style validation (colors, spacing, fonts). Component property inspection MUST go through MCP `get_context_for_code_connect`.
13. **When updating an existing template**, always re-inspect the component via MCP first. Do not assume the Figma component properties haven't changed since the template was last written.

---

## Troubleshooting

### The MCP Server Is Not Connected

This is a **blocking issue**. No template work can proceed until it is resolved.

1. Check that the MCP config file exists for your IDE (`.vscode/mcp.json` for VS Code/Cursor, `.mcp.json` for Claude Code).
2. Start the MCP server from the IDE's MCP panel, or approve it with `/mcp` in Claude Code.
3. Complete the Figma OAuth sign-in in the browser window that opens. There is no token prompt.
4. If sign-in fails, confirm your Figma account can open the design file and that your plan allows Dev Mode MCP access. Do not substitute the `.env` personal access token — the MCP endpoint rejects it.
5. To clear stale credentials, stop and restart the server (VS Code) or reconnect through `/mcp` (Claude Code).

### The MCP Call Returns an Error

- **401 Unauthorized**: The MCP session is invalid or expired. Re-run the OAuth sign-in for your IDE. If you configured an `Authorization` header by hand with a `figd_` token, remove it — personal access tokens are not valid for MCP.
- **403 Forbidden**: Your Figma account lacks access to the file, or your plan does not include Dev Mode MCP access.
- **404 Not Found**: The file key or node ID is incorrect. Verify the URL.
- **Rate limit**: Wait and retry. Do not switch to the REST API.

### The Template Does Not Discover a Property

Verify that the copied URL points to the published component set, not a screen instance or a single variant. Then call `get_context_for_code_connect` via MCP and check the `properties` object in the response. If the property is not in the MCP response, it is not exposed by the Figma component — fix the design contract before adding a mapping.

### A Variant Renders the Wrong Code

Check spelling and case for both the Figma property name and enum value against the MCP response. `getEnum()` should map every allowed Figma value from the MCP `variantOptions` explicitly.

### The Snippet Has Private or Incorrect Imports

Update the `imports` field to use the package's supported public entry point. Code Connect templates do not infer or validate the module export surface for you.

### A Nested Icon or Component Is Unresolved

Create a separate template file for the backing nested component, then use an instance-swap mapping from the parent. Confirm the design uses a stable instance-swap property rather than a manually named layer.

### A Legacy `.figma.tsx` Mapping Fails or Is Unsupported

Migrate it with `npx figma connect migrate`, review the `.figma.ts` output, validate with `parse`, then remove the legacy mapping and parser-specific config fields. Do not publish — publishing is forbidden in this phase.

---

## Reference Documentation

- [Figma Code Connect quickstart](https://developers.figma.com/docs/code-connect/quickstart-guide/)
- [Figma Code Connect CLI reference](https://developers.figma.com/docs/code-connect/cli-reference/)
- [Figma template files](https://developers.figma.com/docs/code-connect/template-files/)
- [Figma template API](https://developers.figma.com/docs/code-connect/template-api/)
- [Figma Code Connect configuration](https://developers.figma.com/docs/code-connect/api/config-file/)
- [Migrating from parsers to template files](https://developers.figma.com/docs/code-connect/templates-migration-guide/)
- [Figma MCP tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)
