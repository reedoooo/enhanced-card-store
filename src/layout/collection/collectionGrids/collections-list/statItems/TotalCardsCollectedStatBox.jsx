import { Box } from '@mui/material';
import StatBox from '../../../../REUSABLE_COMPONENTS/StatBox';
// import useCollectionStats from '../../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionStats';
import { useAppContext, useMode } from '../../../../../context';
import styled from 'styled-components';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
const TotalCardsCollectedStatBox = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const primary = colors.primary.dark;
  const greenAccent = colors.greenAccent.light;
  const grey = colors.grey.dark;
  const { collectionMetaData } = useAppContext();
  return (
    <Box
      sx={{
        bgcolor: primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.spacing(4),
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
