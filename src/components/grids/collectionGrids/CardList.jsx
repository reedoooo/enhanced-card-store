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
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TablePaginationActions from './TablePaginationActions';
import Logger from './Logger';
import PropTypes from 'prop-types';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';

// Instantiate logger outside of the component
const cardLogger = new Logger([
  'Action',
  'Card Name',
  'Quantity',
  'Total Price',
]);

const CardList = ({ selectedCards }) => {
  const {
    getTotalCost,
    selectedCollection,
    getTotalPrice,
    totalCost,
    // totalPrice,
    removeOneFromCollection,
    addOneToCollection,
  } = useCollectionStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const chartContainerRef = useRef(null);
  const count = selectedCards?.length || 0;
  const emptyRows = useMemo(() => {
    // <-- Use useMemo for better performance
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
    removeOneFromCollection(card, card.id);
    cardLogger.logCardAction('Remove Card', card);
  };

  const handleAddCard = (card) => {
    addOneToCollection(card, card.id);
    cardLogger.logCardAction('Add Card', card);
  };
  // let totalPrice = getTotalPrice();

  // console.log('TOTAL PRICE:', totalPrice);

  const chartDimensions = useMemo(
    () =>
      chartContainerRef.current?.getBoundingClientRect() || {
        width: 400,
        height: 600,
      },
    [chartContainerRef.current]
  );

  return (
    <Container
      maxWidth="lg"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Paper
        elevation={8}
        ref={chartContainerRef}
        sx={{ padding: 2, borderRadius: 2, width: '100%' }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            paddingLeft: '8px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton color="primary">
            <AssessmentIcon />
          </IconButton>
          Cards in Portfolio
        </Typography>
        {/* Include the CronTrigger button */}
        <TableContainer component={Paper} dimensions={chartDimensions}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">TCGPlayer Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

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
                  <TableCell component="th" scope="row">
                    {card?.name}
                  </TableCell>
                  <TableCell align="right">{card?.price}</TableCell>
                  <TableCell align="right">{card?.totalPrice}</TableCell>
                  <TableCell align="right">{card?.quantity}</TableCell>
                  <TableCell align="right">
                    {card.card_prices &&
                    card.card_prices[0] &&
                    card.card_prices[0].tcgplayer_price
                      ? `$${card.card_prices[0].tcgplayer_price}`
                      : 'Price not available'}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemoveCard(card)}
                      sx={{
                        fontSize: '0.6rem',
                        minWidth: 'inherit',
                        padding: '2px 4px',
                      }}
                    >
                      Remove
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddCard(card)}
                      sx={{
                        fontSize: '0.6rem',
                        minWidth: 'inherit',
                        padding: '2px 4px',
                      }}
                    >
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
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
          <Typography variant="h5">{`Total: $${totalCost}`}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default CardList;
