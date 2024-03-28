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
import SimpleButton from '../../../REUSABLE_COMPONENTS/unique/SimpleButton';
import uniqueTheme from '../../../REUSABLE_COMPONENTS/unique/uniqueTheme';

const CollectionListItem = memo(({ collection }) => {
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { deleteCollection } = useCollectionManager();
  const { handleSelectCollection, selectedCollection } =
    useSelectedCollection();
  const { dialogState, openDialog, closeDialog } = useDialogState();

  const percentageChange =
    collection?.collectionStatistics?.percentageChange || 0;

  const handleDelete = useCallback(
    async (event) => {
      event.stopPropagation(); // Prevent triggering the selection when clicking delete
      await deleteCollection(collection?._id);
    },
    [deleteCollection, collection?._id]
  );

  const handleEdit = useCallback(
    (event) => {
      event.stopPropagation(); // Prevent triggering the selection when clicking edit
      // handleSelectCollection(collection);
      openDialog('isEditCollectionDialogOpen');
    },
    [openDialog]
  );

  const handleSelection = useCallback(() => {
    handleSelectCollection(collection);
  }, [handleSelectCollection, collection]);
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
            p: 'none !!important',
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
        <CardContent
          sx={{
            width: '20%',
            maxWidth: 200,
            flexGrow: 1,
            ...(isMobile && {
              flexDirection: 'column', // Adjust layout for mobile
            }),
          }}
        >
          <MDBox>
            <SimpleButton
              onClick={handleDelete}
              theme={uniqueTheme}
              isPrimary={true}
              customSize="sm"
              noContainer={true}
              isError={true}
            >
              Delete
            </SimpleButton>
            <SimpleButton
              onClick={handleEdit}
              theme={uniqueTheme}
              isPrimary={true}
              customSize="sm"
              noContainer={true}
            >
              Edit
            </SimpleButton>
          </MDBox>
        </CardContent>
      </MDBox>
      <CollectionDialog
        open={dialogState.isEditCollectionDialogOpen}
        onClose={() => closeDialog('isEditCollectionDialogOpen')}
        collectionData={{
          _id: collection?._id,
          name: collection?.name,
          description: collection?.description,
        }}
        isNew={false}
      />
    </Card>
  );
});

CollectionListItem.displayName = 'CollectionListItem';

CollectionListItem.propTypes = {
  collection: PropTypes.object.isRequired,
};

export default CollectionListItem;
