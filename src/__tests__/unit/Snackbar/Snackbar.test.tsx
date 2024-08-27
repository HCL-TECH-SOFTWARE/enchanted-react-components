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
  render, screen, fireEvent, waitFor, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import ChevronDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--down';
import IconButton from '../../../IconButton';
import Snackbar, { SnackbarVariants, SnackbarTestIds } from '../../../Snackbar';
import { CircularProgressTestIds, CircularProgressVariants } from '../../../ProgressIndicator/CircularProgress';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../theme';

const theme = createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);

afterEach(cleanup);

describe('Snackbar unit tests', () => {
  const sampleMessage = 'Alert message.';
  const sampleButtonText = 'Button';

  it('Should not render snackbar at all when open arg is false', () => {
    render(
      <ThemeProvider theme={theme}>
        <Snackbar
          message={sampleMessage}
          open={false}
        />
      </ThemeProvider>,
    );

    try {
      screen.getAllByTestId(SnackbarTestIds.SNACKBAR_ICON);
    } catch (err) {
      expect((err as Error).message).toContain(`Unable to find an element by: [data-testid="${SnackbarTestIds.SNACKBAR_ICON}"]`);
    }
  });

  it('Should not render placeholderIcon at all when showPlaceholderIcon arg is false', () => {
    render(
      <ThemeProvider theme={theme}>
        <Snackbar
          message={sampleMessage}
          open={false}
          placeholderIcon={(
            <IconButton
              data-testid={SnackbarTestIds.SNACKBAR_PLACEHOLDER_ICON}
            >
              <ChevronDownIcon />
            </IconButton>
          )}
          showPlaceholderIcon={false}
        />
      </ThemeProvider>,
    );

    try {
      screen.getAllByTestId(SnackbarTestIds.SNACKBAR_PLACEHOLDER_ICON);
    } catch (err) {
      expect((err as Error).message).toContain(`Unable to find an element by: [data-testid="${SnackbarTestIds.SNACKBAR_PLACEHOLDER_ICON}"]`);
    }
  });

  it('Render information variant as default', () => {
    render(
      <ThemeProvider theme={theme}>
        <Snackbar
          message={sampleMessage}
          open
          buttonText={sampleButtonText}
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_ICON)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_ICON)[0].dataset.muiTest).toEqual('informationIcon');
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_CLOSE)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_CLOSE)[0].dataset.muiTest).toEqual('closeIcon');
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_MESSAGE)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_MESSAGE)[0].innerHTML).toEqual(sampleMessage);
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_BUTTON)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_BUTTON)[0].innerHTML).toContain(sampleButtonText);
  });

  it('Render warning variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Snackbar
          variant={SnackbarVariants.WARNING}
          message={sampleMessage}
          open
          buttonText={sampleButtonText}
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_ICON)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_ICON)[0].dataset.muiTest).toEqual('warning--altIcon');
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_CLOSE)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_CLOSE)[0].dataset.muiTest).toEqual('closeIcon');
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_MESSAGE)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_MESSAGE)[0].innerHTML).toEqual(sampleMessage);
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_BUTTON)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_BUTTON)[0].innerHTML).toContain(sampleButtonText);
  });

  it('Render error variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Snackbar
          variant={SnackbarVariants.ERROR}
          message={sampleMessage}
          open
          buttonText={sampleButtonText}
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_ICON)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_ICON)[0].dataset.muiTest).toEqual('warningIcon');
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_CLOSE)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_CLOSE)[0].dataset.muiTest).toEqual('closeIcon');
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_MESSAGE)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_MESSAGE)[0].innerHTML).toEqual(sampleMessage);
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_BUTTON)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_BUTTON)[0].innerHTML).toContain(sampleButtonText);
  });

  it('Render success variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Snackbar
          variant={SnackbarVariants.SUCCESS}
          message={sampleMessage}
          open
          buttonText={sampleButtonText}
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_ICON)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_ICON)[0].dataset.muiTest).toEqual('checkmark--outlineIcon');
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_CLOSE)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_CLOSE)[0].dataset.muiTest).toEqual('closeIcon');
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_MESSAGE)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_MESSAGE)[0].innerHTML).toEqual(sampleMessage);
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_BUTTON)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_BUTTON)[0].innerHTML).toContain(sampleButtonText);
  });

  it('Render indeterminate progress variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Snackbar
          variant={SnackbarVariants.PROGRESS}
          message={sampleMessage}
          open
          buttonText={sampleButtonText}
          progressVariant={CircularProgressVariants.INDETERMINATE}
        />
      </ThemeProvider>,
    );
    expect(screen.getByTestId(CircularProgressTestIds.PROGRESS_ROOT)).not.toBeNull();
    expect(screen.getByTestId(CircularProgressTestIds.PROGRESS_CIRCLE)).not.toBeNull();
    expect(screen.getByTestId(CircularProgressTestIds.PROGRESS_TRAIL)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_CLOSE)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_CLOSE)[0].dataset.muiTest).toEqual('closeIcon');
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_MESSAGE)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_MESSAGE)[0].innerHTML).toEqual(sampleMessage);
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_BUTTON)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_BUTTON)[0].innerHTML).toContain(sampleButtonText);
  });

  it('Render determinate progress variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Snackbar
          variant={SnackbarVariants.PROGRESS}
          message={sampleMessage}
          open
          buttonText={sampleButtonText}
          progressVariant={CircularProgressVariants.DETERMINATE}
          progressValue={50}
        />
      </ThemeProvider>,
    );
    expect(screen.getByTestId(CircularProgressTestIds.PROGRESS_ROOT)).not.toBeNull();
    expect(screen.getByTestId(CircularProgressTestIds.PROGRESS_CIRCLE)).not.toBeNull();
    expect(screen.getByTestId(CircularProgressTestIds.PROGRESS_TRAIL)).not.toBeNull();
    expect(screen.getAllByRole('progressbar')[1].getAttribute('aria-valuenow')).toEqual('50');
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_CLOSE)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_CLOSE)[0].dataset.muiTest).toEqual('closeIcon');
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_MESSAGE)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_MESSAGE)[0].innerHTML).toEqual(sampleMessage);
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_BUTTON)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_BUTTON)[0].innerHTML).toContain(sampleButtonText);
  });

  it('Should fire buttonAction when buttonText wrapper button is clicked', async () => {
    const mockFn = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Snackbar
          message={sampleMessage}
          open
          buttonText={sampleButtonText}
          buttonAction={mockFn}
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_BUTTON)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_BUTTON)[0].innerHTML).toContain(sampleButtonText);

    const element = getByTestId(SnackbarTestIds.SNACKBAR_BUTTON);
    fireEvent.click(element);
    await waitFor(() => { expect(mockFn).toHaveBeenCalled(); });
  });

  it('Should fire placeholderIcon action when placeholderIcon wrapper button is clicked', async () => {
    const mockFn = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Snackbar
          message={sampleMessage}
          open
          placeholderIcon={<ChevronDownIcon />}
          placeholderIconAction={mockFn}
          showPlaceholderIcon
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_PLACEHOLDER_ICON)).not.toBeNull();
    expect((screen.getAllByTestId(SnackbarTestIds.SNACKBAR_PLACEHOLDER_ICON)[0].firstElementChild as HTMLElement).dataset.muiTest).toEqual('chevron--downIcon');

    const element = getByTestId(SnackbarTestIds.SNACKBAR_PLACEHOLDER_ICON);
    fireEvent.click(element);
    await waitFor(() => { expect(mockFn).toHaveBeenCalled(); });
  });

  it('Should fire closeIcon action when closeIcon wrapper button is clicked', async () => {
    const mockFn = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Snackbar
          message={sampleMessage}
          open
          onClose={mockFn}
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_CLOSE)).not.toBeNull();
    expect(screen.getAllByTestId(SnackbarTestIds.SNACKBAR_CLOSE)[0].dataset.muiTest).toEqual('closeIcon');

    const element = getByTestId(SnackbarTestIds.SNACKBAR_CLOSE);
    fireEvent.click(element);
    await waitFor(() => { expect(mockFn).toHaveBeenCalled(); });
  });
});
