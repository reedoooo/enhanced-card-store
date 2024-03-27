import React from 'react';
import { Grid } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { AnimatedFeatureCard } from '../../layout/AnimatedFeatureCard';
import { useModalContext } from '../../context/UTILITIES_CONTEXT/ModalContext/ModalContext';
import { useMode } from '../../context';
import pages from '../../data/pages.json';
import {
  StyledContainerBox,
  StyledPaper,
} from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';

const FeatureCardsSection = () => {
  const { theme } = useMode();
  const breakpoints = theme.breakpoints;
  const isSmUp = useMediaQuery(breakpoints.up('sm'));
  const { tiers, introText } = pages;
  const {
    allFeatureData,
    showDetailsModal,
    detailsModalShow,
    isModalOpen,
    modalContent,
  } = useModalContext();
  const handleOpenModal = (itemTitle) => {
    const selectedItem = allFeatureData.find(
      (item) => item.title === itemTitle
    );
    if (selectedItem) {
      showDetailsModal(selectedItem);
    }
  };
  return (
    <section className="feature-cards-section">
      <StyledContainerBox maxWidth="100%" theme={theme}>
        <StyledPaper theme={theme}>
          <Grid
            container
            spacing={isSmUp ? 5 : 2}
            sx={{
              justifyContent: 'space-between',
              // m: 0,
              // mt: 2,
            }}
          >
            {tiers.map((tier, index) => (
              <Grid
                item
                key={index}
                xs={12}
                sm={12}
                md={4}
                // md={tier.title === 'Store' ? 12 : 4}
                style={{ display: 'flex', flexGrow: 1 }} // Ensure flex display for grid item
              >
                <AnimatedFeatureCard
                  tier={tier}
                  onOpenModal={handleOpenModal}
                  theme={theme}
                />
              </Grid>
            ))}
          </Grid>
        </StyledPaper>
      </StyledContainerBox>
    </section>
  );
};

export default FeatureCardsSection;
