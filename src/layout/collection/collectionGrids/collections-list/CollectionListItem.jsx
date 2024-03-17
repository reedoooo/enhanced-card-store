// import React, { memo, useCallback, useRef } from 'react';
// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   Grid,
//   Tooltip,
// } from '@mui/material';
// import PropTypes from 'prop-types';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import useCollectionManager from '../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
// import MDBox from '../../../../layout/REUSABLE_COMPONENTS/MDBOX';
// import MDTypography from '../../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
// import LongMenu from '../../../../layout/navigation/LongMenu';
// import useDialogState from '../../../../context/hooks/useDialogState';
// import CollectionDialog from '../../../../components/dialogs/CollectionDialog';
// import useSelectedCollection from '../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
// import { useMode, useVisibilityContext } from '../../../../context';

// const CollectionInfoItem = ({ label, value, theme }) => (
//   <Grid item xs={12} sm={6} md={3}>
//     <CardContent
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         height: '100%',
//       }}
//     >
//       <MDTypography
//         variant="h5"
//         sx={{
//           fontSize: '2.2rem', // Triple the label size
//           fontWeight: 900, // Increase boldness
//           textAlign: 'center',
//           color: theme.palette.primary.main,
//         }}
//       >
//         {label}:
//       </MDTypography>
//       <MDTypography
//         variant="body1"
//         component="p" // Switching from strong to p for better style control
//         sx={{
//           fontSize: '1.2rem', // Double the value size
//           textAlign: 'center',
//           // fontFamily: "'Roboto Slab', serif", // Keeping a fancy yet readable font
//           color: theme.palette.grey[300], // Light grey color for a subtler look
//         }}
//       >
//         {value}
//       </MDTypography>
//     </CardContent>
//   </Grid>
// );

// const CollectionListItem = memo(({ collection }) => {
//   const { theme } = useMode();
//   const { deleteCollection } = useCollectionManager();
//   const { handleSelectCollection } = useSelectedCollection();
//   const { toggleCollectionVisibility } = useVisibilityContext();
//   const { dialogState, openDialog, closeDialog } = useDialogState({
//     isEditCollectionDialogOpen: false,
//   });

//   const handleOpenDialog = useCallback(() => {
//     openDialog('editCollectionDialog', collection);
//   }, [collection, openDialog]);

//   const handleCloseDialog = useCallback(() => {
//     closeDialog('editCollectionDialog');
//   }, [closeDialog]);

//   const handleDelete = async () => {
//     await deleteCollection(collection._id);
//   };

//   const renderToolTip = () => (
//     <Tooltip title="Options">
//       <div>
//         <LongMenu
//           onEdit={handleOpenDialog}
//           onDelete={handleDelete}
//           onSelect={() => handleSelectCollection(collection)}
//           collectionId={collection._id}
//         />
//       </div>
//     </Tooltip>
//   );

//   const renderPercentageChange = () => {
//     const percentageChange =
//       collection.collectionStatistics?.percentageChange || 0;
//     return (
//       <MDTypography
//         variant="body2"
//         color={percentageChange > 0 ? 'success' : 'error'}
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontSize: '1.5rem', // Triple the label size
//         }}
//       >
//         {percentageChange > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
//         {percentageChange}%
//       </MDTypography>
//     );
//   };

//   const handleSelection = useCallback(() => {
//     handleSelectCollection(collection);
//     toggleCollectionVisibility();
//   }, [collection, handleSelectCollection, toggleCollectionVisibility]);

//   return (
//     <Card>
//       <MDBox
//         // sx={{
//         //   display: 'flex',
//         //   flexDirection: 'row',
//         //   justifyContent: 'center',
//         //   height: '100%', // Ensure full height
//         // }}
//         sx={{
//           // backgroundColor: '#2d2d34',
//           // backgroundColor: 'rgba(45, 45, 52, 0.5)',
//           borderColor: theme.palette.primary.main,
//           display: 'flex',
//           borderRadius: '1rem',
//           boxShadow: '0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)',
//           flexGrow: 1,
//           flexDirection: 'row',
//           justifyContent: 'center',
//           height: '100%', // Ensure full height
//         }}
//       >
//         <CardActionArea
//           onClick={handleSelection}
//           // sx={{
//           //   backgroundColor: '#2d2d34',
//           //   borderRadius: '1rem',
//           //   boxShadow: '0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)',
//           //   flexGrow: 1,
//           // }}
//           sx={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'center',
//             height: '100%', // Ensure full height
//             flexGrow: 1,
//           }}
//         >
//           <Grid container alignItems="center" justify="center" spacing={2}>
//             <CollectionInfoItem
//               label="Name"
//               value={collection.name}
//               theme={theme}
//             />
//             <CollectionInfoItem
//               label="Value"
//               value={`$${collection.totalPrice}`}
//               theme={theme}
//             />
//             <CollectionInfoItem
//               label="Cards"
//               value={collection.totalQuantity}
//               theme={theme}
//             />
//             <Grid item xs={12} sm={6} md={3}>
//               {renderPercentageChange()}
//             </Grid>
//           </Grid>
//         </CardActionArea>
//         <CardContent
//           sx={{
//             borderRadius: '50%',
//             width: 40,
//             height: 40,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: theme.palette.success.main,
//             mt: theme.spacing(1),
//             mr: theme.spacing(1),
//           }}
//         >
//           {renderToolTip()}
//         </CardContent>
//       </MDBox>
//       {dialogState.isEditCollectionDialogOpen && (
//         <CollectionDialog
//           open={dialogState.isEditCollectionDialogOpen}
//           onClose={handleCloseDialog}
//           collectionData={collection}
//         />
//       )}
//     </Card>
//   );
// });

// CollectionListItem.displayName = 'CollectionListItem';

// CollectionListItem.propTypes = {
//   collection: PropTypes.object.isRequired,
// };

// export default CollectionListItem;
import React, { memo, useCallback } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import MDBox from '../../../../layout/REUSABLE_COMPONENTS/MDBOX';
import useCollectionManager from '../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import useSelectedCollection from '../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useDialogState from '../../../../context/hooks/useDialogState';
import { useMode, useVisibilityContext } from '../../../../context';
import CollectionDialog from '../../../../components/dialogs/CollectionDialog';
import LongMenu from '../../../../layout/navigation/LongMenu';
import MDTypography from '../../../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import RCChange from '../../../REUSABLE_COMPONENTS/RC/RCChange';

const CollectionInfoItem = ({ label, value, theme }) => (
  <Grid item xs={12} sm={6} md={3}>
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <MDTypography
        variant="h4"
        fontWeight="medium"
        sx={{ color: theme.palette.chartTheme.grey.darkest }}
      >
        {`${label}:`}
      </MDTypography>
      <MDTypography
        variant="h6"
        sx={{ color: theme.palette.chartTheme.grey.light }}
      >
        {value}
      </MDTypography>
    </CardContent>
  </Grid>
);

CollectionInfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  theme: PropTypes.object.isRequired,
};

const CollectionListItem = memo(({ collection }) => {
  const { theme } = useMode();
  const { deleteCollection } = useCollectionManager();
  const { handleSelectCollection } = useSelectedCollection();
  const { toggleCollectionVisibility } = useVisibilityContext();
  const { dialogState, openDialog, closeDialog } = useDialogState({
    isEditCollectionDialogOpen: false,
  });

  const handleOpenDialog = useCallback(() => {
    openDialog('editCollectionDialog', collection);
  }, [collection, openDialog]);

  const handleCloseDialog = useCallback(() => {
    closeDialog('editCollectionDialog');
  }, [closeDialog]);

  const handleDelete = async () => {
    await deleteCollection(collection._id);
  };

  const renderToolTip = () => (
    <Tooltip title="Options">
      <div>
        <LongMenu
          onEdit={handleOpenDialog}
          onDelete={handleDelete}
          onSelect={() => handleSelectCollection(collection)}
          collectionId={collection._id}
        />
      </div>
    </Tooltip>
  );

  const percentageChange =
    collection.collectionStatistics?.percentageChange || 0;

  const handleSelection = useCallback(() => {
    handleSelectCollection(collection);
    toggleCollectionVisibility();
  }, [collection, handleSelectCollection, toggleCollectionVisibility]);

  return (
    <Card>
      <MDBox
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <CardActionArea
          onClick={handleSelection}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexGrow: 1,
          }}
        >
          <Grid container alignItems="center" justify="center" spacing={2}>
            <CollectionInfoItem
              label="Name"
              value={collection.name}
              theme={theme}
            />
            <CollectionInfoItem
              label="Value"
              value={`$${collection.totalPrice}`}
              theme={theme}
            />
            <CollectionInfoItem
              label="Cards"
              value={collection.totalQuantity}
              theme={theme}
            />
            <Grid item xs={12} sm={6} md={3}>
              <RCChange
                progress={100} // Default value; replace with actual data if available
                increase={percentageChange > 0}
                change={percentageChange}
                rangeLevel="24hr" // Default value; replace with actual data if available
              />
            </Grid>
          </Grid>
        </CardActionArea>
        <MDBox>
          <CardContent
            sx={{
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.success.main,
              mt: theme.spacing(1),
              mr: theme.spacing(1),
            }}
          >
            {renderToolTip()}
          </CardContent>
        </MDBox>
      </MDBox>
      {dialogState.isEditCollectionDialogOpen && (
        <CollectionDialog
          open={dialogState.isEditCollectionDialogOpen}
          onClose={handleCloseDialog}
          collectionData={collection}
        />
      )}
    </Card>
  );
});

CollectionListItem.displayName = 'CollectionListItem';

CollectionListItem.propTypes = {
  collection: PropTypes.object.isRequired,
};

export default CollectionListItem;
