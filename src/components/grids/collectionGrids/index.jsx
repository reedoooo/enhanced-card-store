/* eslint-disable @typescript-eslint/no-empty-function */
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
  useRowSelect,
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
import useScreenWidth from '../../../context/hooks/useScreenWidth';
import { useMode } from '../../../context';
import { Checkbox, Grid, TextField } from '@mui/material';
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const setSortedValue = (column, isSorted) => {
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
function DataTable({
  entriesPerPageOptions,

  // entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
}) {
  // STYLES
  const { theme } = useMode();
  const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenWidth();

  // DATA AND TABLE SETUP
  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Price', accessor: 'price' },
      { Header: 'Total Price', accessor: 'tPrice', show: !isSmallScreen },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        show: !isSmallScreen && !isMediumScreen,
      },
      {
        Header: 'Action',
        accessor: 'action',
        show: !isSmallScreen && !isMediumScreen && !isLargeScreen,
      },
    ],
    [isSmallScreen, isMediumScreen, isLargeScreen]
  );
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
    toggleAllRowsSelected,
    selectedFlatRows,
    state: { pageIndex, pageSize, globalFilter, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: entriesPerPageOptions[0] || 10 },
      getRowId: (row) => row.id,
      autoResetSelectedRows: false,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  // OPTIONS HANDLERS: SEARCH AND ENTRIES PER PAGE
  const [search, setSearch] = useState(globalFilter);
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
    setSearch(value);
  }, 100);
  useEffect(() => {
    setGlobalFilter(search);
  }, [search, setGlobalFilter]);
  // PAGINATION: PAGE SIZE
  useEffect(() => {
    setPageSize(entriesPerPageOptions.defaultValue || 10);
  }, [entriesPerPageOptions, setPageSize]);
  // Pagination handlers
  const handlePageChange = (event, value) => gotoPage(value - 1);
  const handleRowsPerPageChange = (event, newValue) =>
    setPageSize(Number(newValue));
  // Checkbox functionality
  const handleSelectAllClick = (event) => {
    toggleAllRowsSelected(event.target.checked);
  };
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0
      ? gotoPage(0)
      : gotoPage(Number(value));
  const customizedPageOptions = pageOptions.map((option) => option + 1);
  const handleInputPaginationValue = ({ target: value }) =>
    gotoPage(Number(value.value - 1));

  // PAGINATION: TOTAL ENTRIES
  const entriesStart =
    pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;
  let entriesEnd;
  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = data.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  const renderPagination = customizedPageOptions?.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      count={customizedPageOptions?.length}
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
  // const [searchInput, setSearchInput] = useState(globalFilter);
  // const handleSearchChange = (event) => {
  //   const value = event.target.value || undefined;
  //   setGlobalFilter(value);
  //   setSearchInput(value);
  // };
  // const handleEntriesChange = (event, newValue) => {
  //   setPageSize(Number(newValue));
  // };
  const renderOptions = () => (
    <MDBox
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1.5}
      sx={{
        flexDirection: { xs: 'column', sm: 'row' },
        color: 'white',
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <Grid container spacing={2}>
        {canSearch && (
          <Grid item xs={12} sm={8}>
            <TextField
              placeholder="Search..."
              value={search}
              // onChange={(e) => handleSearchChange(e.target.value)}
              onChange={({ currentTarget }) => {
                setSearch(search);
                onSearchChange(currentTarget.value);
              }}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
        )}
        <Grid item xs={12} sm={4}>
          <Autocomplete
            options={entriesPerPageOptions?.map((option) => option.toString())}
            value={pageSize.toString()}
            // onChange={(event, newValue) => setPageSize(Number(newValue))}
            onChange={(event, newValue) => {
              event.preventDefault();
              setPageSize(parseInt(newValue, 10));
              handleRowsPerPageChange(event, newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Rows per page" variant="outlined" />
            )}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
  function enhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <MDBox component="thead">
        {headerGroups?.map((headerGroup, key) => (
          <TableRow
            key={key}
            {...headerGroup.getHeaderGroupProps()}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            {headerGroup.headers.map((column, idx) => (
              <DataTableHeadCell
                key={idx}
                {...column.getHeaderProps(
                  isSorted && column.getSortByToggleProps()
                )}
                width={column.width ? column.width : 'auto'}
                align={column.align ? column.align : 'left'}
                sorted={setSortedValue(column, isSorted)}
              >
                {column.render('Header')}
              </DataTableHeadCell>
            ))}
          </TableRow>
        ))}
      </MDBox>
    );
  }

  return (
    <TableContainer sx={{ boxShadow: 'none', pt: 0 }}>
      {/* Search and Entries Per Page Options */}
      {renderOptions()}
      {/* Table */}
      <Table {...getTableProps()} sx={{}}>
        {/* Table Head */}
        {enhancedTableHead({
          onSelectAllClick: () => {},
          order: 'asc',
          orderBy: 'name',
          numSelected: 0,
          rowCount: data?.length,
          onRequestSort: () => {},
        })}
        {/* Table Body */}
        <TableBody {...getTableBodyProps()}>
          {page?.map((row, key) => {
            prepareRow(row);
            return (
              <TableRow
                key={key}
                {...row.getRowProps()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <DataTableBodyCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={row.isSelected}
                    onChange={(e) => row.toggleRowSelected(e.target.checked)}
                  />
                </DataTableBodyCell>
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
// function tableSearchFunction() {
//   {
//     entriesPerPage || canSearch ? (
//       <MDBox
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         p={1.5}
//         sx={{
//           flexDirection: { xs: 'column', sm: 'row' },
//           color: 'white',
//           borderRadius: theme.shape.borderRadius,
//         }}
//       >
//         <Grid container spacing={2}>
//           {canSearch && (
//             <Grid item xs={12} sm={8}>
//               <TextField
//                 placeholder="Search..."
//                 value={searchInput}
//                 size="small"
//                 fullWidth
//                 onChange={handleSearchChange}
//                 variant="outlined"
//               />
//             </Grid>
//           )}
//           {entriesPerPage && (
//             <Grid item xs={12} sm={4}>
//               <Autocomplete
//                 options={entriesPerPage?.entries?.map((option) =>
//                   option.toString()
//                 )}
//                 value={pageSize.toString()}
//                 onChange={handleEntriesChange}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="Rows per page"
//                     variant="outlined"
//                   />
//                 )}
//               />
//             </Grid>
//           )}
//         </Grid>
//       </MDBox>
//     ) : null;
//   }
// }
{
  /* {entriesPerPage && (
            <MDBox
              display="flex"
              alignItems="center"
              px={{ xs: 0, sm: 2, md: 2, lg: 0 }}
              width={{ xs: '100%', sm: '100%', md: '100%' }}
              height={{ xs: '100%', sm: '100%', md: '100%' }}
            >
              <Autocomplete
                options={entriesPerPage?.entries?.map((option) =>
                  option.toString()
                )}
                value={pageSize.toString()}
                onChange={handleEntriesChange}
                sx={{ width: 200, borderRadius: theme.shape.borderRadius }}
                renderInput={(params) => (
                  <MDInput {...params} label="Rows per page" />
                )}
              />
            </MDBox>
          )}
          {canSearch && (
            <MDBox
              width={{ xs: '100%', sm: '100%', md: '100%' }}
              height={{ xs: '100%', sm: '100%', md: '100%' }}
              px={{ xs: 0, sm: 2, md: 2, lg: 0 }}
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
          )} */
}
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
