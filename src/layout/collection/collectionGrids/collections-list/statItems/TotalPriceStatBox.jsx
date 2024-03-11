import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import useCollectionStats from '../../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionStats';
import { useMode } from '../../../../../context';
import { Box } from '@mui/material';
import StatBox from '../../../../REUSABLE_COMPONENTS/StatBox';

const TotalPriceStatBox = () => {
  const { collectionStats, metaStats } = useCollectionStats();
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const primary = colors.primary.dark;
  const greenAccent = colors.greenAccent.light;
  return (
    <Box
      sx={{
        bgcolor: primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <StatBox
        title="431,225"
        subtitle="Sales Obtained"
        progress="0.50"
        increase="+21%"
        icon={
          <MonetizationOnIcon sx={{ color: greenAccent, fontSize: '26px' }} />
        }
      />
    </Box>
  );
};

export default TotalPriceStatBox;
