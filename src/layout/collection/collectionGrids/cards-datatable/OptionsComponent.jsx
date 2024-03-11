// OptionsComponent.jsx
import React from 'react';
import MDBox from '../../../REUSABLE_COMPONENTS/MDBOX';
import { Autocomplete, Grid, TextField } from '@mui/material';

const OptionsComponent = ({
  canSearch,
  search,
  handleSearchChange,
  pageSize,
  setPageSize,
  pageOptions,
}) => (
  <MDBox
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    sx={{
      maxWidth: '100%',
      width: '100%',
      padding: 2,
      flexDirection: 'row',
      color: 'white',
    }}
  >
    <Grid container spacing={2}>
      {canSearch && (
        <Grid item xs={12} sm={8}>
          <TextField
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            size="small"
            fullWidth
            variant="outlined"
          />
        </Grid>
      )}
      <Grid item xs={12} sm={4}>
        <Autocomplete
          value={pageSize.toString()}
          onChange={(event, newValue) => setPageSize(parseInt(newValue, 10))}
          options={pageOptions?.map((option) => option?.toString())}
          renderInput={(params) => (
            <TextField {...params} label="Rows per page" variant="outlined" />
          )}
        />
      </Grid>
    </Grid>
  </MDBox>
);

export default OptionsComponent;
