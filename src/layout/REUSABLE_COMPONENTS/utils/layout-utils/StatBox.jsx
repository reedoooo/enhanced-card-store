import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { useMode } from 'context';
import MDBox from '../../MDBOX';

const StatBox = ({ title, subtitle, icon, progress, increase, wrapIcon }) => {
  const { theme } = useMode();
  const colors = theme.palette;
  const green = colors.success.dark;
  const greenliht = colors.success.main_light;
  const grey = colors.grey.default;
  return (
    <MDBox
      theme={theme}
      sx={{
        width: '100%',
        p: '20px',
        borderRadius: theme.borders.borderRadius.md,
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
        </MDBox>
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
