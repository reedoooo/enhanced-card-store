import React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import SimpleSectionHeader from './SimpleSectionHeader';
import { PageHeaderSkeleton } from '../system-utils/SkeletonVariants';
import RCButton from '../../RCBUTTON';
import useUserData from 'context/state/useUserData';
import { useFormManagement } from 'context/formHooks/useFormManagement';
import { Tooltip } from '@mui/joy';
import RCCard from '../../RCCARD';

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
  type = 'Portfolio', // Default type
  action,
}) => {
  const { setActiveFormSchema } = useFormManagement();
  const { user } = useUserData();
  if (!user) {
    return <PageHeaderSkeleton />;
  }

  return (
    <RCCard
      noBottomMargin={true}
      hasTitle={false}
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
          type={type}
          lastUpdated={
            lastUpdated ||
            new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }
        />
        <Tooltip title={action.tooltip} placement="top">
          <RCButton
            color="success"
            size="large"
            variant="holo"
            withContainer={true}
            onClick={handleOpenDialog}
          >
            {buttonText}
          </RCButton>
        </Tooltip>
      </FlexContainer>
    </RCCard>
  );
};

export default PageHeader;
