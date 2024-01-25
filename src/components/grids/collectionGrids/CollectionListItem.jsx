/* eslint-disable react/display-name */
import React, { memo, useCallback, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  useTheme,
  IconButton,
  Divider,
  Tooltip,
  Skeleton,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import { useCollectionStore, useMode } from '../../../context';
import LongMenu from '../../reusable/LongMenu';
import {
  StyledCollectionListCard,
  StyledCollectionListCardContent,
  StyledStatisticTypography,
} from '../../cards/styles/cardStyles';
import useCollectionVisibility from '../../../context/hooks/useCollectionVisibility';
import { usePageContext } from '../../../context';
const CollectionListItem = memo(
  ({
    collection,
    handleOpenDialog,
    isSelected,
    statsByCollectionId,
    roundToNearestTenth,
  }) => {
    const { theme } = useMode();
    const { loadingStatus } = usePageContext();
    const { setSelectedCollection } = useCollectionStore();
    const [showOptions, setShowOptions] = useState(false);
    const twentyFourHourChange = statsByCollectionId?.twentyFourHourAverage;
    const { handleSelectCollection, showCollections } =
      useCollectionVisibility();
    // Function to handle selection of a collection
    const handleSelect = useCallback(
      (collectionId) => {
        return () => {
          handleSelectCollection(collectionId);
          // setSelectedCollection(collectionId);
          console.log('collectionId', collectionId);
          console.log('showCollections', showCollections);
        };
      },
      [handleSelectCollection]
    );
    const renderToolTip = () => {
      return (
        <Tooltip title="Options">
          <Box>
            <IconButton
              size="small"
              onClick={() => setShowOptions(!showOptions)}
              sx={{ position: 'absolute', top: 5, right: 5 }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Tooltip>
      );
    };
    return (
      <StyledCollectionListCard
        variant="outlined"
        theme={theme}
        // onClick={handleSelect(collection._id)}
      >
        <CardActionArea
          onClick={handleSelect(collection._id)}
          // onClick={() => handleSelect(collection._id)}
          sx={{
            position: 'relative',
            height: '100%',
            width: '100%',
            // display: 'flex',
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            // alignItems: 'flex-start',
          }}
        >
          <StyledCollectionListCardContent theme={theme}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography>Name: {collection?.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography>
                  Value: ${roundToNearestTenth(collection?.totalPrice)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StyledStatisticTypography theme={theme}>
                  Performance:
                  {twentyFourHourChange?.priceChange > 0 ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  )}
                  {twentyFourHourChange?.percentageChange}
                </StyledStatisticTypography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography>Cards: {collection?.totalQuantity}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  {loadingStatus?.isDataLoading ? (
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        height: 40,
                        width: 10,
                      }}
                    />
                  ) : (
                    renderToolTip()
                  )}
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ marginTop: theme.spacing(1) }} />
          </StyledCollectionListCardContent>
          {/* <Tooltip title="Options">
            <Box>
              <IconButton
                size="small"
                onClick={() => setShowOptions(!showOptions)}
                style={{ position: 'absolute', top: 5, right: 5 }}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Tooltip> */}
        </CardActionArea>

        {showOptions && (
          <Box>
            <LongMenu
              onEdit={() => handleOpenDialog(collection)}
              onSelect={() => handleSelect(collection._id)}
              onStats={() => console.log('Stats:', collection)}
              onView={() => console.log('View:', collection)}
              onClose={() => setShowOptions(false)}
              collectionId={collection._id}
            />
          </Box>
        )}
      </StyledCollectionListCard>
    );
  },
  (prevProps, nextProps) =>
    prevProps.collection._id === nextProps.collection._id &&
    prevProps.isSelected === nextProps.isSelected
);

CollectionListItem.propTypes = {
  collection: PropTypes.object.isRequired,
  // handleSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

CollectionListItem.defaultProps = {
  isSelected: false,
};

export default CollectionListItem;
