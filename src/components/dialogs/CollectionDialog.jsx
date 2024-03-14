import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
} from '@mui/material';
import { useCollectionStore, useFormContext, useMode } from '../../context';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import AddCollectionForm from '../forms/AddCollectionForm';
import UpdateCollectionForm from '../forms/UpdateCollectionForm';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import { withDynamicSnackbar } from '../../layout/REUSABLE_COMPONENTS/HOC/DynamicSnackbar';
import {
  DialogPaper,
  StyledDialog,
  StyledDialogContent,
} from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import MDAvatar from '../../layout/REUSABLE_COMPONENTS/MDAVATAR';
const CollectionDialog = ({
  open,
  onClose,
  isNew,
  collectionData,
  collectionMode,
}) => {
  const {
    formMethods,
    onSubmit,
    setFormSchema,
    currentSchemaKey,
    currentForm,
    setCurrentForm,
  } = useFormContext();
  const { theme } = useMode();

  useEffect(() => {
    if (collectionMode === 'edit') {
      setCurrentForm('updateCollectionForm');
    }
  }, [collectionMode, setCurrentForm]);

  return (
    <StyledDialog
      className="dialog-login"
      open={open}
      onClose={onClose}
      tbeme={theme}
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
            <MDAvatar sx={{ m: 1, bgcolor: theme.palette.backgroundG.light }}>
              <LockOutlinedIcon />
            </MDAvatar>
            <MDTypography component="h1" variant="h4">
              {currentForm === 'addCollectionForm'
                ? 'Add a Collection'
                : 'Update a Collection'}
            </MDTypography>
          </MDBox>
        </DialogTitle>{' '}
      </DialogPaper>
      <Divider />

      <StyledDialogContent theme={theme} elevation={20}>
        {currentForm === 'addCollectionForm' ? (
          <AddCollectionForm />
        ) : (
          <UpdateCollectionForm collectionData={collectionData} />
        )}
      </StyledDialogContent>
    </StyledDialog>
  );
};

CollectionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  collectionData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default withDynamicSnackbar(CollectionDialog);
