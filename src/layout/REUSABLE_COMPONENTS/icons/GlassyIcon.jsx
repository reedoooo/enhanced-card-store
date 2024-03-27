// import React from 'react';
// import { Box, Icon } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star'; // You can choose any icon
// const GlassyIcon = ({
//   icon: <Icon>StarIcon</Icon>,
//   iconColor = '#FFFFFF',
//   gradientStartColor,
//   gradientEndColor,
//   size = 100,
//   blurAmount = 75,
// }) => {
//   return (
//     <Box
//       sx={{
//         display: 'inline-flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: size,
//         height: size,
//         borderRadius: '50%',
//         background: 'rgba(255, 255, 255, 0.2)',
//         boxShadow: 'inset 0 0 10px #0C86DF, 0 0 10px #0C86DF',
//         // boxShadow: `inset 0 0 10px ${gradientStartColor}, 0 0 10px ${gradientEndColor}`,
//         backdropFilter: 'blur(10px)',
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >
//       <Box
//         component="svg"
//         viewBox="0 0 100 100"
//         sx={{
//           width: '100%',
//           height: '100%',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           filter: `blur(${blurAmount}px)`,
//         }}
//       >
//         <defs>
//           <linearGradient
//             id="glassy-gradient"
//             x1="0%"
//             y1="0%"
//             x2="100%"
//             y2="100%"
//           >
//             <stop
//               offset="0%"
//               style={{ stopColor: gradientStartColor, stopOpacity: 1 }}
//             />
//             <stop
//               offset="100%"
//               style={{ stopColor: gradientEndColor, stopOpacity: 1 }}
//             />
//           </linearGradient>
//         </defs>
//         <circle cx="50" cy="50" r="50" fill="url(#glassy-gradient)" />
//       </Box>
//       <Icon sx={{ color: iconColor, zIndex: 1 }} fontSize="large" />
//     </Box>
//   );
// };

// export default GlassyIcon;
import React from 'react';
import { Box } from '@mui/material';

const GlassyIcon = ({ Icon, iconColor = '#FFFFFF', size = 40 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Expand to fill the available width
        height: 'auto', // Adjust the height as necessary or keep it auto
        minHeight: '40px', // Ensure it has a minimum height if content is less
        borderRadius: '8px', // Adjust for a slight curve, less pronounced than 50%
        background: 'rgba(255, 255, 255, 0.2)',
        // boxShadow: 'inset 0 0 10px #0C86DF, 0 0 10px #0C86DF',
        backdropFilter: 'blur(10px)',
      }}
    >
      {Icon && Icon}
      {/* Render the Icon */}
    </Box>
  );
};

export default GlassyIcon;
