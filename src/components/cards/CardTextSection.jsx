import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMode } from '../../../context';
import FlexBetween from '../../layout/REUSABLE_COMPONENTS/FlexBetween';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';

// Updated SimpleSectionHeader component with additional parameters
const CardTextSection = ({
  name,
  price,
  cartQuantity,
  collectionQuantity,
  deckQuantity,
  cardSet,
  setCode,
  cardRarity,
}) => {
  const { theme } = useMode();
  return (
    <Box
      sx={{
        margin: 'auto',
        maxWidth: 1200,
        padding: '20px',
        textAlign: 'center',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
      }}
    >
      {/* CARD TITLE SECTION: name */}
      <Typography level="title-lg" component="h1">
        {name}
      </Typography>
      {/* CARD TITLE SUBSECTION: set name, rarity, set code */}
      <Typography level="body-md" component="p">
        {`Set: ${cardSet}`}
        <Typography
          level="body-md"
          color="var(--joy-palette-success-plainColor)"
          fontFamily="monospace"
          sx={{ opacity: '50%' }}
        >
          {cardRarity}
        </Typography>
        <Typography
          level="body-md"
          color="var(--joy-palette-success-plainColor)"
          fontFamily="monospace"
          sx={{ opacity: '50%' }}
        >
          {setCode}
        </Typography>
      </Typography>
      {/* CARD TITLE SUBSECTION B: context quantities, price, price change */}
      <MDBox
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <FlexBetween
          sx={{
            flexDirection: 'column',
          }}
        >
          <Typography
            level="body-md"
            color="var(--joy-palette-success-plainColor)"
            fontFamily="monospace"
            sx={{ opacity: '50%' }}
          >
            {`Cart: ${cartQuantity}`}
          </Typography>
          <Typography
            level="body-md"
            color="var(--joy-palette-success-plainColor)"
            fontFamily="monospace"
            sx={{ opacity: '50%' }}
          >
            {`Collection: ${collectionQuantity}`}
          </Typography>
          <Typography
            level="body-md"
            color="var(--joy-palette-success-plainColor)"
            fontFamily="monospace"
            sx={{ opacity: '50%' }}
          >
            {`Deck: ${deckQuantity}`}
          </Typography>
        </FlexBetween>
        <FlexBetween
          sx={{
            flexDirection: 'column',
          }}
        >
          <Typography
            level="body-md"
            color="var(--joy-palette-success-plainColor)"
            fontFamily="monospace"
            sx={{ opacity: '50%' }}
          >
            {`Price: ${price}`}
            <Typography
              level="body-md"
              color="var(--joy-palette-success-plainColor)"
              fontFamily="monospace"
              sx={{ opacity: '50%' }}
            >
              {`Price Change: ${price}`}
            </Typography>
          </Typography>
        </FlexBetween>
      </MDBox>
    </Box>
  );
};

export default CardTextSection;
