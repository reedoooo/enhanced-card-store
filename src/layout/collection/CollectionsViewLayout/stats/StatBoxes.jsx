import { Box, Divider } from '@mui/material';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { useMode, useManager } from 'context';

import { roundToNearestTenth } from 'context/Helpers';

import { StatBox } from 'layout/REUSABLE_COMPONENTS';

const TotalCardsStatBox = () => {
  const { theme } = useMode();
  const colors = theme.palette;
  const primary = colors.primary.dark;
  const grey = colors.grey.dark;
  const { collectionMetaData } = useManager();
  return (
    <Box
      sx={{
        bgcolor: primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.borders.borderRadius.md,
        height: '100%',
        minHeight: '135px',
      }}
    >
      <StatBox
        title={`${collectionMetaData?.numCardsCollected || 0}`}
        subtitle="Total Cards Collected"
        progress="0.50"
        increase="+21%"
        wrapIcon={false}
        icon={
          <FormatListNumberedRoundedIcon
            sx={{ color: grey, fontSize: '26px' }}
          />
        }
      />
    </Box>
  );
};

const TotalPriceStatBox = () => {
  const { theme } = useMode();
  const colors = theme.palette;
  const primary = colors.primary.dark;
  const grey = colors.grey.dark;
  const { collectionMetaData } = useManager();

  return (
    <Box
      sx={{
        bgcolor: primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.borders.borderRadius.md,
        height: '100%',
        minHeight: '135px',
      }}
    >
      <StatBox
        title={`$${roundToNearestTenth(collectionMetaData?.totalValue) || 0}`}
        subtitle="Portfolio Total Value"
        progress="0.50"
        increase="+21%"
        wrapIcon={false}
        icon={<MonetizationOnIcon sx={{ color: grey, fontSize: '40px' }} />}
      />
    </Box>
  );
};

const StatBoxes = () => {
  return (
    <>
      <TotalCardsStatBox />
      <Divider />
      <TotalPriceStatBox />
    </>
  );
};

export default StatBoxes;
