import React from 'react';
import { Grid } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useMode } from 'context';
import {
  StyledContainerBox,
  StyledPaper,
} from '../REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import { Box, CardActions, CardContent, CardHeader } from '@mui/material';
import { useSpring, animated as a, animated } from 'react-spring';
import RCButton from 'layout/REUSABLE_COMPONENTS/RCBUTTON';
import useDialogState from 'context/hooks/useDialogState';
import featureCardData from 'data/json-data/featureCardData.json'; // Adjust the path as necessary
import {
  CardListItem,
  CardUnorderedList,
  FeatureCard,
} from '../REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import DetailsModal from 'components/dialogs/DetailsModal';
const AnimatedBox = animated(Box);

export const AnimatedFeatureCard = ({ cardData }) => {
  const { theme } = useMode();
  const { dialogState, openDialog, closeDialog } = useDialogState();
  const handleOpenModal = (itemTitle) => {
    const selectedItem = featureCardData.find(
      (item) => item.title === itemTitle
    );
    if (selectedItem) {
      openDialog('isDetailsDialogOpen');
    }
  };
  const handleCloseDialog = () => {
    closeDialog('isDetailsDialogOpen');
  };
  const [tiltAnimation, api] = useSpring(() => ({
    transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
  }));

  const handleMouseEnter = () =>
    api.start({
      transform: 'perspective(600px) rotateX(5deg) rotateY(5deg) scale(1.05)',
    });
  const handleMouseLeave = () =>
    api.start({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
    });
  return (
    <AnimatedBox
      style={tiltAnimation}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flexGrow: 1,
        height: '100%',
        width: '100%',
      }}
    >
      <FeatureCard
        theme={theme}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <CardHeader
          title={cardData.title}
          subheader="Explore Features"
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
          sx={{
            backgroundColor: theme.palette.greenAccent.light,
            height: '20%',
          }}
        />
        <CardContent>
          <CardUnorderedList>
            {cardData?.descriptionA?.map((line, index) => (
              <CardListItem key={index} theme={theme}>
                {line}
              </CardListItem>
            ))}
          </CardUnorderedList>
        </CardContent>
        <CardActions
          sx={{
            marginTop: 'auto',
            width: '100%', // Ensure CardActions takes full width
            justifyContent: 'flex-end', // Align button to the end
          }}
        >
          <RCButton
            color="success"
            size="large"
            variant="holo"
            withContainer={false}
            onClick={() => handleOpenModal(cardData.title)}
          >
            {cardData.title}
          </RCButton>
          {dialogState.isDetailsDialogOpen && (
            <DetailsModal
              open={dialogState.isDetailsDialogOpen}
              onClose={handleCloseDialog}
            />
          )}
        </CardActions>
      </FeatureCard>
    </AnimatedBox>
  );
};
const FeatureCardsSection = () => {
  const { theme } = useMode();
  const breakpoints = theme.breakpoints;
  const isSmUp = useMediaQuery(breakpoints.up('sm'));
  return (
    <section className="feature-cards-section">
      <StyledContainerBox maxWidth="100%" theme={theme}>
        <StyledPaper theme={theme}>
          <Grid
            container
            spacing={isSmUp ? 5 : 2}
            sx={{
              justifyContent: 'space-between',
            }}
          >
            {featureCardData?.map((cardData, index) => (
              <Grid
                item
                key={index}
                xs={12}
                sm={12}
                md={4}
                style={{ display: 'flex', flexGrow: 1 }} // Ensure flex display for grid item
              >
                <AnimatedFeatureCard cardData={cardData} />
              </Grid>
            ))}
          </Grid>
        </StyledPaper>
      </StyledContainerBox>
    </section>
  );
};

export default FeatureCardsSection;
