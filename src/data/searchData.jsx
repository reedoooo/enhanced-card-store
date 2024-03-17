import Icon from '@mui/material/Icon';
// Images
import MDTypography from '../MDTYPOGRAPHY/MDTypography';
import React from 'react';
import StoreItem from '../components/grids/gridItems/StoreItem';
import LoadingIndicator from '../../../components/reusable/indicators/LoadingIndicator';

export default function prepareTableData(selectedCards) {
  if (!selectedCards) return <LoadingIndicator />;
  // Helper function to round total price to the nearest tenth
  const roundToNearestTenth = (value) => Math.round(value * 10) / 10;

  // Define column structure for react-table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Card',
        accessor: 'card',
        id: 'card',
        Cell: ({ card, pageContext, index }) => (
          <StoreItem card={card} context={pageContext} index={index} />
        ),
      },
    ],
    []
  );

  // Map selectedCards to rows for react-table
  const data = React.useMemo(
    () =>
      selectedCards.map((card) => ({
        ...card,
        tPrice: roundToNearestTenth(card.totalPrice),
        action: '', // Assuming you have some action value or logic to insert here
      })),
    [selectedCards]
  );

  // You don't need to return PaginationComponent, page, and rowsPerPage anymore
  // since react-table handles pagination internally. You just need to provide data and columns.
  return { columns, data };
}
