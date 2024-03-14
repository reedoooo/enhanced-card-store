// import MDBox from '../../../../REUSABLE_COMPONENTS/MDBOX';
// import BoxHeader from '../../../../REUSABLE_COMPONENTS/BoxHeader';
// import useSelectedCollection from '../../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
// import useCollectionStats from '../../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionStats';
// import { Box, Card, Paper } from '@mui/material';
// import { useAppContext, useMode } from '../../../../../context';
// import { DataGrid } from '@mui/x-data-grid';
// import prepareTableData from '../../../data/topCards';
// import { roundToNearestTenth } from '../../../../../context/Helpers';

// const PricedCardList = () => {
//   const { theme } = useMode();

//   const colors = theme.palette.chartTheme;
//   const grey = theme.palette.chartTheme.grey.darkest;
//   const lightGrey = theme.palette.chartTheme.grey.lightest;
//   const greenAccent = colors.greenAccent.default;
//   const primary = colors.primary.dark;

//   const greenliht = colors.greenAccent.light;
//   const { collectionStats, metaStats } = useCollectionStats();
//   // const { selectedCollection } = useSelectedCollection();
//   const { cardsWithQuantities } = useAppContext();
//   // const topFiveCards = cardsWithQuantities
//   //   ?.sort((a, b) => b.price - a.price)
//   //   .slice(0, 5)
//   //   .map((card) => ({
//   //     ...card,
//   //     tPrice: roundToNearestTenth(card.totalPrice),
//   //     action: card,
//   //   }));
//   const topFiveCards = cardsWithQuantities
//     ?.sort((a, b) => b.price - a.price)
//     .slice(0, 5);
//   // console.log('topFiveCards:', topFiveCards);

//   const { data, columns } = prepareTableData(topFiveCards);
//   console.log('data:', data);
//   console.log('columns:', columns);

//   return (
//     <Box
//       sx={{
//         bgcolor: primary,
//         height: '100%',
//         borderRadius: theme.spacing(4),
//       }}
//     >
//       <MDBox
//         sx={{
//           borderRadius: theme.spacing(4),
//         }}
//       >
//         <BoxHeader
//           title="Top 5 Priced Cards"
//           subTitle={`${collectionStats?.totalQuantity} products`}
//           sideText={`${metaStats?.totalQuantity} products`}
//           color={greenliht}
//           sx={{
//             color: greenliht,
//           }}
//         />
//       </MDBox>
//       <Box
//         mt="0.5rem"
//         p="0 0.5rem"
//         height="100%"
//         sx={{
//           '& .MuiDataGrid-root': {
//             color: grey,
//             border: 'none',
//           },
//           '& .MuiDataGrid-cell': {
//             borderBottom: `1px solid ${lightGrey} !important`,
//           },
//           '& .MuiDataGrid-columnHeaders': {
//             borderBottom: `1px solid ${lightGrey} !important`,
//           },
//           '& .MuiDataGrid-columnSeparator': {
//             visibility: 'hidden',
//           },
//         }}
//       >
//         <DataGrid
//           columnHeaderHeight={25}
//           rowHeight={35}
//           hideFooter={true}
//           rows={data || []}
//           columns={columns || []}
//           // rowsCount={topFiveCards?.length}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default PricedCardList;
import MDBox from '../../../../REUSABLE_COMPONENTS/MDBOX';
import BoxHeader from '../../../../REUSABLE_COMPONENTS/BoxHeader';
import { Box } from '@mui/material';
import { useAppContext, useMode } from '../../../../../context';
import { DataGrid } from '@mui/x-data-grid';
import prepareTableData from '../../../data/topCards';
import styled from 'styled-components';

const PricedCardList = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const grey = colors.grey.darkest;
  const lightGrey = colors.grey.lightest;
  const primary = colors.primary.dark;
  const greenAccent = colors.greenAccent.light;
  const { cardsWithQuantities } = useAppContext();
  const topFiveCards = cardsWithQuantities
    ?.sort((a, b) => b.price - a.price)
    .slice(0, 5);
  const { data, columns } = prepareTableData(topFiveCards);

  return (
    <MDBox sx={{ width: '100%' }}>
      <Box
        sx={{
          bgcolor: primary,
          borderRadius: theme.spacing(4),
          minHeight: '270px',
          // minHeight: '100%',
        }}
      >
        {/* <MDBox> */}
        <BoxHeader
          title="Top 5 Priced Cards"
          colorVariant={greenAccent}
          useSX={true}
          titleVariant="h5"
          paddingVariant={theme.spacing(2)}
          sx={{
            color: greenAccent,
          }}
        />
        {/* </MDBox> */}
        <Box
          sx={{
            '& .MuiDataGrid-root': { color: grey, border: 'none' },
            '& .MuiDataGrid-cell': { borderBottom: `1px solid ${lightGrey}` },
            '& .MuiDataGrid-columnHeaders': {
              color: lightGrey,
              borderBottom: `1px solid ${lightGrey}`,
            },
            // minHeight: '100%',
            minHeight: `calc(270px - ${45})`, // 1rem = 16px typically, so theme.spacing(4) is used assuming the theme's base size is 8px
            maxHeight: `calc(270px - ${45})`,
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={data || []}
            columns={columns || []}
          />
        </Box>
      </Box>
    </MDBox>
  );
};

export default PricedCardList;
