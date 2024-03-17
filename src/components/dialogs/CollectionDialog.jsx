// import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import {
//   Avatar,
//   Box,
//   CssBaseline,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   Divider,
//   Grid,
//   Paper,
// } from '@mui/material';
// import { useCollectionStore, useFormContext, useMode } from '../../context';
// import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
// import AddCollectionForm from '../forms/AddCollectionForm';
// import UpdateCollectionForm from '../forms/UpdateCollectionForm';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
// import {
//   DialogPaper,
//   StyledDialog,
//   StyledDialogContent,
// } from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
// import MDAvatar from '../../layout/REUSABLE_COMPONENTS/MDAVATAR';
// const CollectionDialog = ({
//   open,
//   onClose,
//   isNew,
//   collectionData,
//   collectionMode,
// }) => {
//   const {
//     formMethods,
//     onSubmit,
//     setFormSchema,
//     currentSchemaKey,
//     currentForm,
//     setCurrentForm,
//   } = useFormContext();
//   const { theme } = useMode();

//   useEffect(() => {
//     if (collectionMode === 'edit') {
//       setCurrentForm('updateCollectionForm');
//     }
//   }, [collectionMode, setCurrentForm]);

//   return (
//     <StyledDialog
//       className="dialog-login"
//       open={open}
//       onClose={onClose}
//       tbeme={theme}
//       aria-labelledby="responsive-dialog-title"
//       maxWidth="xl"
//     >
//       <CssBaseline />
//       <DialogPaper theme={theme}>
//         <DialogTitle
//           id="responsive-dialog-title"
//           sx={{
//             margin: '0 2rem',
//             display: 'flex',
//             flexDirection: 'row',
//             alignItems: 'center',
//             textAlign: 'center',
//             justifyContent: 'center',
//             width: 'auto',
//             boxSizing: 'border-box',
//             color: theme.palette.text.primary,
//           }}
//         >
//           <MDBox
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               border: 'none',
//             }}
//           >
//             <MDAvatar sx={{ m: 1, bgcolor: theme.palette.backgroundG.light }}>
//               <LockOutlinedIcon />
//             </MDAvatar>
//             <MDTypography component="h1" variant="h4">
//               {currentForm === 'addCollectionForm'
//                 ? 'Add a Collection'
//                 : 'Update a Collection'}
//             </MDTypography>
//           </MDBox>
//         </DialogTitle>{' '}
//       </DialogPaper>
//       <Divider />

//       <StyledDialogContent theme={theme} elevation={20}>
//         {currentForm === 'addCollectionForm' ? (
//           <AddCollectionForm />
//         ) : (
//           <UpdateCollectionForm collectionData={collectionData} />
//         )}
//       </StyledDialogContent>
//     </StyledDialog>
//   );
// };

// CollectionDialog.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   isNew: PropTypes.bool,
//   collectionData: PropTypes.shape({
//     name: PropTypes.string,
//     description: PropTypes.string,
//   }),
// };

// export default CollectionDialog;
import React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, DialogTitle, Divider } from '@mui/material';
import { useMode } from '../../context';
import CollectionForm from '../forms/CollectionForm'; // Adjusted import
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import {
  DialogPaper,
  StyledDialog,
  StyledDialogContent,
} from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import MDAvatar from '../../layout/REUSABLE_COMPONENTS/MDAVATAR';

const CollectionDialog = ({ open, onClose, isNew, collectionData }) => {
  const { theme } = useMode();

  const actionType = isNew ? 'add' : 'update';

  return (
    <StyledDialog
      className="dialog-login"
      open={open}
      onClose={onClose}
      theme={theme}
      aria-labelledby="responsive-dialog-title"
      maxWidth="xl"
    >
      <CssBaseline />
      <DialogPaper theme={theme}>
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            margin: '0 2rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            width: 'auto',
            boxSizing: 'border-box',
            color: theme.palette.text.primary,
          }}
        >
          <MDBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
            }}
          >
            <MDAvatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
              <LockOutlinedIcon />
            </MDAvatar>
            <MDTypography component="h1" variant="h4">
              {isNew ? 'Add a Collection' : 'Update a Collection'}
            </MDTypography>
          </MDBox>
        </DialogTitle>
      </DialogPaper>
      <Divider />

      <StyledDialogContent theme={theme} elevation={20}>
        <CollectionForm
          collectionData={!isNew ? collectionData : undefined}
          actionType={actionType}
        />
      </StyledDialogContent>
    </StyledDialog>
  );
};

CollectionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  collectionData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default CollectionDialog;
