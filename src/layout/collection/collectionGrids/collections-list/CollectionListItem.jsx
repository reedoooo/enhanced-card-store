/* eslint-disable react/display-name */
import React, { memo, useCallback, useRef, useState } from 'react';
import { CardActionArea, Grid, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PropTypes from 'prop-types';
import { useAuthContext, useMode } from '../../../../context';
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
const CollectionInfoItem = ({ label, value, sx }) => (
  <Grid item xs={12} sm={6} md={3} sx={sx}>
    <MDTypography variant="body1" component="div">
      {label}: <strong>{value}</strong>
    </MDTypography>
  </Grid>
);

const CollectionListItem = memo(
  ({ collection, statsByCollectionId, roundToNearestTenth }) => {
    const { theme } = useMode();
    const { isLoggedIn, userId } = useAuthContext();
    const ref = useRef(null);
    const { deleteCollection, setSelectedCollection } = useCollectionManager(
      isLoggedIn,
      userId
    );
    const [showOptions, setShowOptions] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentCollectionData, setCurrentCollectionData] = useState({});
    const handleOpenDialog = useCallback((collection) => {
      setCurrentCollectionData(collection);
      setIsDialogOpen(true);
    }, []);

    const twentyFourHourChange = statsByCollectionId?.twentyFourHourAverage;
    const { handleSelectCollection, showCollections } =
      useCollectionVisibility();
    const handleSelect = useCallback(
      (collection) => {
        return () => {
          handleSelectCollection(collection?._id);
          setSelectedCollection(collection);
        };
      },
      [handleSelectCollection, setSelectedCollection, showCollections]
    );
    const handleDelete = async () => {
      await deleteCollection(collection?._id);
      setShowOptions(false); // Close the options menu after deletion
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
              onSelect={() => handleSelect(collection)}
              onStats={() => console.log('Stats:', collection)}
              onView={() => console.log('View:', collection)}
              onClose={() => setShowOptions(false)}
              collectionId={collection._id}
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

    return (
      <StyledCollectionListCard variant="outlined" theme={theme}>
        <MDBox sx={{ p: 1, display: 'flex', flexDirection: 'row' }}>
          <CardActionArea
            onClick={handleSelect(collection)}
            sx={{ width: '100%' }}
          >
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
        {isDialogOpen && (
          <CollectionDialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            isNew={false}
            collectionMode="edit"
            collectionData={currentCollectionData}
          />
        )}
      </StyledCollectionListCard>
    );
  }
);

CollectionListItem.propTypes = {
  collection: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
};

CollectionListItem.defaultProps = {
  isSelected: false,
};

export default CollectionListItem;
