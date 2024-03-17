// import React, { useMemo } from 'react';
// import { Grid, Grow, Typography } from '@mui/material';
// import { useDeckStore } from '../../../context/MAIN_CONTEXT/DeckContext/DeckContext';
// import StoreItem from '../gridItems/StoreItem';
// import MDBox from '../../../layout/REUSABLE_COMPONENTS/MDBOX';
// import GridLayout from '../../../layout/Containers/GridLayout';
// import SkeletonCard from '../gridItems/SkeletonCard';

// const CardsGrid = ({ isLoading }) => {
//   const { selectedCards } = useDeckStore();

//   // Efficiently flattening and processing selectedCards with useMemo
//   const flattenSelectedCards = useMemo(() => {
//     if (!Array.isArray(selectedCards)) return [];

//     const cardCountMap = new Map();

//     return selectedCards.reduce((acc, card) => {
//       if (!card) return acc;
//       const currentCount = (cardCountMap.get(card.id) || 0) + 1;
//       if (currentCount <= 3) {
//         acc.push({ ...card, uniqueKey: `${card.id}-${currentCount - 1}` });
//         cardCountMap.set(card.id, currentCount);
//       }
//       return acc;
//     }, []);
//   }, [selectedCards]);

//   const gridItems = useMemo(() => {
//     return isLoading ? Array.from({ length: 12 }) : flattenSelectedCards;
//   }, [isLoading, flattenSelectedCards]);

//   // Define grid item breakpoints once to reuse in the mapping
//   const gridItemProps = { xs: 6, sm: 4, md: 4, lg: 4 };

//   return (
//     <GridLayout
//       containerStyles={{ marginTop: '1rem', gap: '1rem' }}
//       isLoading={isLoading}
//       skeletonCount={12}
//       gridItemProps={{ xs: 12, sm: 6, md: 4, lg: 3 }}
//     >
//       {gridItems.map((item, index) => (
//         <Grid
//           item
//           key={isLoading ? `skeleton-${index}` : item.uniqueKey}
//           {...gridItemProps}
//         >
//           <Grow
//             in={true}
//             style={{ transformOrigin: '0 0 0' }}
//             {...(isLoading ? { timeout: (index + 1) * 400 } : {})}
//           >
//             <MDBox
//               sx={{
//                 width: '100%',
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//               }}
//             >
//               {isLoading ? (
//                 <SkeletonCard context={'Deck'} />
//               ) : (
//                 <StoreItem card={item} index={index} context={'Deck'} />
//               )}
//             </MDBox>
//           </Grow>
//         </Grid>
//       ))}
//     </GridLayout>
//   );
// };

// export default React.memo(CardsGrid);