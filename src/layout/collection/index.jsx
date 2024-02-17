import React from 'react';
import SelectCollection from './SelectCollection';
import CollectionPortfolioContent from './CollectionPortfolioContent';
import useCollectionVisibility from '../../context/hooks/useCollectionVisibility';
import { useCollectionStore, useMode } from '../../context';
import DashboardLayout from '../Containers/DashBoardLayout';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import PageLayout from '../Containers/PageLayout';
import { PortfolioBoxA } from '../../pages/pageStyles/StyledComponents';

const CollectionPortfolio = () => {
  const { theme } = useMode();
  const { selectedCollection, hasFetchedCollections } = useCollectionStore();
  const { handleBackToCollections } = useCollectionVisibility();

  return (
    <PageLayout>
      <MDBox
        py={2}
        px={1}
        sx={{
          flexGrow: 1,
          backgroundColor: theme.palette.backgroundE.lightestBlue,
          borderColor: theme.palette.backgroundE.darkest,
          borderWidth: '4px',
        }}
      >
        <PortfolioBoxA theme={theme}>
          {selectedCollection && hasFetchedCollections ? (
            <CollectionPortfolioContent
              selectedCollection={selectedCollection}
              onBack={handleBackToCollections}
            />
          ) : (
            <SelectCollection />
          )}
        </PortfolioBoxA>
      </MDBox>
    </PageLayout>
  );
};

export default CollectionPortfolio;
