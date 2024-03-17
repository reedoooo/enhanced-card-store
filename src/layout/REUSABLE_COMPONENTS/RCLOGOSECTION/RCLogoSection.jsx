// // import { ButtonBase, Typography } from '@mui/material';
// // import { Link, useNavigate } from 'react-router-dom';
// // import config from '../../../config';
// // import DeckOfCardsIcon from '../../../components/reusable/icons/DeckOfCardsIcon';

// // // ==============================|| MAIN LOGO ||============================== //

// // const RCLogoSection = () => {
// //   const navigate = useNavigate();

// //   const handleClick = () => {
// //     navigate(config?.defaultPath);
// //   };

// //   return (
// //     <ButtonBase
// //       disableRipple
// //       component={Link}
// //       to={config.defaultPath}
// //       onClick={handleClick}
// //       // sx={{ width: '100%', maxWidth: 150 }} // Responsive styles
// //       sx={{
// //         // width: defaultSize, // Standard icon size, adjustable via props
// //         // height: defaultSize, // Standard icon size, adjustable via props
// //         width: '50px',
// //         height: '50px',
// //         padding: '8px', // Padding to provide space around the icon
// //         marginRight: '8px',
// //         // padding: '8px', // Padding to provide some space around the icon
// //         // bottom: '2rem',
// //         // right: '2rem',
// //         color: 'rgba(0, 0, 0, 0.54)',
// //         margin: '0', // Adjust margin as needed
// //         // color: '#777',
// //         '&:hover': {
// //           // backgroundColor: defaultHoverColor, // Hover effect color
// //           backgroundColor: 'rgba(0, 0, 0, 0.1)',
// //         },
// //         '& img': {
// //           maxWidth: '100%',
// //           maxHeight: '100%',
// //         },
// //       }}
// //     >
// //       <img
// //         src={DeckOfCardsIcon}
// //         alt="Logo"
// //         style={{ width: '100%', height: 'auto' }}
// //       />
// //       <Typography
// //         variant="h6"
// //         component="h1"
// //         sx={{
// //           fontFamily: 'Roboto, sans-serif', // Use the imported font
// //           fontWeight: 700, // Choose an appropriate weight
// //           fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' }, // Responsive font size
// //           color: 'inherit', // Use the parent's color
// //         }}
// //       >
// //         DeckMaster
// //       </Typography>
// //     </ButtonBase>
// //   );
// // };

// // export default RCLogoSection;
// import React from 'react';
// import { ButtonBase, Typography } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import config from '../../../config';
// import DeckBuilderIcon from '../../../components/reusable/icons/DeckBuilderIcon'; // Import DeckBuilderIcon

// // ==============================|| MAIN LOGO ||============================== //

// const RCLogoSection = () => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(config?.defaultPath);
//   };

//   return (
//     <ButtonBase
//       disableRipple
//       component={Link}
//       to={config.defaultPath}
//       onClick={handleClick}
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         width: 'auto', // Adjust based on content
//         height: '50px',
//         padding: '8px',
//         marginRight: '8px',
//         color: 'rgba(0, 0, 0, 0.54)',
//         '&:hover': {
//           backgroundColor: 'rgba(0, 0, 0, 0.1)',
//         },
//       }}
//     >
//       {/* Render DeckBuilderIcon here */}
//       <DeckBuilderIcon
//         style={{ width: '40px', height: '40px', marginRight: '10px' }}
//       />
//       <Typography
//         variant="h6"
//         component="h1"
//         sx={{
//           fontFamily: 'Roboto, sans-serif',
//           fontWeight: 700,
//           fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
//           color: 'inherit',
//         }}
//       >
//         DeckMaster
//       </Typography>
//     </ButtonBase>
//   );
// };

// export default RCLogoSection;
import React from 'react';
import { ButtonBase, Typography, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../../config';
import DeckBuilderIcon from '../icons/DeckBuilderIcon'; // Import DeckBuilderIcon

// ==============================|| MAIN LOGO ||============================== //

const RCLogoSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(config?.defaultPath);
  };

  return (
    <ButtonBase
      disableRipple
      component={Link}
      to={config.defaultPath}
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        height: '50px',
        padding: '8px',
        marginRight: '8px',
        color: 'rgba(0, 0, 0, 0.54)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {/* Encapsulate DeckBuilderIcon within an Avatar */}
      <Avatar
        sx={{
          marginRight: '10px',
          width: 23,
          height: 23,
          backgroundColor: 'transparent',
          border: '2px solid black', // Adjust thickness and color as needed
        }}
      >
        <DeckBuilderIcon
          style={{ fontSize: '1.5rem', color: 'currentColor' }}
        />
      </Avatar>
      <Typography
        variant="h6"
        component="h1"
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
          color: 'inherit',
        }}
      >
        DeckMaster
      </Typography>
    </ButtonBase>
  );
};

export default RCLogoSection;
