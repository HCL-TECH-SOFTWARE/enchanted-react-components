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
import {
  act,
  cleanup,
  fireEvent,
  render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import IconAvatar from '@hcl-software/enchanted-icons/dist/carbon/es/folder';
import Preview, { Assets, PreviewTestIds, PreviewProps } from '../../../Preview/Preview';
import Avatar, { AvatarColors, AvatarTestIds, AvatarTypes } from '../../../Avatar';
import Typography from '../../../Typography';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../theme';

const theme = createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);

const sampleRenditionLabel = 'Rendition';
const selectButtonTitle = 'Select';
const sampleImageList: Assets[] = [
  {
    title: 'scenery_sample.jpeg',
    mediaType: {
      mimeType: 'image/jpeg',
      extensions: ['jpeg'],
    },
    renditions: [
      {
        id: '1',
        type: 'Source',
        source: 'scenery_sample.jpeg',
        dimension: '200 x 100',
      },
      {
        id: '2',
        type: 'Desktop',
        source: 'scenery_2.jpeg',
        dimension: '180 x 150',
      },
      {
        id: '3',
        type: 'Smartphone',
        source: 'scenery_3.png',
        dimension: '230 x 450',
      },
    ],
  },
  {
    title: 'scenery_sample1.jpeg',
    mediaType: {
      mimeType: 'image/jpeg',
      extensions: ['jpeg'],
    },
    renditions: [
      {
        id: '1',
        type: 'Source',
        source: 'scenery_sample.jpeg',
        dimension: '200 x 100',
      },
      {
        id: '2',
        type: 'Desktop',
        source: 'scenery_2.jpeg',
        dimension: '180 x 150',
      },
      {
        id: '3',
        type: 'Smartphone',
        source: 'scenery_3.png',
        dimension: '230 x 450',
      },
    ],
  },
];

const sampleVideoList: Assets[] = [
  {
    title: 'Supercharging-Progress.mp4',
    mediaType: {
      mimeType: 'video/mp4',
      extensions: ['mp4'],
    },
    renditions: [
      {
        id: '2',
        type: 'Source',
        source: 'Supercharging-Progress.mp4',
        dimension: '640 x 630',
      },
    ],
  },
  {
    title: 'HCL-The-Future.mp4',
    mediaType: {
      mimeType: 'video/mp4',
      extensions: ['mp4'],
    },
    renditions: [
      {
        id: '1',
        type: 'Source',
        source: 'HCL-The-Future.mp4',
        dimension: '1920 x 1080',
      },
    ],
  },
];

const tooltipTexts = {
  zoomToFit: 'Zoom to fit',
  viewActualSize: 'View actual size',
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  previousAsset: 'Previous asset',
  nextAsset: 'Next asset',
  download: 'Download asset',
};

// function for expecting asset to be fully rendered inside <Preview /> and finished loading/fetching assets
const expectFullyRenderedAsset = async (preiviewProps: Partial<PreviewProps>) => {
  const {
    assets, renditionLabel, isSelectButtonDisabled, index, ...props
  } = preiviewProps;

  render(
    <ThemeProvider theme={theme}>
      <Preview
        {...props}
        open
        isFetchingAssets={false}
        assets={assets ?? sampleImageList}
        renditionLabel={renditionLabel ?? sampleRenditionLabel}
        isSelectButtonDisabled={isSelectButtonDisabled ?? true}
        selectButtonTitle={selectButtonTitle}
        tooltipTexts={tooltipTexts}
        index={index ?? 0}
      />
    </ThemeProvider>,
  );

  // load image
  const image = screen.getByTestId(PreviewTestIds.PREVIEW_IMAGE);
  fireEvent.load(image);

  const loadingSpinner = screen.queryByTestId(PreviewTestIds.PREVIEW_CIRCULAR_PROGRESS);
  // wait for asset to finish rendering
  expect(loadingSpinner).toBeNull();

  // expect elements that depends on asset to finish rendering
  expect(screen.getByTestId(PreviewTestIds.PREVIEW_IMAGE)).not.toBeNull();
  expect(screen.getByTestId(PreviewTestIds.PREVIEW_ZOOM_IN_BUTTON)).not.toBeNull();
  expect(screen.getByTestId(PreviewTestIds.PREVIEW_ZOOM_OUT_BUTTON)).not.toBeNull();
  expect(screen.getByTestId(PreviewTestIds.PREVIEW_ZOOM_PERCENT_BUTTON)).not.toBeNull();
};

afterEach(cleanup);

describe('Preview', () => {
  it('should render base of preview', () => {
    expectFullyRenderedAsset({});

    expect(screen.getByText(sampleRenditionLabel)).not.toBeNull();
    expect(screen.getByText(selectButtonTitle)).not.toBeNull();
    expect(screen.getByText(sampleImageList[0].title)).not.toBeNull();
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_DOWNLOAD_BUTTON)).not.toBeNull();
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_RENDITION_DROPDOWN)).not.toBeNull();
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_SELECT_BUTTON)).not.toBeNull();
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_NEXT_BUTTON)).not.toBeNull();
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_PREV_BUTTON)).not.toBeNull();
  });

  it('should still render the base of Preview component if passed an empty array of assets', () => {
    expectFullyRenderedAsset({ assets: [] });

    expect(screen.getByText(sampleRenditionLabel)).not.toBeNull();
    expect(screen.getByText(selectButtonTitle)).not.toBeNull();
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_IMAGE)).not.toBeNull();
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_DOWNLOAD_BUTTON)).not.toBeNull();
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_RENDITION_DROPDOWN)).not.toBeNull();
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_SELECT_BUTTON)).not.toBeNull();
  });

  it('should still render the base of Preview component if passed an index outside array length', () => {
    expectFullyRenderedAsset({ index: 4 });

    expect(screen.getByText(selectButtonTitle)).not.toBeNull();
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_IMAGE)).not.toBeNull();
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_DOWNLOAD_BUTTON)).not.toBeNull();
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_RENDITION_DROPDOWN)).not.toBeNull();
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_SELECT_BUTTON)).not.toBeNull();
  });

  it('should render select button as enabled when isSelectButtonDisabled is false', () => {
    expectFullyRenderedAsset({ isSelectButtonDisabled: false });
    expect(screen.getByText(selectButtonTitle)).not.toBeNull();
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_SELECT_BUTTON)).toHaveProperty('disabled', false);
  });

  it('should render tooltips when elements are hovered', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Preview
          open
          assets={sampleImageList}
          renditionLabel={sampleRenditionLabel}
          isSelectButtonDisabled={false}
          selectButtonTitle={selectButtonTitle}
          isFetchingAssets={false}
          tooltipTexts={tooltipTexts}
          index={0}
        />
      </ThemeProvider>,
    );

    // load image
    const image = screen.getByTestId(PreviewTestIds.PREVIEW_IMAGE);
    fireEvent.load(image);

    // zoom buttons tooltips
    fireEvent.mouseOver(screen.getByTestId(PreviewTestIds.PREVIEW_ZOOM_PERCENT_BUTTON)); // To hover element and show tooltip
    await waitFor(() => {
      expect(screen.getByText(tooltipTexts.viewActualSize)).not.toBeNull();
    });

    fireEvent.mouseOver(screen.getByTestId(PreviewTestIds.PREVIEW_ZOOM_IN_BUTTON));
    await waitFor(() => {
      expect(screen.getByText(tooltipTexts.zoomIn)).not.toBeNull();
    });

    fireEvent.mouseOver(screen.getByTestId(PreviewTestIds.PREVIEW_ZOOM_OUT_BUTTON));
    await waitFor(() => {
      expect(screen.getByText(tooltipTexts.zoomOut)).not.toBeNull();
    });

    // prev/next button tooltips
    fireEvent.mouseOver(screen.getByTestId(PreviewTestIds.PREVIEW_NEXT_BUTTON));
    await waitFor(() => {
      expect(screen.getByText(tooltipTexts.nextAsset)).not.toBeNull();
    });

    fireEvent.mouseOver(screen.getByTestId(PreviewTestIds.PREVIEW_PREV_BUTTON));
    await waitFor(() => {
      expect(screen.getByText(tooltipTexts.previousAsset)).not.toBeNull();
    });

    // download button tooltip
    expect(screen.getByTestId(PreviewTestIds.PREVIEW_DOWNLOAD_BUTTON)).not.toBeNull();
    fireEvent.mouseOver(screen.getByTestId(PreviewTestIds.PREVIEW_DOWNLOAD_BUTTON));
    await waitFor(() => {
      expect(screen.getByText(tooltipTexts.download)).not.toBeNull();
    });
  });

  it('should render video element and be able to navigate previous/next when using default navigation', async () => { // when not passing override next/prev handlers props
    render(
      <ThemeProvider theme={theme}>
        <Preview
          open
          assets={sampleVideoList}
          renditionLabel={sampleRenditionLabel}
          isSelectButtonDisabled={false}
          selectButtonTitle={selectButtonTitle}
          tooltipTexts={tooltipTexts}
          index={0}
        />
      </ThemeProvider>,
    );

    const videoPlayer = screen.getByTestId(PreviewTestIds.PREVIEW_VIDEO_PLAYER);
    expect(videoPlayer).not.toBeNull();

    await act(() => {
      const nextButton = screen.getByTestId(PreviewTestIds.PREVIEW_NEXT_BUTTON);
      fireEvent.click(nextButton);
    });

    expect(screen.getByTestId(PreviewTestIds.PREVIEW_VIDEO_PLAYER).getAttribute('src')).toStrictEqual('HCL-The-Future.mp4');

    await act(() => {
      const prevButton = screen.getByTestId(PreviewTestIds.PREVIEW_PREV_BUTTON);
      fireEvent.click(prevButton);
    });

    expect(screen.getByTestId(PreviewTestIds.PREVIEW_VIDEO_PLAYER).getAttribute('src')).toStrictEqual('Supercharging-Progress.mp4');
  });

  it('should render previous button to be disabled', () => {
    render(
      <ThemeProvider theme={theme}>
        <Preview
          open
          assets={sampleImageList}
          renditionLabel={sampleRenditionLabel}
          isSelectButtonDisabled={false}
          selectButtonTitle={selectButtonTitle}
          tooltipTexts={tooltipTexts}
          index={0}
        />
      </ThemeProvider>,
    );

    expect(screen.getByTestId(PreviewTestIds.PREVIEW_PREV_BUTTON)).toHaveProperty('disabled', true);
  });

  it('should override automatic disable/enable of navigation buttons when `isNextButtonDisabled` or `isPreviousButtonDisabled` have been passed', () => {
    render(
      <ThemeProvider theme={theme}>
        <Preview
          open
          assets={sampleImageList}
          renditionLabel={sampleRenditionLabel}
          isSelectButtonDisabled={false}
          isPreviousButtonDisabled={false}
          isNextButtonDisabled
          selectButtonTitle={selectButtonTitle}
          tooltipTexts={tooltipTexts}
          index={0}
        />
      </ThemeProvider>,
    );

    const prevButton = screen.getByTestId(PreviewTestIds.PREVIEW_PREV_BUTTON);
    expect(prevButton).toHaveProperty('disabled', false);
    const nextButton = screen.getByTestId(PreviewTestIds.PREVIEW_NEXT_BUTTON);
    expect(nextButton).toHaveProperty('disabled', true);
  });

  it('should override default implementation of next button when prop `overrideHandleNext` has been passed', () => {
    const handleNext = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <Preview
          open
          assets={sampleImageList}
          renditionLabel={sampleRenditionLabel}
          isSelectButtonDisabled={false}
          selectButtonTitle={selectButtonTitle}
          tooltipTexts={tooltipTexts}
          index={0}
          overrideHandleNext={handleNext}
        />
      </ThemeProvider>,
    );

    const nextButton = screen.getByTestId(PreviewTestIds.PREVIEW_NEXT_BUTTON);
    expect(nextButton).toHaveProperty('disabled', false);
    fireEvent.click(nextButton);

    expect(handleNext).toHaveBeenCalled();
  });

  it('should override default implementation of previous button when prop `overrideHandlePrevious` has been passed', () => {
    const handlePrevious = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <Preview
          open
          assets={sampleImageList}
          renditionLabel={sampleRenditionLabel}
          isSelectButtonDisabled={false}
          selectButtonTitle={selectButtonTitle}
          tooltipTexts={tooltipTexts}
          index={1}
          overrideHandlePrevious={handlePrevious}
        />
      </ThemeProvider>,
    );

    const prevButton = screen.getByTestId(PreviewTestIds.PREVIEW_PREV_BUTTON);
    expect(prevButton).toHaveProperty('disabled', false);
    fireEvent.click(prevButton);

    expect(handlePrevious).toHaveBeenCalled();
  });

  it('should be able to render react components when reactComponent prop is not undefined', () => {
    render(
      <ThemeProvider theme={theme}>
        <Preview
          open
          assets={sampleImageList}
          renditionLabel={sampleRenditionLabel}
          isSelectButtonDisabled
          selectButtonTitle={selectButtonTitle}
          tooltipTexts={tooltipTexts}
          index={0}
          reactComponent={(
            <>
              <Avatar
                variant="rounded"
                type={AvatarTypes.ICON}
                color={AvatarColors.BLUE}
                iconImage={<IconAvatar />}
                data-testid={AvatarTestIds.AVATAR_ICON}
                sx={{ margin: 'auto', marginBottom: '8px' }}
              />
              <Typography color="textSecondary" variant="subtitle2">A sample text here</Typography>
            </>
          )}
        />
      </ThemeProvider>,
    );

    const iconAvatar = screen.getByTestId(AvatarTestIds.AVATAR_ICON);
    const sampleText = screen.findByText('A sample text here');
    expect(iconAvatar).not.toBeNull();
    expect(sampleText).not.toBeNull();

    // header buttons should be disabled
    const renditionDropdown = screen.queryByTestId(PreviewTestIds.PREVIEW_RENDITION_DROPDOWN);
    const downloadButton = screen.queryByTestId(PreviewTestIds.PREVIEW_DOWNLOAD_BUTTON);
    const selectButton = screen.queryByTestId(PreviewTestIds.PREVIEW_SELECT_BUTTON);
    expect(renditionDropdown?.classList).toContain('Mui-disabled');
    expect(downloadButton).toHaveProperty('disabled', true);
    expect(selectButton).toHaveProperty('disabled', true);
  });

  it('should show circular progress, hide zoom components and disable header when loading', () => {
    render(
      <ThemeProvider theme={theme}>
        <Preview
          open
          assets={sampleImageList}
          renditionLabel={sampleRenditionLabel}
          isSelectButtonDisabled={false}
          selectButtonTitle={selectButtonTitle}
          tooltipTexts={tooltipTexts}
          index={0}
          isFetchingAssets
        />
      </ThemeProvider>,
    );

    const spinner = screen.getByTestId(PreviewTestIds.PREVIEW_CIRCULAR_PROGRESS);
    expect(spinner).toBeDefined();

    expect(screen.queryByTestId(PreviewTestIds.PREVIEW_ZOOM_TOOLTIP_TEXT)).toBeNull();
    expect(screen.queryByTestId(PreviewTestIds.PREVIEW_ZOOM_IN_BUTTON)).toBeNull();
    expect(screen.queryByTestId(PreviewTestIds.PREVIEW_ZOOM_OUT_BUTTON)).toBeNull();
    expect(screen.queryByTestId(PreviewTestIds.PREVIEW_ZOOM_PERCENT_BUTTON)).toBeNull();

    const selectButton = screen.queryByTestId(PreviewTestIds.PREVIEW_SELECT_BUTTON);
    const renditionDropdown = screen.queryByTestId(PreviewTestIds.PREVIEW_RENDITION_DROPDOWN);
    const downloadButton = screen.queryByTestId(PreviewTestIds.PREVIEW_DOWNLOAD_BUTTON);

    expect(selectButton).not.toBeNull();
    expect(renditionDropdown).not.toBeNull();
    expect(downloadButton).not.toBeNull();

    expect(selectButton).toHaveProperty('disabled', true);
    expect(downloadButton).toHaveProperty('disabled', true);
    expect(renditionDropdown?.classList).toContain('Mui-disabled');
  });
});
