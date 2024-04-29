import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useMode } from 'context';
import { StyledTextField } from 'layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';

const FormField = ({
  name,
  register,
  initialValue,
  value,
  errors,
  ...props
}) => {
  const { theme } = useMode();

  return (
    <StyledTextField
      {...register(name)}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      margin="normal"
      fullWidth
      variant="outlined"
      theme={theme}
      InputLabelProps={{
        shrink: !initialValue ? undefined : true,
      }}
      {...props}
    />
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired, // Name is a required string
  register: PropTypes.func.isRequired, // Register is a required function
  errors: PropTypes.object, // Errors is an object, not necessarily required
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Value can be string or number
};
FormField.defaultProps = {
  errors: {}, // Default value for errors if not passed
};

export default FormField;
