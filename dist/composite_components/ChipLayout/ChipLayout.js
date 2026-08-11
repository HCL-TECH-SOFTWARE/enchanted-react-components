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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChipLayoutTestIds = void 0;
const react_1 = __importDefault(require("react"));
const lodash_1 = require("lodash");
const system_1 = require("@mui/system");
const Chip_1 = __importDefault(require("../../Chip/Chip"));
const Typography_1 = __importDefault(require("../../Typography"));
var ChipLayoutTestIds;
(function (ChipLayoutTestIds) {
    ChipLayoutTestIds["CHIP_LAYOUT_ROOT"] = "chipLayoutRoot";
    ChipLayoutTestIds["CHIP_LAYOUT_SHOW_MORE"] = "chipLayoutShowMore";
})(ChipLayoutTestIds = exports.ChipLayoutTestIds || (exports.ChipLayoutTestIds = {}));
const StyledChip = (0, system_1.styled)(Chip_1.default)(({ theme }) => {
    return {
        '.MuiTypography-root': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
    };
});
const ChipLayout = (props) => {
    const { chipChildNodes } = props;
    const rootBoxRef = react_1.default.useRef(null);
    const [totalChips, setTotalChips] = react_1.default.useState([]);
    const [slicedChips, setSlicedChips] = react_1.default.useState([]);
    const [windowWidth, setWindowWidth] = react_1.default.useState(window.innerWidth);
    const [isMounted, setIsMounted] = react_1.default.useState(true);
    const marginRightBetweenChips = 4;
    const showMoreLength = 50;
    const maxChipCountToRender = 4;
    /**
    * Chip layout computation function
    * if firstfour chips total of offsetwidth > maxwidth then divide limit = maxwidth/chiplength and check if chipoffset>limit
    * if chipoffset>limit then chip.style.width =limit
    * else chipoffset<limit then fine no worries lets try to include others also via already existing logic
    */
    const processChips = () => {
        const currentChips = document.querySelectorAll('.MuiChip-root');
        const maxWidth = (rootBoxRef && rootBoxRef.current) ? rootBoxRef.current.offsetWidth : 0;
        let maxIndex = 0;
        // logic in this if for chip<=4
        if (currentChips.length <= 4) {
            const chipWidthLimit = (maxWidth - showMoreLength - (currentChips.length * marginRightBetweenChips)) / currentChips.length;
            for (let index = 0; index < currentChips.length; index += 1) {
                const currentChip = currentChips[index];
                if (currentChip.offsetWidth > chipWidthLimit) {
                    currentChip.style.width = `${chipWidthLimit.toString()}px`;
                }
            }
            maxIndex = 3;
        }
        else {
            // First just handle width computation of first four chips and then deal with remaining chips.
            const chipWidthLimit = (maxWidth - showMoreLength - (marginRightBetweenChips * maxChipCountToRender)) / maxChipCountToRender;
            const minChipWidth = 76;
            let occupiedWidthByFirstFour = 0;
            for (let index = 0; index < 4; index += 1) {
                const currentChip = currentChips[index];
                if (currentChip.offsetWidth > chipWidthLimit) {
                    currentChip.style.width = `${chipWidthLimit}px`;
                    occupiedWidthByFirstFour += parseInt(currentChip.style.width, 10);
                    maxIndex = index;
                }
                else {
                    occupiedWidthByFirstFour += currentChip.offsetWidth;
                    maxIndex = index;
                }
            }
            let leftOverWidth = maxWidth - showMoreLength - occupiedWidthByFirstFour;
            for (let index = 4; index < currentChips.length; index += 1) {
                const currentChip = currentChips[index];
                if (leftOverWidth > minChipWidth) {
                    if (currentChip.offsetWidth >= leftOverWidth) {
                        currentChip.style.width = `${leftOverWidth}px`;
                        maxIndex = index;
                        break;
                    }
                    else if (currentChip.offsetWidth < leftOverWidth) {
                        leftOverWidth -= (currentChip.offsetWidth + marginRightBetweenChips);
                        maxIndex = index;
                    }
                }
                else {
                    break;
                }
            }
        }
        const newSlice = totalChips.slice(0, maxIndex + 1);
        const newHiddenCount = totalChips.length - newSlice.length;
        setSlicedChips(newSlice);
        if (totalChips.length > newSlice.length) {
            newSlice.push(react_1.default.createElement(system_1.Box, { "data-testid": ChipLayoutTestIds.CHIP_LAYOUT_SHOW_MORE, key: "chiplayout-tooltip-counter", sx: {
                    display: 'flex', flexGrow: 1, justifyContent: 'flex-end', marginRight: `${marginRightBetweenChips}px`,
                } },
                react_1.default.createElement(Typography_1.default, { variant: "body2bold", padding: "4px 12px 4px 12px" }, `+${newHiddenCount}`)));
        }
    };
    const mapChipChildNodesToTotalChips = () => {
        const totalChipsArr = chipChildNodes === null || chipChildNodes === void 0 ? void 0 : chipChildNodes.filter((criterion) => {
            return react_1.default.isValidElement(criterion);
        }).map((eachChip, key) => {
            return (
            // eslint-why fixing this causes issue
            // eslint-disable-next-line react/no-array-index-key
            react_1.default.createElement(react_1.default.Fragment, { key: `chiplayout-chip-${key}` },
                react_1.default.createElement(StyledChip, { sx: { marginRight: `${marginRightBetweenChips}px` }, label: eachChip })));
        });
        setTotalChips(totalChipsArr || []);
    };
    react_1.default.useEffect(() => {
        const reportWindowSize = (0, lodash_1.debounce)(() => {
            if (isMounted) {
                setWindowWidth(window.innerWidth);
            }
        }, 100);
        // Trigger this function on resize
        window.addEventListener('resize', reportWindowSize);
        //  Cleanup for componentWillUnmount
        return () => {
            setIsMounted(false);
            return window.removeEventListener('resize', reportWindowSize);
        };
    }, []);
    react_1.default.useEffect(() => {
        processChips();
    }, [totalChips]);
    react_1.default.useEffect(() => {
        setTotalChips([]);
        setTimeout(() => {
            mapChipChildNodesToTotalChips();
        }, 100);
    }, [windowWidth]);
    react_1.default.useEffect(() => {
        mapChipChildNodesToTotalChips();
    }, [chipChildNodes]);
    if (totalChips.length === 0) {
        return null;
    }
    return (react_1.default.createElement(system_1.Box, { "data-testid": ChipLayoutTestIds.CHIP_LAYOUT_ROOT, ref: rootBoxRef, height: "28px", sx: {
            display: 'flex',
            width: '100%',
        } }, slicedChips.length > 0 ? slicedChips : totalChips));
};
exports.default = ChipLayout;
