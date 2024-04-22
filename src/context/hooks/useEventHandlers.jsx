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
        point ? { x: point?.x, y: point?.y, id: point?.id } : null
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
