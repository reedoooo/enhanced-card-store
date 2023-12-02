import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { IconButton } from '@mui/material';

const MoneyIcon = () => {
  return (
    <IconButton
      aria-label="charts"
      sx={{
        width: 48, // Standard navbar icon size, adjust as needed
        height: 48, // Standard navbar icon size, adjust as needed
        // padding: '8px', // Padding to provide some space around the icon
        margin: '0', // Adjust margin as needed based on navbar layout
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)', // Slight effect on hover
        },
        // Ensure the img tag inside the button fits well
        '& img': {
          maxWidth: '100%',
          maxHeight: '100%',
        },
      }}
    >
      <AttachMoneyIcon
        sx={{
          width: 48,
          height: 48,
          padding: '8px',
          margin: '0',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      />
    </IconButton>
  );
};

export default MoneyIcon;
