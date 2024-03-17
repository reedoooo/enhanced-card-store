import { Box } from '@mui/material';
import StatBox from '../../../../REUSABLE_COMPONENTS/StatBox';
import useCollectionStats from '../../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionStats';
import { useMode } from '../../../../../context';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import styled from 'styled-components';
import RCIcon from '../../../../REUSABLE_COMPONENTS/RCICON/RCIcon';

const TotalPriceStatBox = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const primary = colors.primary.dark;
  const greenAccent = colors.greenAccent.light;
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
        // p: '5px',
      }}
    >
      <StatBox
        title="431,225"
        subtitle="Sales Obtained"
        progress="0.50"
        increase="+21%"
        icon={
          <RCIcon iconName="Home" size="40px" color="blue" />

          // <MonetizationOnIcon sx={{ color: greenAccent, fontSize: '26px' }} />
        }
      />
    </Box>
  );
};

export default TotalPriceStatBox;
