import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useMode } from '../../../../context';
import OptionsComponent from '../../../../components/forms/OptionsComponent';
import GenericActionButtons from '../../../../components/buttons/actionButtons/GenericActionButtons';
import { enqueueSnackbar } from 'notistack';

function PricedDataTable({ entriesPerPage, canSearch, table }) {
  const { theme } = useMode();
  const [pageSize, setPageSize] = useState(entriesPerPage.defaultValue);

  useEffect(() => {
    setPageSize(entriesPerPage.defaultValue);
  }, [entriesPerPage.defaultValue]);

  return (
    <Box sx={{ height: 510, width: '100%' }}>
      <DataGrid
        rows={table.data.map((row, index) => ({ id: index, ...row }))}
        columns={table.columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={entriesPerPage.entries}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          filter: {
            filterModel: {
              items: [],
              quickFilterValues: [''],
            },
          },
        }}
        checkboxSelection
        sx={{
          '& .MuiDataGrid-root': {
            color: theme.palette.chartTheme.grey.dark,
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${theme.palette.chartTheme.grey.lightest} !important`,
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: `1px solid ${theme.palette.chartTheme.grey.lightest} !important`,
          },
          '& .MuiDataGrid-columnSeparator': {
            visibility: 'hidden',
          },
        }}
      />
    </Box>
  );
}

PricedDataTable.propTypes = {
  entriesPerPage: PropTypes.shape({
    defaultValue: PropTypes.number,
    entries: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  canSearch: PropTypes.bool,
  table: PropTypes.shape({
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
  }).isRequired,
};

PricedDataTable.defaultProps = {
  canSearch: false,
};

export default PricedDataTable;
