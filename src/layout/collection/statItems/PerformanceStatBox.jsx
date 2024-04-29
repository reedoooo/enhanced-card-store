import { Box } from '@mui/material';
import StatBox from 'REUSABLE_COMPONENTS/StatBox';
import { useMode } from 'context';
import StackedLineChartRoundedIcon from '@mui/icons-material/StackedLineChartRounded';

const PerformanceStatBox = () => {
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
