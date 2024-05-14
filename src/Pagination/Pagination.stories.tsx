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
    translation: {
      description:
        "Use the Pagination component's exported enum TablePaginationLocalizationPlaceholders to write your translations",
    },
    page: {
      description:
        'https://mui.com/material-ui/api/pagination/',
      control: false,
    },
    // The following controls are turned off for Enchanted because we have our own labeling and custom components inside Pagination
    labelRowsPerPage: {
      control: false,
    },
    SelectProps: {
      control: false,
      description: 'https://mui.com/material-ui/api/pagination/',
    },
    showFirstButton: {
      control: false,
      description: 'https://mui.com/material-ui/api/pagination/#pagination-prop-showFirstButton',
    },
    showLastButton: {
      control: false,
      description: 'https://mui.com/material-ui/api/pagination/#pagination-prop-showLastButton',
    },
    labelDisplayedRows: {
      control: false,
      description: 'https://mui.com/material-ui/api/pagination/',
    },
    ActionsComponent: {
      control: false,
      description: 'https://mui.com/material-ui/api/pagination/',
    },
    backIconButtonProps: {
      control: false,
      description: 'https://mui.com/material-ui/api/pagination/',
    },
    getItemAriaLabel: {
      control: false,
      description: 'https://mui.com/material-ui/api/pagination/#pagination-prop-getItemAriaLabel',
    },
    nextIconButtonProps: {
      control: false,
      description: 'https://mui.com/material-ui/api/pagination/',
    },
    rowsPerPageOptions: {
      description: 'Customizes the options of the rows per page select field.',
      control: false,
    },
    onPageChange: {
      control: false,
      description: 'https://mui.com/material-ui/api/pagination/',
    },
    onRowsPerPageChange: {
      control: false,
      description: 'https://mui.com/material-ui/api/pagination/',
    },
    classes: {
      control: false,
      description: 'https://mui.com/material-ui/api/pagination/#pagination-prop-classes',
    },
    ref: {
      control: false,
      description: 'https://mui.com/material-ui/api/pagination/',
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
