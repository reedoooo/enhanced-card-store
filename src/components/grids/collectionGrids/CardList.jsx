import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Divider,
  Container,
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TablePaginationActions from '../../reusable/TablePaginationActions';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import Logger from '../../reusable/Logger';
import { useMode } from '../../../context';
import useResponsiveStyles from '../../../context/hooks/style-hooks/useResponsiveStyles';
import usePagination from '../../../context/hooks/usePagination';
import {
  PortfolioTableHeader,
  PortfolioTableBody,
  PortfolioTableFooter,
  PortfolioTableCell,
  PortfolioTableRow,
  PortfolioTableContainer,
  PortfolioTable,
  PortfolioTablePaper,
} from '../../../context/hooks/style-hooks/usePortfolioStyles';

const cardLogger = new Logger([
  'Action',
  'Card Name',
  'Quantity',
  'Total Price',
]);

const CardList = () => {
  const { theme } = useMode();

  const {
    selectedCollection,
    getTotalPrice,
    removeOneFromCollection,
    addOneToCollection,
  } = useCollectionStore();

  const { isMedium, isLarge, isMediumExtraLarge } = useResponsiveStyles(theme);
  const selectedCards = selectedCollection?.cards;
  const count = selectedCards?.length || 0;
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedItems,
    // setRowsPerPage,
    emptyRows,
  } = usePagination(selectedCards, 10);
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
      // setRowsPerPage(window.innerWidth > 960 ? 10 : 5);
      handleChangeRowsPerPage({
        target: { value: window.innerWidth > 960 ? 10 : 5 },
      });
    window.addEventListener('resize', updateRowsPerPage);
    return () => window.removeEventListener('resize', updateRowsPerPage);
  }, []);

  // Helper function to round the total price to the nearest tenth
  const roundToNearestTenth = (value) => Math.round(value * 10) / 10;

  // Render functions
  const renderPortfolioTableHeader = () => {
    return (
      <PortfolioTableHeader theme={theme}>
        <PortfolioTableRow theme={theme}>
          <PortfolioTableCell theme={theme}>Name</PortfolioTableCell>
          <PortfolioTableCell align="right" theme={theme}>
            Price
          </PortfolioTableCell>
          <PortfolioTableCell align="right" theme={theme}>
            Total Price
          </PortfolioTableCell>
          <PortfolioTableCell align="right" theme={theme}>
            Quantity
          </PortfolioTableCell>
          <PortfolioTableCell align="right" theme={theme}>
            Actions
          </PortfolioTableCell>
        </PortfolioTableRow>
      </PortfolioTableHeader>
    );
  };

  const renderPortfolioTableBody = () => {
    return (
      <PortfolioTableBody theme={theme}>
        {(rowsPerPage > 0
          ? selectedCollection.cards?.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
          : selectedCollection.cards
        )?.map((card) => (
          <PortfolioTableRow key={card.id} theme={theme}>
            <PortfolioTableCell component="th" scope="row" theme={theme}>
              {card.name}
            </PortfolioTableCell>
            <PortfolioTableCell align="right" theme={theme}>
              {card.price}
            </PortfolioTableCell>
            <PortfolioTableCell align="right" theme={theme}>
              {roundToNearestTenth(card.totalPrice)}
            </PortfolioTableCell>
            <PortfolioTableCell align="right" theme={theme}>
              {card.quantity}
            </PortfolioTableCell>
            <PortfolioTableCell align="right" theme={theme}>
              {/* Action Buttons */}
              <Button color="error" onClick={() => handleRemoveCard(card)}>
                Remove
              </Button>
              <Divider orientation="vertical" flexItem />
              <Button color="primary" onClick={() => handleAddCard(card)}>
                Add
              </Button>
            </PortfolioTableCell>
          </PortfolioTableRow>
        ))}
      </PortfolioTableBody>
    );
  };

  const renderPortfolioTableFooter = () => {
    return (
      <PortfolioTableFooter theme={theme}>
        <PortfolioTableRow theme={theme}>
          <TablePaginationActions
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            colSpan={5}
            count={selectedCollection.cards?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
            theme={theme}
          />
        </PortfolioTableRow>
      </PortfolioTableFooter>
    );
  };

  const renderTotalPriceBox = () => {
    const renderTotalPrice = () => {
      return (
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.backgroundA.light,
            width: '100%',
            marginLeft: 'auto',
          }}
        >
          {`$${roundToNearestTenth(getTotalPrice())}`}
        </Typography>
      );
    };
    return (
      <Box
        display="flex"
        justifyContent="flex-end"
        mt={2}
        sx={{ width: '100%', flexDirection: 'row', borderRadius: '5px' }}
        theme={theme}
      >
        <Typography variant="h5" sx={{ width: '100%', marginLeft: '70%' }}>
          Total:
        </Typography>
        {renderTotalPrice()}
      </Box>
    );
  };

  return (
    <PortfolioTablePaper theme={theme}>
      <PortfolioTableContainer component={Container} theme={theme}>
        <PortfolioTable aria-label="custom pagination table" theme={theme}>
          {renderPortfolioTableHeader()}
          {renderPortfolioTableBody()}
          {renderPortfolioTableFooter()}
        </PortfolioTable>
      </PortfolioTableContainer>
      {renderTotalPriceBox()}
    </PortfolioTablePaper>
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
//       <CardListPortfolioTable
//         theme={theme}
//         selectedCards={selectedCards}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         handleChangePage={handleChangePage}
//         handleChangeRowsPerPage={handleChangeRowsPerPage}
//         handleRemoveCard={handleRemoveCard}
//         handleAddCard={handleAddCard}
//         emptyRows={emptyRows}
//         StyledPortfolioTableHeader={StyledPortfolioTableHeader}
//         StyledPortfolioTableCell={StyledPortfolioTableCell}
//         StyledButtonGroup={StyledButtonGroup}
//         count={count}
//       />
//       <TotalPriceBox totalPrice={getTotalPrice()} />
//     </StyledContainer>
//   );
// };

// const CardListPortfolioTable = ({
//   selectedCards,
//   rowsPerPage,
//   page,
//   handleChangePage,
//   handleChangeRowsPerPage,
//   handleRemoveCard,
//   handleAddCard,
//   emptyRows,
//   StyledPortfolioTableHeader,
//   StyledPortfolioTableCell,
//   count,
//   StyledButtonGroup,
// }) => {
//   const { theme } = useMode();

//   return (
//     <PortfolioTableContainer
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
//       <PortfolioTable
//         aria-label="custom pagination table"
//         sx={{
//           width: '100%',

//           maxWidth: '100%',
//         }}
//       >
//         <StyledPortfolioTableHeader theme={theme}>
//           <PortfolioTableRow>
//             <StyledPortfolioTableCell>Name</StyledPortfolioTableCell>
//             <StyledPortfolioTableCell align="right">Price</StyledPortfolioTableCell>
//             <StyledPortfolioTableCell align="right">Total Price</StyledPortfolioTableCell>
//             <StyledPortfolioTableCell align="right">Quantity</StyledPortfolioTableCell>
//             {/* <StyledPortfolioTableCell align="right">TCGPlayer Price</StyledPortfolioTableCell> */}
//             <StyledPortfolioTableCell align="right">Actions</StyledPortfolioTableCell>
//           </PortfolioTableRow>
//         </StyledPortfolioTableHeader>

//         <PortfolioTableBody>
//           {(rowsPerPage > 0
//             ? selectedCards?.slice(
//                 page * rowsPerPage,
//                 page * rowsPerPage + rowsPerPage
//               )
//             : selectedCards
//           )?.map((card, index) => (
//             <PortfolioTableRow key={card.id || index}>
//               <StyledPortfolioTableCell component="th" scope="row">
//                 {card?.name}
//               </StyledPortfolioTableCell>
//               <StyledPortfolioTableCell align="right">{card?.price}</StyledPortfolioTableCell>
//               <StyledPortfolioTableCell align="right">
//                 {card?.totalPrice}
//               </StyledPortfolioTableCell>
//               <StyledPortfolioTableCell align="right">{card?.quantity}</StyledPortfolioTableCell>

//               <StyledPortfolioTableCell align="right">
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
//               </StyledPortfolioTableCell>
//             </PortfolioTableRow>
//           ))}

//           {emptyRows > 0 && (
//             <PortfolioTableRow style={{ height: 53 * emptyRows }}>
//               <StyledPortfolioTableCell theme={theme} colSpan={6} />
//             </PortfolioTableRow>
//           )}
//         </PortfolioTableBody>

//         <PortfolioTableFooter>
//           <PortfolioTableRow>
//             <PortfolioTablePagination
//               rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//               colSpan={6}
//               count={count}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               color={theme.palette.backgroundA.dark}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               ActionsComponent={PortfolioTablePaginationActions}
//             />
//           </PortfolioTableRow>
//         </PortfolioTableFooter>
//       </PortfolioTable>
//     </PortfolioTableContainer>
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
