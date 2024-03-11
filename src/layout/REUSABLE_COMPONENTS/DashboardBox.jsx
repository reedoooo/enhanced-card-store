import { Box } from '@mui/material';
import { styled } from '@mui/system';

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#2d2d34',
  borderRadius: '1rem',
  boxShadow: '0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)',
  flexGrow: 1,
}));

export default DashboardBox;
