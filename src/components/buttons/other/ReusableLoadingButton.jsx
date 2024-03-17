// // ReusableLoadingButton.js
// import React from 'react';
// import { LoadingButton } from '@mui/lab';
// import LoginIcon from '@mui/icons-material/Login';
// import { useMode } from '../../../context';
// import AdjustSharpIcon from '@mui/icons-material/AdjustSharp';
// const baseButtonStyles = {
//   bgcolor: '#6a59ff',
//   borderColor: '#6a59ff',
//   borderWidth: 2,
//   borderStyle: 'solid',
//   display: 'flex',
//   flexGrow: 1,
//   alignItems: 'center',
//   justifyContent: 'center',
//   marginLeft: 'auto',
//   marginRight: 'auto',
//   marginBottom: '16px',
//   marginTop: '16px',
//   position: 'relative',
//   bottom: 0,
//   cursor: 'pointer',
//   transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
//   ':hover': {
//     fontWeight: 'bold',
//     bgcolor: '#4a6da7',
//     borderColor: '#34597f',
//   },
//   ':focus': {
//     outline: '2px solid #62a4ff',
//     outlineOffset: 2,
//   },
// };

// const ReusableLoadingButton = ({
//   loading,
//   label,
//   icon,
//   onClick,
//   style,
//   fullWidth,
//   sx,
//   variant,
// }) => {
//   const { theme } = useMode();
//   return (
//     <LoadingButton
//       type="submit"
//       variant="contained"
//       loading={loading}
//       size="large"
//       style={{ ...baseButtonStyles, ...style }}
//       startIcon={icon || <AdjustSharpIcon />}
//       fullWidth={fullWidth}
//       // sx={sx}
//       onClick={onClick}
//       sx={{
//         ...sx,
//         mt: 2, // Adjust spacing as needed
//         background: theme.palette.backgroundG.light,
//         borderColor: theme.palette.backgroundG.light,
//         borderWidth: 2,
//         '&:hover': { background: theme.palette.backgroundG.default },
//         '&:focus': { background: theme.palette.backgroundG.default },
//       }}
//     >
//       {label}
//     </LoadingButton>
//   );
// };

// export default ReusableLoadingButton;
import React from 'react';
import { LoadingButton } from '@mui/lab';
import AdjustSharpIcon from '@mui/icons-material/AdjustSharp';
import { useMode } from '../../../context';

const ReusableLoadingButton = ({
  loading,
  label,
  icon,
  onClick,
  style,
  fullWidth,
  sx,
  variant,
}) => {
  const { theme } = useMode();

  const getButtonStyles = (variant) => {
    if (variant === 'warning') {
      return {
        bgcolor: theme.palette.error.state,
        borderColor: theme.palette.error.dark,
        borderWidth: 2,
        '&:hover': {
          fontWeight: 'bold',
          bgcolor: theme.palette.error.main,
          borderColor: theme.palette.error.dark,
        },
        '&:focus': {
          outline: `2px solid ${theme.palette.error.dark}`,
          outlineOffset: 2,
        },
      };
    }
    // Default styles or other variants can be managed here
    return {
      background: theme.palette.backgroundG.light,
      borderColor: theme.palette.backgroundG.light,
      borderWidth: 2,
      '&:hover': { background: theme.palette.backgroundG.default },
      '&:focus': { background: theme.palette.backgroundG.default },
    };
  };

  return (
    <LoadingButton
      type="submit"
      variant="contained"
      loading={loading}
      size="large"
      style={{ ...style }}
      startIcon={icon || <AdjustSharpIcon />}
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{
        ...sx,
        mt: 2, // Adjust spacing as needed
        ...getButtonStyles(variant),
      }}
    >
      {label}
    </LoadingButton>
  );
};

export default ReusableLoadingButton;
