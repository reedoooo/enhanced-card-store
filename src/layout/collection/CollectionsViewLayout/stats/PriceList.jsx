import BoxHeader from 'layout/REUSABLE_COMPONENTS/layout-utils/BoxHeader';
import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { Divider } from '@mui/joy';
import { useMode } from 'context';
import useManager from 'context/useManager';
import prepareTableData from 'data/prepareTableData';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';

const PricedCardList = () => {
  const { theme } = useMode();
  const colors = theme.palette;
  const grey = colors.grey.darkest;
  const lightGrey = colors.grey.lightest;
  const primary = colors.primary.dark;
  const greenAccent = colors.success.main_light;
  const { collectionMetaData } = useManager();
  const { data, columns } = useMemo(
    () => prepareTableData(collectionMetaData?.topFiveCards, 'topCards'),
    [collectionMetaData?.topFiveCards]
  );

  return (
    <MDBox
      sx={{
        width: '100%',
        height: '100%',
        flexGrow: 1,
        // p: 2,
        maxHeight: 270,
        border: 'none',
      }}
    >
      <Box
        sx={{
          background: primary,
          borderRadius: theme.borders.borderRadius.md,
          minHeight: '270px',
        }}
      >
        <MDBox sx={{ border: 'none' }}>
          <Card
            sx={{
              width: '100%',
              justifyContent: 'center',
              p: theme.spacing(2),
              background: grey,
              border: theme.palette.success.darkest,
              borderRadius: theme.borders.borderRadius.md,
            }}
          >
            <BoxHeader
              title="Top 5 Priced Cards"
              subtitle="none"
              sideText={`$${collectionMetaData?.topFiveCards?.reduce((acc, card) => acc + card.price, 0)}`}
              colorVariant={greenAccent}
              useSX={true}
              titleVariant="h5"
              paddingVariant={theme.spacing(2)}
              sx={{
                color: greenAccent,
                borderRadius: theme.borders.borderRadius.md,
              }}
            />
          </Card>
          <Divider color={greenAccent} size="2rem" />
        </MDBox>
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

const PriceList = () => {
  return <PricedCardList />;
};

export default PriceList;
