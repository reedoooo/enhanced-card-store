import React, { useEffect } from 'react';
import { Grid, Button, Box, useMediaQuery } from '@mui/material';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';
import styled from 'styled-components';
import SimpleCard from '../REUSABLE_COMPONENTS/unique/SimpleCard';
import SimpleSectionHeader from '../REUSABLE_COMPONENTS/unique/SimpleSectionHeader';
import { PageHeaderSkeleton } from '../REUSABLE_COMPONENTS/SkeletonVariants';
import RCButton from '../REUSABLE_COMPONENTS/RCBUTTON';
import useUserData from '../../context/MAIN_CONTEXT/UserContext/useUserData';
import { useFormManagement } from '../../components/forms/hooks/useFormManagement';

const FlexContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1, 2)};
`;

const SelectCollectionHeader = ({ openNewDialog }) => {
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
        <RCButton
          color="success"
          size="large"
          variant="holo"
          withContainer={true}
          onClick={() => {
            setActiveFormSchema('addCollectionForm');
            openNewDialog();
          }}
        >
          Add New Collection
        </RCButton>
      </FlexContainer>
    </SimpleCard>
  );
};

export default SelectCollectionHeader;
