import Icon from '@mui/material/Icon';
// Images
import MDTypography from '../MDTYPOGRAPHY/MDTypography';
import React from 'react';
import LoadingIndicator from 'components/reusable/indicators/LoadingIndicator';
import { roundToNearestTenth } from '../context/Helpers';
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
  if (!selectedCards) return <LoadingIndicator />;
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

  return { columns, data };
}
