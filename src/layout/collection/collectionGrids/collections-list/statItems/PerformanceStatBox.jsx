import { Box, Typography } from '@mui/material';
import StatBox from '../../../../REUSABLE_COMPONENTS/StatBox';
import useCollectionStats from '../../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionStats';
import { useAppContext, useMode } from '../../../../../context';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ProgressCircle from '../../../../REUSABLE_COMPONENTS/ProgressCircle';
import MDBox from '../../../../REUSABLE_COMPONENTS/MDBOX';
import StackedLineChartRoundedIcon from '@mui/icons-material/StackedLineChartRounded';
const PerformanceStatBox = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const primary = colors.primary.dark;
  const greenAccent = colors.greenAccent.light;
  // const primary = colors.primary.default;
  // const blue = colors.blueAccent.default;
  const green = colors.greenAccent.default;
  const greenliht = colors.greenAccent.light;

  const grey = colors.grey.default;
  const { collectionMetaData } = useAppContext();

  return (
    <Box
      sx={{
        bgcolor: primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // mb: '2rem',
        borderRadius: theme.spacing(4),
        height: '100%',
        minHeight: '135px',
        // p: '5px',
      }}
    >
      <StatBox
        title="431,225"
        subtitle="Portfolio Performance"
        progress="0.50"
        increase="+21%"
        wrapIcon={true}
        icon={
          <StackedLineChartRoundedIcon
            sx={{ color: greenAccent, fontSize: '26px' }}
          />
        }
      />
    </Box>
  );
};

export default PerformanceStatBox;
