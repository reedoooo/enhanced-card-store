// import React, { useState, useEffect, useMemo } from 'react';
// import { Box, Collapse, Fade } from '@mui/material';
// import DeckSearchCardGrid from '../../grids/searchResultsGrids/DeckSearchCardGrid';
// import CustomPagination from '../../reusable/CustomPagination';
// import SearchBar from './SearchBar';
// import useLocalStorage from '../../../context/hooks/useLocalStorage';
// import { useGetSearchData } from '../../../context/hooks/useGetSearchData';
// import usePagination from '../../../context/hooks/usePagination';
// import useGridItems from '../../../context/hooks/useGridItems';
// import GridLayout from '../../grids/searchResultsGrids/GridLayout';
// //   const PaginationComponent = (
// //     <CustomPagination
// //       totalCount={totalCount}
// //       itemsPerPage={itemsPerPage}
// //       currentPage={page}
// //       handlePagination={(event, value) => setPage(value)}
// //     />
// //   );
// const DeckSearch = () => {
//   const itemsPerPage = 12;
//   const { searchData, isLoading, uniqueCards } = useGetSearchData();
//   const { pageCount, data, paginatedData, currentPage, setCurrentPage } =
//     usePagination(uniqueCards, itemsPerPage);
//   const renderItems = useGridItems({
//     cards: paginatedData,
//     isLoading,
//     pageContext: 'Cart',
//     itemsPerPage,
//   });
//   // const renderPagination = pageOptions.map((option) => (
//   //   <MDPagination
//   //     item
//   //     key={option}
//   //     onClick={() => gotoPage(Number(option))}
//   //     count={pageOptions.length}
//   //     active={pageIndex === option}
//   //     onPageChange={(_, num) => gotoPage(num - 1)}
//   //     page={pageIndex + 1}
//   //     showFirstButton
//   //     showLastButton
//   //     containerProps={{
//   //       justifyContent: 'center',
//   //       display: 'flex',
//   //       padding: '8px',
//   //       '.MuiPagination-ul': {
//   //         flexWrap: 'wrap', // Allow pagination items to wrap on small screens
//   //       },
//   //     }}
//   //   >
//   //     {option + 1}
//   //   </MDPagination>
//   // ));
//   return (
//     <Collapse orientation="horizontal" in={true}>
//       <Box
//         p={1}
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           flexGrow: 1,
//           margin: 'auto',
//           alignItems: 'center',
//           justifyContent: 'center',
//           width: '100%',
//           height: '100%',
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'flex-start',
//             width: '100%',
//             marginBottom: 2,
//           }}
//         >
//           <SearchBar />
//         </Box>
//         <GridLayout
//           containerStyles={{ marginTop: '1rem' }}
//           isLoading={isLoading}
//         >
//           {renderItems}
//         </GridLayout>
//       </Box>
//     </Collapse>
//   );
// };

// export default DeckSearch;
