import Icon from '@mui/material/Icon';
// Images
import MDTypography from '../../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import React from 'react';
import GenericActionButtons from '../../../components/buttons/actionButtons/GenericActionButtons';
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
export default function prepareTableData(selectedCards) {
  const roundToNearestTenth = (value) => Math.round(value * 10) / 10;
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
        id: 'action',
        Header: 'Action',
        accessor: 'action',
        Cell: ({ value }) => (
          <GenericActionButtons card={value} context={'Collection'} />
        ),
      },
    ],
    []
  );

  const data = React.useMemo(
    () =>
      selectedCards?.map((card) => ({
        ...card,
        tPrice: roundToNearestTenth(card.totalPrice),
        action: '', // Assuming you have some action value or logic to insert here
      })),
    [selectedCards]
  );

  return { columns, data };
}
