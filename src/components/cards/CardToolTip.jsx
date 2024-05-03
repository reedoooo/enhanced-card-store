import React from 'react';
import PropTypes from 'prop-types';
import { useMode } from '../../context';
import { Box, Tooltip, Typography, Zoom, styled } from '@mui/material';
import rgba from '../../assets/themes/functions/rgba';
const formatKey = (key) =>
  key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
const StyledAttributeSpan = ({ theme, children }) => (
  <Typography
    variant="body2"
    sx={{
      display: 'block',
      marginBottom: theme.spacing(1),
      '& strong': {
        fontWeight: 'bold',
      },
    }}
  >
    {children}
  </Typography>
);
export const StyledTooltipTitle = styled('h4')(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  alignContent: 'flex-start',
  alignItems: 'flex-start',
}));
export const StyledDescriptionSpan = styled('span')(({ theme }) => ({
  display: 'block',
  marginTop: theme.spacing(1),
  flexGrow: 1,
}));
const createTooltipContent = (card) => {
  const { theme } = useMode();
  const attributes = {
    ...card.attributes,
    ...(card.desc && { Description: card.desc }),
    ...(card.set_code && { Set: card.set_code }),
    ...(card.rarity && { Rarity: card.rarity }),
    ...(card.set_price && { Price: card.set_price.value }),
    ...(card.id && { ID: card.id }),
    ...(card.tcgplayer_price && { TCGPlayer: card.tcgplayer_price.value }),
    ...(card.cardmarket_price && { Cardmarket: card.cardmarket_price.value }),
  };

  return (
    <Box
      theme={theme}
      sx={{
        boxShadow: theme.shadows[3],
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.newPalette.white.main}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(2),
        h: '100%',
        background: rgba(
          theme.palette.chartTheme.grey.lightest || 'white',
          0.85
        ),
        color: theme.palette.text.primary,
        alignContent: 'flex-start',
        '&::before': {
          content: '""',
          display: 'block',
        },
      }}
    >
      {Object.entries(attributes).map(([key, value]) => (
        <StyledAttributeSpan theme={theme} key={key}>
          <Typography variant="h6" component="span">
            <Typography variant="h5" component="span">
              <strong>{formatKey(key)}:</strong>{' '}
            </Typography>
            {value}
          </Typography>
        </StyledAttributeSpan>
      ))}
    </Box>
  );
};

const CardToolTip = ({ card }) => {
  const { theme } = useMode();
  return (
    <Tooltip
      TransitionComponent={Zoom}
      arrow
      title="Card"
      placement="right-end"
    >
      {createTooltipContent(card)}
    </Tooltip>
  );
};

CardToolTip.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string,
    desc: PropTypes.string,
    attributes: PropTypes.object,
    set_code: PropTypes.string,
    rarity: PropTypes.string,
    set_price: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tcgplayer_price: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    cardmarket_price: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};

export default CardToolTip;
