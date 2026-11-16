/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */

import type { CSSProperties, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useShadowRoot } from '../utils/useShadowRoot';
import { BoundaryContext } from './BoundaryContext';
import { boundaryStyles } from './boundaryStyles';

/** Theme modes the provider can apply through `data-theme`. */
export const ThemeMode = { Light: 'light', Dark: 'dark' } as const;
export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

/** Text directions the provider can apply through `dir`. */
export const Direction = { Ltr: 'ltr', Rtl: 'rtl' } as const;
export type Direction = (typeof Direction)[keyof typeof Direction];

/** How the provider isolates component styles; `open` and `closed` match `ShadowRootMode`. */
export const ShadowRootType = { None: 'none', Open: 'open', Closed: 'closed' } as const;
export type ShadowRootType = (typeof ShadowRootType)[keyof typeof ShadowRootType];

/** Props of {@link ThemeProvider}. */
export interface ThemeProviderProps {
  /** Active theme mode, exposed as `data-theme` on the host. */
  mode: ThemeMode;
  /** Text direction, applied through the native `dir` attribute. Defaults to `ltr`. */
  direction?: Direction;
  /**
   * Style boundary. `open` (default) and `closed` render children into a shadow root;
   * `none` renders them in the document and adds the component styles to the document head.
   */
  shadowRootType?: ShadowRootType;
  /** Class name for the host element. */
  className?: string;
  /** Inline style for the host element; use it to override tokens. */
  style?: CSSProperties;
  children?: ReactNode;
}

interface HostProps {
  mode: ThemeMode;
  direction: Direction;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const ShadowHost = ({ mode, direction, shadowRootType, className, style, children }: HostProps & { shadowRootType: ShadowRootMode }) => {
  const [root, ref] = useShadowRoot<HTMLDivElement>(shadowRootType);
  return (
    <div ref={ref} data-theme={mode} dir={direction} className={className} style={style}>
      {root &&
        createPortal(
          <>
            <style>{boundaryStyles}</style>
            <BoundaryContext value={root}>{children}</BoundaryContext>
          </>,
          root,
        )}
    </div>
  );
};

const DocumentHost = ({ mode, direction, className, style, children }: HostProps) => (
  <div data-theme={mode} dir={direction} className={className} style={style}>
    {/* React 19 hoists this tag to the document head and renders it once per `href`. */}
    <style href="enchanted-styles" precedence="enchanted">
      {boundaryStyles}
    </style>
    {children}
  </div>
);

/**
 * Applies the theme mode and text direction, and isolates component styles in a shadow-root
 * boundary. Components render unstyled and without tokens outside a provider.
 */
export const ThemeProvider = ({
  direction = Direction.Ltr,
  shadowRootType = ShadowRootType.Open,
  ...rest
}: ThemeProviderProps) =>
  shadowRootType === ShadowRootType.None ? (
    <DocumentHost key={shadowRootType} direction={direction} {...rest} />
  ) : (
    // `attachShadow` cannot change the mode of a host that has a root, so remount on change.
    <ShadowHost key={shadowRootType} direction={direction} shadowRootType={shadowRootType} {...rest} />
  );
