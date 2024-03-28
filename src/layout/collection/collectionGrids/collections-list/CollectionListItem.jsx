import React, { memo, useCallback } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import MDBox from '../../../../layout/REUSABLE_COMPONENTS/MDBOX';
import useCollectionManager from '../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import useSelectedCollection from '../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useDialogState from '../../../../context/hooks/useDialogState';
import { useMode } from '../../../../context';
import CollectionDialog from '../../../../components/dialogs/CollectionDialog';
import LongMenu from '../../../../layout/navigation/LongMenu';
import RCChange from '../../../REUSABLE_COMPONENTS/RC/RCChange';
import RCInfoItem from '../../../REUSABLE_COMPONENTS/RCInfoItem';
import { roundToNearestTenth } from '../../../../context/Helpers';

const CollectionListItem = memo(({ collection }) => {
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { deleteCollection } = useCollectionManager();
  const { handleSelectCollection } = useSelectedCollection();
  const { dialogState, openDialog, closeDialog } = useDialogState({
    isEditCollectionDialogOpen: false,
  });

  const handleOpenDialog = useCallback((collection) => {
    openDialog('isEditCollectionDialogOpen', collection);
  }, []);

  const handleDelete = async () => {
    await deleteCollection(collection?._id);
  };

  const renderToolTip = () => (
    <Tooltip title="Options">
      <div>
        <LongMenu
          onEdit={() => handleOpenDialog(collection)}
          onDelete={handleDelete}
          onSelect={() => handleSelectCollection(collection)}
          // onHide={() => toggleShowCollections(false)}
          collectionId={collection?._id}
          collection={collection}
        />
      </div>
    </Tooltip>
  );

  const percentageChange =
    collection?.collectionStatistics?.percentageChange || 0;

  const handleSelection = useCallback(() => {
    handleSelectCollection(collection);
    // toggleShowCollections();
  }, [collection]);

  return (
    <Card>
      <MDBox
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          height: '100%',
          ...(isMobile &&
            {
              // flexDirection: 'column', // Stack elements vertically on mobile
            }),
        }}
      >
        <CardActionArea
          onClick={handleSelection}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexGrow: 1,
            ...(isMobile && {
              flexDirection: 'column', // Adjust layout for mobile
            }),
          }}
        >
          <Grid container alignItems="center" justify="center" spacing={2}>
            <RCInfoItem
              label="Name"
              value={collection?.name}
              theme={theme}
              gridSizes={{ xs: 12, sm: 6, md: 3 }}
            />
            <RCInfoItem
              label="Value"
              value={`$${roundToNearestTenth(collection?.totalPrice)}`}
              theme={theme}
              gridSizes={{ xs: 12, sm: 6, md: 3 }}
            />
            <RCInfoItem
              label="Cards"
              value={collection?.totalQuantity}
              theme={theme}
              gridSizes={{ xs: 12, sm: 6, md: 3 }}
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
              ...(isMobile && {
                mt: theme.spacing(0.5), // Adjust margin top for mobile
                mr: theme.spacing(0.5), // Adjust margin right for mobile
              }),
            }}
          >
            {renderToolTip()}
          </CardContent>
        </MDBox>
      </MDBox>
      {/* <CollectionDialog
        open={dialogState.isEditCollectionDialogOpen}
        onClose={handleCloseDialog}
        collectionData={collection}
        isNew={false}
      /> */}
      {dialogState.isEditCollectionDialogOpen && (
        <CollectionDialog
          open={dialogState.isEditCollectionDialogOpen}
          onClose={() => closeDialog('isEditCollectionDialogOpen')}
          // onClose={() => closeDialog('isAddDeckDialogOpen')}
          collectionData={collection}
          isNew={false}
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
