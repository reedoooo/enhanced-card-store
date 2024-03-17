import MDBox from '../../../../REUSABLE_COMPONENTS/MDBOX';
import BoxHeader from '../../../../REUSABLE_COMPONENTS/BoxHeader';
import { Box, Card, CardContent } from '@mui/material';
import { useAppContext, useMode } from '../../../../../context';
import { DataGrid } from '@mui/x-data-grid';
import prepareTableData from '../../../data/topCards';
import styled from 'styled-components';
import { useMemo } from 'react';

const PricedCardList = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const grey = colors.grey.darkest;
  const lightGrey = colors.grey.lightest;
  const primary = colors.primary.dark;
  const greenAccent = colors.greenAccent.light;
  const { cardsWithQuantities } = useAppContext();
  const topFiveCards = useMemo(() => {
    return cardsWithQuantities?.sort((a, b) => b.price - a.price).slice(0, 5);
  }, [cardsWithQuantities]);
  const { data, columns } = useMemo(
    () => prepareTableData(topFiveCards),
    [topFiveCards]
  );

  return (
    <MDBox sx={{ width: '100%' }}>
      <Box
        sx={{
          background: primary,
          borderRadius: theme.spacing(4),
          minHeight: '270px',
          // minHeight: '100%',
        }}
      >
        <MDBox>
          <Card
            sx={{
              // borderRadius: theme.spacing(4),
              p: theme.spacing(2),
              background: theme.palette.chartTheme.grey.darkest,
              border: theme.palette.chartTheme.greenAccent.dark,
            }}
          >
            <BoxHeader
              title="Top 5 Priced Cards"
              subtitle={false}
              sideText={`$${topFiveCards?.reduce((acc, card) => acc + card.price, 0)}`}
              colorVariant={greenAccent}
              useSX={true}
              titleVariant="h5"
              paddingVariant={theme.spacing(2)}
              sx={{
                color: greenAccent,
              }}
            />
          </Card>
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

export default PricedCardList;
