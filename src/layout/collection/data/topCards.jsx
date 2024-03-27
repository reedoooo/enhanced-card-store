import React from 'react';
import MDTypography from '../../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';

const Name = ({ name }) => (
  <MDTypography
    component="a"
    href="#"
    variant="body1"
    color="secondary"
    fontWeight="medium"
  >
    {name}
  </MDTypography>
);

const Price = ({ price }) => (
  <MDTypography
    component="a"
    href="#"
    variant="body1"
    color="secondary"
    fontWeight="medium"
  >
    {price}
  </MDTypography>
);

const Quantity = ({ quantity }) => (
  <MDTypography
    component="a"
    href="#"
    variant="h6"
    color="secondary"
    fontWeight="medium"
  >
    {quantity}
  </MDTypography>
);

export default function prepareTableData(topCards) {
  if (!topCards || topCards.length === 0) {
    return { columns: [], data: [] };
  }
  console.log('topFiveCards:', topCards);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      renderCell: (params) => <Name name={params.value} />,
      width: 250,
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
      renderCell: (params) => <Price price={params.value} />,
      maxWidth: 50,
      flex: 1,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      renderCell: (params) => <Quantity quantity={params.value} />,
      maxWidth: 50,
      flex: 1,
    },
  ];

  const data = topCards?.map((card, index) => ({
    id: card.id,
    name: card.name,
    price: card.price,
    quantity: card.quantity,
  }));

  return { columns, data };
}
