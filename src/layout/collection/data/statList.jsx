import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';

const data = [
  {
    label: '',
    value: null,
  },
];

const DynamicCollectionDestructuring = () => {
  const { allCollections, selectedCollection } = useSelectedCollection();
  const { totalPrice, totalQuantity, collectionStatistics } =
    selectedCollection;
  const { avgPrice, highPoint, lowPoint, percentageChange, priceChange } =
    collectionStatistics;
  return (
    <div>
      <div>{totalPrice}</div>
      <div>{totalQuantity}</div>
      <div>{avgPrice}</div>
      <div>{highPoint}</div>
      <div>{lowPoint}</div>
      <div>{percentageChange}</div>
      <div>{priceChange}</div>
    </div>
  );
};

export default DynamicCollectionDestructuring;
