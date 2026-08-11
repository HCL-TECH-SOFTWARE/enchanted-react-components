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
const react_1 = __importDefault(require("react"));
const close__filled_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/close--filled"));
const Autocomplete_1 = __importDefault(require("../../Autocomplete/Autocomplete"));
const colors_1 = require("../../colors");
const MultipleSelectChip = (_a) => {
    var props = __rest(_a, []);
    const { emptyOptions, listboxBanner } = props, rest = __rest(props, ["emptyOptions", "listboxBanner"]);
    const getMuiInputBasePaddingRight = () => {
        if (props.error && !props.emptyOptions) {
            return '82px !important';
        }
        if (!props.error && !props.emptyOptions) {
            return '56px !important';
        }
        if (props.error && props.emptyOptions) {
            return '60px !important';
        }
        return '40px !important';
    };
    const sxDefaultProps = {
        '& .MuiInputBase-root': {
            height: '100% !important',
            paddingRight: getMuiInputBasePaddingRight(),
            '& input': {
                minWidth: '70px !important',
                paddingLeft: '2px !important',
                paddingTop: '6px !important',
                paddingBottom: '6px !important',
            },
        },
        '& .MuiInputBase-root.Mui-disabled': {
            backgroundColor: colors_1.white.WHITE100P,
        },
        '& .MuiOutlinedInput-root': {
            width: props.fullWidth ? '100%' : '500px',
            paddingLeft: '7px !important',
        },
        '& .MuiFormControl-root': {
            width: props.fullWidth ? '100%' : '500px',
            display: 'block',
        },
        '& .MuiChip-root': {
            padding: '0px 4px !important',
            margin: '2px',
            maxWidth: 'calc(100% - 6px)',
            border: 0,
        },
    };
    const sxProps = Object.assign(Object.assign({}, sxDefaultProps), rest.sx);
    return (react_1.default.createElement(Autocomplete_1.default, Object.assign({}, rest, { freeSolo: emptyOptions, options: emptyOptions ? [] : rest.options, sx: sxProps, multiple: true, clearIcon: react_1.default.createElement(close__filled_1.default, { color: "action" }), listboxBanner: listboxBanner })));
};
MultipleSelectChip.defaultProps = {
    emptyOptions: false,
};
exports.default = MultipleSelectChip;
