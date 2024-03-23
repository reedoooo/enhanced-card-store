import React from 'react';
import styled from 'styled-components';
import useSkeletonLoader from '../collection/collectionGrids/cards-datatable/useSkeletonLoader';
import { Box, Card, Grid } from '@mui/material';
import { useFormContext, useMode, useUserContext } from '../../context';
import SimpleCard from '../REUSABLE_COMPONENTS/unique/SimpleCard';
import SimpleSectionHeader from '../REUSABLE_COMPONENTS/unique/SimpleSectionHeader';
import SimpleButton from '../REUSABLE_COMPONENTS/unique/SimpleButton';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';
import { PageHeaderSkeleton } from '../REUSABLE_COMPONENTS/SkeletonVariants';

const FlexContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

// Adjusting Header container for mobile view
const HeaderContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '100%', // Allows the header to utilize full width on small screens
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

// Button container adjusted for mobile view
const ButtonContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  maxWidth: '100%',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    width: '100%',
  },
}));

const DeckPageHeader = ({ openAddDeckDialog }) => {
  const { theme } = useMode();
  const { setCurrentForm } = useFormContext();
  const { user } = useUserContext();
  if (!user) {
    return <PageHeaderSkeleton />;
  }

  return (
    <SimpleCard
      theme={uniqueTheme}
      hasTitle={false}
      isPrimary={false}
      noBottomMargin={true}
      sx={{
        maxWidth: '100vw',
        justifyContent: 'center',
      }}
    >
      <FlexContainer>
        <HeaderContainer>
          <SimpleSectionHeader
            sectionName="Deck Builder"
            userName={user?.userBasicData?.firstName}
            sectionDescription="Last updated:"
            lastUpdated={new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          />
        </HeaderContainer>

        <ButtonContainer
        // sx={{
        //   maxWidth: '100%',
        // }}
        >
          <SimpleButton
            theme={uniqueTheme}
            isPrimary={true}
            // customSize="md"
            onClick={() => {
              setCurrentForm('addDeckForm');
              openAddDeckDialog();
              console.log('openAddDeckDialog');
            }}
          >
            Add New Deck
          </SimpleButton>
        </ButtonContainer>
      </FlexContainer>
    </SimpleCard>
  );
};

export default DeckPageHeader;
