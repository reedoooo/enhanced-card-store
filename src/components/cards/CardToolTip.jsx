import React from 'react';
import PropTypes from 'prop-types';
import { useMode } from '../../context';
import { Box, Tooltip, Typography, Zoom } from '@mui/material';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import styled from 'styled-components';
export const StyledToolTipBox = styled(Box)(({ theme }) => ({
  width: 'auto',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.backgroundA.lightest,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[3],
  alignContent: 'flex-start',
  alignItems: 'flex-start',
  height: '100%',
  maxWidth: 220,
  position: 'relative',
  '&::before': {
    content: '""',
    display: 'block',
    paddingTop: '100%',
  },
  '& > img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));
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

const createTooltip = (card, theme) => {
  const cardAttributes = {
    ...card.attributes,
    ...(card.desc && { Description: card.desc }), // Add description as a key-value pair if it exists
    ...(card.set_code && { Set: card.set_code }),
    ...(card.rarity && { Rarity: card.rarity }),
    ...(card.set_price && { Price: card.set_price.value }),
    ...(card.id && { ID: card.id }),
    ...(card.tcgplayer_price && { TCGPlayer: card.tcgplayer_price.value }),
    ...(card.cardmarket_price && { Cardmarket: card.cardmarket_price.value }),
  };

  return (
    <MDBox
      theme={theme}
      sx={{
        boxShadow: theme.shadows[3],
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        // w: 'auto',
        // h: '100%',
        bgColor: theme.palette.backgroundC.lightest,
        // p: theme.spacing(2),
        color: theme.palette.text.primary,
        alignContent: 'flex-start',
        '&::before': {
          content: '""',
          display: 'block',
          paddingTop: '100%',
        },
        '& > img': {
          position: 'absolute',
          top: 0,
          left: 0,
          w: '100%',
          h: '100%',
          objectFit: 'cover',
        },
      }}
    >
      {Object.entries(cardAttributes).map(([key, value]) => (
        <StyledAttributeSpan theme={theme} key={key}>
          <strong>{formatKey(key)}:</strong> {value}
        </StyledAttributeSpan>
      ))}
    </MDBox>
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
      <StyledToolTipBox theme={theme}>
        {createTooltip(card, theme)}
      </StyledToolTipBox>
    </Tooltip>
  );
};

// const SingleCardToolTip = ({ card }) => {
//   // if (Array.isArray(card)) {
//   //   return card.map((card) => <CardToolTip card={card} />);
//   // }
//   const { theme } = useMode();
//   const {
//     name,
//     desc,
//     attributes,
//     set_code,
//     rarity,
//     set_price,
//     id,
//     tcgplayer_price,
//   } = card;

//   const price = set_price?.value || 'N/A';
//   const tcgPrice = tcgplayer_price?.value || 'N/A';
//   return (
//     <StyledTooltip arrow title="Card" placement="right-end">
//       <StyledToolTipBox theme={theme}>
//         <MDBox
//           theme={theme}
//           sx={{
//             boxShadow: theme.shadows[3],
//             borderRadius: theme.shape.borderRadius,
//             border: `1px solid ${theme.palette.divider}`,
//             w: 'auto',
//             h: '100%',
//             bgColor: theme.palette.backgroundC.lightest,
//             p: theme.spacing(2),
//             color: theme.palette.text.primary,
//             alignContent: 'flex-start',
//             alignItems: 'flex-start',
//             maxWidth: 220,
//             position: 'relative',
//             '&::before': {
//               content: '""',
//               display: 'block',
//               paddingTop: '100%',
//             },
//             '& > img': {
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               w: '100%',
//               h: '100%',
//               objectFit: 'cover',
//             },
//           }}
//         >
//           {attributes &&
//             Object.entries(attributes).map(([key, value]) => (
//               <StyledAttributeSpan theme={theme} key={key}>
//                 <strong>{formatKey(key)}:</strong> {value}
//               </StyledAttributeSpan>
//             ))}
//           {desc && (
//             <StyledDescriptionSpan theme={theme}>
//               <strong>Description:</strong> {desc}
//             </StyledDescriptionSpan>
//           )}
//         </MDBox>
//       </StyledToolTipBox>
//     </StyledTooltip>
//   );
// };
// const CardToolTip = ({ card }) => {
//   if (Array.isArray(card)) {
//     return (
//       <div>
//         {card.map((singleCard, index) => (
//           <SingleCardToolTip key={index} card={singleCard} />
//         ))}
//       </div>
//     );
//   }
//   return <SingleCardToolTip card={card} />;
// };
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
