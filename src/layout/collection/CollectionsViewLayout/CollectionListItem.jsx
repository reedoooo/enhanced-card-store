import React, { memo, useCallback } from 'react';
import { Card, CardActionArea, CardContent, Grid } from '@mui/material';
import { Divider, Tooltip } from '@mui/joy';

import PropTypes from 'prop-types';
import useDialogState from 'context/hooks/useDialogState';
import { useMode } from 'context';
import CollectionDialog from 'components/dialogs/CollectionDialog';
import RCChange from 'layout/REUSABLE_COMPONENTS/RC_OTHER/RCChange';
import RCInfoItem from 'layout/REUSABLE_COMPONENTS/RC_OTHER/RCInfoItem';
import { roundToNearestTenth } from 'context/Helpers';
import LoadingOverlay from 'layout/REUSABLE_COMPONENTS/utils/system-utils/LoadingOverlay';
import RCButton from 'layout/REUSABLE_COMPONENTS/RCBUTTON';
import useBreakpoint from 'context/hooks/useBreakPoint';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';

const CollectionListItem = memo(
  ({ collection, handleSelectAndShowCollection, handleDelete }) => {
    const { theme } = useMode();
    const { isMobile } = useBreakpoint();
    const { dialogState, openDialog, closeDialog } = useDialogState();
    if (!collection) {
      return <LoadingOverlay />;
    }
    const percentageChange =
      roundToNearestTenth(
        collection?.collectionStatistics?.percentageChange?.value
      ) || 0;

    const handleEdit = useCallback(
      (event) => {
        event.stopPropagation();
        openDialog('isEditCollectionDialogOpen');
      },
      [openDialog]
    );

    return (
      <Card
        sx={{
          borderRadius: theme.borders.borderRadius.md,
          my: '0.5rem',
          ...(isMobile && {
            boxShadow: 'none', // Remove shadow
            '&:hover': {
              boxShadow: 'none',
            },
          }),
        }}
      >
        <MDBox
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row', // Stack elements vertically on mobile
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <CardActionArea
            onClick={() => {
              handleSelectAndShowCollection(collection);
            }}
            sx={{
              display: 'flex',
              flexDirection: 'column', // Always use column to align items vertically
              // flexDirection: 'row',
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
              flexGrow: 1,
              pb: `${0} !important`,
              alignItems: 'center',
              ...(isMobile && {
                flexDirection: 'column', // Buttons in column for mobile
                width: '100%',
                pb: `${null} !important`,
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
              <Tooltip title="Delete Collection" placement="top">
                <RCButton
                  color="error"
                  size="small"
                  variant="holo"
                  withContainer={false}
                  onClick={handleDelete}
                >
                  Delete
                </RCButton>
              </Tooltip>
              <Divider
                sx={{
                  my: '0.5rem',
                }}
              />
              <Tooltip title="Edit Collection" placement="top">
                <RCButton
                  color="success"
                  size="small"
                  variant="holo"
                  withContainer={false}
                  onClick={handleEdit}
                >
                  Edit
                </RCButton>
              </Tooltip>
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
  }
);

CollectionListItem.displayName = 'CollectionListItem';

CollectionListItem.propTypes = {
  collection: PropTypes.object.isRequired,
  handleSelectAndShowCollection: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default CollectionListItem;
