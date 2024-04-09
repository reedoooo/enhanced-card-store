import React from 'react';
import { Grid } from '@mui/material';
import FormInputText from './FormInputText';
import FormInputDate from './FormInputDate';

export const FormFactory = ({ field, control }) => {
  const { componentType, grid, ...fieldProps } = field;

  const renderFieldComponent = () => {
    switch (componentType) {
      case 'text':
        return <FormInputText control={control} {...fieldProps} />;
      case 'date':
        return <FormInputDate control={control} {...fieldProps} />;
      default:
        return null; // Default case if the type is unknown
    }
  };

  return (
    <Grid item {...grid}>
      {renderFieldComponent()}
    </Grid>
  );
};
