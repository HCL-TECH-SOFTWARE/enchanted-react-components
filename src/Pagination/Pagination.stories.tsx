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
import { StoryFn, Meta } from '@storybook/react';
import Pagination from './Pagination';

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
  argTypes: {
    page: {
      description:
        'Current page number - Storybook page options are dynamically computed by Pagination component and cannot be controlled',
      control: false,
    },
    rowsPerPage: {
      description: 'Page size or number of rows to render',
      control: { type: 'select' },
      options: [10, 25, 50, 100],
    },
    count: {
      description: 'Sample number of rows for all pages',
      control: { type: 'select' },
      options: [0, 100, 500],
    },
    // The following controls are turned off for Enchanted because we have our own labeling and custom components inside Pagination
    labelRowsPerPage: {
      table: {
        disable: true,
      },
    },
    SelectProps: {
      table: {
        disable: true,
      },
    },
    showFirstButton: {
      table: {
        disable: true,
      },
    },
    showLastButton: {
      table: {
        disable: true,
      },
    },
    labelDisplayedRows: {
      table: {
        disable: true,
      },
    },
    ActionsComponent: {
      table: {
        disable: true,
      },
    },
    backIconButtonProps: {
      table: {
        disable: true,
      },
    },
    getItemAriaLabel: {
      table: {
        disable: true,
      },
    },
    nextIconButtonProps: {
      table: {
        disable: true,
      },
    },
    rowsPerPageOptions: {
      description: 'Customizes the options of the rows per page select field.',
      control: false,
    },
    translation: {
      description:
        "Use the Pagination component's exported enum TablePaginationLocalizationPlaceholders to write your translations",
    },
    onPageChange: {
      table: {
        disable: true,
      },
    },
    onRowsPerPageChange: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof Pagination>;

const Template: StoryFn<typeof Pagination> = (args) => {
  const [page, setPage] = React.useState(args.page || 0);
  const [rowsPerPage, setRowsPerPage] = React.useState(args.rowsPerPage || 10);

  React.useEffect(() => {
    setPage(args.page);
  }, [args.page]);

  React.useEffect(() => {
    setRowsPerPage(args.rowsPerPage);
    setPage(0);
  }, [args.rowsPerPage]);

  React.useEffect(() => {
    setRowsPerPage(args.rowsPerPage);
    setPage(0);
  }, [args.count]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newRowsPerPage = Number(
      (event as unknown as React.ChangeEvent<HTMLLIElement>).target.value,
    );

    if (!Number.isNaN(newRowsPerPage) && newRowsPerPage > 0) {
      setRowsPerPage(newRowsPerPage);
      setPage(0);
    }
  };

  return (
    <Pagination
      {...args}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

/**
 * Based on MUI TablePagination, not the MUI Pagination component.
 */
export const ExamplePagination = {
  render: Template,

  args: {
    ...Pagination.defaultProps,
    page: 0,
    rowsPerPage: 10,
    count: 100,
  },
};
