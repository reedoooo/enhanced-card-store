import React from 'react';
import MDTypography from '../../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import GenericActionButtons from '../../../components/buttons/actionButtons/GenericActionButtons';
import { useSnackbar } from 'notistack';

// Note: No changes needed for these components
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

export default function preparePortfolioTableData(selectedCards) {
  const roundToNearestTenth = (value) => Math.round(value * 10) / 10;
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: (params) => <Name name={params.value} />,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      renderCell: (params) => <Price price={params.value} />,
    },
    {
      field: 'tPrice',
      headerName: 'Total Price',
      flex: 1,
      renderCell: (params) => (
        <TPrice tPrice={roundToNearestTenth(params.value)} />
      ),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 1,
      renderCell: (params) => <Quantity quantity={params.value} />,
    },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   flex: 1,
    //   renderCell: (params) => (
    //     <GenericActionButtons
    //       card={params.value}
    //       variant="data-table"
    //       context={'Collection'}
    //       onClick={() => console.log('clicked')}
    //       onSuccess={() =>
    //         enqueueSnackbar('Action successful', {
    //           variant: 'success',
    //         })
    //       }
    //       onFailure={(error) =>
    //         enqueueSnackbar('Action failed', {
    //           variant: 'error',
    //         })
    //       }
    //       page={'Collection'}
    //       cardSize={'small'}
    //     />
    //   ),
    // },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => (
        <GenericActionButtons
          card={params}
          datatable={true}
          context={'Collection'}
          onClick={() => console.log('clicked')}
          onSuccess={() =>
            enqueueSnackbar(
              {
                title: 'Action successful',
                message: `Card added to ${params?.name || ''} successfully.`,
              },
              'success',
              null
            )
          }
          onFailure={(error) =>
            enqueueSnackbar(
              {
                title: 'Action failed',
                message: `Failed to add card to ${params?.name || ''}.`,
              },
              'error',
              error
            )
          }
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
