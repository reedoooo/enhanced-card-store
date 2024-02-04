import React from 'react';
import SelectCollection from './SelectCollection';
import CollectionPortfolioContent from './CollectionPortfolioContent';
import useCollectionVisibility from '../../context/hooks/useCollectionVisibility';
import { PortfolioBoxA } from '../../context/hooks/style-hooks/usePortfolioStyles';
import { useCollectionStore, useMode } from '../../context';
import DashboardLayout from './DashBoard/DashBoardLayout';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import PageLayout from '../Containers/PageLayout';

const CollectionPortfolio = () => {
  const { theme } = useMode();
  const { selectedCollection, setSelectedCollection } = useCollectionStore();
  const { handleBackToCollections } = useCollectionVisibility();

  // Function to handle selection from SelectCollection
  const handleSelectCollection = (collection) => {
    setSelectedCollection(collection);
  };

  return (
    <PageLayout>
      <MDBox
        py={3}
        sx={{
          flexGrow: 1,
        }}
      >
        <PortfolioBoxA theme={theme}>
          {selectedCollection && Object.keys(selectedCollection).length > 0 ? (
            <CollectionPortfolioContent
              selectedCollection={selectedCollection}
              onBack={handleBackToCollections}
            />
          ) : (
            <SelectCollection onSelectCollection={handleSelectCollection} />
          )}
        </PortfolioBoxA>
      </MDBox>
    </PageLayout>
  );
};

export default CollectionPortfolio;
