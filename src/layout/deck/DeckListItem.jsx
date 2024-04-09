/* eslint-disable max-len */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Collapse,
  useMediaQuery,
  Box,
} from '@mui/material';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import DeckBuilderIcon from '../REUSABLE_COMPONENTS/icons/DeckBuilderIcon';
import RCInfoItem from '../REUSABLE_COMPONENTS/RCInfoItem';
import RCWrappedIcon from '../REUSABLE_COMPONENTS/RCWRAPPEDICON/RCWrappedIcon';
import { roundToNearestTenth } from '../../context/Helpers';
import { useMode } from '../../context';
import GenericCard from '../../components/cards/GenericCard';
import { formFields } from '../../components/forms/formsConfig';
import RCDynamicForm from '../../components/forms/Factory/RCDynamicForm';
import useInitialFormData from '../../components/forms/hooks/useInitialFormData';
import useBreakpoint from '../../context/hooks/useBreakPoint';

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
      <RCInfoItem
        label={label}
        value={value}
        theme={theme}
        gridSizes={{ xs: 4, sm: 3, md: 3 }}
      />
    </Collapse>
  );
};
const DeckListItem = ({
  deck,
  deckData,
  cards,
  handleSelectAndShowDeck,
  isEditPanelOpen,
}) => {
  const { theme } = useMode();
  const { isMobile } = useBreakpoint();
  const formKey = 'updateDeckForm';
  const initialFormData = useInitialFormData(
    isEditPanelOpen,
    formFields[formKey],
    deckData
  );

  const infoItems = [
    { label: 'Name', value: deck?.name },
    { label: 'Value', value: `$${roundToNearestTenth(deck?.totalPrice)}` },
    { label: 'Cards', value: `${deck?.totalQuantity}` },
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
              justifyContent: 'flex-start',
              height: '100%',
              minHeight: '4rem',
              flexGrow: 1,
            }}
          >
            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-start"
              flexGrow={1}
              spacing={2}
            >
              <Grid item xs={12} sm={12} md={2}>
                <MDBox>
                  <RCWrappedIcon
                    sx={{
                      background: theme.palette.success.main,
                    }}
                  >
                    <DeckBuilderIcon iconColor={'white'} />
                  </RCWrappedIcon>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Grid
                  container
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  flexDirection={'row'}
                  flexGrow={1}
                  spacing={2}
                >
                  {infoItems?.map((item, index) => (
                    <AnimatedInfoItem
                      key={item.label}
                      label={item.label}
                      value={item.value}
                      theme={theme}
                      delay={index * 200} // Adjust delay as needed
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </MDBox>
      <Collapse in={isEditPanelOpen}>
        <MDBox sx={{ margin: isMobile ? theme.spacing(1) : theme.spacing(3) }}>
          <RCDynamicForm
            formKey={formKey}
            inputs={formFields[formKey]}
            // upatedData={deckData}
            initialData={deckData}
          />
        </MDBox>
      </Collapse>
      <Collapse in={isEditPanelOpen}>
        <MDBox sx={{ margin: isMobile ? theme.spacing(1) : theme.spacing(3) }}>
          <Card>
            <Grid container spacing={2}>
              {cards &&
                cards.length > 0 &&
                cards.map((card, index) => (
                  <Grid
                    item
                    key={`${card.id}-${index}`}
                    className="card-deck-grid-item"
                  >
                    <MDBox className="card-group-flex-item">
                      {Array.from({
                        length: Math.min(3, card.quantity || 1),
                      }).map((_, quantityIndex) => (
                        <GenericCard
                          key={`${card._id}-${index}-${quantityIndex}`}
                          cardClasses="card-deck"
                          // cardClasses={`base-card-quantity-index-${quantityIndex}`}
                          card={card}
                          initialIndex={index}
                          quantityIndex={quantityIndex}
                          isDeckCard={true}
                        />
                      ))}
                    </MDBox>
                  </Grid>
                ))}
            </Grid>
          </Card>
        </MDBox>
      </Collapse>
    </Card>
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
  deckData: PropTypes.shape({
    // Corrected from shapeOf to shape
    name: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    color: PropTypes.string,
  }),
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditPanelOpen: PropTypes.bool.isRequired,
  handleSelectAndShowDeck: PropTypes.func.isRequired,
};

export default DeckListItem;
