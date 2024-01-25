import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledAttributeSpan,
  StyledDescriptionSpan,
  StyledToolTipBox,
  StyledTooltip,
  StyledTooltipTitle,
} from './styles/cardStyles';
import { useMode } from '../../context';
import { Box } from '@mui/material';

const formatKey = (key) => {
  return key
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const SingleCardToolTip = ({ card }) => {
  // if (Array.isArray(card)) {
  //   return card.map((card) => <CardToolTip card={card} />);
  // }
  const { theme } = useMode();
  const {
    name,
    desc,
    attributes,
    set_name,
    set_code,
    set_rarity,
    set_rarity_code,
    set_price,
    id,
    // image_url,
    // image_url_small,
    // image_url_cropped,
    cardmarket_price,
    tcgplayer_price,
    cardkingdom_price,
    cardhoarder_price,
  } = card;

  // Conditional handling for prices
  const price = set_price?.value || 'N/A';
  const cmPrice = cardmarket_price?.value || 'N/A';
  const tcgPrice = tcgplayer_price?.value || 'N/A';
  const ckPrice = cardkingdom_price?.value || 'N/A';
  const chPrice = cardhoarder_price?.value || 'N/A';

  // Ensure safe rendering for URLs
  // const imageUrl = image_url || '';
  // const imageUrlSmall = image_url_small || '';
  // const imageUrlCropped = image_url_cropped || '';
  return (
    <StyledTooltip
      // title={
      //   <>
      //     <img
      //       src={image_url}
      //       alt={`${set_name} art`}
      //       style={{ width: '100px' }}
      //     />
      //     <p>{`Set: ${set_name} (${set_code})`}</p>
      //     <p>{`Rarity: ${set_rarity} (${set_rarity_code})`}</p>
      //     <p>{`Price: ${set_price?.value || 'N/A'}`}</p>
      //     <p>{`Cardmarket Price: ${cardmarket_price?.value || 'N/A'}`}</p>
      //     <p>{`TCGPlayer Price: ${tcgplayer_price?.value || 'N/A'}`}</p>
      //     <p>{`Card Kingdom Price: ${cardkingdom_price?.value || 'N/A'}`}</p>
      //     <p>{`Cardhoarder Price: ${cardhoarder_price?.value || 'N/A'}`}</p>
      //   </>
      // }
      arrow
      title="Card"
      placement="right-end"
    >
      <StyledToolTipBox theme={theme}>
        {name && <StyledTooltipTitle theme={theme}>{name}</StyledTooltipTitle>}
        {attributes &&
          Object.entries(attributes).map(([key, value]) => (
            <StyledAttributeSpan theme={theme} key={key}>
              <strong>{formatKey(key)}:</strong> {value}
            </StyledAttributeSpan>
          ))}
        {desc && (
          <StyledDescriptionSpan theme={theme}>
            <strong>Description:</strong> {desc}
          </StyledDescriptionSpan>
        )}
      </StyledToolTipBox>
    </StyledTooltip>
  );
};
const CardToolTip = ({ card }) => {
  if (Array.isArray(card)) {
    return (
      <div>
        {card.map((singleCard, index) => (
          <SingleCardToolTip key={index} card={singleCard} />
        ))}
      </div>
    );
  }
  return <SingleCardToolTip card={card} />;
};
CardToolTip.propTypes = {
  card: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        desc: PropTypes.string,
        attributes: PropTypes.object,
        set_name: PropTypes.string,
        set_code: PropTypes.string,
        set_rarity: PropTypes.string,
        set_rarity_code: PropTypes.string,
        set_price: PropTypes.object,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        cardmarket_price: PropTypes.object,
        tcgplayer_price: PropTypes.object,
        cardkingdom_price: PropTypes.object,
        cardhoarder_price: PropTypes.object,
      })
    ),
    PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string,
      attributes: PropTypes.object,
      set_name: PropTypes.string,
      set_code: PropTypes.string,
      set_rarity: PropTypes.string,
      set_rarity_code: PropTypes.string,
      set_price: PropTypes.object,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      cardmarket_price: PropTypes.object,
      tcgplayer_price: PropTypes.object,
      cardkingdom_price: PropTypes.object,
      cardhoarder_price: PropTypes.object,
    }),
  ]).isRequired,
};

export default CardToolTip;
