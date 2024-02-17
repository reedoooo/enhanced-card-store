import React, { useCallback, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { useFormContext, useMode, usePageContext } from '../../context';
import FormField from '../reusable/FormField';
import { StyledFormPaper } from '../../pages/pageStyles/StyledComponents';
import { LoadingButton } from '@mui/lab';

const SearchForm = ({ onFocus, onBlur }) => {
  const { theme } = useMode();
  const formId = 'searchForm'; // Define the form ID for schema selection
  const {
    formMethods,
    formStates: { errors, isSubmitting, ...formStates },
    onSubmit,
    handleFieldChange,
    handleSearchTermChange,
    // handleChange,
    handleBlur,
    handleFocus,
    forms,
  } = useFormContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'searchTerm') {
      handleSearchTermChange(value); // Call the method when searchTerm changes
    }
    handleFieldChange(formId, name, value); // Continue to update the form state as before
  };

  const { searchTerm } = formStates.searchForm;
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      formMethods.handleSubmit((data) => {
        onSubmit(data);
      });
    }
  };

  return (
    <StyledFormPaper
      theme={theme}
      sx={{
        background: theme.palette.backgroundB.lightest,
      }}
    >
      <form
        onSubmit={formMethods.handleSubmit((data) =>
          onSubmit(data, 'searchForm')
        )}
      >
        <FormField
          name="searchTerm"
          label="Search for cards"
          register={formMethods.register}
          errors={errors}
          required
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyPress}
          theme={theme}
        />
        {errors?.searchTerm && (
          <Grid item xs={12}>
            <p>{errors?.searchTerm?.message}</p>
          </Grid>
        )}
        <LoadingButton
          fullWidth
          variant="contained"
          loading={isSubmitting}
          color="primary"
          type="submit"
          sx={{
            mt: 1,
            mb: 1,
            background: theme.palette.backgroundA.dark,
            '&:hover': { background: theme.palette.backgroundA.darkest },
          }}
        >
          {isSubmitting ? 'Loading...' : 'Search'}
        </LoadingButton>
        {errors?.root && <p>{errors?.root?.message}</p>}
      </form>
    </StyledFormPaper>
  );
};

export default SearchForm;
