import { Box, Typography, useTheme } from '@mui/material';
import ProgressCircle from './ProgressCircle';
import { useMode } from '../../context';
import MDBox from './MDBOX';

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const primary = colors.primary.default;
  const blue = colors.blueAccent.default;
  const green = colors.greenAccent.default;
  const greenliht = colors.greenAccent.light;
  const grey = colors.grey.default;

  return (
    <MDBox
      sx={{
        width: '100%',
        p: '20px',
        borderRadius: theme.spacing(4),
        maxHeight: '135px',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          maxHeight: '135px',
          borderRadius: theme.spacing(4),
        }}
      >
        <Box>
          {icon}
          <Typography variant="h4" fontWeight="bold" sx={{ color: grey }}>
            {title}
          </Typography>
        </Box>
        {/* <Box>
          <ProgressCircle progress={progress} />
        </Box> */}
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: green }}>
          {subtitle}
        </Typography>
        <Typography variant="h5" fontStyle="italic" sx={{ color: greenliht }}>
          {increase}
        </Typography>
      </Box>
    </MDBox>
  );
};

export default StatBox;
