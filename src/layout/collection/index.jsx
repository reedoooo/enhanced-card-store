import React, { useCallback, useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';
import useCollectionVisibility from '../../context/hooks/useCollectionVisibility';
import {
  useCollectionStore,
  useMode,
  useVisibilityContext,
} from '../../context';
import DashboardLayout from '../Containers/DashBoardLayout';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import PageLayout from '../Containers/PageLayout';
import { PortfolioBoxA } from '../../pages/pageStyles/StyledComponents';
import { Grid, Card, Typography } from '@mui/material';
import { useFormContext } from '../../context';
import CollectionDialog from '../../components/dialogs/CollectionDialog';
import collectionPortfolioData from './data/collectionPortfolioData';
import ChartGridLayout from './collectionGrids/ChartGridLayout';
import StatisticsCardGrid from './collectionGrids/StatisticsCardsGrid';
import CollectionPortfolioHeader from './sub-components/CollectionPortfolioHeader';
import CollectionListStats from './collectionGrids/CollectionListStats';
import SelectCollectionList from './collectionGrids/collections-list/SelectCollectionList';
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useSnackBar from '../../context/hooks/useSnackBar';
import { withDynamicSnackbar } from '../REUSABLE_COMPONENTS/HOC/DynamicSnackbar';
import SelectionErrorDialog from '../../components/dialogs/SelectionErrorDialog';
import useCollectionManager from '../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import useSkeletonLoader from './collectionGrids/cards-datatable/useSkeletonLoader';
import { DEFAULT_COLLECTION } from '../../context/constants';
import useDialogState from '../../context/hooks/useDialogState';
import SelectCollectionHeader from './collectionGrids/collections-list/SelectCollectionHeader';
import DashboardBox from '../REUSABLE_COMPONENTS/DashboardBox';
import StatBoard from './collectionGrids/collections-list/StatBoard';

const CollectionPortfolio = () => {
  const { theme } = useMode();
  const { fetchCollections, hasFetchedCollections } = useCollectionManager();
  const {
    handleBackToCollections,
    selectedCollection,
    selectedCollectionId,
    allCollections,
    customError,
    toggleShowCollections,
  } = useSelectedCollection();
  useEffect(() => {
    fetchCollections();
  }, []);
  const { currentForm } = useFormContext();
  const { isCollectionVisible, toggleCollectionVisibility } =
    useVisibilityContext();

  const { dialogState, openDialog, closeDialog } = useDialogState({
    isAddCollectionDialogOpen: false,
    isSelectionErrorDialogOpen: false,
    isConfirmationDialogOpen: false, // New dialog state
  });
  const [viewState, setViewState] = useState({
    showListOfAllCollections: isCollectionVisible,
    showSelectedCollection: !isCollectionVisible,
    currentCollection: selectedCollectionId,
  });
  const handleAddCollectionDialogToggle = useCallback(() => {
    openDialog('isAddCollectionDialogOpen');
  }, [openDialog]);

  const handleCloseAddCollectionDialog = useCallback(() => {
    closeDialog('isAddCollectionDialogOpen');
  }, [closeDialog]);

  const handleSelectionErrorDialogToggle = useCallback(() => {
    openDialog('isSelectionErrorDialogOpen');
  }, [openDialog]);

  const handleCloseSelectionErrorDialog = useCallback(() => {
    closeDialog('isSelectionErrorDialogOpen');
  }, [closeDialog]);
  useEffect(() => {
    if (customError === 'Selection Error') {
      handleSelectionErrorDialogToggle();
    } else {
      handleCloseSelectionErrorDialog();
    }
  }, [customError]);
  const handleDialogToggle = useCallback(
    (dialogName) => {
      dialogState[dialogName]
        ? closeDialog(dialogName)
        : openDialog(dialogName);
    },
    [dialogState, openDialog, closeDialog]
  );
  useEffect(() => {
    console.log('VIEW STATE CHANGED', viewState);
  }, [viewState]);
  const { columns, data } = collectionPortfolioData(selectedCollection?.cards);

  return (
    <MDBox
      py={2}
      px={1}
      theme={theme}
      sx={{
        flexGrow: 1,
      }}
    >
      <PortfolioBoxA theme={theme}>
        {!isCollectionVisible ? (
          <DashboardLayout>
            <MDBox theme={theme}>
              <DashboardBox
                sx={{
                  p: theme.spacing(2),
                }}
              >
                <SelectCollectionHeader
                  openNewDialog={handleAddCollectionDialogToggle}
                />
              </DashboardBox>
              <DashboardBox
                sx={{
                  px: theme.spacing(2),
                }}
              >
                <StatBoard />
              </DashboardBox>
              <DashboardBox
                sx={{
                  px: theme.spacing(2),
                }}
              >
                <SelectCollectionList
                  openDialog={handleAddCollectionDialogToggle}
                />
              </DashboardBox>

              {dialogState.isAddCollectionDialogOpen && (
                <CollectionDialog
                  open={dialogState.isAddCollectionDialogOpen}
                  onClose={handleCloseAddCollectionDialog}
                  collectionData={{
                    name: selectedCollection?.name,
                    description: selectedCollection?.description,
                  }}
                  collectionMode={'add'}
                  isNew={currentForm === 'addCollectionForm'}
                  // handleBackToCollections={handleBackToCollections}
                  // removeOneFromCollection={removeOneFromCollection}
                  // totalQuantity={totalQuantity}
                  // selectedCollectionId={selectedCollectionId}
                />
              )}
              {dialogState.isSelectionErrorDialogOpen && (
                <SelectionErrorDialog
                  open={dialogState.isSelectionErrorDialogOpen}
                  onClose={handleCloseSelectionErrorDialog}
                  selectedValue={selectedCollection?.name}
                  handleBackToCollections={handleBackToCollections}
                />
              )}
            </MDBox>
          </DashboardLayout>
        ) : (
          // Selected collection view
          <DashboardLayout>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <CollectionPortfolioHeader
                  onBack={toggleCollectionVisibility}
                  collection={selectedCollection}
                  allCollections={allCollections}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <StatisticsCardGrid selectedCollection={selectedCollection} /> */}
              </Grid>
              <Grid item xs={12}>
                <ChartGridLayout
                  selectedCards={selectedCollection?.cards}
                  columns={columns}
                  data={data}
                />
              </Grid>
            </Grid>
          </DashboardLayout>
        )}
      </PortfolioBoxA>
    </MDBox>
  );
};

export default withDynamicSnackbar(CollectionPortfolio);
// {
//   viewState.showListOfAllCollections && (
//     <DashboardLayout>
//       <MDBox theme={theme}>
//         <Card
//           sx={{
//             backgroundColor: theme.palette.backgroundE.darker,
//             flexGrow: 1,
//             width: '100%',
//           }}
//         >
//           <SelectCollectionHeader
//             openNewDialog={handleAddCollectionDialogToggle}
//           />
//         </Card>

//         <MDBox mt={4.5}>
//           <Card
//             sx={{
//               backgroundColor: theme.palette.backgroundE.darker,
//               flexGrow: 1,
//               width: '100%',
//               p: theme.spacing(2),
//             }}
//           >
//             <SelectCollectionList
//               openDialog={handleAddCollectionDialogToggle}
//             />
//           </Card>
//         </MDBox>
//         {dialogState.isDialogOpen && (
//           <CollectionDialog
//             open={dialogState.isDialogOpen}
//             onClose={handleCloseAddCollectionDialog}
//             collectionData={{
//               name: selectedCollection?.name,
//               description: selectedCollection?.description,
//             }}
//             collectionMode={'add'}
//             isNew={currentForm === 'addCollectionForm'}
//             handleBackToCollections={handleBackToCollections}
//             removeOneFromCollection={removeOneFromCollection}
//             totalQuantity={totalQuantity}
//             selectedCollectionId={selectedCollectionId}
//           />
//         )}
//         {dialogState.isSelectionErrorDialogOpen && (
//           <SelectionErrorDialog
//             open={dialogState.isSelectionErrorDialogOpen}
//             onClose={handleCloseSelectionErrorDialog}
//             selectedValue={selectedCollection?.name}
//             handleBackToCollections={handleBackToCollections}
//           />
//         )}
//       </MDBox>
//     </DashboardLayout>
//   );
// }
// {
//   viewState.showSelectedCollection && (
//     <DashboardLayout>
//       <Grid container spacing={1}>
//         <Grid item xs={12}>
//           <CollectionPortfolioHeader
//             onBack={() => {
//               handleBackToCollections();
//               handleSelectedCollectionView();
//             }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//         </Grid>
//         <Grid item xs={12}>
//           <ChartGridLayout
//             selectedCards={selectedCollection?.cards}
//             columns={columns}
//             data={data}
//           />
//         </Grid>
//       </Grid>
//     </DashboardLayout>
//   );
// }
// const [isDialogOpen, setDialogOpen] = useState(false);
// const [isSelectionErrorDialogOpen, setSelectionErrorDialogOpen] =
//   useState(false);
// const { currentForm } = useFormContext();
// currentForm === 'addCollectionForm'
// const openNewDialog = useCallback((addOrEdit) => {
//   setDialogOpen(true); // Correctly opens the dialog
// }, []);
// const handleDialogToggle = () => setDialogOpen(!isDialogOpen);
// const handleCloseDialog = () => setDialogOpen(false);
// const handleErrorDialog = () => setSelectionErrorDialogOpen(true);
// const handleCloseErrorDialog = () => setSelectionErrorDialogOpen(false);

// if (!hasFetchedCollections) {
//   return (
//     <DashboardLayout>
//       <MDBox center>
//         <Typography variant="h4">Loading...</Typography>
//       </MDBox>
//     </DashboardLayout>
//   );
// }

// return (
//   <MDBox
//     py={2}
//     px={1}
//     sx={{
//       flexGrow: 1,
//       backgroundColor: theme.palette.backgroundE.lightestBlue,
//       borderColor: theme.palette.backgroundE.darkest,
//       borderWidth: '4px',
//     }}
//   >
//     <PortfolioBoxA theme={theme}>
//       {showCollections ? (
//         <DashboardLayout>
//           <Grid container spacing={1}>
//             {/* HEADER */}
//             <Grid item xs={12}>
//               <CollectionPortfolioHeader
//                 onBack={handleBackToCollections}
//                 collectionName={selectedCollection?.name}
//                 totalQuantity={totalQuantity}
//                 selectedCollection={selectedCollection}
//               />
//             </Grid>
//             {/* STATISTICS FEATURE GRID */}
//             <Grid item xs={12}>
//               {/* <StatisticsCardGrid selectedCollection={selectedCollection} /> */}
//             </Grid>
//             {/* CHARTS */}
//             <Grid item xs={12}>
//               <ChartGridLayout
//                 selectedCards={selectedCollection?.cards}
//                 removeCard={removeOneFromCollection}
//                 columns={columns}
//                 data={data}
//               />
//             </Grid>
//           </Grid>
//         </DashboardLayout>
//       ) : (
//         <DashboardLayout>
//           <MDBox
//             sx={{
//               p: theme.spacing(2),
//             }}
//           >
//             {/* HEADER */}
//             <Grid container spacing={2}>
//               <Card
//                 sx={{
//                   backgroundColor: theme.palette.backgroundE.darker,
//                   flexGrow: 1,
//                   width: '100%',
//                 }}
//               >
//                 <SelectCollectionHeader openNewDialog={openNewDialog} />
//               </Card>
//             </Grid>
//             {/* COLLECTION LIST STATS DISPLAY */}
//             <MDBox mt={4.5}>
//               <Card
//                 sx={{
//                   backgroundColor: theme.palette.backgroundE.darker,
//                   flexGrow: 1,
//                   width: '100%',
//                   p: theme.spacing(2),
//                 }}
//               >
//                 <CollectionListStats />
//               </Card>
//             </MDBox>
//             {/* COLLECTION LIST */}
//             <MDBox mt={4.5}>
//               <Card
//                 sx={{
//                   backgroundColor: theme.palette.backgroundE.darker,
//                   flexGrow: 1,
//                   width: '100%',
//                   p: theme.spacing(2),
//                 }}
//               >
//                 <SelectCollectionList
//                   openDialog={handleDialogToggle}
//                   allCollections={allCollections}
//                 />
//               </Card>
//             </MDBox>

//             {isDialogOpen && (
//               <CollectionDialog
//                 open={isDialogOpen}
//                 onClose={handleCloseDialog} // Use the simplified close function here
//                 isNew={currentForm === 'addCollectionForm'}
//                 collectionData={selectedCollection}
//                 collectionMode={'add'}
//               />
//             )}
//             {isSelectionErrorDialogOpen && (
//               <SelectionErrorDialog
//                 open={isSelectionErrorDialogOpen}
//                 onClose={handleCloseErrorDialog}
//                 selectedValue={selectedCollection?.name}
//               />
//             )}
//           </MDBox>
//         </DashboardLayout>
//       )}
//     </PortfolioBoxA>
//   </MDBox>
// );

// export default withDynamicSnackbar(CollectionPortfolio);
