import React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { useMode } from '../../context';
import SimpleCard from '../REUSABLE_COMPONENTS/unique/SimpleCard';
import SimpleSectionHeader from '../REUSABLE_COMPONENTS/unique/SimpleSectionHeader';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';
import { PageHeaderSkeleton } from '../REUSABLE_COMPONENTS/SkeletonVariants';
import RCButton from '../REUSABLE_COMPONENTS/RCBUTTON';
import useUserData from '../../context/MAIN_CONTEXT/UserContext/useUserData';
import { useFormManagement } from '../../components/forms/hooks/useFormManagement';

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

const DeckPageHeader = ({ openAddDeckDialog }) => {
  const { theme } = useMode();
  const { setActiveFormSchema } = useFormManagement();
  const { user } = useUserData();
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
        <RCButton
          color="success"
          size="large"
          variant="holo"
          // circular={true}
          withContainer={true}
          onClick={() => {
            setActiveFormSchema('addDeckForm');
            openAddDeckDialog();
            console.log('openAddDeckDialog');
          }}
        >
          Add New Deck
        </RCButton>
      </FlexContainer>
    </SimpleCard>
  );
};

export default DeckPageHeader;
