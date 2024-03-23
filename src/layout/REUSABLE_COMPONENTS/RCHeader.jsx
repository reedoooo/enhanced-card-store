import { Typography, Box } from '@mui/material';
import { useMode } from '../../context';

const RCHeader = ({ title, subtitle }) => {
  const { theme } = useMode();
  const grey = theme.palette.chartTheme.grey.default;
  const greenAccent = theme.palette.chartTheme.greenAccent.default;
  return (
    <Box my="auto">
      <Typography
        variant="h2"
        color={grey}
        fontWeight="bold"
        sx={{ m: '0 0 5px 0' }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={greenAccent}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default RCHeader;
