import React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { useMode } from 'context';
import SimpleCard from '../unique/SimpleCard';
import SimpleSectionHeader from '../unique/SimpleSectionHeader';
import uniqueTheme from '../unique/uniqueTheme';
import { PageHeaderSkeleton } from '../system-utils/SkeletonVariants';
import RCButton from '../RCBUTTON';
import useUserData from 'context/MAIN_CONTEXT/UserContext/useUserData';
import { useFormManagement } from 'components/forms/hooks/useFormManagement';

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

// Making the component reusable by passing props
const PageHeader = ({
  handleOpenDialog, // Changed to a more generic name
  headerName = 'Page Name', // Default value if none provided
  userName,
  description = 'Description here', // Default description
  lastUpdated,
  buttonText = 'Add New Item', // Default button text
  formName = 'formSchemaName', // Default form name
}) => {
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
          sectionName={headerName}
          userName={userName || user?.username}
          sectionDescription={description}
          lastUpdated={
            lastUpdated ||
            new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }
        />
        <RCButton
          color="success"
          size="large"
          variant="holo"
          withContainer={true}
          onClick={handleOpenDialog}
        >
          {buttonText}
        </RCButton>
      </FlexContainer>
    </SimpleCard>
  );
};

export default PageHeader;
