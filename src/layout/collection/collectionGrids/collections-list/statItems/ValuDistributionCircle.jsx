// import { Box, Typography } from '@mui/material';
// import { useMode } from '../../../../../context';
// import ProgressCircle from '../../../../REUSABLE_COMPONENTS/ProgressCircle';
// import MDBox from '../../../../REUSABLE_COMPONENTS/MDBOX';

// const ValuDistributionCircle = () => {
//   const { theme } = useMode();
//   const colors = theme.palette.chartTheme;
//   const primary = colors.primary.dark;
//   const greenAccent = colors.greenAccent.default;

//   return (
//     <Box
//       sx={{
//         bgcolor: primary,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         // height: '100%',
//         boxSizing: 'border-box',
//         borderRadius: theme.spacing(4),
//       }}
//     >
//       <MDBox
//         sx={{
//           width: '100%',
//           // m: '0 30px',
//           p: '20px',
//           borderRadius: theme.spacing(4),
//         }}
//       >
//         <Typography variant="h5" fontWeight="600">
//           Campaign
//         </Typography>
//         <Box
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           mt="25px"
//         >
//           <ProgressCircle size="125" />
//           <Typography variant="h5" color={greenAccent} sx={{ mt: '15px' }}>
//             $48,352 revenue generated
//           </Typography>
//           <Typography>Includes extra misc expenditures and costs</Typography>
//         </Box>
//       </MDBox>
//     </Box>
//   );
// };

// export default ValuDistributionCircle;
import { Box, Typography } from '@mui/material';
import ProgressCircle from '../../../../REUSABLE_COMPONENTS/ProgressCircle';
import MDBox from '../../../../REUSABLE_COMPONENTS/MDBOX';
import { useMode } from '../../../../../context';

const ValuDistributionCircle = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const primary = colors.primary.dark;
  const greenAccent = colors.greenAccent.light;
  return (
    <MDBox sx={{ width: '100%', height: '100%', flexGrow: 1 }}>
      <Box
        sx={{
          bgcolor: primary,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: theme.shape.borderRadius,
          minHeight: '270px',
        }}
      >
        {/* <MDBox sx={{ p: '20px', width: '100%' }}> */}
        <Typography variant="h5" fontWeight="600">
          Campaign
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          // mt="25px"
        >
          <ProgressCircle size="125" />
          <Typography variant="h5" color={greenAccent} sx={{ mt: '15px' }}>
            $48,352 revenue generated
          </Typography>
          <Typography>Includes extra misc expenditures and costs</Typography>
        </Box>
        {/* </MDBox> */}
      </Box>
    </MDBox>
  );
};

export default ValuDistributionCircle;
