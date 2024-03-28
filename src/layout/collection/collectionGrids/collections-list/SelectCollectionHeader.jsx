import React, { useEffect } from 'react';
import { Grid, Button, Box, useMediaQuery } from '@mui/material';
import {
  useAuthContext,
  useFormContext,
  useMode,
  useUserContext,
} from '../../../../context';
import uniqueTheme from '../../../REUSABLE_COMPONENTS/unique/uniqueTheme';
import SimpleButton from '../../../REUSABLE_COMPONENTS/unique/SimpleButton';
import styled from 'styled-components';
import SimpleCard from '../../../REUSABLE_COMPONENTS/unique/SimpleCard';
import SimpleSectionHeader from '../../../REUSABLE_COMPONENTS/unique/SimpleSectionHeader';
import { PageHeaderSkeleton } from '../../../REUSABLE_COMPONENTS/SkeletonVariants';

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

// const ButtonContainer = styled(Box)`
//   flex: 1;
//   display: flex;
//   justify-content: flex-end;
//   max-width: 50%;
// `;

const SelectCollectionHeader = ({ openNewDialog }) => {
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
    >
      <FlexContainer>
        <SimpleSectionHeader
          sectionName="Collection Portfolio"
          userName={user?.userBasicData?.firstName}
          sectionDescription="Last updated:"
          lastUpdated={new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        />
        <SimpleButton
          theme={uniqueTheme}
          isPrimary={true}
          onClick={() => {
            setCurrentForm('addCollectionForm');
            openNewDialog();
          }}
        >
          Add New Collection
        </SimpleButton>
      </FlexContainer>
    </SimpleCard>
  );
};

export default SelectCollectionHeader;
