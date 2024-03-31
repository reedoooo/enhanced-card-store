import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

export const useEventHandlers = () => {
  const [hoveredData, setHoveredData] = useState(null);
  const debouncedSetHoveredData = useCallback(
    debounce(setHoveredData, 100),
    []
  );
  const handleMouseMove = useCallback(
    (point) => {
      debouncedSetHoveredData(
        point ? { x: point?.data?.x, y: point?.data?.y } : null
      );
    },
    [debouncedSetHoveredData]
  );
  const handleMouseLeave = useCallback(
    () => debouncedSetHoveredData(null),
    [debouncedSetHoveredData]
  );
  return { hoveredData, handleMouseMove, handleMouseLeave };
};
