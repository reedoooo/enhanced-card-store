import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Container,
  CardActions,
} from '@mui/material';
import { useCollectionStore } from '../../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import Logger from '../../reusable/Logger';
import { useMode } from '../../../context';
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

const CardList = () => {
  const { theme } = useMode();
  const { selectedCollection, getTotalPrice } = useCollectionStore();
  const selectedCards = selectedCollection?.cards;
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
  } = usePagination(selectedCards, 10, selectedCards?.length || 0);
  useEffect(() => {
    const updateRowsPerPage = () =>
      handleChangeRowsPerPage({
        target: { value: window.innerWidth > 960 ? 10 : 5 },
      });
    window.addEventListener('resize', updateRowsPerPage);
    return () => window.removeEventListener('resize', updateRowsPerPage);
  }, []);

  const roundToNearestTenth = (value) => Math.round(value * 10) / 10;
  const isRtl = theme.direction === 'rtl';
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
                {renderCardActions()}
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
