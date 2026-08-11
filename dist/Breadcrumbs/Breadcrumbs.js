"use strict";
/* ======================================================================== *
 * Copyright 2024 HCL America Inc.                                          *
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMuiBreadcrumbsThemeOverrides = void 0;
const react_1 = __importDefault(require("react"));
const Breadcrumbs_1 = __importDefault(require("@mui/material/Breadcrumbs"));
const styles_1 = require("@mui/material/styles");
const chevron__right_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/chevron--right"));
const chevron__left_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/chevron--left"));
const theme_1 = require("../theme");
/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override Breadcrumbs component styles and prop
 */
const getMuiBreadcrumbsThemeOverrides = () => {
    return {
        MuiBreadcrumbs: {
            defaultProps: {
                separator: react_1.default.createElement(chevron__right_1.default, null),
                maxItems: 8,
                itemsAfterCollapse: 1,
                itemsBeforeCollapse: 1,
            },
            styleOverrides: {
                root: ({ theme }) => {
                    return {
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        '&[disabled]': {
                            cursor: 'default',
                            pointerEvents: 'none',
                            textDecorationColor: theme.palette.text.disabled,
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'none',
                            },
                            li: {
                                a: {
                                    outline: 'none',
                                    borderColor: 'transparent',
                                    color: theme.palette.text.disabled,
                                },
                            },
                        },
                        li: {
                            lineHeight: '16px',
                            svg: {
                                height: '16px',
                                width: '16px',
                                display: 'inline-block',
                                verticalAlign: 'middle',
                                marginBottom: '1px',
                                marginTop: '-1px',
                            },
                            a: Object.assign(Object.assign({ color: theme.palette.text.secondary, textAlign: 'center' }, theme.typography.body2), { lineHeight: '16px', textDecoration: 'none', padding: '1px 2px 1px 2px', borderRadius: '2px', display: 'inline', '&:hover': {
                                    color: theme.palette.text.secondary,
                                    backgroundColor: theme.palette.action.hover,
                                    textDecoration: 'underline',
                                    textDecorationColor: theme.palette.text.secondary,
                                }, '&:focus': {
                                    outlineColor: theme.palette.primary.main,
                                    outlineWidth: '1px',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: theme.palette.text.secondary,
                                        textDecoration: 'underline',
                                        textDecorationColor: theme.palette.text.secondary,
                                    },
                                } }),
                            p: Object.assign({}, theme.typography.body2),
                        },
                        '& .MuiBreadcrumbs-separator': {
                            margin: '0',
                            svg: {
                                margin: '0 2px 0 2px',
                                height: '16px',
                                width: '16px',
                                display: 'inline-block',
                                verticalAlign: 'middle',
                            },
                        },
                    };
                },
            },
        },
    };
};
exports.getMuiBreadcrumbsThemeOverrides = getMuiBreadcrumbsThemeOverrides;
const Breadcrumbs = (_a) => {
    var props = __rest(_a, []);
    const theme = (0, styles_1.useTheme)();
    const separator = theme.direction === theme_1.ThemeDirectionType.RTL ? react_1.default.createElement(chevron__left_1.default, null) : react_1.default.createElement(chevron__right_1.default, null);
    return react_1.default.createElement(Breadcrumbs_1.default, Object.assign({ separator: separator }, props));
};
Breadcrumbs.defaultProps = {
    disabled: false,
};
exports.default = Breadcrumbs;
