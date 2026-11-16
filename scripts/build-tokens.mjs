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

// First-party transformation of DTCG 2025.10 token sources into CSS custom properties.
// Reads tokens/light.tokens.json and tokens/dark.tokens.json and writes
// src/styles/_tokens.generated.scss. See docs/DESIGN-TOKENS-GUIDE.md.
//
// Usage: node scripts/build-tokens.mjs [--tokens <dir>] [--out <file>]

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const argValue = (flag, fallback) => {
  const index = process.argv.indexOf(flag);
  return index === -1 ? fallback : resolve(process.argv[index + 1]);
};

const tokensDir = argValue('--tokens', join(root, 'tokens'));
const outFile = argValue('--out', join(root, 'src/styles/_tokens.generated.scss'));

const THEMES = ['light', 'dark'];
const SUPPORTED_TYPES = new Set(['color', 'dimension', 'fontFamily', 'fontWeight', 'number']);

const header = `/* ======================================================================== *
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
`;

/** Segment to kebab-case: `darkInverse` -> `dark-inverse`, `body1` stays `body1`. */
const kebab = (segment) => segment.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const isToken = (node) => node !== null && typeof node === 'object' && '$value' in node;

/** Flattens a DTCG tree into a Map of dotted path -> token. */
const flatten = (node, path, tokens, file) => {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    if (/[.{}]/.test(key)) throw new Error(`${file}: invalid name "${key}" (reserved characters)`);
    if (child === null || typeof child !== 'object') continue;
    const childPath = [...path, key];
    if (isToken(child)) {
      if (!child.$type) throw new Error(`${file}: token "${childPath.join('.')}" has no explicit $type`);
      tokens.set(childPath.join('.'), child);
    } else {
      flatten(child, childPath, tokens, file);
    }
  }
  return tokens;
};

const ALIAS = /^\{([^{}]+)\}$/;

/** Resolves a `{path.to.token}` alias chain to the target token. */
const resolveAlias = (value, tokens, file, seen = new Set()) => {
  if (typeof value !== 'string') return value;
  const match = ALIAS.exec(value);
  if (!match) return value;
  const target = match[1];
  if (seen.has(target)) throw new Error(`${file}: circular alias "${target}"`);
  seen.add(target);
  const token = tokens.get(target);
  if (!token) throw new Error(`${file}: alias "{${target}}" does not resolve`);
  return resolveAlias(token.$value, tokens, file, seen);
};

const round = (number) => Number(number.toFixed(4));

const formatColor = (value, token, file) => {
  if (typeof value === 'string') return value;
  if (value.hex && (value.alpha === undefined || value.alpha === 1)) return value.hex;
  if (value.colorSpace === 'srgb' && Array.isArray(value.components)) {
    const [r, g, b] = value.components.map((component) => Math.round(component * 255));
    const alpha = value.alpha === undefined ? '' : ` / ${round(value.alpha)}`;
    return `rgb(${r} ${g} ${b}${alpha})`;
  }
  throw new Error(`${file}: color token "${token}" needs a hex or an srgb value`);
};

const formatValue = (token, type, value, file) => {
  switch (type) {
    case 'color':
      return formatColor(value, token, file);
    case 'dimension':
      return `${value.value}${value.unit}`;
    case 'fontFamily':
      return (Array.isArray(value) ? value : [value])
        .map((family) => (/[\s,]/.test(family) ? `"${family}"` : family))
        .join(', ');
    case 'fontWeight':
    case 'number':
      return String(value);
    default:
      throw new Error(`${file}: unsupported $type "${type}" for token "${token}"`);
  }
};

/** Builds a Map of custom property name -> CSS value for one theme file. */
const buildTheme = (theme) => {
  const file = join(tokensDir, `${theme}.tokens.json`);
  const tokens = flatten(JSON.parse(readFileSync(file, 'utf8')), [], new Map(), file);
  const properties = new Map();
  for (const [path, token] of tokens) {
    if (!SUPPORTED_TYPES.has(token.$type)) {
      throw new Error(`${file}: unsupported $type "${token.$type}" for token "${path}"`);
    }
    const name = `--${path.split('.').map(kebab).join('-')}`;
    const value = resolveAlias(token.$value, tokens, file);
    properties.set(name, formatValue(path, token.$type, value, file));
  }
  return properties;
};

const available = THEMES.filter((theme) => existsSync(join(tokensDir, `${theme}.tokens.json`)));

let body;
if (available.length === 0) {
  // No approved token sources yet: emit no values rather than invent any.
  console.warn(`build-tokens: no *.tokens.json found in ${tokensDir}; generated file contains no custom properties.`);
  body = '// No approved token sources are available yet.\n';
} else {
  if (available.length !== THEMES.length) {
    throw new Error(`Expected both ${THEMES.join(' and ')} token files; found only: ${available.join(', ')}`);
  }
  const themes = new Map(THEMES.map((theme) => [theme, buildTheme(theme)]));
  const [light, dark] = THEMES.map((theme) => themes.get(theme));
  // Token paths must match across themes; values may differ.
  const missing = [...light.keys()].filter((name) => !dark.has(name)).concat([...dark.keys()].filter((name) => !light.has(name)));
  if (missing.length > 0) throw new Error(`Token paths differ between light and dark: ${missing.join(', ')}`);
  body = THEMES.map((theme) => {
    const declarations = [...themes.get(theme)].map(([name, value]) => `  ${name}: ${value};`).join('\n');
    return `[data-theme='${theme}'] {\n${declarations}\n}\n`;
  }).join('\n');
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${header}\n// Generated by scripts/build-tokens.mjs. Do not edit; run \`npm run tokens:build\`.\n\n${body}`);
console.log(`build-tokens: wrote ${outFile}`);
