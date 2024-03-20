import React from 'react';
import styled from 'styled-components';
import useSkeletonLoader from '../collection/collectionGrids/cards-datatable/useSkeletonLoader';
import { Box, Card, Grid } from '@mui/material';
import { useFormContext, useMode, useUserContext } from '../../context';
import SimpleCard from '../REUSABLE_COMPONENTS/unique/SimpleCard';
import SimpleSectionHeader from '../REUSABLE_COMPONENTS/unique/SimpleSectionHeader';
import SimpleButton from '../REUSABLE_COMPONENTS/unique/SimpleButton';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';

const DeckPageHeaderSkeleton = () => {
  const { SkeletonLoader } = useSkeletonLoader();

  return (
    <Grid container sx={{ padding: 1, alignItems: 'center' }}>
      <Grid item xs={12} sm={6}>
        <Card>
          <SkeletonLoader type="title" />
          <SkeletonLoader type="subtitle" />
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <SkeletonLoader type="button" />
      </Grid>
    </Grid>
  );
};

const FlexContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1, 2)};
`;

const HeaderContainer = styled(Box)`
  flex: 1;
  max-width: 50%;
`;

const ButtonContainer = styled(Box)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  max-width: 50%;
`;

const DeckPageHeader = ({ openAddDeckDialog }) => {
  const { theme } = useMode();
  const { setCurrentForm } = useFormContext();
  const { user } = useUserContext();
  if (!user) {
    return <DeckPageHeaderSkeleton />;
  }

  return (
    <SimpleCard
      theme={uniqueTheme}
      hasTitle={false}
      isPrimary={false}
      noBottomMargin={true}
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

        <ButtonContainer>
          <SimpleButton
            theme={uniqueTheme}
            isPrimary={true}
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
