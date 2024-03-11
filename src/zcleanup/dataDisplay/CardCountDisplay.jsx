// import React from 'react';
// import { Grid, Typography } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import PropTypes from 'prop-types';

// // Styled components
// const StyledGrid = styled(Grid)(({ theme }) => ({
//   padding: theme.spacing(1),
//   backgroundColor: theme.palette.backgroundA.lightest,
//   borderRadius: theme.shape.borderRadius,
//   boxShadow: theme.shadows[2],
//   textAlign: 'center',
// }));

// const CardCountDisplay = ({ quantity, label, className }) => {
//   const totalItems = quantity && quantity.totalItems ? quantity.totalItems : 0;

//   return (
//     <StyledGrid
//       container
//       className={className}
//       justifyContent="center"
//       alignItems="center"
//     >
//       <StyledGrid item xs={12}>
//         <Typography variant="subtitle1">
//           {label}: {totalItems}
//         </Typography>
//       </StyledGrid>
//     </StyledGrid>
//   );
// };

// CardCountDisplay.propTypes = {
//   quantity: PropTypes.shape({
//     totalItems: PropTypes.number,
//   }),
//   label: PropTypes.string,
//   className: PropTypes.string,
// };

// export default CardCountDisplay;
