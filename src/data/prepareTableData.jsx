import React from 'react';
import RCTypography from 'layout/REUSABLE_COMPONENTS/RCTYPOGRAPHY';
import { roundToNearestTenth } from 'context/Helpers';
import GenericActionButtons from 'layout/REUSABLE_COMPONENTS/GenericActionButtons';
// Note: No changes needed for these components
const Name = ({ name, color }) => (
  <RCTypography
    component="a"
    href="#"
    variant="button"
    color={color}
    fontWeight="medium"
  >
    {name}
  </RCTypography>
);

const Price = ({ price, color }) => (
  <RCTypography
    component="a"
    href="#"
    variant="button"
    color={color}
    fontWeight="medium"
  >
    {price}
  </RCTypography>
);

const TPrice = ({ tPrice, color }) => (
  <RCTypography
    component="a"
    href="#"
    variant="caption"
    color={color}
    fontWeight="medium"
  >
    {tPrice}
  </RCTypography>
);

const Quantity = ({ quantity, color }) => (
  <RCTypography
    component="a"
    href="#"
    variant="caption"
    color={color}
    fontWeight="medium"
  >
    {quantity}
  </RCTypography>
);

export default function prepareTableData(selectedCards, type) {
  const columnsA = [
    {
      field: 'name',
      headerName: 'Name',
      renderCell: (params) => <Name name={params.value} color="secondary" />,
      width: 250,
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
      renderCell: (params) => <Price price={params.value} color="secondary" />,
      maxWidth: 50,
      flex: 1,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      renderCell: (params) => (
        <Quantity quantity={params.value} color="secondary" />
      ),
      maxWidth: 50,
      flex: 1,
    },
  ];

  const dataA = selectedCards?.map((card, index) => ({
    id: card.id,
    name: card.name,
    price: card.price,
    quantity: card.quantity,
  }));
  if (type === 'topCards') {
    return { columns: columnsA, data: dataA };
  }
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: (params) => <Name name={params.value} color="text" />,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      renderCell: (params) => <Price price={params.value} color="text" />,
    },
    {
      field: 'tPrice',
      headerName: 'Total Price',
      flex: 1,
      renderCell: (params) => (
        <TPrice tPrice={roundToNearestTenth(params.value)} color="text" />
      ),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 1,
      renderCell: (params) => <Quantity quantity={params.value} color="text" />,
    },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => (
        <GenericActionButtons
          card={params.value}
          datatable={true}
          context={'Collection'}
          onClick={() => console.log('clicked')}
          onSuccess={() => console.log('success')}
          onFailure={() => console.log('failure')}
          page={'Collection'}
          cardSize={'small'}
          variant="data-table"
        />
      ),
      flex: 1,
    },
  ];
  const data = selectedCards?.map((card, index) => ({
    id: index, // Ensure each row has a unique 'id' field for DataGrid
    ...card,
    tPrice: roundToNearestTenth(card.totalPrice),
    action: card, // You might need to adjust this based on what GenericActionButtons expects
  }));

  return { columns, data };
}
