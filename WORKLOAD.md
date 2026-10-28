# Enchanted Workload

## Purpose and Scope

This document tracks the sequence, status, ownership, and completion criteria for the Enchanted component library. Use it as the planning source while the team evaluates GitHub Issues and Projects; migrate the work when a tracking tool is selected.

The current repository is a private proof of concept, and the final repository has not been selected. Keep repository migration separate from component implementation and revisit it when the destination is chosen.

## Collaborators

- [Angelo Rick Asoy](angelo-asoy)
- [Satish Kumar](devsatish05)
- [Hanjo Hagemeier](HanjoHagemeierHCL)

## Work Plan

Complete phases in order. Work within the documentation phase can proceed in parallel. Drafting may start before its dependencies are resolved, but do not mark dependent work complete until its finish criteria are met.

| Phase | Work item | Status | Owner | Dependency / done when |
|---|---|---|---|---|
| 1. Scope | Confirm the first-release component set in [ENCHANTED.md](ENCHANTED.md). | Done | [Hanjo Hagemeier](HanjoHagemeierHCL) | Agree whether candidate components such as Button and Input are in scope; record the approved set before implementation. |
| 1. Decisions | Resolve release decisions: approved token values and transformation workflow, supported browser matrix, WCAG target, and icon library. | In progress | [Hanjo Hagemeier](HanjoHagemeierHCL) | Record decisions in [ENCHANTED.md](ENCHANTED.md) or the relevant guide so documentation and implementation have clear inputs. |
| 2. Documentation | Complete the [repository setup guide](docs/REPO-SETUP-GUIDE.md). | Done | [Hanjo Hagemeier](HanjoHagemeierHCL) | Verify setup steps and commands against repository configuration. |
| 2. Documentation | Complete the [component and code guide](docs/COMPONENT-GUIDE.md). | Done | [Angelo Rick Asoy](angelo-asoy) | Align conventions with the approved component set and distinguish existing patterns from planned ones. |
| 2. Documentation | Complete the Figma Code Connect guides ([setup](docs/FIGMA-CODE-CONNECT-SETUP.md), [usage](docs/FIGMA-CODE-CONNECT-USAGE.md)). | Done | [Satish Kumar](devsatish05) | Document the actual mapping workflow and define how the pilot will validate it. |
| 2. Documentation | Write the [design tokens and theming guide](docs/DESIGN-TOKENS-GUIDE.md). | In progress | [Hanjo Hagemeier](HanjoHagemeierHCL) | Explain light and dark theme behavior; document approved token values and transformation workflow once decided. |
| 2. Documentation | Write the [testing and visual review guide](docs/TESTING-GUIDE.md). | In progress | [Angelo Rick Asoy](angelo-asoy) | Document unit, Storybook, Chromatic, browser, and accessibility checks, including the agreed browser matrix and WCAG target. |
| 3. Validation | Review the guides together and verify every current-state claim against the repository. | In progress | [Satish Kumar](devsatish05) | Resolve contradictions and label capabilities as implemented, planned, or undecided. |
| 4. Implementation | Implement the approved first-release components. | Open | Unassigned | Requires approved scope and usable component, token, and testing guidance; each component meets its documented behavior and accessibility checks. |
| 5. Pilot | Apply Figma Code Connect styling to one approved component. | Open | Unassigned | Complete after implementation; use the pilot to validate the guide and mapping approach, then record any changes needed. |
| 6. Expansion | Extend the validated styling and mapping approach to additional components. | Open | Unassigned | Requires an accepted pilot and approved component scope. |
| 7. Release readiness | Establish a reliable nightly build and run visual and accessibility checks across the supported browser matrix. | Open | Unassigned | Build runs reliably; Chromatic findings are reviewed and accessibility violations against the agreed WCAG target are resolved or explicitly accepted. |

## Release Acceptance

The release is ready when all of the following are true:

- The approved first-release component set is implemented, with light and dark themes using approved design tokens.
- Contributor and consumer documentation is accurate, consistent, and validated against the repository.
- AI-assisted UI development conventions are documented and match the component APIs and examples.
- A reliable nightly build is in place.
- Visual behavior is checked across the supported browser matrix using Chromatic.
- The icon library is selected and used consistently.
- Accessibility is checked against the agreed WCAG target; reported violations are resolved or explicitly accepted.

## Deferred

- **Module federation:** Out of scope for this repository per [ENCHANTED.md](ENCHANTED.md). The existing guide placeholder is not an active deliverable; revisit only if project scope changes.
