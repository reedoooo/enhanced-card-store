import { Box } from '@mui/material';
import StatBox from '../../REUSABLE_COMPONENTS/layout-utils/StatBox';
import { useMode } from 'context';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import useManager from 'context/useManager';
const TotalCardsCollectedStatBox = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
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
        borderRadius: theme.shape.borderRadius,
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

export default TotalCardsCollectedStatBox;
