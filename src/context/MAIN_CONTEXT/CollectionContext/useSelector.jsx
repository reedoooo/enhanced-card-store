import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import set from 'lodash/set';

const useSelector = (entityKey, defaultValues) => {
  const initialEntities = {
    byId: {},
    allIds: [],
    selectedId: null,
    prevSelectedId: null,
  };
  const [entities, setEntities] = useLocalStorage(entityKey, initialEntities);
  // useEffect(() => {
  //   console.log('Entities updated:', entities);
  //   localStorage.setItem(entityKey, JSON.stringify(entities)); // Ensure sync with local storage
  // }, [entities, entityKey]);
  const [entityUpdated, setEntityUpdated] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const refreshEntities = useCallback(() => {
    setEntityUpdated((prevState) => !prevState);
  }, []);

  const modifyEntity = useCallback(
    (modifyFn) => {
      setEntities((prevEntities) => {
        const updatedEntities = modifyFn({ ...prevEntities });
        return updatedEntities;
      });
      refreshEntities();
    },
    [setEntities, refreshEntities]
  );

  const updateEntityField = useCallback(
    (entityId, fieldPath, value) => {
      modifyEntity((currentEntities) =>
        set(currentEntities, `byId.${entityId}.${fieldPath}`, value)
      );
    },
    [modifyEntity]
  );

  const handleSelectEntity = useCallback(
    (entity) => {
      setSelectedId(entity?._id);
      console.log('ENTITY', entity?.name, 'HAS BEEN SELECTED');
      modifyEntity((currentEntities) => ({
        ...currentEntities,
        selectedId: entity?._id,
        prevSelectedId: currentEntities.selectedId,
      }));
    },
    [modifyEntity]
  );

  const addOrUpdateEntity = useCallback(
    (entity) => {
      modifyEntity((currentEntities) => {
        const updatedById = { ...currentEntities.byId };
        updatedById[entity._id] = entity;

        const updatedAllIds = currentEntities.allIds.includes(entity._id)
          ? [...currentEntities.allIds]
          : [...currentEntities.allIds, entity._id];

        return {
          ...currentEntities,
          byId: updatedById,
          allIds: updatedAllIds,
          lastUpdated: new Date().toISOString(),
        };
      });
    },
    [modifyEntity]
  );

  const removeEntity = useCallback(
    (entityId) => {
      modifyEntity((currentEntities) => {
        const { [entityId]: _, ...remainingById } = currentEntities.byId;
        const remainingAllIds = currentEntities.allIds.filter(
          (id) => id !== entityId
        );
        return {
          ...currentEntities,
          byId: remainingById,
          allIds: remainingAllIds,
        };
      });
    },
    [modifyEntity]
  );

  // Handling cards within entities
  const addCardToEntity = useCallback(
    (entityId, newCard) => {
      updateEntityField(entityId, 'cards', (prevCards) => [
        ...prevCards,
        { ...newCard, quantity: 1 },
      ]);
    },
    [updateEntityField]
  );

  const removeCardFromEntity = useCallback(
    (entityId, cardId) => {
      updateEntityField(entityId, 'cards', (prevCards) =>
        prevCards.filter((card) => card.id !== cardId)
      );
    },
    [updateEntityField]
  );

  const incrementCardQuantity = useCallback(
    (entityId, cardId) => {
      modifyEntity((currentEntities) => {
        const cards = currentEntities.byId[entityId].cards.map((card) =>
          card.id === cardId ? { ...card, quantity: card.quantity + 1 } : card
        );
        return set({ ...currentEntities }, `byId.${entityId}.cards`, cards);
      });
    },
    [modifyEntity]
  );

  const decrementCardQuantity = useCallback(
    (entityId, cardId) => {
      modifyEntity((currentEntities) => {
        const cards = currentEntities.byId[entityId].cards.map((card) =>
          card.id === cardId
            ? { ...card, quantity: Math.max(card.quantity - 1, 0) }
            : card
        );
        return set({ ...currentEntities }, `byId.${entityId}.cards`, cards);
      });
    },
    [modifyEntity]
  );
  return {
    entities,
    selectedEntityId: entities?.selectedId,
    selectedEntity: entities?.byId[entities?.selectedId],
    allEntities: Object.values(entities.byId),
    allIds: entities?.allIds,
    entityUpdated,
    selectedId,
    addOrUpdateEntity,
    setEntityUpdated,
    updateEntityField,
    handleSelectEntity,
    removeEntity,
    refreshEntities,
    addCardToEntity,
    removeCardFromEntity,
    incrementCardQuantity,
    decrementCardQuantity,
  };
};

export default useSelector;
