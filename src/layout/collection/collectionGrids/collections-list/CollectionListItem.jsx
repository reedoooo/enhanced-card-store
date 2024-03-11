/* eslint-disable react/display-name */
import React, { memo, useCallback, useRef, useState } from 'react';
import { Card, CardActionArea, Grid, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PropTypes from 'prop-types';
import {
  useAuthContext,
  useMode,
  useVisibilityContext,
} from '../../../../context';
import LongMenu from '../../../../layout/navigation/LongMenu';
import useCollectionVisibility from '../../../../context/hooks/useCollectionVisibility';
import MDBox from '../../../../layout/REUSABLE_COMPONENTS/MDBOX';
import MDTypography from '../../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import {
  StyledCollectionListCard,
  StyledCollectionListCardContent,
} from '../../../../pages/pageStyles/StyledComponents';
import useCollectionManager from '../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import CollectionDialog from '../../../../components/dialogs/CollectionDialog';
import useSelectedCollection from '../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useDialogState from '../../../../context/hooks/useDialogState';
import SimpleCard from '../../../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../../../REUSABLE_COMPONENTS/unique/uniqueTheme';

const CollectionInfoItem = ({ label, value, sx }) => (
  <Grid item xs={12} sm={6} md={3} sx={sx}>
    <Card>
      <MDTypography variant="h6" component="div">
        {label}: <strong>{value}</strong>
      </MDTypography>
    </Card>
    {/* <MDTypography variant="body1" component="div">
      {label}: <strong>{value}</strong>
    </MDTypography> */}
  </Grid>
);

const CollectionListItem = memo(({ collection }) => {
  const { theme } = useMode();
  const roundToNearestTenth = (number) => Math.ceil(number / 10) * 10;
  const ref = useRef(null);
  const { deleteCollection } = useCollectionManager();
  const {
    handleBackToCollections,
    showCollections,
    selectedCollection,
    handleSelectCollection,
    toggleShowCollections,
  } = useSelectedCollection();
  const {
    isCollectionVisible,
    toggleCollectionVisibility,
    // dialogStates,
    // toggleDialog,
  } = useVisibilityContext();

  const { dialogState, openDialog, closeDialog } = useDialogState({
    isEditCollectionDialogOpen: false,
  });
  const handleOpenDialog = useCallback((collection) => {
    openDialog('editCollectionDialog', collection);
    console.log(collection);
  }, []);
  const handleCloseDialog = useCallback(() => {
    closeDialog('editCollectionDialog');
  }, []);

  const handleDelete = async () => {
    await deleteCollection(collection?._id);
    // setShowOptions(false); // Close the options menu after deletion
  };
  const renderToolTip = () => (
    <Tooltip title="Options">
      <div>
        <MDBox
          display="flex"
          flexDirection="column"
          p={1}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <LongMenu
            onEdit={() => handleOpenDialog(collection)}
            onDelete={handleDelete} // Pass the async delete function
            onSelect={() => handleSelectCollection(collection)}
            onHide={() => toggleShowCollections(false)}
            onStats={() => console.log('Stats:', collection)}
            onView={() => console.log('View:', collection)}
            // onClose={() => setShowOptions(false)}
            collectionId={collection?._id}
            ref={ref}
          />
        </MDBox>
      </div>
    </Tooltip>
  );
  const renderPercentageChange = useCallback(() => {
    const percentageChange =
      collection?.collectionStatistics?.percentageChange || 0;
    return (
      <MDTypography
        variant="body2"
        color={percentageChange > 0 ? 'success' : 'error'}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        {percentageChange > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        {percentageChange}%
      </MDTypography>
    );
  }, [collection]);
  const handleSelection = useCallback(() => {
    handleSelectCollection(collection);
    toggleCollectionVisibility();
  }, [collection]);

  return (
    <StyledCollectionListCard variant="outlined" theme={theme}>
      <MDBox sx={{ p: 1, display: 'flex', flexDirection: 'row' }}>
        <CardActionArea onClick={handleSelection} sx={{ width: '100%' }}>
          <StyledCollectionListCardContent>
            <Grid container spacing={2} alignItems="center">
              <CollectionInfoItem label="Name" value={collection?.name} />
              <CollectionInfoItem
                label="Value"
                value={`$${roundToNearestTenth(collection?.totalPrice)}`}
              />
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                {renderPercentageChange()}
              </Grid>
              <CollectionInfoItem
                label="Cards"
                value={collection?.totalQuantity}
              />
            </Grid>
          </StyledCollectionListCardContent>
        </CardActionArea>
        {renderToolTip()}
      </MDBox>
      {dialogState.isEditCollectionDialogOpen && (
        <CollectionDialog
          open={dialogState.isEditCollectionDialogOpen}
          onClose={() => handleCloseDialog()}
          isNew={false}
          collectionMode="edit"
          collectionData={{
            name: collection?.name,
            description: collection?.description,
          }}
        />
      )}
    </StyledCollectionListCard>
  );
});

CollectionListItem.propTypes = {
  collection: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
};

CollectionListItem.defaultProps = {
  isSelected: false,
};

export default CollectionListItem;
