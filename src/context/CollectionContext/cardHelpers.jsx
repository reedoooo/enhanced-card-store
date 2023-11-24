import moment from 'moment';
import { useCollectionStore } from './CollectionContext';

export const getCollectionId = (selectedCollection, allCollections) => {
  return selectedCollection?._id || allCollections[0]?._id;
};

export const calculatePriceDifference = (updatedPrice, selectedCollection) => {
  return updatedPrice - (selectedCollection.chartData?.updatedPrice || 0);
};

export const createNewDataSet = (updatedPrice, selectedCollection) => {
  return {
    data: [
      {
        xys: [
          {
            label: `Update Number ${
              selectedCollection?.chartData?.datasets?.length + 1 || 1
            }`,
            data: {
              x: moment().format('YYYY-MM-DD HH:mm'),
              y: updatedPrice,
            },
          },
        ],
        additionalPriceData: {
          priceChanged:
            calculatePriceDifference(updatedPrice, selectedCollection) !== 0,
          initialPrice: selectedCollection?.totalPrice,
          updatedPrice: updatedPrice,
          priceDifference: calculatePriceDifference(
            updatedPrice,
            selectedCollection
          ),
          priceChange:
            Math.round(
              (calculatePriceDifference(updatedPrice, selectedCollection) /
                (selectedCollection?.totalPrice || 1)) *
                100
            ) / 100,
        },
      },
    ],
  };
};

// export const createUpdateInfo = (
//   updatedCards,
//   updatedPrice,
//   cardInfo,
//   userId,
//   selectedCollection,
//   collectionId,
//   newDataSet,
//   xyData
// ) => {
//   // const { updateCollectionChartData } = useCollectionStore();
//   return {
//     ...cardInfo,
//     name: selectedCollection?.name,
//     description: selectedCollection?.description,
//     cards: updatedCards,
//     userId: userId,
//     totalCost: updatedPrice,
//     totalPrice: updatedPrice,
//     xys: xyData,
//     quantity: updatedCards.length,
//     totalQuantity: updatedCards.reduce((acc, card) => acc + card.quantity, 0),
//     chartData: updateCollectionChartData(
//       updatedPrice,
//       selectedCollection,
//       newDataSet
//     ),
//     allCardPrices: updatedCards.flatMap((card) =>
//       Array(card.quantity).fill(card.card_prices?.[0]?.tcgplayer_price)
//     ),
//     _id: collectionId,
//   };
// };
