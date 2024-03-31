// import React from 'react';
// import { Controller } from 'react-hook-form';
// import { TextField } from '@mui/material';

// const RCFormInputs = Object.keys(dynamicForm).map((key) => {
//   const { rules, defaultValue, label } = dynamicForm[key];

//   return (
//     <section key={key}>
//       <Controller
//         name={key}
//         control={control}
//         rules={rules}
//         defaultValue={defaultValue}
//         render={({ field }) => (
//           <TextField
//             label={label}
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             error={!!errors[key]}
//             helperText={errors[key] ? errors[key].message : ''}
//             {...field}
//           />
//         )}
//       />
//     </section>
//   );
// });
