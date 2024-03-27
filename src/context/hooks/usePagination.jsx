import { useMemo, useState } from 'react';

const usePagination = (items, defaultPageSize) => {
  const [currentPage, setCurrentPage] = useState(1);
  const data = useMemo(() => items, [items]);
  const initialState = useMemo(
    () => ({
      pageIndex: 0,
      pageSize: defaultPageSize || 10,
    }),
    [defaultPageSize]
  );

  const pageCount = useMemo(
    () => Math.ceil(items.length / initialState.pageSize),
    [items.length, initialState.pageSize]
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * defaultPageSize;
    const end = start + defaultPageSize;
    return data.slice(start, end);
  }, [data, currentPage, defaultPageSize]);

  return {
    data,
    initialState,
    pageCount,
    paginatedData,
    currentPage,
    setCurrentPage,
  };
};

export default usePagination;
