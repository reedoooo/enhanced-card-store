// import React, { useEffect, useState, useMemo } from 'react';
// import { Box, Fade } from '@mui/material';
// import DeckSearchCardGrid from '../../grids/searchResultsGrids/DeckSearchCardGrid';
// import CustomPagination from '../../reusable/CustomPagination';
// import SearchBar from './SearchBar';
// import useLocalStorage from '../../../context/hooks/useLocalStorage';

// const DeckSearch = ({ userDecks }) => {
//   const [page, setPage] = useState(1);
//   const [searchData] = useLocalStorage('searchData', []); // Use useLocalStorage hook

//   // Pagination Control
//   const itemsPerPage = 36;
//   const handlePagination = (event, value) => setPage(value);
//   const paginatedData = useMemo(() => {
//     const start = (page - 1) * itemsPerPage;
//     return searchData?.slice(start, start + itemsPerPage);
//   }, [searchData, page]);

//   return (
//     <Fade in={true} timeout={500}>
//       <Box
//         p={1}
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
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
//         <DeckSearchCardGrid cards={paginatedData} userDecks={userDecks} />
//         <CustomPagination
//           totalCount={searchData?.length}
//           itemsPerPage={itemsPerPage}
//           currentPage={page}
//           handlePagination={handlePagination}
//         />
//       </Box>
//     </Fade>
//   );
// };

// export default DeckSearch;
import React, { useState, useEffect, useMemo } from 'react';
import { Box, Fade } from '@mui/material';
import DeckSearchCardGrid from '../../grids/searchResultsGrids/DeckSearchCardGrid';
import CustomPagination from '../../reusable/CustomPagination';
import SearchBar from './SearchBar';
import useLocalStorage from '../../../context/hooks/useLocalStorage';

const DeckSearch = ({ userDecks }) => {
  const [page, setPage] = useState(1);
  // const [previousSearchData, setPreviousSearchData] = useLocalStorage(
  //   'previousSearchData',
  //   []
  // );
  // const [searchData, setSearchData] = useLocalStorage(
  //   'searchData',
  //   previousSearchData || []
  // );
  const [previousSearchData] = useLocalStorage('previousSearchData', []);
  const [searchData, setSearchData] = useLocalStorage(
    'searchData',
    previousSearchData || []
  );
  const [isLoading, setIsLoading] = useState(false);
  // Pagination Control
  const itemsPerPage = 12;
  const handlePagination = (event, value) => setPage(value);
  const uniqueCards = useMemo(() => {
    return Array.from(
      new Map(searchData.map((card) => [card.id, card])).values()
    );
  }, [searchData]);

  // Ensure that the component updates when searchData changes
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        // setSelectedCards(selectedDeck?.cards?.slice(0, 30) || []);
        const updatedData = JSON.parse(
          localStorage.getItem('searchData') || '[]'
        );
        setSearchData(updatedData);
        setIsLoading(false);
      }
    }, 1000);
    // const handleStorageChange = () => {
    //   const updatedData = JSON.parse(
    //     localStorage.getItem('searchData') || '[]'
    //   );
    //   setSearchData(updatedData);
    // };

    // window.addEventListener('storage', handleStorageChange);

    // return () => {
    //   window.removeEventListener('storage', handleStorageChange);
    // };
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [searchData]);

  return (
    <Fade in={true} timeout={500}>
      <Box
        p={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            marginBottom: 2,
          }}
        >
          <SearchBar />
        </Box>
        <DeckSearchCardGrid
          cards={uniqueCards}
          searchData={searchData}
          userDecks={userDecks}
          page={page}
          itemsPerPage={itemsPerPage}
          isLoading={isLoading}
        />
        <CustomPagination
          totalCount={searchData?.length}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          handlePagination={handlePagination}
        />
      </Box>
    </Fade>
  );
};

export default DeckSearch;
