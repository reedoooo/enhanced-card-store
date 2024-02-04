import Icon from '@mui/material/Icon';
// Images
import MDTypography from '../MDTYPOGRAPHY/MDTypography';
import React from 'react';
const Name = ({ name }) => (
  <MDTypography
    component="a"
    href="#"
    variant="button"
    color="text"
    fontWeight="medium"
  >
    {name}
  </MDTypography>
);
const Price = ({ price }) => (
  <MDTypography
    component="a"
    href="#"
    variant="button"
    color="text"
    fontWeight="medium"
  >
    {price}
  </MDTypography>
);
const TPrice = ({ tPrice }) => (
  <MDTypography
    component="a"
    href="#"
    variant="caption"
    color="text"
    fontWeight="medium"
  >
    {tPrice}
  </MDTypography>
);
const Quantity = ({ quantity }) => (
  <MDTypography
    component="a"
    href="#"
    variant="caption"
    color="text"
    fontWeight="medium"
  >
    {quantity}
  </MDTypography>
);
const Action = ({ value }) => (
  <MDTypography component="a" href="#" color="text">
    <Icon>more_vert</Icon>
  </MDTypography>
);
export default function prepareTableData(selectedCards) {
  // Helper function to round total price to the nearest tenth
  const roundToNearestTenth = (value) => Math.round(value * 10) / 10;

  // Define column structure for react-table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        id: 'name',
        Cell: ({ value }) => <Name name={value} />,
      },
      {
        Header: 'Price',
        accessor: 'price',
        id: 'price',
        Cell: ({ value }) => <Price price={value} />,
      },
      {
        Header: 'Total Price',
        accessor: 'tPrice',
        id: 'tPrice',
        Cell: ({ value }) => <TPrice tPrice={roundToNearestTenth(value)} />,
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        id: 'quantity',
        Cell: ({ value }) => <Quantity quantity={value} />,
      },
      {
        Header: 'Action',
        accessor: 'action',
        id: 'action',
        Cell: ({ value }) => <Action value={value} />,
      },
    ],
    []
  );

  // Map selectedCards to rows for react-table
  const data = React.useMemo(
    () =>
      selectedCards.map((card) => ({
        ...card,
        tPrice: roundToNearestTenth(card.totalPrice),
        action: '', // Assuming you have some action value or logic to insert here
      })),
    [selectedCards]
  );

  // You don't need to return PaginationComponent, page, and rowsPerPage anymore
  // since react-table handles pagination internally. You just need to provide data and columns.
  return { columns, data };
}

// export default function data(selectedCards) {
//   const roundToNearestTenth = (value) => Math.round(value * 10) / 10;
//   const {
//     data,
//     PaginationComponent, // Assume this is your custom pagination component
//     page,
//     rowsPerPage,
//   } = usePagination(selectedCards, 10, selectedCards?.length || 0);

//   const rows = data?.map((card, index) => ({
//     // Assuming each card has a unique 'id' for key, or use index as fallback
//     key: card.id || `row-${index}`,
//     name: <Name name={card.name} />,
//     price: <Price price={card.price} />,
//     tPrice: <TPrice tPrice={roundToNearestTenth(card.totalPrice)} />,
//     quantity: <Quantity quantity={card.quantity} />,
//     action: <Action />,
//   }));

//   return {
//     columns: [
//       { Header: 'name', accessor: 'name', width: '30%', align: 'left' },
//       { Header: 'price', accessor: 'price', align: 'left' },
//       { Header: 'total price', accessor: 'tPrice', align: 'center' },
//       { Header: 'quantity', accessor: 'quantity', align: 'center' },
//       { Header: 'action', accessor: 'action', align: 'center' },
//     ],
//     rows,
//     PaginationComponent,
//     page,
//     rowsPerPage,
//   };
// }
