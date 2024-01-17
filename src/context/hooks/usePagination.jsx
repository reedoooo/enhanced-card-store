import { useState, useMemo } from 'react';

const usePagination = (items, itemsPerPage) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

  const emptyRows = useMemo(
    () => Math.max(0, (1 + page) * rowsPerPage - (items?.length || 0)),
    [page, rowsPerPage, items]
  );

  const handleChangePage = (newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedItems = useMemo(() => {
    const startIndex = page * rowsPerPage;
    const endIndex =
      rowsPerPage === -1 ? items.length : startIndex + rowsPerPage;
    return items.slice(startIndex, endIndex);
  }, [page, rowsPerPage, items]);

  return {
    page,
    rowsPerPage,
    emptyRows,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedItems,
  };
};

export default usePagination;
