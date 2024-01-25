import { useState, useMemo } from 'react';

const usePagination = (items, itemsPerPage) => {
  const [page, setPage] = useState(0);
  const [rowsPerPageOptions] = useState([
    5,
    10,
    25,
    { label: 'All', value: -1 },
  ]);
  const [rowsPerPage, setRowsPerPage] = useState(
    itemsPerPage || rowsPerPageOptions[0]
  );
  const [colsPerPage, setColsPerPage] = useState(1);

  const emptyRows = useMemo(
    () => Math.max(0, (1 + page) * rowsPerPage - (items?.length || 0)),
    [page, rowsPerPage, items]
  );

  const handleChangePage = (newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeColsPerPage = (event) => {
    setColsPerPage(parseInt(event.target.value, 10));
  };

  const paginatedItems = useMemo(() => {
    const startIndex = page * rowsPerPage;
    const endIndex =
      rowsPerPage === -1 ? items?.length : startIndex + rowsPerPage;
    return items?.slice(startIndex, endIndex);
  }, [page, rowsPerPage, items]);

  // Additional pagination actions
  const goToFirstPage = () => setPage(0);
  const goToLastPage = () =>
    setPage(Math.max(0, Math.ceil(items?.length / rowsPerPage) - 1));
  const goToNextPage = () =>
    setPage((current) =>
      Math.min(current + 1, Math.ceil(items?.length / rowsPerPage) - 1)
    );
  const goToPreviousPage = () => setPage((current) => Math.max(current - 1, 0));

  return {
    page,
    rowsPerPage,
    colsPerPage,
    rowsPerPageOptions,
    emptyRows,
    paginatedItems,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeColsPerPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
  };
};

export default usePagination;
