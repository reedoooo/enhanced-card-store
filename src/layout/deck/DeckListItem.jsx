/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Collapse,
  Grow,
} from '@mui/material';
import GenericCard from 'layout/cards/GenericCard';

import { roundToNearestTenth } from 'context/Helpers';

import {
  MDBox,
  RCDynamicForm,
  RCInfoItem,
  RCWrappedIcon,
  SkeletonCard,
} from 'layout/REUSABLE_COMPONENTS';

import { DeckBuilderIcon, formFields } from 'data';

import { useMode, useBreakpoint } from 'context';

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
function prepareDeckData(deck, cards) {
  let tags = [];
  deck?.tags?.forEach((tag) => {
    tags?.push(tag.label);
  });
  const infoItems = [
    { label: 'Name', value: deck?.name },
    {
      label: 'Value',
      value: `$${roundToNearestTenth(deck?.totalPrice)}`,
    },
    { label: 'Cards', value: `${deck?.totalQuantity}` },
    {
      label: 'Tags',
      value: tags.join(', '),
    },
  ];
  return {
    infoItems,
  };
}

const DeckListItem = ({
  deck,
  handleSelectAndShowDeck,
  isEditPanelOpen,
  handleDelete,
  isLoading,
  updateDeckDetails,
}) => {
  const [cards, setCards] = useState([]);
  const [infoItems, setInfoItems] = useState([]);
  const [cardLoading, setCardLoading] = useState(false);
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'selectedDeck' && event.newValue) {
        setCards(JSON.parse(event.newValue)?.cards);
        setInfoItems(
          prepareDeckData(deck, JSON.parse(event.newValue)?.cards)?.infoItems
        );
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [deck, setCards, setInfoItems]);
  const calculateTimeout = (index) => index * 400; // Adjust this value for faster or slower animations
  const { theme } = useMode();
  const { isMobile } = useBreakpoint();
  return (
    <Collapse in={true} timeout={1000}>
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
                  <MDBox border="none">
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
                        key={item.label + item.value}
                        label={item.label || ''}
                        value={item.value || ''}
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
        {!isEditPanelOpen && ( // Only render the edit panel if the current deck is selected
          <Collapse in={!isEditPanelOpen}>
            <MDBox
              sx={{
                margin: isMobile ? theme.spacing(1) : theme.spacing(3),
                border: 'none',
              }}
            >
              <RCDynamicForm
                formKey={'updateDeckForm'}
                inputs={formFields['updateDeckForm']}
                userInterfaceOptions={{
                  submitButton: true,
                  submitButtonLabel: 'Update Deck',
                  updateActions: {
                    handleSubmit: (data) => updateDeckDetails(data),
                  },
                  deleteButton: true,
                  deleteButtonLabel: 'Delete Deck',
                  deleteActions: {
                    handleDelete: () => handleDelete(deck),
                  },
                }}
                initialData={{
                  name: deck?.name || '',
                  description: deck?.description || '',
                  tags: deck?.tags || [],
                  color: deck?.color || '',
                }}
              />
            </MDBox>
            <MDBox
              sx={{ margin: isMobile ? theme.spacing(1) : theme.spacing(3) }}
            >
              <Card>
                <Grid container spacing={2}>
                  {cardLoading
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <Grid item xs={6} sm={4} md={4} key={index}>
                          <SkeletonCard />
                        </Grid>
                      ))
                    : cards?.map((card, index) => (
                        <Grid
                          item
                          key={`${card.id}-${index}`}
                          className="card-deck-grid-item"
                        >
                          <Grow
                            in={true}
                            style={{ transformOrigin: '0 0 0' }}
                            timeout={calculateTimeout(index)}
                          >
                            <MDBox className="card-group-flex-item">
                              {Array.from({
                                length: Math.min(3, card.quantity || 1),
                              }).map((_, quantityIndex) => (
                                <GenericCard
                                  key={`${card._id}-${index}-${quantityIndex}`}
                                  cardClasses="card-deck"
                                  card={card}
                                  context={'deck'}
                                  page={'deck'}
                                  isDeckCard={true}
                                />
                              ))}
                            </MDBox>
                          </Grow>
                        </Grid>
                      ))}
                </Grid>
              </Card>
            </MDBox>
          </Collapse>
        )}
      </Card>
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
};

export default DeckListItem;
