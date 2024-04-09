import Icon from '@mui/material/Icon';
// Images
import MDTypography from '../MDTYPOGRAPHY/MDTypography';
import React, { memo } from 'react';
import LoadingIndicator from '../../../components/reusable/indicators/LoadingIndicator';
import GenericCard from '../components/cards/GenericCard';
import { Container } from '@mui/system';
import { Box } from '@mui/material';
import { roundToNearestTenth } from '../context/Helpers';
const SearchItem = memo(({ card, context, page, index }) => {
  return (
    <Box
      sx={{
        marginBottom: '1rem',
        flexGrow: '1',
        maxHeight: '85%',
        minHeight: '85%',
      }}
    >
      <Container
        sx={{
          '&.MuiContainer-root': {
            padding: '0 !important',
            margin: '0',
            width: '100%',
            height: '100%',
            flexGrow: '1',
            display: 'flex',
          },
        }}
      >
        <GenericCard
          card={card}
          page={page}
          index={index}
          context={context}
          cardClasses="search-card base-card-no-quantity"
        />
      </Container>
    </Box>
  );
});

SearchItem.displayName = 'SearchItem';

export default function prepareTableData(selectedCards) {
  if (!selectedCards) return <LoadingIndicator />;
  const columns = React.useMemo(
    () => [
      {
        Header: 'Card',
        accessor: 'card',
        id: 'card',
        Cell: ({ card, pageContext, index }) => (
          <SearchItem card={card} context={pageContext} index={index} />
        ),
      },
    ],
    []
  );
  const data = React.useMemo(
    () =>
      selectedCards.map((card) => ({
        ...card,
        tPrice: roundToNearestTenth(card.totalPrice),
        action: '', // Assuming you have some action value or logic to insert here
      })),
    [selectedCards]
  );
  return { columns, data };
}
