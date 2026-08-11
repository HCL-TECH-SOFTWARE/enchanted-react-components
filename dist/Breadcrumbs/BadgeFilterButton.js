"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const filter_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/filter"));
const IconButton_1 = __importDefault(require("../IconButton"));
const BadgeFilterButton = () => {
    const [badgeVisible, setBadgeVisible] = react_1.default.useState(false);
    return (react_1.default.createElement(material_1.Tooltip, { title: "Filter Assets" },
        react_1.default.createElement("span", { "data-testid": "testFilterButtonContainer" },
            react_1.default.createElement(material_1.Badge, { color: "primary", variant: "dot", invisible: !badgeVisible, overlap: "circular", "data-testid": "testFilterBadge", sx: { '& .MuiBadge-dot': { top: '5%', right: '5%' } } },
                react_1.default.createElement(IconButton_1.default, { value: "filter", sx: { height: '26px', width: '26px' }, disabled: false, "data-testid": "testFilterButton", onClick: () => { return setBadgeVisible((prev) => { return !prev; }); } },
                    react_1.default.createElement(filter_1.default, null))))));
};
exports.default = BadgeFilterButton;
