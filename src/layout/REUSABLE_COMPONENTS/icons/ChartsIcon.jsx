import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { IconButton } from '@mui/material';

const ChartsIcon = () => {
  return (
    <IconButton
      aria-label="charts"
      sx={{
        width: 48, // Standard navbar icon size, adjust as needed
        height: 48, // Standard navbar icon size, adjust as needed
        padding: '8px', // Padding to provide some space around the icon
        margin: '0', // Adjust margin as needed based on navbar layout
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)', // Slight effect on hover
        },
        '& img': {
          maxWidth: '100%',
          maxHeight: '100%',
        },
      }}
    >
      <StackedLineChartIcon />
    </IconButton>
  );
};

export default ChartsIcon;
