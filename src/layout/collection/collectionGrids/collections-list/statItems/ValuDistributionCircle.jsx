import { Box, Typography } from '@mui/material';
import { useMode } from '../../../../../context';
import ProgressCircle from '../../../../REUSABLE_COMPONENTS/ProgressCircle';

const ValuDistributionCircle = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const primary = colors.primary.dark;
  const greenAccent = colors.greenAccent.default;

  return (
    <Box
      gridColumn="span 4"
      gridRow="span 2"
      backgroundColor={primary}
      p="30px"
    >
      <Typography variant="h5" fontWeight="600">
        Campaign
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
        <ProgressCircle size="125" />
        <Typography variant="h5" color={greenAccent} sx={{ mt: '15px' }}>
          $48,352 revenue generated
        </Typography>
        <Typography>Includes extra misc expenditures and costs</Typography>
      </Box>
    </Box>
  );
};

export default ValuDistributionCircle;
