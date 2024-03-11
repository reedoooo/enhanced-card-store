import { useMemo, useState } from 'react';

const usePagination = (items, defaultPageSize) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Setup for react-table pagination
  // Assumes items is the total dataset you want to paginate over
  const data = useMemo(() => items, [items]);

  // Pagination settings for react-table
  const initialState = useMemo(
    () => ({
      pageIndex: 0,
      pageSize: defaultPageSize || 10, // Default page size
    }),
    [defaultPageSize]
  );

  // The react-table hook will manage the pageIndex and pageSize,
  // so you don't need to manage these states manually.
  // You would pass initialState to the useTable hook along with 'data' and 'columns'

  // Calculate the total pages
  const pageCount = useMemo(
    () => Math.ceil(items.length / initialState.pageSize),
    [items.length, initialState.pageSize]
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * defaultPageSize;
    const end = start + defaultPageSize;
    return data.slice(start, end);
  }, [data, currentPage, defaultPageSize]);

  // You can still create a custom pagination component if you like,
  // but you would control it using the state and actions provided by react-table.

  // Note: This example does not include the implementation of fetching data based on the current page,
  // as it assumes 'items' contains the full dataset. If you're fetching data from a server,
  // you would need to integrate that logic here, using the pageIndex and pageSize from react-table's state.

  return {
    data,
    initialState,
    pageCount,
    paginatedData,
    currentPage,
    setCurrentPage,
    // No need to return handlers like handleChangePage or handleChangeRowsPerPage
    // as react-table's usePagination hook provides these functionalities.
  };
};

export default usePagination;

// import { useState, useMemo } from 'react';
// import CustomPagination from '../../components/reusable/CustomPagination';

// const usePagination = (items, itemsPerPage, totalCount) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPageOptions] = useState([
//     5,
//     10,
//     25,
//     { label: 'All', value: -1 },
//   ]);
//   const [rowsPerPage, setRowsPerPage] = useState(
//     itemsPerPage || rowsPerPageOptions[0]
//   );
//   const [colsPerPage, setColsPerPage] = useState(1);

//   const emptyRows = useMemo(
//     () => Math.max(0, (1 + page) * rowsPerPage - (items?.length || 0)),
//     [page, rowsPerPage, items]
//   );

//   const handleChangePage = (newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeColsPerPage = (event) => {
//     setColsPerPage(parseInt(event.target.value, 10));
//   };

//   const paginatedItems = useMemo(() => {
//     const startIndex = page * rowsPerPage;
//     const endIndex =
//       rowsPerPage === -1 ? items?.length : startIndex + rowsPerPage;
//     return items?.slice(startIndex, endIndex);
//   }, [page, rowsPerPage, items]);
//   const PaginationComponent = (
//     <CustomPagination
//       totalCount={totalCount}
//       itemsPerPage={itemsPerPage}
//       currentPage={page}
//       handlePagination={(event, value) => setPage(value)}
//     />
//   );

//   // Additional pagination actions
//   const goToFirstPage = () => setPage(0);
//   const goToLastPage = () =>
//     setPage(Math.max(0, Math.ceil(items?.length / rowsPerPage) - 1));
//   const goToNextPage = () =>
//     setPage((current) =>
//       Math.min(current + 1, Math.ceil(items?.length / rowsPerPage) - 1)
//     );
//   const goToPreviousPage = () => setPage((current) => Math.max(current - 1, 0));

//   return {
//     page,
//     rowsPerPage,
//     colsPerPage,
//     rowsPerPageOptions,
//     emptyRows,
//     paginatedItems,
//     PaginationComponent,

//     handleChangePage,
//     handleChangeRowsPerPage,
//     handleChangeColsPerPage,
//     goToFirstPage,
//     goToLastPage,
//     goToNextPage,
//     goToPreviousPage,
//   };
// };

// export default usePagination;
