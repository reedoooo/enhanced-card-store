import React, { useEffect, useState, useMemo } from 'react';
import { Box, Fade } from '@mui/material';
import { useCardStore } from '../../../context/CardContext/CardStore';
import DeckSearchCardGrid from '../../grids/searchResultsGrids/DeckSearchCardGrid';
import CustomPagination from '../../reusable/CustomPagination';
import SearchBar from './SearchBar';

const DeckSearch = ({ userDecks }) => {
  const [page, setPage] = useState(1);
  const { searchData, setSlicedAndMergedSearchData } = useCardStore();

  // Pagination Control
  const itemsPerPage = 36;
  const handlePagination = (event, value) => setPage(value);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return searchData?.slice(start, start + itemsPerPage);
  }, [searchData, page]);

  useEffect(() => {
    setSlicedAndMergedSearchData(paginatedData);
  }, [paginatedData]);

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
            marginBottom: 2, // Add some margin below the search form
          }}
        >
          <SearchBar />
        </Box>
        <DeckSearchCardGrid cards={paginatedData} userDecks={userDecks} />
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

// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { Box, Fade } from '@mui/material';
// import { useCardStore } from '../../../context/CardContext/CardStore';
// import SearchForm from '../../forms/SearchForm';
// import DeckSearchCardGrid from '../../grids/searchResultsGrids/DeckSearchCardGrid';
// import CustomPagination from '../../reusable/CustomPagination';
// import SearchBar from './SearchBar';

// const DeckSearch = ({ userDecks }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(1);
//   const {
//     // deckSearchData,
//     searchData,
//     handleRequest,
//     setSlicedAndMergedSearchData,
//   } = useCardStore();

//   const handleChange = (event) => setSearchTerm(event.target.value);
//   const handleSubmit = () => {
//     // event.preventDefault();
//     handleRequest({ name: searchTerm });
//   };
//   const handlePagination = (event, value) => setPage(value);

//   const itemsPerPage = 36;
//   const start = (page - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   // const currentDeckSearchData = deckSearchData?.slice(start, end);
//   const currentStoreSearchData = useMemo(
//     () => searchData?.slice(start, end),
//     [searchData, page]
//   );

//   useEffect(() => {
//     setSlicedAndMergedSearchData(currentStoreSearchData);
//   }, [currentStoreSearchData]);

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
//             marginBottom: 2, // Add some margin below the search form
//           }}
//         >
//           {/* <SearchForm
//             searchTerm={searchTerm}
//             handleChange={handleChange}
//             handleSubmit={handleSubmit}
//           /> */}
//           <SearchBar
//             searchTerm={searchTerm}
//             handleChange={handleChange}
//             handleSubmit={handleSubmit}
//           />
//         </Box>
//         <DeckSearchCardGrid
//           // cards={currentDeckSearchData}
//           cards={currentStoreSearchData}
//           userDecks={userDecks}
//         />
//         <CustomPagination
//           // totalCount={deckSearchData.length}
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
