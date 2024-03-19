import React, { memo, useCallback } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import MDBox from '../../../../layout/REUSABLE_COMPONENTS/MDBOX';
import useCollectionManager from '../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import useSelectedCollection from '../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useDialogState from '../../../../context/hooks/useDialogState';
import { useMode, useVisibilityContext } from '../../../../context';
import CollectionDialog from '../../../../components/dialogs/CollectionDialog';
import LongMenu from '../../../../layout/navigation/LongMenu';
import MDTypography from '../../../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import RCChange from '../../../REUSABLE_COMPONENTS/RC/RCChange';

const CollectionInfoItem = ({ label, value, theme }) => (
  <Grid item xs={12} sm={6} md={3}>
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <MDTypography
        variant="h4"
        fontWeight="medium"
        sx={{ color: theme.palette.chartTheme.grey.darkest }}
      >
        {`${label}:`}
      </MDTypography>
      <MDTypography
        variant="h6"
        sx={{ color: theme.palette.chartTheme.grey.light }}
      >
        {value}
      </MDTypography>
    </CardContent>
  </Grid>
);

CollectionInfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  theme: PropTypes.object.isRequired,
};

const CollectionListItem = memo(({ collection }) => {
  const { theme } = useMode();
  const { deleteCollection } = useCollectionManager();
  const { handleSelectCollection } = useSelectedCollection();
  const { toggleCollectionVisibility } = useVisibilityContext();
  const { dialogState, openDialog, closeDialog } = useDialogState({
    isEditCollectionDialogOpen: false,
  });

  const handleOpenDialog = useCallback(() => {
    openDialog('editCollectionDialog', collection);
  }, [collection, openDialog]);

  const handleCloseDialog = useCallback(() => {
    closeDialog('editCollectionDialog');
  }, [closeDialog]);

  const handleDelete = async () => {
    await deleteCollection(collection._id);
  };

  const renderToolTip = () => (
    <Tooltip title="Options">
      <div>
        <LongMenu
          onEdit={handleOpenDialog}
          onDelete={handleDelete}
          onSelect={() => handleSelectCollection(collection)}
          collectionId={collection._id}
        />
      </div>
    </Tooltip>
  );

  const percentageChange =
    collection.collectionStatistics?.percentageChange || 0;

  const handleSelection = useCallback(() => {
    handleSelectCollection(collection);
    toggleCollectionVisibility();
  }, [collection, handleSelectCollection, toggleCollectionVisibility]);

  return (
    <Card>
      <MDBox
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <CardActionArea
          onClick={handleSelection}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexGrow: 1,
          }}
        >
          <Grid container alignItems="center" justify="center" spacing={2}>
            <CollectionInfoItem
              label="Name"
              value={collection.name}
              theme={theme}
            />
            <CollectionInfoItem
              label="Value"
              value={`$${collection.totalPrice}`}
              theme={theme}
            />
            <CollectionInfoItem
              label="Cards"
              value={collection.totalQuantity}
              theme={theme}
            />
            <Grid item xs={12} sm={6} md={3}>
              <RCChange
                progress={100} // Default value; replace with actual data if available
                increase={percentageChange > 0}
                change={percentageChange}
                rangeLevel="24hr" // Default value; replace with actual data if available
              />
            </Grid>
          </Grid>
        </CardActionArea>
        <MDBox>
          <CardContent
            sx={{
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.success.main,
              mt: theme.spacing(1),
              mr: theme.spacing(1),
            }}
          >
            {renderToolTip()}
          </CardContent>
        </MDBox>
      </MDBox>
      {dialogState.isEditCollectionDialogOpen && (
        <CollectionDialog
          open={dialogState.isEditCollectionDialogOpen}
          onClose={handleCloseDialog}
          collectionData={collection}
        />
      )}
    </Card>
  );
});

CollectionListItem.displayName = 'CollectionListItem';

CollectionListItem.propTypes = {
  collection: PropTypes.object.isRequired,
};

export default CollectionListItem;
