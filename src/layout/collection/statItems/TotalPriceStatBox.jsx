import { Box } from '@mui/material';
import StatBox from '../../REUSABLE_COMPONENTS/layout-utils/StatBox';
import { useMode, useAppContext } from '../../../context';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { roundToNearestTenth } from '../../../context/Helpers';
const TotalPriceStatBox = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const primary = colors.primary.dark;
  const grey = colors.grey.dark;

  const { collectionMetaData } = useAppContext();

  return (
    <Box
      sx={{
        bgcolor: primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius,
        height: '100%',
        minHeight: '135px',
      }}
    >
      <StatBox
        title={`$${roundToNearestTenth(collectionMetaData?.totalValue) || 0}`}
        subtitle="Portfolio Total Value"
        progress="0.50"
        increase="+21%"
        wrapIcon={false}
        icon={<MonetizationOnIcon sx={{ color: grey, fontSize: '40px' }} />}
      />
    </Box>
  );
};

export default TotalPriceStatBox;
