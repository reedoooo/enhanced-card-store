import React from 'react';
import CardList from '../../components/grids/collectionGrids/CardList';
import { useTheme } from 'styled-components';
import {
  CardListContainerBox,
  CardListContainerGrid,
} from '../../context/hooks/style-hooks/usePortfolioStyles';
import { useMode } from '../../context';

const CollectionPortfolioListContainer = ({ selectedCards, removeCard }) => {
  const { theme } = useMode();

  return (
    <CardListContainerBox>
      <CardListContainerGrid>
        <CardList selectedCards={selectedCards} removeCard={removeCard} />
      </CardListContainerGrid>
    </CardListContainerBox>
  );
};

export default CollectionPortfolioListContainer;
