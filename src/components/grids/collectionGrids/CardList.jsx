import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
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
  Divider,
  Container,
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TablePaginationActions from '../../reusable/TablePaginationActions';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import Logger from '../../reusable/Logger';
import { useMode } from '../../../context';
import useCardListStyles from '../../../context/hooks/useCardListStyles';
import useResponsiveStyles from '../../../context/hooks/useResponsiveStyles';
import usePortfolioStyles from '../../../context/hooks/usePortfolioStyles';

const cardLogger = new Logger([
  'Action',
  'Card Name',
  'Quantity',
  'Total Price',
]);

const CardList = () => {
  const { theme } = useMode();
  const classes = usePortfolioStyles(theme);

  const {
    selectedCollection,
    getTotalPrice,
    removeOneFromCollection,
    addOneToCollection,
  } = useCollectionStore();

  const { isMedium, isLarge, isMediumExtraLarge } = useResponsiveStyles(theme);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const selectedCards = selectedCollection?.cards;
  const count = selectedCards?.length || 0;
  const emptyRows = useMemo(
    () => Math.max(0, (1 + page) * rowsPerPage - (selectedCards?.length || 0)),
    [page, rowsPerPage, selectedCards]
  );

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

  useEffect(() => {
    const updateRowsPerPage = () =>
      setRowsPerPage(window.innerWidth > 960 ? 10 : 5);
    window.addEventListener('resize', updateRowsPerPage);
    return () => window.removeEventListener('resize', updateRowsPerPage);
  }, []);

  // Helper function to round the total price to the nearest tenth
  const roundToNearestTenth = (value) => Math.round(value * 10) / 10;

  // Render functions
  const renderTableHeader = () => {
    return (
      <TableHead className={classes.tableHeader}>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCell}>Name</TableCell>
          <TableCell align="right" className={classes.tableCell}>
            Price
          </TableCell>
          <TableCell align="right" className={classes.tableCell}>
            Total Price
          </TableCell>
          <TableCell align="right" className={classes.tableCell}>
            Quantity
          </TableCell>
          <TableCell align="right" className={classes.tableCell}>
            Actions
          </TableCell>
        </TableRow>
      </TableHead>
    );
  };

  const renderTableBody = () => {
    return (
      <TableBody className={classes.tableBody}>
        {(rowsPerPage > 0
          ? selectedCollection.cards?.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
          : selectedCollection.cards
        )?.map((card) => (
          <TableRow key={card.id} className={classes.tableRow}>
            <TableCell component="th" scope="row" className={classes.tableCell}>
              {card.name}
            </TableCell>
            <TableCell align="right" className={classes.tableCell}>
              {card.price}
            </TableCell>
            <TableCell align="right" className={classes.tableCell}>
              {roundToNearestTenth(card.totalPrice)}
            </TableCell>
            <TableCell align="right" className={classes.tableCell}>
              {card.quantity}
            </TableCell>
            <TableCell align="right" className={classes.tableCell}>
              {/* Action Buttons */}
              <Button color="error" onClick={() => handleRemoveCard(card)}>
                Remove
              </Button>
              <Divider orientation="vertical" flexItem />
              <Button color="primary" onClick={() => handleAddCard(card)}>
                Add
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const renderTableFooter = () => {
    return (
      <TableFooter className={classes.tableFooter}>
        <TableRow className={classes.tableRow}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            colSpan={5}
            count={selectedCollection.cards?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    );
  };

  const renderTotalPriceBox = () => {
    return (
      <Box
        display="flex"
        justifyContent="flex-end"
        mt={2}
        className={classes.tablePriceBox}
      >
        <Typography variant="h5">
          Total: ${roundToNearestTenth(getTotalPrice())}
        </Typography>
      </Box>
    );
  };

  return (
    <Paper className={classes.tablePaper}>
      <TableContainer component={Container} className={classes.tableContainer}>
        <Table aria-label="custom pagination table" className={classes.table}>
          {renderTableHeader()}
          {renderTableBody()}
          {renderTableFooter()}
        </Table>
      </TableContainer>
      {renderTotalPriceBox()}
    </Paper>
  );
};

export default CardList;
//   useEffect(() => {
//     // if its bigger than small
//     if (
//       isLarge ||
//       isMediumExtraLarge ||
//       // isMedium ||
//       (isMedium && isLarge) ||
//       (isMedium && isMediumExtraLarge)
//     ) {
//       setRowsPerPage(10);
//     } else {
//       setRowsPerPage(5);
//     }
//   }, [isLarge]);

//   return (
//     <StyledContainer theme={theme} maxWidth="lg">
//       <CardListTable
//         theme={theme}
//         selectedCards={selectedCards}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         handleChangePage={handleChangePage}
//         handleChangeRowsPerPage={handleChangeRowsPerPage}
//         handleRemoveCard={handleRemoveCard}
//         handleAddCard={handleAddCard}
//         emptyRows={emptyRows}
//         StyledTableHeader={StyledTableHeader}
//         StyledTableCell={StyledTableCell}
//         StyledButtonGroup={StyledButtonGroup}
//         count={count}
//       />
//       <TotalPriceBox totalPrice={getTotalPrice()} />
//     </StyledContainer>
//   );
// };

// const CardListTable = ({
//   selectedCards,
//   rowsPerPage,
//   page,
//   handleChangePage,
//   handleChangeRowsPerPage,
//   handleRemoveCard,
//   handleAddCard,
//   emptyRows,
//   StyledTableHeader,
//   StyledTableCell,
//   count,
//   StyledButtonGroup,
// }) => {
//   const { theme } = useMode();

//   return (
//     <TableContainer
//       component={Paper}
//       sx={{
//         backgroundColor: theme.palette.backgroundA.lightest,
//         border: '3px solid',
//         borderColor: theme.palette.backgroundB.lightest,
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//         borderRadius: '5px',
//         width: '100%',
//         maxWidth: '100%',
//       }}
//     >
//       <Table
//         aria-label="custom pagination table"
//         sx={{
//           width: '100%',

//           maxWidth: '100%',
//         }}
//       >
//         <StyledTableHeader theme={theme}>
//           <TableRow>
//             <StyledTableCell>Name</StyledTableCell>
//             <StyledTableCell align="right">Price</StyledTableCell>
//             <StyledTableCell align="right">Total Price</StyledTableCell>
//             <StyledTableCell align="right">Quantity</StyledTableCell>
//             {/* <StyledTableCell align="right">TCGPlayer Price</StyledTableCell> */}
//             <StyledTableCell align="right">Actions</StyledTableCell>
//           </TableRow>
//         </StyledTableHeader>

//         <TableBody>
//           {(rowsPerPage > 0
//             ? selectedCards?.slice(
//                 page * rowsPerPage,
//                 page * rowsPerPage + rowsPerPage
//               )
//             : selectedCards
//           )?.map((card, index) => (
//             <TableRow key={card.id || index}>
//               <StyledTableCell component="th" scope="row">
//                 {card?.name}
//               </StyledTableCell>
//               <StyledTableCell align="right">{card?.price}</StyledTableCell>
//               <StyledTableCell align="right">
//                 {card?.totalPrice}
//               </StyledTableCell>
//               <StyledTableCell align="right">{card?.quantity}</StyledTableCell>

//               <StyledTableCell align="right">
//                 <StyledButtonGroup theme={theme}>
//                   <Button
//                     onClick={() => handleRemoveCard(card)}
//                     sx={{
//                       padding: '10px 20px',
//                       border: 'none',
//                       borderRadius: '5px',
//                       cursor: 'pointer',
//                       backgroundColor: theme.palette.error.main,
//                       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                       width: '100%',
//                       hover: {
//                         backgroundColor: theme.palette.error.dark,
//                       },
//                       fontSize: '0.6rem',
//                       minWidth: 'inherit',
//                       color: 'white',
//                     }}
//                   >
//                     Remove
//                   </Button>
//                   <Divider orientation="horizontal" flexItem />
//                   <Button
//                     onClick={() => handleAddCard(card)}
//                     sx={{
//                       padding: '10px 20px',
//                       border: 'none',
//                       borderRadius: '5px',
//                       cursor: 'pointer',
//                       backgroundColor: theme.palette.success.main,
//                       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                       width: '100%',
//                       hover: {
//                         backgroundColor: theme.palette.success.dark,
//                       },
//                       fontSize: '0.6rem',
//                       minWidth: 'inherit',
//                       color: 'white',
//                     }}
//                   >
//                     Add
//                   </Button>
//                 </StyledButtonGroup>
//               </StyledTableCell>
//             </TableRow>
//           ))}

//           {emptyRows > 0 && (
//             <TableRow style={{ height: 53 * emptyRows }}>
//               <StyledTableCell theme={theme} colSpan={6} />
//             </TableRow>
//           )}
//         </TableBody>

//         <TableFooter>
//           <TableRow>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//               colSpan={6}
//               count={count}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               color={theme.palette.primary.main}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               ActionsComponent={TablePaginationActions}
//             />
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </TableContainer>
//   );
// };

// const TotalPriceBox = ({ totalPrice }) => {
//   const roundToNearestTenth = (value) => {
//     return Math.round(value * 10) / 10;
//   };
//   return (
//     <Box display="flex" justifyContent="flex-end" mt={2} sx={{ width: '100%' }}>
//       <Typography variant="h5" sx={{ color: '#fff' }}>
//         {`Total: $${roundToNearestTenth(totalPrice)}`}
//       </Typography>
//     </Box>
//   );
// };

// export default CardList;
