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
import DataTableBodyCell from './cards-datatable/DataTableBodyCell';
import useScreenWidth from '../../../context/hooks/useScreenWidth';
import { Button, Checkbox, Grid, TableBody, TextField } from '@mui/material';
import PaginationComponent from './cards-datatable/PaginationComponent';
import OptionsComponent from './cards-datatable/OptionsComponent';
import { DataTableHeadComponent } from './cards-datatable/DataTableHeadComponent';
import BoxHeader from '../../REUSABLE_COMPONENTS/BoxHeader';
import GenericActionButtons from '../../../components/buttons/actionButtons/GenericActionButtons';
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
  const data = useMemo(() => table.data, [table.data]);
  const columns = useMemo(() => {
    const baseColumns = [
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <Checkbox {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
      },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Price', accessor: 'price' },
      {
        id: 'action',
        Header: 'Action',
        accessor: 'action',
        Cell: ({ value }) => (
          <GenericActionButtons card={value} context={'Collection'} />
        ),
      },
    ];

    if (tableSize !== 'large') {
      baseColumns.push(
        {
          Header: 'Total Price',
          accessor: 'tPrice',
        },
        {
          Header: 'Quantity',
          accessor: 'quantity',
        }
      );
    }

    return baseColumns;
  }, [tableSize]);

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
    <TableContainer sx={{ boxShadow: 'none', pt: 0 }}>
      {/* SECTION HEADER */}
      <BoxHeader
        title="Collection Card List"
        subtitle="List of all cards in the collection"
        icon={<Icon>table_chart</Icon>}
        sideText="+4%"
      />
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
