import {
  ButtonGroup,
  Container,
  TableCell,
  TableHead,
  // useTheme,
} from '@mui/material';
import { styled } from '@mui/styles';

const useCardListStyles = () => {
  // const theme = useTheme();
  const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    // background: theme.palette.background.main,
    background: theme.palette.background.dark,
    padding: theme.spacing(2),
    color: '#fff', // White text color
    // padding: 2,
    borderRadius: 4,
  }));

  const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  }));
  const StyledTableHeader = styled(TableHead)(({ theme }) => ({
    backgroundColor: '#555', // Darker shade for header
    color: theme.palette.success.main,
  }));
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: '#ddd', // Lighter text for better readability
  }));

  // Return all styled components
  return {
    StyledContainer,
    StyledButtonGroup,
    StyledTableHeader,
    StyledTableCell,
  };
};

export default useCardListStyles;
