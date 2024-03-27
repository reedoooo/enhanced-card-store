import { Box } from '@mui/material';
import StatBox from '../../../../REUSABLE_COMPONENTS/StatBox';
// import useCollectionStats from '../../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionStats';
import { useAppContext, useMode } from '../../../../../context';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import styled from 'styled-components';

const TotalPriceStatBox = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const primary = colors.primary.dark;
  const greenAccent = colors.greenAccent.light;
  const grey = colors.grey.dark;

  const { collectionMetaData } = useAppContext();
  const roundToNearestTenth = (num) => Math.round(num * 10) / 10;

  return (
    <Box
      sx={{
        bgcolor: primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.spacing(4),
        height: '100%',
        minHeight: '135px',
        // p: '5px',
      }}
    >
      <StatBox
        title={`${roundToNearestTenth(collectionMetaData?.totalValue) || 0}`}
        subtitle="Portfolio Total Value"
        progress="0.50"
        increase="+21%"
        wrapIcon={false}
        icon={<MonetizationOnIcon sx={{ color: grey, fontSize: '26px' }} />}
      />
    </Box>
  );
};

export default TotalPriceStatBox;
