// import { TextField } from '@mui/material';
// import React from 'react';
// import { Controller, useFormContext } from 'react-hook-form';

// // Removed the TypeScript-specific type definitions and kept the structure of the component
// function FormTextField({ control: providedControl, name, rules, ...rest }) {
//   const { control } = useFormContext();
//   return (
//     <Controller
//       control={providedControl || control}
//       name={name}
//       rules={rules}
//       render={({ field: { value, ...field }, fieldState: { error } }) => (
//         <TextField
//           {...rest}
//           error={error !== undefined}
//           helperText={error?.message}
//           value={value ?? ''}
//           {...field}
//         />
//       )}
//     />
//   );
// }

// export default FormTextField;
