// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   Chip,
//   Collapse,
//   Grid,
//   Typography,
//   useMediaQuery,
// } from '@mui/material';
// import { memo, useCallback, useEffect, useRef, useState } from 'react';
// import { useFormContext, useMode } from '../../context';
// import useDeckManager from '../../context/MAIN_CONTEXT/DeckContext/useDeckManager';
// import useSelectedDeck from '../../context/MAIN_CONTEXT/DeckContext/useSelectedDeck';
// import useDialogState from '../../context/hooks/useDialogState';
// import PropTypes from 'prop-types';
// import DeckBuilderIcon from '../REUSABLE_COMPONENTS/icons/DeckBuilderIcon';
// import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
// import DeckEditor from './DeckEditor';
// import MDTypography from '../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
// import useGridItems from '../../context/hooks/useGridItems';
// import useLocalStorage from '../../context/hooks/useLocalStorage';
// import { useLoading } from '../../context/hooks/useLoading';
// import { defaultValues } from '../../context/simplified_constants';
// import RCWrappedIcon from '../REUSABLE_COMPONENTS/RCWRAPPEDICON/RCWrappedIcon';
// import RCInfoItem from '../REUSABLE_COMPONENTS/RCInfoItem';
// import { roundToNearestTenth } from '../../context/Helpers';

// const DeckListItem = ({
//   deck,
//   cards,
//   handleSelectAndShowDeck,
//   isEditPanelOpen,
// }) => {
//   const { theme } = useMode();
//   const { deleteDeck, hasFetchedDecks } = useDeckManager();
//   const { handleSelectDeck, allDecks, deckHasBeenSelected } = useSelectedDeck();
//   const { isLoading } = useLoading();
//   const pageContext = 'Deck'; // Context to pass to GenericCard
//   const cardDisplay = useGridItems({
//     itemsPerPage: 8, // Define as per your requirement
//     cards: cards,
//     isLoading: isLoading('fetchDecks'), // Pass the actual loading state
//     hasFetched: hasFetchedDecks, // Pass the actual loading state
//     allItems: allDecks, // Pass the actual loading state
//     validSelection: deckHasBeenSelected,
//     type: 'deck',
//     pageContext,
//     deckId: deck?._id,
//   });
//   const handleSelection = useCallback(
//     (deck) => {
//       console.log('Deck Selected:', deck);
//       // handleSelectDeck(deck);
//       handleSelectAndShowDeck(deck);
//     },
//     [handleSelectAndShowDeck]
//   );

//   return (
//     <Card>
//       <MDBox
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'center',
//           height: '100%',
//         }}
//       >
//         <CardActionArea
//           onClick={() => handleSelection(deck)}
//           sx={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'center',
//             flexGrow: 1,
//           }}
//         >
//           <CardContent
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               height: '100%',
//               minHeight: '8rem',
//             }}
//           >
//             <RCWrappedIcon>
//               <DeckBuilderIcon style={{ fontSize: 20, color: 'white' }} />
//             </RCWrappedIcon>
//           </CardContent>
//           <Grid container alignItems="center" justify="center" spacing={2}>
//             <RCInfoItem
//               label="Name"
//               value={deck?.name}
//               theme={theme}
//               gridSizes={{ xs: 4, sm: 4, md: 3 }}
//             />
//             <RCInfoItem
//               label="Value"
//               value={`$${roundToNearestTenth(deck?.totalPrice)}`}
//               theme={theme}
//               gridSizes={{ xs: 4, sm: 4, md: 3 }}
//             />
//             <RCInfoItem
//               label="Cards"
//               value={deck?.totalQuantity}
//               theme={theme}
//               gridSizes={{ xs: 4, sm: 4, md: 3 }}
//             />
//           </Grid>
//         </CardActionArea>
//       </MDBox>
//       <Collapse in={isEditPanelOpen}>
//         <DeckEditor deck={deck} onClose={() => handleSelection(deck)} />
//         {isEditPanelOpen && cardDisplay}
//         {/* <Collapse in={true}>{renderCardDisplayOnUpdate()}</Collapse> */}
//       </Collapse>
//       {/* {isEditPanelOpen && cardDisplay} */}
//     </Card>
//   );
// };

// DeckListItem.displayName = 'DeckListItem';

// DeckListItem.propTypes = {
//   deck: PropTypes.object.isRequired,
//   isEditPanelOpen: PropTypes.bool.isRequired,
//   onToggleEditPanel: PropTypes.func.isRequired,
// };

// export default DeckListItem;
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Collapse,
} from '@mui/material';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import DeckBuilderIcon from '../REUSABLE_COMPONENTS/icons/DeckBuilderIcon';
import RCInfoItem from '../REUSABLE_COMPONENTS/RCInfoItem';
import DeckEditor from './DeckEditor';
import RCWrappedIcon from '../REUSABLE_COMPONENTS/RCWRAPPEDICON/RCWrappedIcon';
import { roundToNearestTenth } from '../../context/Helpers';
import { useMode } from '../../context';

const DeckListItem = ({
  deck,
  cards,
  handleSelectAndShowDeck,
  isEditPanelOpen,
}) => {
  const { theme } = useMode();
  const infoItems = [
    { label: 'Name', value: deck?.name },
    { label: 'Value', value: `$${roundToNearestTenth(deck?.totalPrice)}` },
    { label: 'Cards', value: deck?.totalQuantity },
  ];

  return (
    <Card>
      <MDBox
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <CardActionArea
          onClick={() => handleSelectAndShowDeck(deck)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexGrow: 1,
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              minHeight: '8rem',
            }}
          >
            <RCWrappedIcon>
              <DeckBuilderIcon style={{ fontSize: 20, color: 'white' }} />
            </RCWrappedIcon>
          </CardContent>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            {infoItems.map((item, index) => (
              <AnimatedInfoItem
                key={item.label}
                label={item.label}
                value={item.value}
                theme={theme}
                delay={index * 200} // Adjust delay as needed
              />
            ))}
          </Grid>
        </CardActionArea>
      </MDBox>
      <Collapse in={isEditPanelOpen}>
        <DeckEditor deck={deck} onClose={() => handleSelectAndShowDeck(deck)} />
      </Collapse>
    </Card>
  );
};

const AnimatedInfoItem = ({ label, value, theme, delay }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecked(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Collapse
      in={checked}
      timeout={1000} // Adjust timeout as needed for the animation duration
    >
      <RCInfoItem label={label} value={value} theme={theme} />
    </Collapse>
  );
};

AnimatedInfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  delay: PropTypes.number.isRequired,
};

DeckListItem.propTypes = {
  deck: PropTypes.object.isRequired,
  isEditPanelOpen: PropTypes.bool.isRequired,
  handleSelectAndShowDeck: PropTypes.func.isRequired,
};

export default DeckListItem;
