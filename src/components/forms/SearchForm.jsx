import React, { useCallback, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { useFormContext, useMode, usePageContext } from '../../context';
import {
  StyledFormBox,
  StyledFormPaper,
} from '../../pages/pageStyles/StyledComponents';
import { FormBox } from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import { LoadingButton } from '@mui/lab';
import FormField from './reusable/FormField';

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
    handleChange,
    setFormSchema,
  } = useFormContext();

  useEffect(() => {
    setFormSchema(formId);
  }, [setFormSchema]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'searchTerm') {
  //     handleSearchTermChange(value); // Call the method when searchTerm changes
  //   }
  //   handleFieldChange(formId, name, value); // Continue to update the form state as before
  // };

  // const { searchTerm } = formStates?.searchForm;
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
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
      <FormBox
        component={'form'}
        theme={theme}
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
          value={forms?.searchForm?.searchTerm}
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
      </FormBox>
    </StyledFormPaper>
  );
};

export default SearchForm;
