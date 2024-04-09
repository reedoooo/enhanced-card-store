import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, CssBaseline, DialogTitle, Divider } from '@mui/material';
import { useMode } from '../../context';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import {
  DialogPaper,
  StyledDialog,
  StyledDialogContent,
} from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import { formFields } from '../forms/formsConfig';
import RCDynamicForm from '../forms/Factory/RCDynamicForm';
import useInitialFormData from '../forms/hooks/useInitialFormData';

const CollectionDialog = ({ open, onClose, isNew, collectionData }) => {
  const { theme } = useMode();
  const formKey = isNew ? 'addCollectionForm' : 'updateCollectionForm';
  const initialFormData = useInitialFormData(
    isNew,
    formFields[formKey],
    collectionData
  );

  return (
    <StyledDialog
      className="dialog-login"
      open={open}
      onClose={onClose}
      theme={theme}
      aria-labelledby="responsive-dialog-title"
      maxWidth="xl"
    >
      <CssBaseline />
      <DialogPaper theme={theme}>
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            margin: '0 2rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            width: 'auto',
            boxSizing: 'border-box',
            color: theme.palette.text.primary,
          }}
        >
          <MDBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: theme.palette.grey.lighter2 }}>
              <LockOutlinedIcon />
            </Avatar>
            <MDTypography component="h1" variant="h4">
              {isNew ? 'Add a Collection' : 'Update a Collection'}
            </MDTypography>
          </MDBox>
        </DialogTitle>
      </DialogPaper>
      <Divider />

      <StyledDialogContent theme={theme} elevation={20}>
        <RCDynamicForm
          formKey={formKey}
          inputs={formFields[formKey]}
          initialData={initialFormData}
          // Conditionally pass initial data if it's an update operation
        />
        {/* <CollectionForm
          collectionData={!isNew ? collectionData : undefined}
          actionType={actionType}
        /> */}
      </StyledDialogContent>
    </StyledDialog>
  );
};

CollectionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  collectionData: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default CollectionDialog;
