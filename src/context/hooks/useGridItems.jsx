import React, { useMemo } from 'react';
import { Grid, Grow } from '@mui/material';
import SkeletonDeckItem from '../../components/grids/gridItems/SkeletonDeckItem';
import { useCardStoreHook } from './useCardStore';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import GenericCard from '../../components/cards/GenericCard';

const useGridItems = ({ itemsPerPage, cards, pageContext, isLoading }) => {
  const { loadingSearchResults } = useCardStoreHook();
  const skeletonCount = isLoading ? itemsPerPage : cards.length;

  const calculateTimeout = (index) => index * 400; // Adjust this value for faster or slower animations
  // Adjust the grid layout here
  const gridItems = useMemo(() => {
    return (
      isLoading || loadingSearchResults
        ? Array.from({ length: itemsPerPage })
        : cards
    ).map((card, index) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={isLoading ? `skeleton-${index}` : card.id}
        // Set the grid item to display as flex and direction column to control the height
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          timeout={calculateTimeout(index)}
        >
          <MDBox
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Conditionally render Skeleton or Card based on loading state */}
            {isLoading || loadingSearchResults ? (
              <SkeletonDeckItem />
            ) : (
              <GenericCard
                card={card}
                page={pageContext}
                context={pageContext}
              />
            )}
          </MDBox>
        </Grow>
      </Grid>
    ));
  }, [isLoading, loadingSearchResults, cards, itemsPerPage]);

  return (
    <Grid container spacing={2}>
      {gridItems}
    </Grid>
  );
};
//   const gridItems = useMemo(() => {
//     return isLoading || loadingSearchResults
//       ? Array.from({ length: skeletonCount }).map((_, index) => (
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             md={4}
//             lg={3}
//             key={index}
//             sx={{
//               flexGrow: '1',
//               // maxHeight: '95.1%',
//               // minHeight: '95%',
//             }}
//           >
//             <Grow
//               in={true}
//               style={{ transformOrigin: '0 0 0' }}
//               timeout={calculateTimeout(index)}
//               sx={{
//                 flexGrow: '1',
//                 // maxHeight: '95.1%',
//                 minHeight: '100%',
//               }}
//             >
//               <div>
//                 <SkeletonDeckItem />
//               </div>
//             </Grow>
//           </Grid>
//         ))
//       : cards.map((card, index) => (
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             md={4}
//             lg={3}
//             key={card.id}
//             sx={{
//               flexGrow: '1',
//               // maxHeight: '95.1%',
//               minHeight: '100%',
//             }}
//           >
//             <MDBox>
//               <Grow
//                 in={true}
//                 style={{ transformOrigin: '0 0 0' }}
//                 timeout={calculateTimeout(index)}
//                 sx={{
//                   flexGrow: '1',
//                   // maxHeight: '95.1%',
//                   minHeight: '100%',
//                 }}
//               >
//                 <MDBox
//                   sx={{
//                     width: '100%',
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                   }}
//                 >
//                   <GenericCard
//                     card={card}
//                     page={pageContext}
//                     index={index}
//                     context={pageContext}
//                   />
//                 </MDBox>
//               </Grow>
//             </MDBox>
//           </Grid>
//         ));
//   }, [cards, isLoading, loadingSearchResults, itemsPerPage]);

//   return <>{gridItems}</>;
// };

export default useGridItems;
