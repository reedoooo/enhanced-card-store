import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import ProgressCircle from './ProgressCircle';
import { useMode } from '../../context';
import MDBox from './MDBOX';

const StatBox = ({ title, subtitle, icon, progress, increase, wrapIcon }) => {
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
        borderRadius: theme.shape.borderRadius,
        border: 'none',
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
        <MDBox
          sx={{
            border: 'none',
          }}
        >
          <CardContent
            sx={{
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.success.main,
              mt: theme.spacing(1),
              mr: theme.spacing(1),
            }}
          >
            {icon}
          </CardContent>

          <Typography variant="h4" fontWeight="bold" sx={{ color: grey }}>
            {title}
          </Typography>
          {/* </CardContent> */}
        </MDBox>
        {/* </Card> */}
        {/* </Box> */}
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
