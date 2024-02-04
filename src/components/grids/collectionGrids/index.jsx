/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo, useEffect, useState } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// react-table components
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
} from 'react-table';

// @mui material components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Icon from '@mui/material/Icon';
import Autocomplete from '@mui/material/Autocomplete';

// Material Dashboard 2 React components
import DataTableHeadCell from './DataTableHeadCell';
import DataTableBodyCell from './DataTableBodyCell';
import MDPagination from '../../../layout/REUSABLE_COMPONENTS/MDPAGINATION';
import MDBox from '../../../layout/REUSABLE_COMPONENTS/MDBOX';
import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import MDInput from '../../../layout/REUSABLE_COMPONENTS/MDINPUT';
import { TextField } from '@mui/material';
import useScreenWidth from '../../../context/hooks/useScreenWidth';
import { themeSettings } from '../../../assets/themes/themeSettings';
import { useMode } from '../../../context';

function DataTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
}) {
  const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenWidth();
  const { theme } = useMode();
  const columns = useMemo(() => {
    // Define all your columns here, including potentially hideable ones
    const allColumns = [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Price', accessor: 'price' },
      { Header: 'Total Price', accessor: 'tPrice', show: !isSmallScreen }, // Hide on small screens
      {
        Header: 'Quantity',
        accessor: 'quantity',
        show: !isSmallScreen && !isMediumScreen,
      }, // Hide on small and medium screens
      {
        Header: 'Action',
        accessor: 'action',
        show: !isSmallScreen && !isMediumScreen && !isLargeScreen,
      }, // Hide on small screens
    ];

    // Filter based on the 'show' property
    return allColumns.filter((column) => column.show !== false);
  }, [isSmallScreen, isMediumScreen]);
  // const columns = useMemo(() => {
  //   const baseColumns = table.columns.map((column) => ({
  //     ...column,
  //     // Optionally hide some columns on smaller screens
  //     show: isSmallScreen ? column.showOnSmallScreen : true,
  //   }));
  //   if (isSmallScreen) {
  //     // Return a subset of columns for small screens
  //     return baseColumns.filter(
  //       (column) =>
  //         column.accessor !== 'action' &&
  //         column.accessor !== 'tPrice' &&
  //         column.accessor !== 'quantity'
  //     ); // Example: omit 'tPrice' and 'quantity' columns on small screens
  //   }
  //   if (isMediumScreen) {
  //     // Return a subset of columns for medium screens
  //     return baseColumns.filter(
  //       (column) => column.accessor !== 'action' && column.accessor !== 'tPrice'
  //     ); // Example: omit 'quantity' column on medium screens
  //   }
  //   if (isLargeScreen) {
  //     // Return a subset of columns for large screens
  //     return baseColumns.filter((column) => column.accessor !== 'action'); // Example: omit 'quantity' column on medium screens
  //   }
  //   return baseColumns;
  //   // return baseColumns;
  // }, [table.columns]);
  const data = useMemo(() => table.data, [table]); // Adjusted from table.rows to table.data for consistency
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: entriesPerPage.defaultValue || 10,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  // Handling search input state
  const [searchInput, setSearchInput] = useState(globalFilter);
  const handleSearchChange = (event) => {
    const value = event.target.value || undefined;
    setGlobalFilter(value);
    setSearchInput(value);
  };

  // Custom function to handle entries per page change
  const handleEntriesChange = (event, newValue) => {
    setPageSize(Number(newValue));
  };
  // Set the default value for the entries per page when component mounts
  useEffect(() => {
    setPageSize(entriesPerPage.defaultValue || 10);
  }, [entriesPerPage, setPageSize]);
  // Render the paginations
  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0
      ? gotoPage(0)
      : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) =>
    gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? 'desc' : 'asce';
    } else if (isSorted) {
      sortedValue = 'none';
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart =
    pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = data.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      count={pageOptions.length}
      active={pageIndex === option}
      onPageChange={(_, num) => gotoPage(num - 1)}
      page={pageIndex + 1}
      showFirstButton
      showLastButton
      containerProps={{
        justifyContent: 'center',
        display: 'flex',
        padding: '8px',
        '.MuiPagination-ul': {
          flexWrap: 'wrap', // Allow pagination items to wrap on small screens
        },
      }}
    >
      {option + 1}
    </MDPagination>
  ));

  return (
    <TableContainer sx={{ boxShadow: 'none', pt: 0 }}>
      {/* Search and Entries Per Page Options */}
      {entriesPerPage || canSearch ? (
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 }, // Adds space between elements when in column layout
            mt: 0,
            color: 'white',
            // pt: 0,
          }}
        >
          {entriesPerPage && (
            <MDBox display="flex" alignItems="center">
              <Autocomplete
                options={entriesPerPage?.entries?.map((option) =>
                  option.toString()
                )}
                value={pageSize.toString()}
                onChange={handleEntriesChange}
                sx={{ width: '5rem' }}
                renderInput={(params) => (
                  <MDInput {...params} label="Rows per page" />
                )}
              />
            </MDBox>
          )}
          {canSearch && (
            <MDBox
              width={{ xs: '100%', sm: 'auto', pt: 0 }}
              ml={{ sm: 'auto' }}
            >
              <MDInput
                placeholder="Search..."
                value={searchInput}
                size="small"
                fullWidth
                onChange={handleSearchChange}
              />
            </MDBox>
          )}
        </MDBox>
      ) : null}

      <Table {...getTableProps()}>
        <MDBox component="thead">
          {headerGroups?.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <DataTableHeadCell
                  key={idx}
                  {...column.getHeaderProps(
                    isSorted && column.getSortByToggleProps()
                  )}
                  width={column.width ? column.width : 'auto'}
                  align={column.align ? column.align : 'left'}
                  sorted={setSortedValue(column)}
                >
                  {column.render('Header')}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>
        <TableBody {...getTableBodyProps()}>
          {page?.map((row, key) => {
            prepareRow(row);
            return (
              <TableRow key={key} {...row.getRowProps()}>
                {row.cells.map((cell, idx) => (
                  <DataTableBodyCell
                    key={idx}
                    noBorder={noEndBorder && data?.length - 1 === key}
                    align={cell.column.align ? cell.column.align : 'left'}
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <MDBox
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        p={!showTotalEntries && data?.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography variant="button" color="white" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {data?.length} entries
            </MDTypography>
          </MDBox>
        )}
        {pageOptions?.length > 1 && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : 'gradient'}
            color={pagination.color ? pagination.color : 'info'}
          >
            {canPreviousPage && (
              <MDPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: 'bold' }}>chevron_left</Icon>
              </MDPagination>
            )}
            {pageOptions?.length > 1 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{
                    type: 'number',
                    min: 1,
                    max: customizedPageOptions?.length,
                  }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              <MDBox width="5rem" mx={1}>
                <MDTypography variant="button" fontWeight="medium">
                  {customizedPageOptions[pageIndex]}
                </MDTypography>
              </MDBox>
            )}
            {canNextPage && (
              <MDPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: 'bold' }}>chevron_right</Icon>
              </MDPagination>
            )}

            {renderPagination}
          </MDPagination>
        )}
      </MDBox>
      {/* Pagination */}
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: 'gradient', color: 'info' },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(['contained', 'gradient']),
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
      'dark',
      'light',
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default DataTable;
