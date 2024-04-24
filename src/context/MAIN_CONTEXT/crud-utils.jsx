import { set } from 'lodash';

// utilities.js
export const updateField = (setFunction, path, value) => {
  setFunction((currentData) => {
    const newData = { ...currentData };
    set(newData, path, value);
    return newData;
  });
};

export const addItem = (setFunction, item, idField = '_id') => {
  setFunction((prevData) => {
    const newData = { ...prevData };
    newData.byId[item[idField]] = item;
    if (!newData.allIds.includes(item[idField])) {
      newData.allIds.push(item[idField]);
    }
    return newData;
  });
};

export const removeItem = (setFunction, itemId) => {
  setFunction((prevData) => {
    const { [itemId]: _, ...remainingById } = prevData.byId;
    const remainingAllIds = prevData.allIds.filter((id) => id !== itemId);
    return {
      ...prevData,
      byId: remainingById,
      allIds: remainingAllIds,
    };
  });
};
