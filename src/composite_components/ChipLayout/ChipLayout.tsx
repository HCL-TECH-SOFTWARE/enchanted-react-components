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

import React from 'react';
import { debounce } from 'lodash';
import { Box, styled } from '@mui/system';
import Chip from '../../Chip/Chip';
import Typography from '../../Typography';

export interface ChipLayoutProps {
  chipChildNodes: Array<React.ReactNode>,
}

export enum ChipLayoutTestIds {
  CHIP_LAYOUT_ROOT = 'chipLayoutRoot',
  CHIP_LAYOUT_SHOW_MORE = 'chipLayoutShowMore'
}

const StyledChip = styled(Chip)(({ theme }) => {
  return {
    '.MuiTypography-root': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  };
});

const ChipLayout = (props: ChipLayoutProps) => {
  const { chipChildNodes } = props;
  const rootBoxRef = React.useRef<HTMLElement>(null);
  const [totalChips, setTotalChips] = React.useState<Array<React.ReactNode>>([]);
  const [slicedChips, setSlicedChips] = React.useState<Array<React.ReactNode>>([]);
  const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);
  const [isMounted, setIsMounted] = React.useState<boolean>(true);
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
        if ((currentChip as HTMLElement).offsetWidth > chipWidthLimit) {
          (currentChip as HTMLElement).style.width = `${chipWidthLimit.toString()}px`;
        }
      }
      maxIndex = 3;
    } else {
    // First just handle width computation of first four chips and then deal with remaining chips.
      const chipWidthLimit:number = (maxWidth - showMoreLength - (marginRightBetweenChips * maxChipCountToRender)) / maxChipCountToRender;
      const minChipWidth:number = 76;
      let occupiedWidthByFirstFour = 0;
      for (let index = 0; index < 4; index += 1) {
        const currentChip = currentChips[index];
        if ((currentChip as HTMLElement).offsetWidth > chipWidthLimit) {
          (currentChip as HTMLElement).style.width = `${chipWidthLimit}px`;
          occupiedWidthByFirstFour += parseInt((currentChip as HTMLElement).style.width, 10);
          maxIndex = index;
        } else {
          occupiedWidthByFirstFour += (currentChip as HTMLElement).offsetWidth;
          maxIndex = index;
        }
      }
      let leftOverWidth = maxWidth - showMoreLength - occupiedWidthByFirstFour;
      for (let index = 4; index < currentChips.length; index += 1) {
        const currentChip = currentChips[index];
        if (leftOverWidth > minChipWidth) {
          if ((currentChip as HTMLElement).offsetWidth >= leftOverWidth) {
            (currentChip as HTMLElement).style.width = `${leftOverWidth}px`;
            maxIndex = index;
            break;
          } else if ((currentChip as HTMLElement).offsetWidth < leftOverWidth) {
            leftOverWidth -= ((currentChip as HTMLElement).offsetWidth + marginRightBetweenChips);
            maxIndex = index;
          }
        } else {
          break;
        }
      }
    }

    const newSlice = totalChips.slice(0, maxIndex + 1);
    const newHiddenCount = totalChips.length - newSlice.length;
    setSlicedChips(newSlice);
    if (totalChips.length > newSlice.length) {
      newSlice.push(
        <Box
          data-testid={ChipLayoutTestIds.CHIP_LAYOUT_SHOW_MORE}
          key="chiplayout-tooltip-counter"
          sx={{
            display: 'flex', flexGrow: 1, justifyContent: 'flex-end', marginRight: `${marginRightBetweenChips}px`,
          }}
        >
          <Typography variant="body2bold" padding="4px 12px 4px 12px">{`+${newHiddenCount}`}</Typography>
        </Box>,
      );
    }
  };

  const mapChipChildNodesToTotalChips = () => {
    const totalChipsArr = chipChildNodes?.filter((criterion) => {
      return React.isValidElement(criterion);
    }).map((eachChip, key) => {
      return (
        // eslint-why fixing this causes issue
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={`chiplayout-chip-${key}`}>
          <StyledChip sx={{ marginRight: `${marginRightBetweenChips}px` }} label={eachChip} />
        </React.Fragment>

      );
    });

    setTotalChips(totalChipsArr || []);
  };

  React.useEffect(() => {
    const reportWindowSize = debounce(() => {
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

  React.useEffect(() => {
    processChips();
  }, [totalChips]);

  React.useEffect(() => {
    setTotalChips([]);
    setTimeout(() => {
      mapChipChildNodesToTotalChips();
    }, 100);
  }, [windowWidth]);

  React.useEffect(() => {
    mapChipChildNodesToTotalChips();
  }, [chipChildNodes]);

  if (totalChips.length === 0) {
    return null;
  }

  return (
    <Box
      data-testid={ChipLayoutTestIds.CHIP_LAYOUT_ROOT}
      ref={rootBoxRef}
      height="28px"
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      {slicedChips.length > 0 ? slicedChips : totalChips}
    </Box>
  );
};

export default ChipLayout;
