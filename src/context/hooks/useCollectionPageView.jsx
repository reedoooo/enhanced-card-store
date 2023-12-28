// useCollectionViews.js
import { useState, useCallback } from 'react';

const useCollectionViews = () => {
  const [isCollectionView, setIsCollectionView] = useState(true);

  const showCollectionView = useCallback(() => {
    setIsCollectionView(true);
  }, []);

  const showCollectionContent = useCallback(() => {
    setIsCollectionView(false);
  }, []);

  return { isCollectionView, showCollectionView, showCollectionContent };
};

export default useCollectionViews;
