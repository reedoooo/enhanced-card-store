import MDBox from '../../../../REUSABLE_COMPONENTS/MDBOX';
import BoxHeader from '../../../../REUSABLE_COMPONENTS/BoxHeader';
import useSelectedCollection from '../../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useCollectionStats from '../../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionStats';
import { Box } from '@mui/material';
import { useMode } from '../../../../../context';
import { DataGrid } from '@mui/x-data-grid';
import prepareTableData from '../../../data/topCards';

const PricedCardList = () => {
  const { collectionStats, metaStats } = useCollectionStats();
  const { selectedCollection } = useSelectedCollection();
  const { data, columns } = prepareTableData(selectedCollection);
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const grey = theme.palette.chartTheme.grey.darkest;
  const lightGrey = theme.palette.chartTheme.grey.lightest;

  const greenAccent = colors.greenAccent.default;

  // const renderCurrency = (params) => `$${params.value}`;

  // const productColumns = [
  //   {
  //     field: '_id',
  //     headerName: 'ID',
  //     flex: 1,
  //   },
  //   {
  //     field: 'expense',
  //     headerName: 'Expense',
  //     flex: 0.5,
  //     renderCell: renderCurrency,
  //   },
  //   {
  //     field: 'price',
  //     headerName: 'Price',
  //     flex: 0.5,
  //     renderCell: renderCurrency,
  //   },
  // ];

  // const countItems = (params) => params.value.length;

  // const transactionColumns = [
  //   {
  //     field: '_id',
  //     headerName: 'ID',
  //     flex: 1,
  //   },
  //   {
  //     field: 'buyer',
  //     headerName: 'Buyer',
  //     flex: 0.67,
  //   },
  //   {
  //     field: 'amount',
  //     headerName: 'Amount',
  //     flex: 0.35,
  //     renderCell: renderCurrency,
  //   },
  //   {
  //     field: 'productIds',
  //     headerName: 'Count',
  //     flex: 0.1,
  //     renderCell: countItems,
  //   },
  // ];

  // Assuming productData is available in your context or props
  // const productData = []; // Placeholder for actual data

  return (
    <MDBox>
      <BoxHeader
        title="List of Products"
        sideText={`${metaStats.totalQuantity} products`}
      />
      <Box
        mt="0.5rem"
        p="0 0.5rem"
        height="75%"
        sx={{
          '& .MuiDataGrid-root': {
            color: grey,
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${lightGrey} !important`,
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: `1px solid ${lightGrey} !important`,
          },
          '& .MuiDataGrid-columnSeparator': {
            visibility: 'hidden',
          },
        }}
      >
        <DataGrid
          columnHeaderHeight={25}
          rowHeight={35}
          hideFooter={true}
          rows={data}
          columns={columns}
        />
      </Box>
    </MDBox>
  );
};

export default PricedCardList;
