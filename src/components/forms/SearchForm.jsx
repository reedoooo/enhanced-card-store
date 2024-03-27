import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import RCZodForm from './reusable/RCZodForm';
import { useFormContext } from '../../context';

const SearchForm = () => {
  const { formMethods, formStates } = useFormContext();
  const { forms } = formStates;
  const { handleChange, handleFocus, handleBlur } = formMethods;

  const searchFields = [
    {
      name: 'searchTerm',
      label: 'Search for cards',
      type: 'text',
      required: false,
      value: forms?.searchForm?.searchTerm || '',
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  ];
  return (
    <RCZodForm
      schemaName="searchForm"
      fields={searchFields}
      buttonLabel="Search"
      startIcon={<SearchIcon />}
    />
  );
};

export default SearchForm;
