import { useEffect } from 'react';
import { defaultValues, constants } from '../../../simplified_constants';
import useLocalStorage from '../../../hooks/useLocalStorage';

const useInitializeCollections = () => {
  const [collections, setCollections] = useLocalStorage(
    'collections',
    defaultValues.defaultCollections
  );

  useEffect(() => {
    if (!collections || collections?.allIds?.length === 0) {
      const updatedById = { ...defaultValues.defaultCollections.byId };
      Object.keys(updatedById).forEach((id) => {
        const collection = updatedById[id];
        if (
          collection.averagedChartData &&
          collection.averagedChartData['24hr']
        ) {
          updatedById[id].selectedChartData =
            collection.averagedChartData['24hr'];
        }
      });
      setCollections({
        ...defaultValues.defaultCollections,
        byId: updatedById,
      });
    }
  }, []);

  return [collections, setCollections];
};

export default useInitializeCollections;
