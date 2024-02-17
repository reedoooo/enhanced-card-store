import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  CssBaseline,
  Dialog,
  DialogContent,
  Grid,
  Paper,
} from '@mui/material';
import { useCollectionStore, useFormContext, useMode } from '../../context';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import AddCollectionForm from '../forms/AddCollectionForm';
import UpdateCollectionForm from '../forms/UpdateCollectionForm';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
const CollectionDialog = ({
  open,
  onClose,
  isNew,
  collectionData,
  collectionMode,
}) => {
  const { currentForm, setCurrentForm } = useFormContext();
  const { theme } = useMode();

  useEffect(() => {
    if (collectionMode === 'edit') {
      setCurrentForm('updateCollectionForm');
    }
  }, [collectionMode, setCurrentForm]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '100%',
        borderRadius: '30px',
        // background: theme.palette.backgroundE.light,
      }}
    >
      <MDBox>
        <Grid
          container
          spacing={0}
          // component="main"
          sx={{ flexGrow: 1, width: '100%' }}
        >
          {/* <CssBaseline /> */}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            component={Paper}
            elevation={6}
            square
          >
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 8,
                flexGrow: 1,
                width: '100%',
                height: '100%',
                background: theme.palette.backgroundE.lighter,
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                minWidth={'30vw'}
              >
                <Avatar
                  sx={{ m: 1, bgcolor: theme.palette.backgroundE.darker }}
                >
                  <LockOutlinedIcon />
                </Avatar>
                <MDTypography component="h1" variant="h5">
                  {currentForm === 'addCollectionForm'
                    ? 'Add a Collection'
                    : 'Update a Collection'}
                </MDTypography>
                <DialogContent>
                  <MDBox
                    sx={{
                      display: 'flex',
                      // justifyContent: 'flex-end',
                      flexGrow: 1,
                      // mx: 'auto'
                      m: theme.spacing(2),
                      width: '100%',
                      minWidth: '100%',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    {currentForm === 'addCollectionForm' ? (
                      <AddCollectionForm />
                    ) : (
                      <UpdateCollectionForm collectionData={collectionData} />
                    )}
                  </MDBox>
                </DialogContent>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </MDBox>
    </Dialog>
  );
};

CollectionDialog.propTypes = {
  // open: PropTypes.bool.isRequired,
  // onClose: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  collectionData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default CollectionDialog;
