import {
  ButtonGroup,
  Container,
  TableCell,
  TableHead,
  // useTheme,
} from '@mui/material';
import styled from 'styled-components';

const useCardListStyles = () => {
  // const theme = useTheme();
  const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '120%',
    width: '100%',
    maxWidth: '100%',
    alignItems: 'center',
    // background: theme.palette.backgroundB.dark,
    background: theme.palette.backgroundA.dark,
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
    background: theme.palette.backgroundB.lightest,
    color: theme.palette.backgroundA.darker,
  }));
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // color: '#ddd', // Lighter text for better readability
    border: '1px solid',
    borderColor: theme.palette.backgroundB.lightest,
    [theme.breakpoints.up('md')]: {
      // Styles that apply to medium screens and larger
      padding: theme.spacing(2), // example of increasing padding
      fontSize: '1rem', // example of increasing font size
    },
    [theme.breakpoints.down('sm')]: {
      // Styles that apply to small screens and smaller
      padding: theme.spacing(1), // example of decreasing padding
      fontSize: '0.8rem', // example of decreasing font size
    },
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
