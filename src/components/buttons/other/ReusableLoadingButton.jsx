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
        background: theme.palette.error.main,
        borderColor: theme.palette.error.darkest,
        borderWidth: 5,

        '&:hover': {
          fontWeight: 'bold',
          background: theme.palette.error.light,
          borderColor: theme.palette.error.dark,
        },
        '&:focus': {
          outline: `2px solid ${theme.palette.error.dark}`,
          outlineOffset: 2,
        },
      };
    }
    return {
      background: theme.palette.greenAccent.emerald,
      borderColor: theme.palette.greenAccent.emerald,
      borderWidth: 2,
      '&:hover': { background: theme.palette.greenAccent.lightSeaGreen },
      '&:focus': { background: theme.palette.greenAccent.lightSeaGreen },
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
