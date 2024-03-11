import { Snackbar, IconButton, Box, Grow } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Close as CloseIcon } from '@mui/icons-material';

// eslint-disable-next-line react/display-name
const withDynamicSnackbar = (WrappedComponent) => (props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showSnackbar = (message, variant = 'success') => {
    enqueueSnackbar(message, {
      variant,
      action: (key) => (
        <IconButton size="small" onClick={() => closeSnackbar(key)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      ),
    });
  };

  return <WrappedComponent {...props} showSnackbar={showSnackbar} />;
};

export { withDynamicSnackbar };

const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
};

//   const [snackbarOpen, setSnackbarOpen] = React.useState(false);
//   const [snackbarMessage, setSnackbarMessage] = React.useState({
//     title: '',
//     description: '',
//   });
//   const [snackbarVariant, setSnackbarVariant] = React.useState('success');
//   const [loading, setLoading] = React.useState(false);

//   const showSnackbar = (message, variant = 'success') => {
//     console.log('showSnackbar:', message, variant);
//     const destructuredMessage = {
//       title: message.title,
//       description: message.description,
//     };
//     setSnackbarMessage(destructuredMessage);
//     setSnackbarVariant(variant);
//     setSnackbarOpen(true);
//   };

//   const hideSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <WrappedComponent
//         {...props}
//         showSnackbar={showSnackbar}
//         setLoading={setLoading}
//       />
//       <DynamicSnackbar
//         open={snackbarOpen}
//         message={snackbarMessage}
//         variant={snackbarVariant}
//         onClose={hideSnackbar}
//         loading={loading}
//         // enqueueSnackbar={handleSnackBar(snackbarMessage, {
//         //   severity: snackbarVariant,
//         //   autoHideDuration: 6000,
//         // })}
//       />
//     </React.Fragment>
//   );
// };
