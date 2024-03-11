// import React from 'react';
// import { useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import PropTypes from 'prop-types';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name, selected, theme) {
//   return {
//     fontWeight:
//       selected.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// const CustomMultipleSelect = ({
//   items,
//   selectedItems,
//   onChange,
//   placeholder,
//   label,
// }) => {
//   const theme = useTheme();

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     onChange(typeof value === 'string' ? value.split(',') : value);
//   };

//   return (
//     <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
//       <Select
//         multiple
//         displayEmpty
//         value={selectedItems}
//         onChange={handleChange}
//         input={<OutlinedInput />}
//         renderValue={(selected) => {
//           if (selected.length === 0) {
//             return <em>{placeholder}</em>;
//           }

//           return selected.join(', ');
//         }}
//         MenuProps={MenuProps}
//         inputProps={{ 'aria-label': label }}
//       >
//         <MenuItem disabled value="">
//           <em>{placeholder}</em>
//         </MenuItem>
//         {items.map((name) => (
//           <MenuItem
//             key={name}
//             value={name}
//             style={getStyles(name, selectedItems, theme)}
//           >
//             {name}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// CustomMultipleSelect.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.string).isRequired,
//   selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
//   onChange: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
//   label: PropTypes.string,
// };

// CustomMultipleSelect.defaultProps = {
//   placeholder: 'Select items',
//   label: 'Custom select',
// };

// export default CustomMultipleSelect;
