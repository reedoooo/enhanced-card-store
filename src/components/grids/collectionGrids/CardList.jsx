import React, { useMemo, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Button,
  TableHead,
  useTheme,
  ButtonGroup,
  Divider,
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TablePaginationActions from '../../reusable/TablePaginationActions';
import PropTypes from 'prop-types';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import { styled } from '@mui/styles';
import { useMode } from '../../../context/hooks/colormode';
import Logger from '../../reusable/Logger';
// Instantiate logger outside of the component
const cardLogger = new Logger([
  'Action',
  'Card Name',
  'Quantity',
  'Total Price',
]);

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
  color: '#fff',
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: '#ddd', // Lighter text for better readability
}));

const CardList = () => {
  const { theme } = useMode();
  const {
    selectedCollection,
    getTotalPrice,
    removeOneFromCollection,
    addOneToCollection,
  } = useCollectionStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const selectedCards = selectedCollection?.cards;
  const count = selectedCards?.length || 0;
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const emptyRows = useMemo(() => {
    return page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (selectedCards?.length || 0))
      : 0;
  }, [page, rowsPerPage, selectedCards]); // <-- Dependencies for useMemo

  const handleChangePage = (event, newPage) => {
    cardLogger.logCardAction('Change Page', {});
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    cardLogger.logCardAction('Change Rows Per Page', {});
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRemoveCard = (card) => {
    removeOneFromCollection(card, selectedCollection);
    cardLogger.logCardAction('remove', card);
  };

  const handleAddCard = (card) => {
    addOneToCollection(card, selectedCollection);
    cardLogger.logCardAction('add', card);
  };

  return (
    <StyledContainer maxWidth="lg">
      <Paper
        elevation={8}
        sx={{
          padding: theme.spacing(1), // Reduced padding for mobile screens
          borderRadius: 2,
          width: '100%',
          color: '#fff',
          background: theme.palette.background.main,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            paddingLeft: theme.spacing(1),
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.primary.main,
          }}
        >
          <IconButton
            color="primary"
            sx={{
              color: theme.palette.primary.main,
              marginRight: '4px',
            }}
          >
            <AssessmentIcon />
          </IconButton>
          Cards in Portfolio
        </Typography>
        {/* Include the CronTrigger button */}
        <TableContainer
          component={Paper}
          dimensions={chartDimensions}
          sx={{ background: theme.palette.background.secondary }}
        >
          <Table aria-label="custom pagination table">
            <StyledTableHeader>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Total Price</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">TCGPlayer Price</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </StyledTableHeader>

            <TableBody>
              {(rowsPerPage > 0
                ? // eslint-disable-next-line no-unsafe-optional-chaining
                  selectedCards?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : selectedCards
              )?.map((card, index) => (
                <TableRow key={card.id || index}>
                  <StyledTableCell component="th" scope="row">
                    {card?.name}
                  </StyledTableCell>
                  <StyledTableCell>{card?.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    {card?.totalPrice}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {card?.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {card.card_prices &&
                    card.card_prices[0] &&
                    card.card_prices[0].tcgplayer_price
                      ? `$${
                          card?.latestPrice?.num ||
                          card?.price ||
                          card.card_prices[0].tcgplayer_price
                        }`
                      : 'Price not available'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <StyledButtonGroup>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleRemoveCard(card)}
                        sx={{
                          padding: '10px 20px',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          backgroundColor: theme.palette.error.main,
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                          width: '100%',
                          hover: {
                            backgroundColor: theme.palette.error.dark,
                          },
                          fontSize: '0.6rem',
                          minWidth: 'inherit',
                          color: 'white',
                          fontWeight: 'bold',
                          // fontSize: '14px',
                          letterSpacing: '1px',
                          outline: 'none',
                        }}
                      >
                        Remove
                      </Button>
                      <Divider orientation="horizontal" flexItem />
                      <Button
                        size="small"
                        // className={classes.successButton}
                        variant="contained"
                        onClick={() => handleAddCard(card)}
                        sx={{
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                          width: '100%',
                          backgroundColor: theme.palette.success.main,
                          hover: {
                            backgroundColor: theme.palette.success.dark,
                          },
                          fontSize: '0.6rem',
                          minWidth: 'inherit',
                          padding: '2px 4px',
                          color: 'black',
                          fontWeight: 'bold',
                          letterSpacing: '1px',
                          outline: 'none',
                        }}
                      >
                        Add
                      </Button>
                    </StyledButtonGroup>
                  </StyledTableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <StyledTableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Box
          display="flex"
          justifyContent="flex-end"
          mt={2}
          sx={{ width: '100%' }}
        >
          <Typography variant="h5" sx={{ color: '#fff' }}>
            {`Total: $${getTotalPrice()}`}
          </Typography>
        </Box>
      </Paper>
    </StyledContainer>
  );
};

export default CardList;
