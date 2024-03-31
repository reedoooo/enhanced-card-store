import React, { memo, useCallback } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Grid,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import MDBox from '../../../../layout/REUSABLE_COMPONENTS/MDBOX';
import useCollectionManager from '../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import useDialogState from '../../../../context/hooks/useDialogState';
import { useMode } from '../../../../context';
import CollectionDialog from '../../../../components/dialogs/CollectionDialog';
import RCChange from '../../../REUSABLE_COMPONENTS/RC/RCChange';
import RCInfoItem from '../../../REUSABLE_COMPONENTS/RCInfoItem';
import { roundToNearestTenth } from '../../../../context/Helpers';
import LoadingOverlay from '../../../REUSABLE_COMPONENTS/LoadingOverlay';
import useSelectedCollection from '../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import RCButton from '../../../REUSABLE_COMPONENTS/RCBUTTON';
import { Divider } from '@mui/joy';

const CollectionListItem = memo(
  ({ collection, handleSelectAndShowCollection }) => {
    const { theme } = useMode();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { handleSelectCollection } = useSelectedCollection();
    const { deleteCollection } = useCollectionManager();
    const { dialogState, openDialog, closeDialog } = useDialogState();
    if (!collection) {
      // Handle the scenario where collectionData is null
      // Maybe set some default state or perform error handling
      return <LoadingOverlay />;
    }
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
      handleSelectAndShowCollection(collection);
    }, [handleSelectCollection, collection]);
    return (
      <Collapse in={true} timeout={1000}>
        <Card
          // onClick={() => {
          //   handleSelectAndShowCollection(collection);
          // }}
          sx={{
            ...(isMobile && {
              boxShadow: 'none', // Remove shadow
              '&:hover': {
                boxShadow: 'none',
              },
            }),
          }}
        >
          {' '}
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
              onClick={() => {
                handleSelectAndShowCollection(collection);
              }}
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
                pb: `${0} !important`,
                alignItems: 'center',
                ...(isMobile && {
                  flexDirection: 'column', // Adjust layout for mobile
                }),
              }}
            >
              <MDBox
                sx={{
                  border: 'none',
                  alignItems: 'center',
                  my: 'auto',
                }}
              >
                <RCButton
                  color="error"
                  size="small"
                  variant="holo"
                  withContainer={false}
                  onClick={handleDelete}
                >
                  Delete
                </RCButton>
                <Divider
                  sx={{
                    my: '0.5rem',
                  }}
                />
                <RCButton
                  color="success"
                  size="small"
                  variant="holo"
                  withContainer={false}
                  onClick={handleEdit}
                >
                  Edit
                </RCButton>
                {/* <SimpleButton
                  onClick={handleDelete}
                  theme={uniqueTheme}
                  isPrimary={true}
                  customSize="small"
                  noContainer={true}
                  isError={true}
                >
                  Delete
                </SimpleButton>
                <SimpleButton
                  onClick={handleEdit}
                  theme={uniqueTheme}
                  isPrimary={true}
                  customSize="small"
                  noContainer={true}
                >
                  Edit
                </SimpleButton> */}
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
      </Collapse>
    );
  }
);

CollectionListItem.displayName = 'CollectionListItem';

CollectionListItem.propTypes = {
  collection: PropTypes.object.isRequired,
};

export default CollectionListItem;
