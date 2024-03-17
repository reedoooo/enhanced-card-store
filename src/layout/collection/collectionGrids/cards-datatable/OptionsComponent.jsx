// OptionsComponent.jsx
import React, { useEffect } from 'react';
import MDBox from '../../../REUSABLE_COMPONENTS/MDBOX';
import { Autocomplete, Grid, TextField } from '@mui/material';
import {
  FormBox,
  FormFieldBox,
} from '../../../REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import FormField from '../../../../components/forms/reusable/FormField';
import { useFormContext, useMode } from '../../../../context';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const OptionsComponent = ({
  canSearch,
  search,
  handleSearchChange,
  pageSize,
  setPageSize,
  pageOptions,
  // schemaName,
}) => {
  const { theme } = useMode();
  const schemaName = 'collectionSearchForm';
  const buttonLabel = 'Search';
  const startIcon = <AddCircleOutlineIcon />;
  const collectionSearchFields = [
    {
      name: 'searchTerm',
      label: 'Search',
      type: 'text',
      required: true,
      value: search,
    },
  ];
  const {
    formMethods,
    onSubmit,
    handleChange,
    setFormSchema,
    formState: { errors, isSubmitting },
    // getValues,
    handleSearchTermChange,
  } = useFormContext();

  useEffect(() => {
    setFormSchema(schemaName);
  }, [setFormSchema, schemaName]);

  const onFormSubmit = (data) => {
    onSubmit(data, schemaName);
  };
  return (
    <MDBox
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        maxWidth: '100%',
        width: '100%',
        padding: theme.spacing(3),
        flexDirection: 'row',
        color: theme.palette.text.primary,
        '& .MuiTextField-root': {
          '& fieldset': {
            borderColor: theme.palette.primary.main, // subtle accent on text field borders
          },
          '&:hover fieldset': {
            borderColor: theme.palette.primary.dark, // darker on hover for emphasis
          },
          '& .Mui-focused fieldset': {
            borderColor: theme.palette.primary.main, // maintain accent on focus
          },
        },
        '& .MuiAutocomplete-root': {
          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main, // accent on autocomplete focus
          },
        },
        '& .MuiSvgIcon-root': {
          color: theme.palette.primary.main, // icon color
        },
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: 'center',
        }}
      >
        {canSearch && (
          <Grid item xs={12} sm={8}>
            <form onSubmit={onFormSubmit}>
              {collectionSearchFields?.map((field, index) => (
                <FormFieldBox key={index} theme={theme}>
                  <FormField
                    label={field.label}
                    name={field.name}
                    type="text"
                    value={search}
                    register={formMethods.register}
                    required={!!field.required}
                    onChange={handleSearchChange}
                    sx={{
                      '.MuiInputBase-root': {
                        color: theme.palette.text.primary, // input text color
                      },
                      '.MuiInputLabel-root': {
                        color: theme.palette.primary.light, // label color for a subtle accent
                      },
                    }}
                  />
                </FormFieldBox>
              ))}
            </form>
          </Grid>
        )}
        <Grid item xs={12} sm={4}>
          <Autocomplete
            value={pageSize.toString()}
            onChange={(event, newValue) => setPageSize(parseInt(newValue, 10))}
            options={pageOptions?.map((option) => option.toString())}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Rows per page"
                variant="outlined"
                InputLabelProps={{
                  style: { color: theme.palette.primary.light }, // subtle accent on the label
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default OptionsComponent;
