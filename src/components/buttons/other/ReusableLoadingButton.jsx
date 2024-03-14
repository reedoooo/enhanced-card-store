// ReusableLoadingButton.js
import React from 'react';
import { LoadingButton } from '@mui/lab';
import LoginIcon from '@mui/icons-material/Login';

const baseButtonStyles = {
  bgcolor: '#6a59ff',
  borderColor: '#6a59ff',
  borderWidth: 2,
  borderStyle: 'solid',
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '16px',
  marginTop: '16px',
  position: 'relative',
  bottom: 0,
  cursor: 'pointer',
  transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
  ':hover': {
    fontWeight: 'bold',
    bgcolor: '#4a6da7',
    borderColor: '#34597f',
  },
  ':focus': {
    outline: '2px solid #62a4ff',
    outlineOffset: 2,
  },
};

const ReusableLoadingButton = ({
  loading,
  label,
  icon,
  onClick,
  style,
  fullWidth,
  sx,
}) => (
  <LoadingButton
    type="submit"
    variant="contained"
    loading={loading}
    size="large"
    style={{ ...baseButtonStyles, ...style }}
    startIcon={icon || <LoginIcon />}
    fullWidth={fullWidth}
    sx={sx}
    onClick={onClick}
  >
    {label}
  </LoadingButton>
);

export default ReusableLoadingButton;
