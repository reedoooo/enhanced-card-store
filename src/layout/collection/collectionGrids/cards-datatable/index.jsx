/* eslint-disable @typescript-eslint/no-empty-function */
import { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Icon from '@mui/material/Icon';
import DataTableBodyCell from './DataTableBodyCell';
import useScreenWidth from '../../../../context/hooks/useScreenWidth';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Paper,
  TableBody,
  TextField,
} from '@mui/material';
import PaginationComponent from './PaginationComponent';
import OptionsComponent from './OptionsComponent';
import { DataTableHeadComponent } from './DataTableHeadComponent';
import BoxHeader from '../../../REUSABLE_COMPONENTS/BoxHeader';
import GenericActionButtons from '../../../../components/buttons/actionButtons/GenericActionButtons';
import { enqueueSnackbar } from 'notistack';
import { useMode } from '../../../../context';
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
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  tableSize,
}) {
  // ** New Custom Breakpoints for Tracking Visible Table Data **
  // 800px - hide total price
  // 650px = hide quantity
  // 500px - hdie check box
  const { theme } = useMode();
  const [showTotalPrice, setShowTotalPrice] = useState(window.innerWidth > 800);
  const [showQuantity, setShowQuantity] = useState(window.innerWidth > 650);
  const [showSelection, setShowSelection] = useState(window.innerWidth > 500);
  const [showPrice, setShowPrice] = useState(window.innerWidth > 445);
  useEffect(() => {
    const handleResize = () => {
      setShowTotalPrice(window.innerWidth > 800);
      setShowQuantity(window.innerWidth > 650);
      setShowSelection(window.innerWidth > 500);
      setShowPrice(window.innerWidth > 445);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const data = useMemo(() => table.data, [table.data]);
  const columns = useMemo(() => {
    let baseColumns = [
      // Only include the selection column if showSelection is true
      showSelection && {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <Checkbox {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
      },
      { Header: 'Name', accessor: 'name' },
      // { Header: 'Price', accessor: 'price' },
      {
        id: 'action',
        Header: 'Action',
        accessor: 'action',
        Cell: ({ value }) => (
          <GenericActionButtons
            card={value}
            context={'Collection'}
            onClick={() => console.log('clicked')}
            onSuccess={() =>
              enqueueSnackbar(
                {
                  title: 'Action successful',
                  message: `Card added to ${value} successfully.`,
                },
                'success',
                null
              )
            }
            onFailure={(error) =>
              enqueueSnackbar(
                {
                  title: 'Action failed',
                  message: `Failed to add card to ${value}.`,
                },
                'error',
                error
              )
            }
            page={'Collection'}
            cardSize={'small'}
          />
        ),
      },
    ];
    if (tableSize !== 'large' && showTotalPrice) {
      baseColumns.push({
        Header: 'Total Price',
        accessor: 'tPrice',
      });
    }
    if (tableSize !== 'large' && showQuantity) {
      baseColumns.push({
        Header: 'Quantity',
        accessor: 'quantity',
      });
    }
    if (tableSize !== 'large' && showPrice) {
      baseColumns.push({
        Header: 'Price',
        accessor: 'price',
      });
    }
    // Filter out any falsey values to remove the conditionally included columns when not shown
    return baseColumns.filter(Boolean);
  }, [showTotalPrice, showQuantity, showSelection, tableSize, showPrice]);

  const defaultPageSize = useMemo(
    () => entriesPerPage.defaultValue,
    [entriesPerPage]
  );
  const pageSizeOptions = useMemo(
    () => entriesPerPage.entries,
    [entriesPerPage]
  );

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
    selectedFlatRows,
    toggleAllRowsSelected,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: entriesPerPage.defaultValue },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const [search, setSearch] = useState(globalFilter);

  useEffect(() => {
    setGlobalFilter(search || undefined);
  }, [search, setGlobalFilter]);

  useEffect(() => {
    setPageSize(defaultPageSize);
  }, [defaultPageSize, setPageSize]);

  const handleSelectAllClick = (event) => {
    toggleAllRowsSelected(event.target.checked);
  };

  let entriesEnd;
  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = data.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <Box
      mt="0.5rem"
      p="0 0.5rem"
      height="75%"
      sx={{
        '& .MuiDataGrid-root': {
          color: theme.palette.chartTheme.grey.dark,
          border: 'none',
        },
        '& .MuiDataGrid-cell': {
          borderBottom: `1px solid ${theme.palette.chartTheme.grey.lightest} !important`,
        },
        '& .MuiDataGrid-columnHeaders': {
          borderBottom: `1px solid ${theme.palette.chartTheme.grey.lightest} !important`,
        },
        '& .MuiDataGrid-columnSeparator': {
          visibility: 'hidden',
        },
      }}
    >
      <TableContainer sx={{ boxShadow: 'none', pt: 0 }} component={Paper}>
        {/* Search and Entries Per Page Options */}
        <OptionsComponent
          canSearch={canSearch}
          search={search}
          handleSearchChange={(e) => setSearch(e.target.value)}
          pageSize={pageSize}
          setPageSize={(size) => setPageSize(Number(size))}
          pageOptions={pageSizeOptions}
        />
        {/* Table */}
        <Table {...getTableProps()} sx={{}}>
          <DataTableHeadComponent
            onSelectAllClick={handleSelectAllClick}
            order="asc"
            orderBy="name"
            numSelected={0}
            rowCount={data?.length}
            onRequestSort={() => {}}
            headerGroups={headerGroups}
            isSorted={isSorted}
            setSortedValue={setSortedValue}
          />
          {/* Table Body */}
          <TableBody {...getTableBodyProps()}>
            {page.map((row, key) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  key={key}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    // Apply styling here to reduce padding
                    '& td': { padding: '8px' }, // Example: reduce padding
                  }}
                >
                  {row.cells.map((cell, idx) => (
                    <DataTableBodyCell
                      {...cell.getCellProps()}
                      key={idx}
                      sx={{ padding: '8px' }} // Adjust as needed
                    >
                      {cell.render('Cell')}
                    </DataTableBodyCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* Pagination */}
        <PaginationComponent
          pageOptions={pageOptions}
          pageIndex={pageIndex}
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </TableContainer>
    </Box>
  );
}

DataTable.propTypes = {
  entriesPerPage: PropTypes.shape({
    defaultValue: PropTypes.number,
    entries: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.shape({
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
  }).isRequired,
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};
DataTable.defaultProps = {
  canSearch: false,
  showTotalEntries: true,
  isSorted: true,
  noEndBorder: false,
};

export default DataTable;
