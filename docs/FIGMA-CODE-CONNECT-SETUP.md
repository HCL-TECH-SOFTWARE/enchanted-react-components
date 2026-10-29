# Figma Code Connect Setup Guide

## Purpose

This guide covers the one-time setup of Figma Code Connect tooling in the repository. Follow every step in order. After completing this guide, proceed to [FIGMA-CODE-CONNECT-USAGE.md](FIGMA-CODE-CONNECT-USAGE.md) for creating and managing component mappings.

This guide serves two audiences:

1. **AI agents** (Copilot, Claude Code) — follow every step automatically. Do not ask the user for any input; all required values are derived from the project or read from the `.env` file. The one exception is the Figma MCP sign-in, which only the user can complete in their IDE.
2. **Human developers** — use the steps below to configure the project for Code Connect authoring.

---

## Prerequisites

Before starting setup, the following must already be in place:

1. **Node.js >= 18** is installed.
2. **The project has a `package.json`** (initialize with `npm init -y` if missing).
3. **A Figma account** with access to the design file, used to authenticate the MCP server through your IDE (Step 3). This is an OAuth sign-in — there is no token to copy.
4. **A `.env` file exists in the project root** with a Figma personal access token for the **Code Connect CLI**. The token must have **Code Connect: Write** and **File content: Read** scopes. It is not used by, and is not valid for, the MCP server.

```env
# .env (must be git-ignored — never commit this file)
FIGMA_ACCESS_TOKEN=figd_XXXXXXXXXXXXXXXXXXXX
```

> **Important for AI agents:** The CLI personal access token is **always** read from the `.env` file. Before any Code Connect **CLI** operation (`figma connect create` / `parse` / `preview`) or REST style validation, check that `.env` exists and contains a non-empty `FIGMA_ACCESS_TOKEN`. If the file is missing or the variable is absent/empty, **stop immediately** and tell the user:
>
> *"Please add your Figma access token to the `.env` file in the project root before continuing:*
> ```
> FIGMA_ACCESS_TOKEN=your-token-here
> ```
> *The token needs Code Connect: Write and File content: Read scopes."*
>
> **Do not accept the token directly in conversation, as a command argument, or through any other channel.** Some agent environments do not support secure token input — the `.env` file is the only accepted method. Do not prompt for, display, or log the token value.
>
> This rule covers the CLI only. **Never** ask the user for an MCP credential and never paste `FIGMA_ACCESS_TOKEN` into an MCP prompt or configuration — MCP authentication is an OAuth browser sign-in the user completes in their IDE. See [Two Credentials, Two Purposes](#two-credentials-two-purposes).

---

## Step 1: Ensure `.env` Is Git-Ignored

Check that `.gitignore` includes `.env`. If it does not, add it.

```bash
grep -q '\.env' .gitignore 2>/dev/null || echo '.env' >> .gitignore
```

Also create `.env.example` as a committed reference for other developers:

```env
# .env.example (committed — safe to check in)
FIGMA_ACCESS_TOKEN=replace-with-your-token
```

---

## Step 2: Install the Code Connect CLI

Install `@figma/code-connect` as a dev dependency. Pin it via `package.json` — do not use `@latest`.

```bash
npm install --save-dev @figma/code-connect
```

---

## Step 3: Configure and Connect the Figma MCP Server (MANDATORY)

> **This step is MANDATORY.** The MCP server is the **only authorized method** for inspecting Figma component metadata (variant properties, boolean properties, text nodes, instance swaps, descendants). Without a verified MCP connection, no `.figma.ts` template may be created, modified, or validated. The Figma REST API and CLI-only generation are **not acceptable substitutes** for MCP metadata inspection during Code Connect authoring.

The MCP server gives the IDE (and AI assistants) read access to Figma component metadata. It ensures that every template is built from the **actual** Figma component properties rather than guesses or incomplete CLI output.

### Why MCP Is Mandatory

1. **Accuracy** — `get_context_for_code_connect` returns the complete list of variant options, boolean properties, text properties, instance swaps, and descendants. Without it, templates will have missing or incorrect property mappings.
2. **Authorization** — The MCP connection proves that the agent has a valid, authenticated link to the Figma file. An unauthenticated agent must not write templates.
3. **Contract integrity** — Templates that skip MCP inspection routinely miss properties, map wrong enum values, or guess property names. This produces broken Dev Mode snippets that mislead developers.

### Two Credentials, Two Purposes

Figma integration in this repository uses **two separate credentials**. They are not interchangeable, and confusing them is the most common setup failure.

| | MCP server | Code Connect CLI |
|---|---|---|
| **Used by** | `get_context_for_code_connect` and the other MCP tools | `figma connect create` / `parse` / `preview`, and REST style validation |
| **Credential** | Your Figma account, via OAuth | Personal access token (`figd_…`) |
| **Obtained** | The MCP client signs you in through the browser | Figma account settings |
| **Stored** | By the MCP client, per user — never in the repository | `FIGMA_ACCESS_TOKEN` in the git-ignored `.env` |
| **Configured in** | `.vscode/mcp.json`, `.mcp.json` | `.env` |

> **Do not paste `FIGMA_ACCESS_TOKEN` into an MCP prompt or MCP configuration.** The Figma MCP endpoint requires an OAuth access token carrying the `mcp:connect` scope. A `figd_` personal access token is rejected with `401` and `WWW-Authenticate: ... scope="mcp:connect"`, even though the same token works for the REST API and the CLI.

### MCP Configuration Files

Create the configuration for each approved IDE. Both files are small and non-conflicting, so a new team member is ready immediately. VS Code and Claude Code are the approved clients; adding another requires explicit approval and an update to [REPO-SETUP-GUIDE.md](REPO-SETUP-GUIDE.md) and [ENCHANTED.md](../ENCHANTED.md).

Neither file contains a credential. Each user authenticates with their own Figma account through the MCP client, so there is nothing to mask, rotate, or accidentally commit.

#### VS Code / Cursor

Create `.vscode/mcp.json`:

```json
{
  "servers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

**How it works:** No token is declared or entered by hand. On first start, VS Code reads the endpoint's [protected-resource metadata](https://mcp.figma.com/.well-known/oauth-protected-resource), opens a browser for the Figma OAuth consent flow, and acquires an access token with the `mcp:connect` scope. VS Code keeps that token in OS secret storage and refreshes it automatically, so later starts need no prompt. VS Code also requires GitHub Copilot.

#### Claude Code

Create `.mcp.json` in the project root:

```json
{
  "mcpServers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

**How it works:** Claude Code asks you to approve the project-scoped server on first use, then runs the same browser OAuth flow. Manage the connection with the `/mcp` command.

### Post-Configuration: Verify the MCP Connection (REQUIRED)

> **Do not proceed to any later step until the MCP server is verified as connected.**

1. **VS Code / Cursor:** open the command palette, run `MCP: List Servers`, and start `figma`. **Claude Code:** approve the project-scoped server when prompted, or run `/mcp`.
2. Complete the Figma sign-in in the browser window that opens, and approve the access request. There is no token prompt to answer.
3. Confirm the server shows as connected in the MCP panel (VS Code) or in `/mcp` output (Claude Code).
4. **Verification test:** call `get_context_for_code_connect` on a known component URL and confirm it returns property metadata.

If the metadata call fails, re-run the sign-in: **VS Code** — stop and restart the server from `MCP: List Servers`; **Claude Code** — reconnect through `/mcp`. Confirm your Figma account can open the design file and that your plan allows Dev Mode MCP access. Do not substitute the `.env` personal access token.

> **Security:** No Figma credential belongs in the repository or in any MCP configuration file. The MCP access token is held by the MCP client, per user. Keep the CLI personal access token in the ignored `.env` only. Never commit authentication artifacts, browser session data, or OAuth tokens.

### Available MCP Tools

Once connected, these MCP tools are available for inspecting Figma components:

| MCP Tool | Purpose | Required For |
|----------|---------|--------------|
| `get_context_for_code_connect` | Retrieve component metadata, variant options, descendant instances, and text nodes | **Every** template creation or update — this is the primary tool |
| `get_design_context` | Inspect a linked frame or layer for broader design context | Layout and styling validation |
| `get_metadata` | Narrow down components in a large file | Identifying correct node IDs |
| `get_variable_defs` | Inspect design tokens/variables used by a selection | Token validation |
| `get_screenshot` | Get a visual screenshot of any Figma node | Visual verification |

---

## Step 4: Create `figma.config.json`

Create this file in the project root. This tells the Code Connect CLI where to find template files and what framework/language to use.

```json
{
  "codeConnect": {
    "include": ["src/components/**/*.figma.ts"],
    "exclude": ["node_modules/**", "dist/**", "build/**"],
    "label": "React",
    "language": "tsx"
  }
}
```

`label` is an external contract: it is the name users see in Figma Dev Mode and is also used when removing mappings. Choose it once, document it, and avoid casual renames.

Do not add `parser`, `importPaths`, `paths`, or `imports` to this configuration. Those fields are for legacy framework-specific parsers; template files declare their displayed imports in the template itself.

---

## Step 5: Update TypeScript Configuration

If `tsconfig.json` exists, append Figma's template types to the `compilerOptions.types` array. Do not replace existing types — merge with them.

```json
{
  "compilerOptions": {
    "types": ["@figma/code-connect/figma-types"]
  }
}
```

Also exclude `.figma.ts` template files from TypeScript compilation and ESLint, since they are processed by the Code Connect CLI, not the TypeScript compiler:

**tsconfig.json** — add to `exclude`:
```json
{
  "exclude": ["**/*.figma.ts"]
}
```

**eslint.config.js** — add to `ignores`:
```js
{ ignores: ['**/*.figma.ts'] }
```

If `tsconfig.json` does not exist yet, skip this step. The types will be configured when TypeScript setup is completed.

---

## Step 6: Add Package Scripts

Add these scripts to `package.json`. Merge with existing scripts — do not overwrite.

```json
{
  "scripts": {
    "figma:create": "figma connect create",
    "figma:preview": "figma connect preview",
    "figma:validate": "figma connect parse --exit-on-unreadable-files"
  }
}
```

`figma:validate` is a syntax check for `.figma.ts` template files. It is only useful **after** a component template has been created (see the usage guide). Do not run it during setup.

> **Publishing is FORBIDDEN in this phase.** Do not add `figma:publish`, `figma:publish:dry-run`, or any publish-related script. Figma is the read-only source of truth — all context flows **from** Figma **to** code, never the reverse. Templates are created and validated locally only. Publishing will be enabled in a future phase when explicitly approved.

---

## Step 7: Verify the Setup

Two checks only:

**1. CLI is installed:**

```bash
npx figma connect --version
```

Must print a version number (e.g., `2.0.2`) and exit without errors.

**2. MCP is connected and authorized:**

Call `get_context_for_code_connect` on any known component URL. It must return property metadata. If it fails, go back to Step 3 and re-authenticate.

---

## Setup Complete

The project is now configured for Figma Code Connect. Proceed to [FIGMA-CODE-CONNECT-USAGE.md](FIGMA-CODE-CONNECT-USAGE.md) for:

- Creating `.figma.ts` component template files
- Syncing properties between Figma and code
- Validating and previewing templates

---

## Agent Behavior Rules

These rules apply to all AI agents during setup. They are **non-negotiable and must not be bypassed under any circumstance**.

1. **Never ask the user for a Figma credential.** The CLI personal access token is read exclusively from `.env`; if `.env` is missing or does not contain `FIGMA_ACCESS_TOKEN`, stop and tell the user: *"Please add your Figma access token to the `.env` file in the project root before continuing."* Do not accept it in conversation, as a command argument, or through any other channel. MCP has no token for the agent to handle at all — the user completes an OAuth browser sign-in in their IDE. Never ask for an MCP token and never reuse `FIGMA_ACCESS_TOKEN` for MCP.
2. **Never ask which IDE the user is working in.** Create both approved MCP configuration files (`.vscode/mcp.json` and `.mcp.json`) — they do not conflict. Adding a client beyond VS Code and Claude Code needs explicit approval.
3. **Never commit the `.env` file.** Always verify `.gitignore` includes `.env` before proceeding.
4. **Never use `@latest` when installing packages.** Let npm resolve the current version and pin it in `package.json`.
5. **Never ask the user to confirm setup steps.** Execute every step automatically. Only stop if a prerequisite is missing (Node.js, package.json, or `.env`).
6. **Publishing to Figma is FORBIDDEN.** Do not run `figma connect publish`, `figma connect unpublish`, or any command that writes data back to Figma. Do not add publish scripts to `package.json`. In this phase, Figma is the read-only source of truth. This restriction will be revisited in a future phase.
7. **The MCP server connection MUST be established and verified before setup is considered complete.** If the MCP server cannot be connected (e.g., sign-in failure, network issue), setup is **not complete**. Report the failure to the user and do not proceed to the usage guide. The agent must re-attempt the connection or ask the user to complete the OAuth sign-in in their IDE.
8. **Never skip MCP configuration.** Do not treat MCP as optional. Every IDE config file must be created, and at least one MCP connection must be verified working before proceeding.
9. **Never use the Figma REST API as a substitute for MCP** during template authoring. The REST API may be used for style validation (CSS values, colors, spacing) but it is **not a replacement** for `get_context_for_code_connect` when inspecting component properties for template creation.

---

## Reference Documentation

- [Figma Code Connect quickstart](https://developers.figma.com/docs/code-connect/quickstart-guide/)
- [Figma Code Connect CLI reference](https://developers.figma.com/docs/code-connect/cli-reference/)
- [Figma Code Connect configuration](https://developers.figma.com/docs/code-connect/api/config-file/)
- [Figma remote MCP server setup](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)
