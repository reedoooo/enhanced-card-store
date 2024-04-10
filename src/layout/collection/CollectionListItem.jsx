import React, { memo, useCallback } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Grid,
} from '@mui/material';
import PropTypes from 'prop-types';
import useDialogState from '../../context/hooks/useDialogState';
import { useMode } from '../../context';
import CollectionDialog from '../../components/dialogs/CollectionDialog';
import RCChange from '../REUSABLE_COMPONENTS/RC/RCChange';
import RCInfoItem from '../REUSABLE_COMPONENTS/RCInfoItem';
import { roundToNearestTenth } from '../../context/Helpers';
import LoadingOverlay from '../REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import RCButton from '../REUSABLE_COMPONENTS/RCBUTTON';
import { Divider } from '@mui/joy';
import useBreakpoint from '../../context/hooks/useBreakPoint';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';

const CollectionListItem = memo(
  ({ collection, handleSelectAndShowCollection, handleDelete }) => {
    const { theme } = useMode();
    const { isMobile } = useBreakpoint();
    const { dialogState, openDialog, closeDialog } = useDialogState();
    if (!collection) {
      return <LoadingOverlay />;
    }
    const percentageChange =
      collection?.collectionStatistics?.percentageChange || 0;

    const handleEdit = useCallback(
      (event) => {
        event.stopPropagation();
        openDialog('isEditCollectionDialogOpen');
      },
      [openDialog]
    );

    return (
      <Collapse in={true} timeout={1000}>
        <Card
          sx={{
            borderRadius: theme.shape.borderRadius,
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
