import React, { useContext } from 'react';
import CardActionButtons from './CardActionButtons';
import useAppContext from '../../../context/hooks/useAppContext';
import { ModalContext } from '../../../context/ModalContext/ModalContext';
import { Box } from '@mui/material';

const GenericActionButtons = ({ card, context }) => {
  const contextProps = useAppContext(); // Assuming useAppContext returns the context object
  const { closeModal, isModalOpen, setModalOpen } = useContext(ModalContext);

  if (!contextProps) {
    return (
      <Box sx={{ color: 'error.main' }}>Provider not found for {context}</Box>
    );
  }

  let modifiedContextProps = contextProps[context];

  if (!modifiedContextProps) {
    return (
      <Box sx={{ color: 'error.main' }}>
        Invalid context provided: {context}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Vertical layout on small screens, horizontal on larger
        justifyContent: 'space-between', // Spread buttons evenly
        alignItems: 'center', // Center align the buttons
        gap: 1, // Add a small gap between buttons
        flexGrow: 1,
      }}
    >
      <CardActionButtons
        card={card}
        context={context}
        contextProps={modifiedContextProps}
        closeModal={() => setModalOpen(false)}
        open={isModalOpen}
      />
    </Box>
  );
};

export default GenericActionButtons;

// import React, { useContext } from 'react';
// import CardActionButtons from './CardActionButtons';
// import useAppContext from '../../../context/hooks/useAppContext';
// import { ModalContext } from '../../../context/ModalContext/ModalContext';
// import { Box } from '@mui/material';

// const GenericActionButtons = ({ card, context }) => {
//   const contextProps = useAppContext(); // Assuming useAppContext returns the context object
//   const { closeModal, isModalOpen, setModalOpen } = useContext(ModalContext);

//   if (!contextProps) {
//     return (
//       <Box sx={{ color: 'error.main' }}>Provider not found for {context}</Box>
//     );
//   }

//   let modifiedContextProps = contextProps[context];

//   if (!modifiedContextProps) {
//     return (
//       <Box sx={{ color: 'error.main' }}>
//         Invalid context provided: {context}
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-evenly',
//         height: '100%',
//       }}
//     >
//       <CardActionButtons
//         card={card}
//         context={context}
//         contextProps={modifiedContextProps}
//         closeModal={() => setModalOpen(false)}
//         open={isModalOpen}
//       />
//     </Box>
//   );
// };

// export default GenericActionButtons;

// import React, { useContext, useEffect } from 'react';
// import { makeStyles } from '@mui/styles';
// import GenericCardModal from '../../modals/GenericCardModal';
// import CardActionButtons from './CardActionButtons';
// import useAppContext from '../../../context/hooks/useAppContext';
// import { ModalContext } from '../../../context/ModalContext/ModalContext';

// const useStyles = makeStyles({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-evenly',
//     height: '100%',
//   },
// });

// const GenericActionButtons = ({
//   card,
//   context,
//   open,
//   openModal,
//   // closeModal,
//   // isModalOpen,
//   // setModalOpen,
// }) => {
//   const classes = useStyles();
//   const [contextProps, isContextAvailable] = useAppContext(context);
//   const {
//     openModalWithCard,
//     closeModal,
//     isModalOpen,
//     setModalOpen,
//     modalContent,
//   } = useContext(ModalContext);
//   if (!isContextAvailable) {
//     console.error(`The component isn't wrapped with the ${context}Provider`);
//     return null; // Consider rendering an error boundary or user-friendly error message instead.
//   }

//   // Ensure contextProps is an object with the expected methods before using them
//   if (
//     typeof contextProps !== 'object' ||
//     typeof contextProps[context] !== 'object'
//   ) {
//     console.error(`Invalid contextProps provided for the context: ${context}`);
//     return null; // Consider rendering an error boundary or user-friendly error message instead.
//   }

//   return (
//     <div className={classes.root}>
//       <CardActionButtons
//         card={card}
//         quantity={0}
//         context={context}
//         contextProps={contextProps}
//         openModal={openModal}
//         closeModal={() => setModalOpen(false)}
//         open={open}
//       />
//       {/* <GenericCardModal
//         open={isModalOpen}
//         closeModal={closeModal}
//         context={context}
//         card={card}
//       /> */}
//     </div>
//   );
// };

// export default GenericActionButtons;
