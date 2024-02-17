import * as React from 'react';
import { Transition } from 'react-transition-group';
import { Snackbar, IconButton, Box, Grow } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import styled from 'styled-components';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useMode } from '../../../context';
import { useSnackbar } from 'notistack';
// import useSnackBar from '../../../context/hooks/useSnackBar';

// const DynamicSnackbar = ({ open, message, variant, onClose, loading }) => {
//   const { theme } = useMode();
//   const { handleCloseSnackbar } = useSnackBar(); // Obtain handleCloseSnackbar function from useSnackBar hook

//   const handleClose = (_, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     onClose();
//   };

//   console.log('DynamicSnackbar:', open, message, variant, loading);
//   return (
//     <Snackbar
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'right',
//       }}
//       open={open}
//       autoHideDuration={6000}
//       onClose={handleClose}
//       // TransitionComponent={GrowTransition} // Pass GrowTransition as the component, not a function call
//     >
//       {/* <Grow in={open} timeout={400} unmountOnExit> */}
//       <Grow
//         in={true}
//         style={{ transformOrigin: '0 0 0' }}
//         {...(loading ? { timeout: 400 } : {})}
//       >
//         {(status) => (
//           <StyledSnackbar
//             variant={variant}
//             // style={{
//             //   transform: positioningStyles[status],
//             //   transition: 'transform 300ms ease',
//             // }}
//             style={{
//               opacity: open ? 1 : 0,
//               transform: open ? 'translateY(0)' : 'translateY(-20px)',
//               transition: 'transform 300ms ease',
//               transitionDelay: `${open ? 0 : 0.3}s`,
//             }}
//             theme={theme}
//           >
//             <CheckRoundedIcon
//               sx={{ color: variant === 'error' ? '#ff5252' : '#4caf50' }}
//             />
//             <div className="snackbar-message">
//               <p className="snackbar-title">{message.title}</p>
//               <p className="snackbar-description">{message.description}</p>
//             </div>
//             <IconButton
//               onClick={handleCloseSnackbar}
//               className="snackbar-close-icon"
//             >
//               {' '}
//               {/* Use handleCloseSnackbar instead of onClose */}
//               <CloseIcon />
//             </IconButton>
//           </StyledSnackbar>
//         )}
//       </Grow>
//     </Snackbar>
//   );
// };
const DynamicSnackbar = ({ open, message, variant, onClose }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Use enqueueSnackbar for showing messages
  React.useEffect(() => {
    if (open && message?.title) {
      enqueueSnackbar(message.title, {
        variant,
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ),
      });
    }
  }, [open, message, variant, enqueueSnackbar, closeSnackbar]);

  // Since snackbar management is now handled by notistack, the component itself doesn't need to render anything.
  return null;
};

export default DynamicSnackbar;

DynamicSnackbar.displayName = 'DynamicSnackbar'; // Add display name

// eslint-disable-next-line react/display-name
const withDynamicSnackbar = (WrappedComponent) => (props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const { handleSnackBar } = useSnackBar(); // Obtain enqueueSnackbar function from useSnackBar hook

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState({
    title: '',
    description: '',
  });
  const [snackbarVariant, setSnackbarVariant] = React.useState('success');
  const [loading, setLoading] = React.useState(false);

  const showSnackbar = (message, variant = 'success') => {
    console.log('showSnackbar:', message, variant);
    const destructuredMessage = {
      title: message.title,
      description: message.description,
    };
    setSnackbarMessage(destructuredMessage);
    setSnackbarVariant(variant);
    setSnackbarOpen(true);
  };

  const hideSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
      <WrappedComponent
        {...props}
        showSnackbar={showSnackbar}
        setLoading={setLoading}
      />
      <DynamicSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        variant={snackbarVariant}
        onClose={hideSnackbar}
        loading={loading}
        // enqueueSnackbar={handleSnackBar(snackbarMessage, {
        //   severity: snackbarVariant,
        //   autoHideDuration: 6000,
        // })}
      />
    </React.Fragment>
  );
};

export { DynamicSnackbar, withDynamicSnackbar };

// const positioningStyles = {
//   entering: 'translateX(0)',
//   entered: 'translateX(0)',
//   exiting: 'translateX(500px)',
//   exited: 'translateX(500px)',
//   unmounted: 'translateX(500px)',
// };

const grey = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
};

const StyledSnackbar = styled(Box)(
  ({ theme, variant }) => `
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 16px;
  right: 16px;
  max-width: 560px;
  min-width: 300px;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? '0 2px 16px rgba(0,0,0, 0.5)'
      : `0 2px 16px ${grey[200]}`
  };
  padding: 0.75rem;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  text-align: start;

  & .snackbar-message {
    flex: 1 1 0%;
    max-width: 100%;
  }

  & .snackbar-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .snackbar-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
  }

  & .snackbar-close-icon {
    cursor: pointer;
    flex-shrink: 0;
    padding: 2px;
    border-radius: 4px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
    background: transparent;

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }
  }
  `
);
