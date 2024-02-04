/* eslint-disable react/display-name */
import React, { memo, useCallback, useState } from 'react';
import {
  Box,
  CardActionArea,
  Grid,
  Typography,
  Divider,
  Tooltip,
  Icon,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import { useCollectionStore, useMode } from '../../../../context';
import LongMenu from '../../../../layout/navigation/LongMenu';
import {
  StyledCollectionListCard,
  StyledCollectionListCardContent,
  StyledStatisticTypography,
} from '../../../cards/styles/cardStyles';
import useCollectionVisibility from '../../../../context/hooks/useCollectionVisibility';
import MDBox from '../../../../layout/REUSABLE_COMPONENTS/MDBOX';
import MDTypography from '../../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
const CollectionListItem = memo(
  ({
    collection,
    handleOpenDialog,
    statsByCollectionId,
    roundToNearestTenth,
  }) => {
    const { theme } = useMode();
    const { setSelectedCollection } = useCollectionStore();
    const [showOptions, setShowOptions] = useState(false);
    const twentyFourHourChange = statsByCollectionId?.twentyFourHourAverage;
    const { handleSelectCollection, showCollections } =
      useCollectionVisibility();
    // Function to handle selection of a collection
    const handleSelect = useCallback(
      (collection) => {
        return () => {
          handleSelectCollection(collection?._id);
          setSelectedCollection(collection);
          console.log('collectionId', collection?._id);
          console.log('showCollections', showCollections);
        };
      },
      [handleSelectCollection]
    );
    const renderToolTip = () => {
      return (
        <Tooltip title="Options">
          <Box>
            {/* <IconButton
              size="small"
              onClick={() => setShowOptions(!showOptions)}
              sx={{ position: 'absolute', top: 5, right: 5 }}
            > */}
            <MoreVertIcon />
            {/* </IconButton> */}
          </Box>
        </Tooltip>
      );
    };
    return (
      <StyledCollectionListCard variant="outlined" theme={theme}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          {/* <MDBox> */}
          <CardActionArea
            onClick={handleSelect(collection)}
            sx={{
              position: 'relative',
              height: '100%',
              width: '100%',
            }}
          >
            {' '}
            <>
              (<strong>+15%</strong>) increase in today sales.
            </>
            <StyledCollectionListCardContent theme={theme}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <MDTypography variant="h6" gutterBottom>
                    Name: {collection?.name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography>
                    Value: &nbsp;
                    <strong>
                      ${roundToNearestTenth(collection?.totalPrice)}
                    </strong>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StyledStatisticTypography theme={theme}>
                    Performance:(
                    <strong>
                      {twentyFourHourChange?.priceChange > 0 ? (
                        <ArrowUpwardIcon />
                      ) : (
                        <ArrowDownwardIcon />
                      )}
                      ${twentyFourHourChange?.percentageChange}{' '}
                    </strong>
                    )
                  </StyledStatisticTypography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography>
                    Cards: &nbsp;<strong>{collection?.totalQuantity}</strong>
                  </Typography>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={3}>
                    {/* <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
                    {renderToolTip()}
                  </Box> */}
                {/* </Grid> */}
              </Grid>
              {/* <Divider sx={{ marginTop: theme.spacing(1) }} /> */}
            </StyledCollectionListCardContent>
          </CardActionArea>

          {showOptions && (
            <Box>
              <LongMenu
                onEdit={() => handleOpenDialog(collection)}
                onSelect={() => handleSelect(collection)}
                onStats={() => console.log('Stats:', collection)}
                onView={() => console.log('View:', collection)}
                onClose={() => setShowOptions(false)}
                collectionId={collection._id}
              />
            </Box>
          )}
          {/* </MDBox> */}
        </MDBox>
      </StyledCollectionListCard>
    );
  },
  (prevProps, nextProps) =>
    prevProps.collection._id === nextProps.collection._id &&
    prevProps.isSelected === nextProps.isSelected
);

CollectionListItem.propTypes = {
  collection: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
};

CollectionListItem.defaultProps = {
  isSelected: false,
};

export default CollectionListItem;
