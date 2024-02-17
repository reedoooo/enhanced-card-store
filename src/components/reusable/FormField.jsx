import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { StyledTextField } from '../../pages/pageStyles/StyledComponents';
import { useMode } from '../../context';

const FormField = ({ name, register, errors, ...props }) => {
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
      {...props}
    />
  );
};

FormField.propTypes = {
  // UNCONTROLLED FIELDS
  name: PropTypes.string.isRequired, // Name is a required string
  register: PropTypes.func.isRequired, // Register is a required function
  errors: PropTypes.object, // Errors is an object, not necessarily required
  theme: PropTypes.object, // Theme is an object, not necessarily required

  // CONTROLLED FIELDS
  value: PropTypes.string, // Value is a string, not necessarily required
};

// Define default props if there are any optional props
FormField.defaultProps = {
  errors: {}, // Default value for errors if not passed
  // theme: {}, // Default value for theme if not passed
};

export default FormField;
