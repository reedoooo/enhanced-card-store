import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Divider,
  Container,
  CardActions,
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TablePaginationActions from '../../reusable/TablePaginationActions';
import { useCollectionStore } from '../../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import Logger from '../../reusable/Logger';
import { useMode } from '../../../context';
// import useResponsiveStyles from '../../../context/hooks/style-hooks/useResponsiveStyles';
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
  PortfolioPaginationActionsTableRow,
  PortfolioPaginationActionsTableCell,
  PortfolioPaginationActionsTableContentsContainer,
} from '../../../context/hooks/style-hooks/usePortfolioStyles';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import GenericActionButtons from '../../buttons/actionButtons/GenericActionButtons';
const cardLogger = new Logger([
  'Action',
  'Card Name',
  'Quantity',
  'Total Price',
]);

const CardList = () => {
  const { theme } = useMode();
  // const [currentCard, setCurrentCard] = useState({});
  const {
    selectedCollection,
    getTotalPrice,
    removeOneFromCollection,
    addOneToCollection,
  } = useCollectionStore();
  const selectedCards = selectedCollection?.cards;
  // const card = useMemo(() => currentCard, [currentCard]);
  const cardCount = selectedCards?.length || 0;
  const {
    page,
    rowsPerPage,
    paginatedItems,
    emptyRows,
    handleChangePage,
    handleChangeRowsPerPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
  } = usePagination(selectedCards, 10);
  // const {
  //   // count: quantity,
  //   increment,
  //   decrement,
  // } = useCounter(card, 'Collection');
  // const { performAction, count } = useCardActions(
  //   'Collection',
  //   card,
  //   selectedCollection,
  //   addOneToCollection,
  //   removeOneFromCollection
  // );
  // const logQuantityChange = (action) => {
  //   console.log(
  //     `Action: ${action} - Card:`,
  //     card?.name,
  //     `Initial Quantity: ${card?.quantity}, New Quantity: ${}`
  //   );
  // };
  // const handleRemoveCard = (card) => {
  //   setCurrentCard(card);
  //   decrement();
  //   performAction('remove');
  //   logQuantityChange('Remove');
  // };
  // const handleAddCard = (card) => {
  //   setCurrentCard(card);
  //   increment();
  //   performAction('add');
  //   // logQuantityChange('Add');
  // };

  useEffect(() => {
    const updateRowsPerPage = () =>
      handleChangeRowsPerPage({
        target: { value: window.innerWidth > 960 ? 10 : 5 },
      });
    window.addEventListener('resize', updateRowsPerPage);
    // window.addEventListener('resize', updateColsPerPage);
    return () => window.removeEventListener('resize', updateRowsPerPage);
  }, []);

  const roundToNearestTenth = (value) => Math.round(value * 10) / 10;
  const isRtl = theme.direction === 'rtl';
  // Render functions
  const renderPortfolioTableHeader = () => {
    return (
      <PortfolioTableHeader theme={theme}>
        <PortfolioTableRow component="tr" theme={theme}>
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
        {paginatedItems?.map((card) => {
          if (!card) return;
          {
            /* console.log('Card: ', card); */
          }
          {
            /* const { performAction, count } = useCardActions(
            'Collection',
            card,
            selectedCollection,
            addOneToCollection,
            removeOneFromCollection
          );
          const handleUpdateQuantity = (card, action, quantity) => {
            if (!card) return;
            console.log(
              `Action: ${action} - Card:`,
              card?.name,
              `Initial Quantity: ${card?.quantity}, New Quantity: ${quantity}`
            );

            if (card) {
              action === 'add' ? performAction('add') : performAction('remove');
            }
          };
          if (Error) {
            console.log('Error: ', Error);
          } */
          }
          const renderCardActions = () => (
            <CardActions
              sx={{ justifyContent: 'center', padding: theme.spacing(0.5) }}
            >
              <GenericActionButtons
                card={card}
                context={'Collection'}
                page={'Collection'}
              />
            </CardActions>
          );
          return (
            <PortfolioTableRow component="tr" key={card.id} theme={theme}>
              <PortfolioTableCell scope="row" theme={theme}>
                {card?.name}
              </PortfolioTableCell>
              <PortfolioTableCell align="right" theme={theme}>
                {card?.price}
              </PortfolioTableCell>
              <PortfolioTableCell align="right" theme={theme}>
                {roundToNearestTenth(card.totalPrice)}
              </PortfolioTableCell>
              <PortfolioTableCell align="right" theme={theme}>
                {card?.quantity}
              </PortfolioTableCell>

              <PortfolioTableCell align="right" theme={theme}>
                {/* Action Buttons */}
                {renderCardActions()}
                {/* <Button
                  color="error"
                  onClick={() => handleUpdateQuantity(card, 'remove', count)}
                >
                  Remove
                </Button>
                <Divider orientation="vertical" flexItem />
                <Button
                  color="primary"
                  onClick={() => handleUpdateQuantity(card, 'add', count)}
                >
                  Add
                </Button> */}
              </PortfolioTableCell>
            </PortfolioTableRow>
          );
        })}
      </PortfolioTableBody>
    );
  };
  const renderPortfolioTableFooter = () => {
    return (
      <PortfolioTableFooter>
        <PortfolioPaginationActionsTableRow theme={theme}>
          {/* Set colSpan to the number of columns in the table */}
          <PortfolioPaginationActionsTableCell
            colSpan={5}
            align="right"
            theme={theme}
          >
            <PortfolioPaginationActionsTableContentsContainer theme={theme}>
              <IconButton
                onClick={goToFirstPage}
                disabled={page === 0}
                aria-label="first page"
              >
                {isRtl ? <LastPageIcon /> : <FirstPageIcon />}
              </IconButton>
              <IconButton
                onClick={goToPreviousPage}
                disabled={page === 0}
                aria-label="previous page"
              >
                {isRtl ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              </IconButton>
              <IconButton
                onClick={goToNextPage}
                disabled={page >= Math.ceil(cardCount / rowsPerPage) - 1}
                aria-label="next page"
              >
                {isRtl ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </IconButton>
              <IconButton
                onClick={goToLastPage}
                disabled={page >= Math.ceil(cardCount / rowsPerPage) - 1}
                aria-label="last page"
              >
                {isRtl ? <FirstPageIcon /> : <LastPageIcon />}
              </IconButton>
            </PortfolioPaginationActionsTableContentsContainer>
            {/* <TablePaginationActions
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              count={cardCount}
              paginatedItems={paginatedItems}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            /> */}
          </PortfolioPaginationActionsTableCell>
        </PortfolioPaginationActionsTableRow>
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
