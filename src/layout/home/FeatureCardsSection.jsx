import React from 'react';
import { useSpring, animated } from 'react-spring';

import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  AppBar,
  Card,
} from '@mui/material';
import featureCardData from 'data/json-data/featureCardData.json'; // Adjust the path as necessary
import {
  FeatureCard,
  StyledContainerBox,
  StyledPaper,
} from '../REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';

import DetailsModal from 'layout/dialogs/DetailsModal';
import { useMode, useDialogState, useBreakpoint } from 'context';

import { RCButton } from 'layout/REUSABLE_COMPONENTS';

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
      <FeatureCard theme={theme}>
        <CardHeader
          title={cardData.title}
          subheader="Explore Features"
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
          sx={{
            backgroundColor: theme.palette.success.main_light,
            height: '20%',
          }}
        />
        <CardContent>
          <List
            sx={{
              listStyleType: 'disc', // or 'circle' or 'square' for different bullet styles
              paddingLeft: theme.spacing(4), // Adjust based on theme spacing for indentation
              margin: 0, // Remove default margins
            }}
          >
            {cardData?.descriptionA?.map((line, index) => (
              <ListItem
                key={index}
                sx={{
                  color: theme.palette.text.primary,
                  paddingBottom: theme.spacing(1), // Space between list items
                  textAlign: 'left', // Align text to the left
                  fontSize: '1rem', // Adjust font size as needed
                }}
              >
                {line}
              </ListItem>
            ))}
          </List>
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
  const { isMobileUp } = useBreakpoint();
  return (
    <section className="feature-cards-section">
      <StyledContainerBox theme={theme}>
        <StyledPaper theme={theme}>
          <Grid
            container
            spacing={isMobileUp ? 5 : 2}
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
