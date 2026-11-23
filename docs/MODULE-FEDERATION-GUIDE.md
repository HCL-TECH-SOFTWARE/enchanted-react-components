# Module federation guide

This guide describes how the Enchanted React Components library (the UI library) is meant to be used together with
[Module Federation](https://module-federation.io/), and where each piece sits.

## Rules

1. **Atom components are never exposed via Module Federation.** Components such as `Button` or `Checkbox` are not entries in
   any remote's `exposes` list.
2. **The library is only used in a Module Federation context.** Atoms are consumed inside *composite components*, which aggregate
   atoms with business logic. Only those composite components are exposed by a remote.
3. **The library is a shared singleton.** Host and remote resolve the same single copy of `@hcl-software/enchanted-react-components`
   (plus `react`, `react-dom` and `@base-ui/react`) at runtime. This is what lets the host's `ThemeProvider` theme components rendered by a remote.

## Where things are located

The UI library is not a federated module. It is a regular package dependency of the host and of every remote, and Module
Federation only de-duplicates it at runtime through the `shared` configuration.

```mermaid
flowchart LR
    subgraph Host["HOST application"]
        direction TB
        TP["ThemeProvider<br/>(owned by host)"]
        Shell["App shell / routing"]
    end

    subgraph Remote["REMOTE application"]
        direction TB
        subgraph Gate["MODULE FEDERATION BOUNDARY<br/>remoteEntry.js exposes ONLY composites"]
            CC["✅ CounterCard<br/>(composite)"]
            SF["✅ SignupForm<br/>(composite)"]
        end
        Logic["Business logic<br/>(state, validation, data)"]
        Logic --- CC
        Logic --- SF
    end

    subgraph Lib["UI LIBRARY (shared singleton, NOT federated)"]
        direction TB
        Atoms["⛔ Atom components<br/>Button, Checkbox, Dialog, ...<br/>NEVER exposed via federation"]
        Deps["react, react-dom, @base-ui/react"]
        Atoms --> Deps
    end

    Shell ==>|"✅ lazy federated import"| Gate
    Shell -.-x|"⛔ atoms cannot be imported<br/>from the remote"| Atoms
    CC -->|"regular import"| Atoms
    SF -->|"regular import"| Atoms
    TP -->|"regular import"| Atoms
    TP -.->|"React context reaches composites"| Gate

    classDef exposed fill:#e8f7ec,stroke:#1c7c3a,stroke-width:3px,color:#0b3a1c;
    classDef blocked fill:#fdecec,stroke:#c62828,stroke-width:3px,color:#7a1010;
    classDef lib fill:#eef2f7,stroke:#64748b,color:#1e293b;
    class CC,SF exposed;
    class Atoms blocked;
    class Deps,TP,Shell,Logic lib;
    style Gate fill:#f3fbf5,stroke:#1c7c3a,stroke-width:3px,stroke-dasharray: 6 4
    style Lib fill:#fff7f7,stroke:#c62828,stroke-width:2px

    linkStyle 3 stroke:#1c7c3a,stroke-width:4px
    linkStyle 4 stroke:#c62828,stroke-width:3px
```

Green = crosses the federation boundary. Red = stays behind it: atoms are consumed only through regular imports and are de-duplicated at runtime through the `shared` configuration.

| Layer | What it is | Federated? |
| --- | --- | --- |
| Host | Owns `ThemeProvider`, loads remote components lazily | Consumes remotes |
| Remote | Exposes composite components (`./CounterCard`, `./SignupForm`) | Yes, via `exposes` |
| Composite components | Atoms plus business logic | Yes (this is the unit that is exposed) |
| Atom components (UI library) | `Button`, `Checkbox`, ... | **No**, shared singleton only |

## Exposed versus not exposed

```mermaid
flowchart LR
    subgraph Lib["UI library: Enchanted React Components"]
        A1["Button"]
        A2["Checkbox"]
        A3["Dialog"]
        A4["..."]
    end

    subgraph Remote["Remote application"]
        direction TB
        Logic["Business logic"]
        Comp["Composite component<br/>(atoms + business logic)"]
        Logic --> Comp
    end

    Wall{{"MODULE FEDERATION<br/>exposes list<br/>./SignupForm only"}}
    Consumer["Host or other remote"]

    A1 --> Comp
    A2 --> Comp
    A3 --> Comp

    Comp ==>|"✅ exposed"| Wall
    Wall ==> Consumer
    A1 -.-x|"⛔ not exposed"| Wall
    A2 -.-x|"⛔ not exposed"| Wall
    A3 -.-x|"⛔ not exposed"| Wall

    classDef atom fill:#fdecec,stroke:#c62828,stroke-width:2px,color:#7a1010;
    classDef ok fill:#e8f7ec,stroke:#1c7c3a,stroke-width:3px,color:#0b3a1c;
    classDef gate fill:#fff8e1,stroke:#b26a00,stroke-width:3px,color:#5a3600;
    class A1,A2,A3,A4 atom;
    class Comp ok;
    class Wall gate;

    linkStyle 4,5 stroke:#1c7c3a,stroke-width:4px
    linkStyle 6,7,8 stroke:#c62828,stroke-width:2px
```

## Runtime sequence

```mermaid
sequenceDiagram
    autonumber
    participant H as Host
    participant MF as Module Federation runtime
    participant R as Remote (remoteEntry.js)
    participant UI as Enchanted library (shared singleton)

    H->>MF: Initialise with shared config (react, enchanted, ...)
    H->>UI: Render ThemeProvider (host's copy is the singleton)
    H->>MF: import('demoRemote/SignupForm')
    MF->>R: Fetch remoteEntry.js and negotiate shared modules
    R-->>MF: Remote reuses the already loaded singleton instances
    MF-->>H: Composite component (SignupForm)
    H->>H: Render SignupForm inside ThemeProvider
    Note over H,UI: The remote's atoms read the host's theme context<br/>because both use the same library instance
    alt Remote cannot be loaded
        MF-->>H: Error, host shows an error message instead of a blank page
    end
```

## Why the singleton matters

```mermaid
flowchart LR
    subgraph Good["Correct: shared singleton"]
        direction TB
        H1["Host ThemeProvider"] --> L1["One library instance"]
        R1["Remote composite component"] --> L1
        L1 --> OK["Themed, hooks and Base UI contexts work"]
    end

    subgraph Bad["Wrong: library bundled twice"]
        direction TB
        H2["Host ThemeProvider"] --> L2a["Library copy A (host)"]
        R2["Remote composite component"] --> L2b["Library copy B (remote)"]
        L2b --> KO["Unthemed remote, 'Invalid hook call',<br/>'ComboboxRootContext is missing'"]
    end
```

## Demo projects

The `enchanted-demo` repository contains two testing projects. Both load the library across a host/remote boundary with
identical application code, so the bundlers can be compared directly.

| Project | Bundler | Plugin | Details |
| --- | --- | --- | --- |
| `enchanted-demo/packages/module-federation` | Vite | `@module-federation/vite` | `packages/module-federation/README.md` |
| `enchanted-demo/packages/module-federation-rsbuild` | Rsbuild | `@module-federation/rsbuild-plugin` | `packages/module-federation-rsbuild/README.md` |

Both run a host on port 4173 and a remote on port 4174 (do not run both projects at the same time). The remote exposes
`./CounterCard` and `./SignupForm`. `packages/MF-COMPARISON.md` in the same repository compares the two bundlers.

### What the demos verify

- A host-owned `ThemeProvider` (light/dark toggle) themes remote components, because the library is a shared singleton.
- A remote `Dialog` (portal/overlay) opens and works inside the host.
- Props and callbacks cross the boundary (`onCountChange`, `onSubmit`).
- A failed remote load shows an error message rather than a blank page.
- Rsbuild only: the `SelectSingle` option list (shared `@base-ui/react/` subpath) opens and applies a selection.

### Shared configuration (single source for host and remote)

```ts
export const shared = {
  react: { singleton: true, requiredVersion: '^19.0.0' },
  'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
  '@base-ui/react': { singleton: true },
  // Trailing slash shares every subpath, e.g. '@base-ui/react/combobox'
  '@base-ui/react/': { singleton: true },
  '@hcl-software/enchanted-react-components': { singleton: true },
};
```

Keep this list identical on host and remote. A mismatch shows up as "Invalid hook call" or an unthemed remote component.

## Pitfalls

| Symptom | Likely cause | Verification / fix |
| --- | --- | --- |
| "Invalid hook call" or unthemed remote component | `shared` differs between host and remote, or the library is bundled twice | Compare both `shared` configs; use one shared `shared.ts` |
| "`<Part>RootContext` is missing" (e.g. Combobox) | `@base-ui/react/` subpath not shared | Add the trailing-slash entry `'@base-ui/react/'` |
| Vite dev: "does not provide an export named `useSyncExternalStore`" | CommonJS subpaths of `use-sync-external-store` not prebundled | Add them to `optimizeDeps.include` |
| Vite dev: host breaks when remote runs | Both dev servers share `node_modules/.vite` | Use a separate `cacheDir` per app |
| Rsbuild: `RUNTIME-006` (`loadShareSync`) | No async boundary at app entry | Boot via `src/index.ts` that dynamically imports `main.tsx` |
| Rsbuild: remote chunks fail to load from host | Missing `assetPrefix` or CORS for the host origin | Set `output.assetPrefix` / `dev.assetPrefix` on the remote and allow the host origin in `server.cors` |

Further notes: type generation is disabled (`dts: false`), remote types are hand-written in `host/src/remote.d.ts`, and the
remote URL is set via `REMOTE_URL` (build time). There are no automated tests yet; the demos were verified manually in Chrome
only. A deployed remote URL and other browsers are not verified.
