import React, { useEffect } from 'react';
import DeckBuilder from '../layout/deck';
import PageLayout from '../layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';

// ==============================|| DECK BUILDER PAGE ||============================== //

const DeckBuilderPage = () => {
  return (
    <PageLayout>
      <DeckBuilder />
    </PageLayout>
  );
};

export default DeckBuilderPage;
