// import React from 'react';
// import { Grid, CardContent, useMediaQuery } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import MDTypography from '../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
// import { useMode } from '../../context';

// const RCInfoItem = ({
//   label,
//   value,
//   gridSizes = { xs: 12, sm: 6, md: 3 },
//   externalTheme = null,
// }) => {
//   const { theme } = useMode();
//   const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Grid item {...gridSizes}>
//       <CardContent
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           height: '100%',
//         }}
//       >
//         <MDTypography
//           variant={isMobileView ? 'body2' : 'h4'}
//           fontWeight="medium"
//           sx={{ color: theme.palette.chartTheme.grey.darkest }}
//         >
//           {`${label}:`}
//         </MDTypography>
//         <MDTypography
//           variant={isMobileView ? 'body1' : 'h6'}
//           sx={{ color: theme.palette.chartTheme.grey.light }}
//         >
//           {value}
//         </MDTypography>
//       </CardContent>
//     </Grid>
//   );
// };

// export default RCInfoItem;
import React from 'react';
import { Grid, CardContent, useMediaQuery, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MDTypography from '../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import { useMode } from '../../context';

const RCInfoItem = ({
  label,
  value,
  gridSizes = { xs: 12, sm: 6, md: 3 },
  externalTheme = null,
}) => {
  const { theme } = useMode();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid item {...gridSizes}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        {label !== undefined && value !== undefined ? (
          <>
            <MDTypography
              variant={isMobileView ? 'body2' : 'h4'}
              fontWeight="medium"
              sx={{ color: theme.palette.chartTheme.grey.darkest }}
            >
              {`${label}:`}
            </MDTypography>
            <MDTypography
              variant={isMobileView ? 'body1' : 'h6'}
              sx={{ color: theme.palette.chartTheme.grey.light }}
            >
              {value}
            </MDTypography>
          </>
        ) : (
          <>
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="text" width="60%" height={30} />
          </>
        )}
      </CardContent>
    </Grid>
  );
};

export default RCInfoItem;
