import { useState, useCallback } from 'react';

const useMap = (initialMap = new Map()) => {
  const [mapData, setMapData] = useState(initialMap);

  const setMap = useCallback((key, value) => {
    setMapData((prevMap) => new Map(prevMap).set(key, value));
  }, []);

  const deleteKey = useCallback((key) => {
    setMapData((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const clear = useCallback(() => {
    setMapData(new Map());
  }, []);

  const get = useCallback(
    (key) => {
      return mapData.get(key);
    },
    [mapData]
  );

  const has = useCallback(
    (key) => {
      return mapData.has(key);
    },
    [mapData]
  );

  return { mapData, setMap, deleteKey, clear, get, has };
};

export default useMap;
