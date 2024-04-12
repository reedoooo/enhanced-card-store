import React, { useState, KeyboardEvent } from 'react';
import { TextField, Chip, Box } from '@mui/material';

const RCTagsInput = ({ placeholder, label, fullWidth = true }) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event) => {
    if (['Enter', 'Tab', ','].includes(event.key)) {
      event.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const handleDelete = (tagToDelete) => () => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Box>
      <TextField
        fullWidth={fullWidth}
        variant="outlined"
        placeholder={placeholder}
        label={label}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: tags.map((item, index) => (
            <Chip
              key={index}
              label={item}
              onDelete={handleDelete(item)}
              sx={{ margin: '0.5rem' }}
            />
          )),
        }}
      />
    </Box>
  );
};

export default RCTagsInput;

// import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Downshift from 'downshift';
// import { Chip, TextField } from '@mui/material';

// export default function TagsInput({ ...props }) {
//   const { submitTag, placeholder, tags, ...other } = props;
//   const [inputValue, setInputValue] = React.useState('');
//   const [selectedItem, setSelectedItem] = React.useState([]);
//   // useEffect(() => {
//   //   submitTag(selectedItem);
//   // }, [selectedItem, submitTag]);

//   function handleKeyDown(event) {
//     if (event.key === 'Enter') {
//       const newSelectedItem = [...selectedItem];
//       const duplicatedValues = newSelectedItem.indexOf(
//         event.target.value.trim()
//       );

//       if (duplicatedValues !== -1) {
//         setInputValue('');
//         return;
//       }
//       if (!event.target.value.replace(/\s/g, '').length) return;

//       newSelectedItem.push(event.target.value.trim());
//       setSelectedItem(newSelectedItem);
//       setInputValue('');
//     }
//     if (
//       selectedItem.length &&
//       !inputValue.length &&
//       event.key === 'Backspace'
//     ) {
//       setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
//     }
//   }
//   function handleChange(item) {
//     let newSelectedItem = [...selectedItem];
//     if (newSelectedItem.indexOf(item) === -1) {
//       newSelectedItem = [...newSelectedItem, item];
//     }
//     setInputValue('');
//     setSelectedItem(newSelectedItem);
//   }
//   const handleDelete = (item) => () => {
//     const newSelectedItem = [...selectedItem];
//     newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
//     setSelectedItem(newSelectedItem);
//   };
//   function handleInputChange(event) {
//     setInputValue(event.target.value);
//   }
//   return (
//     <React.Fragment>
//       <Downshift
//         id="downshift-multiple"
//         inputValue={inputValue}
//         onChange={handleChange}
//         selectedItem={selectedItem}
//       >
//         {({ getInputProps }) => {
//           const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
//             onKeyDown: handleKeyDown,
//             placeholder,
//           });
//           return {
//             /* <div>
//               <TextField
//                 InputProps={{
//                   startAdornment: selectedItem?.map((item) => (
//                     <Chip
//                       key={item}
//                       tabIndex={-1}
//                       label={item}
//                       // className={classes.chip}
//                       onDelete={handleDelete(item)}
//                       sx={{
//                         margin: '0.5rem',
//                       }}
//                     />
//                   )),
//                   onBlur,
//                   onChange: (event) => {
//                     handleInputChange(event);
//                     onChange(event);
//                   },
//                   onFocus,
//                 }}
//                 //               const [chipData, setChipData] = React.useState([
//                 //   { key: 0, label: 'Angular' },
//                 //   { key: 1, label: 'jQuery' },
//                 //   { key: 2, label: 'Polymer' },
//                 //   { key: 3, label: 'React' },
//                 //   { key: 4, label: 'Vue.js' },
//                 // ]);
//   //               const handleDelete = (chipToDelete) => () => {
//   //   setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
//   // };
//                 input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
//                 renderValue={(selected) => (
//                   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                     {selected.map((value) => (
//                       <Chip
//                         key={value}
//                         label={value}
//                         icon={<CloseIcon onClick={handleDelete(value)} />}
//                         onDelete={handleDelete(value)}
//                       />
//                     ))}
//                   </Box>
//                 )}
//                 {...other}
//                 {...inputProps}
//               />
//             </div> */
//           };
//         }}
//       </Downshift>
//     </React.Fragment>
//   );
// }
// TagsInput.defaultProps = {
//   tags: [],
// };
// TagsInput.propTypes = {
//   submitTag: PropTypes.func.isRequired,
//   tags: PropTypes.arrayOf(PropTypes.string),
// };

{
  /* <TagsInput
submitTag={submitTags}
tags={tags}
fullWidth
variant="outlined"
placeholder={rest?.placeholder}
label={rest?.label}
inputProps={{
  onChange: (e) => onChange(e.target.value),
  onBlur: (e) => onBlur(e.target.value),
  onFocus: (e) => onChange(e.target.value),
}}
{...rest}
/> */
}
