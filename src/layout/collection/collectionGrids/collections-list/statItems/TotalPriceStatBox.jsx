// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import useCollectionStats from '../../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionStats';
// import { useMode } from '../../../../../context';
// import { Box } from '@mui/material';
// import StatBox from '../../../../REUSABLE_COMPONENTS/StatBox';

// const TotalPriceStatBox = ({ sx }) => {
//   const { collectionStats, metaStats } = useCollectionStats();
//   const { theme } = useMode();
//   const colors = theme.palette.chartTheme;
//   const primary = colors.primary.dark;
//   const greenAccent = colors.greenAccent.light;
//   return (
//     <Box
//       sx={{
//         ...sx,
//         bgcolor: primary,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100%',
//         boxSizing: 'border-box',
//         borderRadius: theme.spacing(4),
//       }}
//     >
//       <StatBox
//         title="431,225"
//         subtitle="Sales Obtained"
//         progress="0.50"
//         increase="+21%"
//         icon={
//           <MonetizationOnIcon sx={{ color: greenAccent, fontSize: '26px' }} />
//         }
//       />
//     </Box>
//   );
// };

// export default TotalPriceStatBox;
import { Box } from '@mui/material';
import StatBox from '../../../../REUSABLE_COMPONENTS/StatBox';
import useCollectionStats from '../../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionStats';
import { useMode } from '../../../../../context';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import styled from 'styled-components';

const TotalPriceStatBox = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const primary = colors.primary.dark;
  const greenAccent = colors.greenAccent.light;
  const StyledOuterBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: theme.palette.chartTheme.primary.dark,
    borderRadius: theme.shape.borderRadius,
  }));
  return (
    <Box
      sx={{
        bgcolor: primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // mb: '2rem',
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
          <MonetizationOnIcon sx={{ color: greenAccent, fontSize: '26px' }} />
        }
      />
    </Box>
  );
};

export default TotalPriceStatBox;
