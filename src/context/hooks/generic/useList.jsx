import { useState } from 'react';

const useList = (initialList = []) => {
  const [list, setList] = useState(initialList);

  const add = (item) => {
    setList([...list, item]);
  };

  const remove = (index) => {
    setList(list.filter((_, idx) => idx !== index));
  };

  const update = (index, newItem) => {
    setList(list.map((item, idx) => (idx === index ? newItem : item)));
  };

  const clear = () => {
    setList([]);
  };

  return { list, add, remove, update, clear };
};

export default useList;
