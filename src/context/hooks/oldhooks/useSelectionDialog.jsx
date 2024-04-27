// import { useState, useCallback } from 'react';
// import { useCollectionStore } from '../MAIN_CONTEXT/CollectionContext/CollectionContext';
// import { useDeckStore } from '../MAIN_CONTEXT/DeckContext/DeckContext';

// export const useSelectionDialog = (
//   context,
//   // selectedCollection,
//   selectedDeck,
//   // allCollections,
//   allDecks
// ) => {

//   const { setSelectedDeck } = useDeckStore();
//   const [selectDialogOpen, setSelectDialogOpen] = useState(false);
//   const [itemsForSelection, setItemsForSelection] = useState([]);

//   const openSelectionDialog = useCallback(() => {
//     if (!selectedCollection || !selectedDeck) {
//       setItemsForSelection(
//         context === 'Collection' ? allCollections : allDecks
//       );
//       setSelectDialogOpen(true);
//     }
//   }, [selectedCollection, selectedDeck, allCollections, allDecks, context]);

//   const handleSelection = (item) => {
//     context === 'Collection'
//       ? handleSelectCollection(item)
//       : setSelectedDeck(item);
//     setSelectDialogOpen(false);
//   };

//   return {
//     selectDialogOpen,
//     itemsForSelection,
//     openSelectionDialog,
//     handleSelection,
//     setSelectDialogOpen,
//   };
// };
