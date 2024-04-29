import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import ProgressCircle from '../system-utils/ProgressCircle';
import { useMode } from 'context';
import MDBox from '../MDBOX';

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
      theme={theme}
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
        alignItems="center" // Align items vertically.
        justifyContent="space-between"
        sx={{
          maxHeight: '135px',
          borderRadius: theme.spacing(4),
        }}
      >
        <MDBox
          display="flex"
          alignItems="center"
          sx={{
            border: 'none',
          }}
        >
          <Box
            sx={{
              borderRadius: '50%',
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.success.main,
              px: theme.spacing(1),
              mr: theme.spacing(5),
            }}
          >
            {icon}
          </Box>

          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{ color: grey, mt: theme.spacing(3) }}
            theme={theme}
          >
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
      <Box
        display="flex"
        justifyContent="space-between"
        mt="1rem"
        theme={theme}
      >
        <Typography variant="h5" sx={{ color: green }} theme={theme}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: greenliht }}
          theme={theme}
        >
          {increase}
        </Typography>
      </Box>
    </MDBox>
  );
};

export default StatBox;
