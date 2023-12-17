export const getCardQuantity = (cartData, cardId) => {
  let totalItems = 0;
  let quantityOfSameId = 0;
  cartData.cart.forEach((item) => {
    totalItems += item.quantity;
    if (item.id === cardId) {
      quantityOfSameId += item.quantity;
    }
  });
  return { totalItems, quantityOfSameId };
};
