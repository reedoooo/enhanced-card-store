/* eslint-disable react/display-name */
import React, { memo, useState } from 'react';
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
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import { useMode } from '../../../context';
import useSelectCollectionListStyles from '../../../context/hooks/useSelectCollectionListStyles';
import LongMenu from '../../reusable/LongMenu';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(1),
  transition: '0.3s',
  boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
  '&:hover': {
    boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(2),
}));
const StatisticTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.secondary,
}));

const CollectionListItem = memo(
  ({
    collection,
    handleSelect,
    statsByCollectionId,
    handleOpenDialog,
    roundToNearestTenth,
  }) => {
    const { theme } = useMode();
    const classes = useSelectCollectionListStyles(theme);
    const [showOptions, setShowOptions] = useState(false);
    const twentyFourHourChange = statsByCollectionId?.twentyFourHourAverage;

    return (
      <StyledCard variant="outlined" theme={theme}>
        <CardActionArea onClick={() => handleSelect(collection._id)}>
          <StyledCardContent theme={theme}>
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
                <StatisticTypography theme={theme}>
                  Performance:{' '}
                  {twentyFourHourChange?.priceChange > 0 ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  )}
                  {twentyFourHourChange?.percentageChange}
                </StatisticTypography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography>Cards: {collection?.totalQuantity}</Typography>
              </Grid>
              {/* Add more grid items for other details like Performance */}
            </Grid>
          </StyledCardContent>
        </CardActionArea>
        <Tooltip title="Options">
          <IconButton
            size="small"
            onClick={() => setShowOptions(!showOptions)}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        {showOptions && (
          <LongMenu
            onEdit={() => handleOpenDialog(collection)}
            onStats={() => console.log('Stats:', collection)}
            onView={() => console.log('View:', collection)}
            onClose={() => setShowOptions(false)}
          />
        )}
      </StyledCard>
    );
  },
  (prevProps, nextProps) =>
    prevProps.collection._id === nextProps.collection._id &&
    prevProps.isSelected === nextProps.isSelected
);

CollectionListItem.propTypes = {
  collection: PropTypes.object.isRequired,
  handleSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

CollectionListItem.defaultProps = {
  isSelected: false,
};

export default CollectionListItem;
