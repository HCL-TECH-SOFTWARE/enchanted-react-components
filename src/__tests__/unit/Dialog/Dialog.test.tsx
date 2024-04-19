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
import Dialog, { DialogTestIds, DialogSizes } from '../../../Dialog';
import { createLtrTheme } from '../../../theme';
import DialogContentText, { DialogContentTextTestIds } from '../../../Dialog/DialogContentText';
import Typography from '../../../Typography';
import Button from '../../../Button';

afterEach(cleanup);

describe('Dialog', () => {
  it('Render Dialog open without crashing', () => {
    render(<ThemeProvider theme={createLtrTheme()}><Dialog open /></ThemeProvider>);
    expect(screen.getByRole('dialog')).not.toBeNull();
    expect(screen.getByTestId(DialogTestIds.DIALOG_CONTENT)).not.toBeNull(); // placeholder paper
    expect(screen.getByText('Replace me')).not.toBeNull(); // placeholder paper

    const elementStyle = window.getComputedStyle(screen.getByTestId(DialogTestIds.DIALOG_CONTENT));
    expect(elementStyle.padding).toEqual('12px'); // default padding
  });

  it('Render base variant Dialog open with complete header, content, footer', () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Dialog
          open
          size={DialogSizes.EXTRA_SMALL}
          headerChildren={<Typography variant="body1">Label</Typography>}
          contentChildren={<Typography variant="body1">Sample Content</Typography>}
          footerChildren={<Button variant="outlined">Button</Button>}
        />
      </ThemeProvider>,
    );
    expect(screen.getByTestId(DialogTestIds.DIALOG_TITLE)).not.toBeNull();
    expect(screen.getByTestId(DialogTestIds.DIALOG_CONTENT)).not.toBeNull();
    expect(screen.getByText('Sample Content')).not.toBeNull(); // actual content, not placeholder
    expect(screen.getByTestId(DialogTestIds.DIALOG_ACTIONS)).not.toBeNull();
  });

  it('Render Dialog open with header but No Footer', () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Dialog
          open
          size={DialogSizes.SMALL}
          headerChildren={<Typography variant="body1">Label</Typography>}
        />
      </ThemeProvider>,
    );
    expect(screen.getByTestId(DialogTestIds.DIALOG_TITLE)).not.toBeNull();

    try {
      expect(screen.getByTestId(DialogTestIds.DIALOG_ACTIONS)).not.toBeNull();
    } catch (err) {
      expect((err as Error).message).toContain('Unable to find an element by: [data-testid="dialogActions"]');
    }
  });

  it('Render Dialog open with footer but No Header', () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Dialog
          open
          size={DialogSizes.MEDIUM}
          footerChildren={<Button variant="outlined">Button</Button>}
        />
      </ThemeProvider>,
    );
    expect(screen.getByTestId(DialogTestIds.DIALOG_ACTIONS)).not.toBeNull();

    try {
      expect(screen.getByTestId(DialogTestIds.DIALOG_TITLE)).not.toBeNull();
    } catch (err) {
      expect((err as Error).message).toContain('Unable to find an element by: [data-testid="dialogTitle"]');
    }
  });

  it('Render Dialog open with No Padding on Content', () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Dialog open withPadding={false} size={DialogSizes.LARGE} />
      </ThemeProvider>,
    );

    const elementStyle = window.getComputedStyle(screen.getByTestId(DialogTestIds.DIALOG_CONTENT));
    expect(elementStyle.padding).toEqual('0px');
  });

  it('Render Dialog open with No Padding on Content', async () => {
    const mockFn = jest.fn();

    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Dialog
          open
          size={DialogSizes.EXTRA_LARGE}
          onClose={mockFn}
          headerChildren={<Typography variant="body1">Label</Typography>}
        />
      </ThemeProvider>,
    );

    const element = screen.getByTestId(DialogTestIds.DIALOG_CLOSE_ICON);
    fireEvent.click(element);
    await waitFor(() => { expect(mockFn).toHaveBeenCalled(); });
  });

  // Because we prefer the use of Typography for rendering text, this is just an optional test for coverage since MUI exposes DialogContentText
  it('Render Dialog open with optional use of DialogContentText as child of DialogContent', async () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Dialog open contentChildren={<DialogContentText>Sample Content Text</DialogContentText>} />
      </ThemeProvider>,
    );

    expect(screen.getByTestId(DialogContentTextTestIds.DIALOG_CONTENT_TEXT)).not.toBeNull();
  });

  it('Render base variant Dialog open with hidden header even if headerChildren are passed as args', () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Dialog
          open
          size={DialogSizes.EXTRA_SMALL}
          headerChildren={<Typography variant="body1">Label</Typography>}
          contentChildren={<Typography variant="body1">Sample Content</Typography>}
          footerChildren={<Button variant="outlined">Button</Button>}
          hideHeader
        />
      </ThemeProvider>,
    );

    expect(screen.getByTestId(DialogTestIds.DIALOG_CONTENT)).not.toBeNull();
    expect(screen.getByText('Sample Content')).not.toBeNull(); // actual content, not placeholder
    expect(screen.getByTestId(DialogTestIds.DIALOG_ACTIONS)).not.toBeNull();

    try {
      expect(screen.getByTestId(DialogTestIds.DIALOG_TITLE)).not.toBeNull();
    } catch (err) {
      expect((err as Error).message).toContain('Unable to find an element by: [data-testid="dialogTitle"]');
    }
  });

  it('Render base variant Dialog open with hidden footer even if footerChildren are passed as args', () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Dialog
          open
          size={DialogSizes.EXTRA_SMALL}
          headerChildren={<Typography variant="body1">Label</Typography>}
          contentChildren={<Typography variant="body1">Sample Content</Typography>}
          footerChildren={<Button variant="outlined">Button</Button>}
          hideFooter
        />
      </ThemeProvider>,
    );

    expect(screen.getByTestId(DialogTestIds.DIALOG_TITLE)).not.toBeNull();
    expect(screen.getByTestId(DialogTestIds.DIALOG_CONTENT)).not.toBeNull();
    expect(screen.getByText('Sample Content')).not.toBeNull(); // actual content, not placeholder

    try {
      expect(screen.getByTestId(DialogTestIds.DIALOG_ACTIONS)).not.toBeNull();
    } catch (err) {
      expect((err as Error).message).toContain('Unable to find an element by: [data-testid="dialogActions"]');
    }
  });
});
