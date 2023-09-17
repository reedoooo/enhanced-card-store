// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
//   Button,
// } from '@mui/material';

// const DeckDialog = ({ open, onClose }) => {
//   const [newDeckInfo, setNewDeckInfo] = useState({ name: '', description: '' });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewDeckInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <Dialog open={open} onClose={() => onClose(null)}>
//       <DialogTitle>Create a New Deck</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           You don&apos;t have an existing deck. Would you like to create one?
//         </DialogContentText>
//         <TextField
//           autoFocus
//           margin="dense"
//           name="name"
//           label="Deck Name"
//           type="text"
//           fullWidth
//           onChange={handleInputChange}
//         />
//         <TextField
//           margin="dense"
//           name="description"
//           label="Deck Description"
//           type="text"
//           fullWidth
//           onChange={handleInputChange}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => onClose(null)} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={() => onClose(newDeckInfo)} color="primary">
//           Create
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default DeckDialog;
