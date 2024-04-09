import React, { forwardRef, useCallback, useState } from 'react';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormGroup,
  Slider,
  Input,
  Autocomplete,
  OutlinedInput,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import {
  FormFieldBox,
  StyledTextField,
} from '../../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import { useMode } from '../../../context';
import RCSwitch from './RCSwitch';
import TagsInput from './RCTagsInput';
import { zodSchemas } from '../formsConfig';
import useBreakpoint from '../../../context/hooks/useBreakPoint';
import { useCompileCardData } from '../../../context/MISC_CONTEXT/AppContext/useCompileCardData';
import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
const RCInput = forwardRef(
  (
    {
      type,
      options,
      onChange,
      onBlur,
      onFocus,
      initialValue,
      value,
      placeholder,
      onSelectChange,
      ...rest
    },
    ref
  ) => {
    const { theme } = useMode();
    const { isMobile } = useBreakpoint();
    const { setSelectedTimeRange } = useCompileCardData();
    const { selectedCollection, updateCollectionField } =
      useSelectedCollection();
    // const handleSelectChange = (e) => {
    //   onChange(e.target.value); // This ensures form state is updated
    //   // onSelectChange && onSelectChange(e.target.value); // This calls the additional handler if provided
    // };
    const [tags, setTags] = useState([]);
    const submitTags = useCallback((newTags) => {
      console.log('TAG SUBMITTED: ', newTags);
      const validation = zodSchemas['updateDeckForm']?.tags?.safeParse(newTags);
      if (validation?.success) {
        setTags(newTags);
        console.log('Tags updated:', newTags); // Or any other logic
      } else {
        console.error('Validation failed:', validation?.error);
      }
    }, []);

    switch (type) {
      case 'text':
      case 'number':
      case 'email':
      case 'date':
      case 'time':
      case 'search':
      case 'password':
        return (
          <StyledTextField
            theme={theme}
            variant="outlined"
            margin="normal"
            fullWidth
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            value={value || ''}
            InputLabelProps={{
              shrink: !initialValue ? undefined : true,
            }}
            fontSize={isMobile ? '1rem' : '1.25rem'}
            // error={!!errors[name]}
            // helperText={errors[name]?.message}
            {...rest}
          />
        );
      case 'select':
        return (
          <FormControl fullWidth margin="normal" x={{ width: '100%' }}>
            <InputLabel id={`${rest?.name}-select-label`}>
              {rest?.label}
            </InputLabel>
            <Select
              labelId={`${rest?.name}-select-label`}
              id={`${rest?.name}-select`}
              value={value || ''}
              onChange={(e) => {
                console.log(e.target.value);
                console.log(
                  'SELECTED VALUE',
                  selectedCollection?.averagedChartData[e.target.value]
                );
                onChange(e.target.value);
                updateCollectionField(
                  selectedCollection._id,
                  'selectedChartDataKey',
                  e.target.value
                );
                updateCollectionField(
                  selectedCollection._id,
                  'selectedChartData',
                  selectedCollection?.averagedChartData[e.target.value]
                );
                setSelectedTimeRange(e.target.value);
              }}
              input={<OutlinedInput label={rest?.label} />}
              sx={{
                width: '100%',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.chartTheme.redAccent.default,
                },
                '& .MuiSvgIcon-root': {
                  color: theme.palette.text.primary,
                },
              }}
            >
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'multiline':
        return (
          <TextField
            variant="outlined"
            multiline
            rows={rest?.rows || 4}
            placeholder={rest?.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            {...rest}
          />
        );
      case 'autocomplete':
        return (
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            options={options}
            getOptionLabel={(option) => option.label || option}
            renderInput={(params) => (
              <TextField {...params} label={rest.label} variant="outlined" />
            )}
            {...rest}
          />
        );
      case 'chips':
        return (
          <TagsInput
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
          />
        );
      case 'checkbox':
        return (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  {...rest}
                />
              }
              label={rest?.checkboxLabel}
            />
          </FormGroup>
        );
      case 'file':
        return (
          <Input
            type="file"
            inputProps={{ ...rest.inputProps }}
            onChange={onChange}
          />
        );
      case 'radio':
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">{rest?.label}</FormLabel>
            <RadioGroup
              value={value}
              onChange={(e) => onChange(e.target.value)}
              row={rest?.row}
            >
              {rest?.options?.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case 'dropdown':
        return (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{rest?.label}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              multiple={rest?.multiple || false}
              value={value}
              label={rest?.label}
              onChange={(e) => onChange(e.target.value)}
              {...(rest?.multiple
                ? { renderValue: (selected) => selected.join(', ') }
                : {})}
            >
              {rest?.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'slider':
        return (
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={(e, newValue) => onChange(newValue)}
            {...rest}
          />
        );
      case 'switch':
        return (
          <RCSwitch
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            labelLeft={rest.labelLeft}
            labelRight={rest.labelRight}
            formTitle={rest.formTitle}
            iconLeft={rest.iconLeft}
            iconRight={rest.iconRight}
            size={rest.size}
            {...rest}
          />
        );
      default:
        return <div ref={ref}>Unsupported input type</div>;
    }
  }
);

RCInput.displayName = 'RCInput';
RCInput.defaultProps = {
  type: 'text',
  options: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
  initialValue: '',
  value: '',
  placeholder: '',
};
RCInput.propTypes = {
  type: PropTypes.string.isRequired,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onSelectChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  icon: PropTypes.element,
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
  ]),
};
export default RCInput;
// case 'switch':
//   return (
//     <FormControlLabel
//       control={
//         <Switch
//           checked={value}
//           onChange={(e) => onChange(e.target.checked)}
//           {...rest}
//         />
//       }
//       label={rest?.label}
//     />
//   );
//   <FormFieldBox theme={theme}>
//     <FormControl fullWidth margin="normal">
//       <TextField
//         label={rest.placeholder} // Using placeholder as label for consistency
//         variant="outlined"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         onKeyDown={handleKeyDown}
//         InputProps={{
//           startAdornment: value?.map((chip, index) => (
//             <Chip
//               key={index}
//               label={chip}
//               onDelete={() => handleDeleteChip(chip)}
//               variant="outlined"
//               size="small"
//             />
//           )),
//         }}
//         fullWidth
//         margin="normal"
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//     </FormControl>
//   </FormFieldBox>
// );
// case 'chips':
//   return (
//     <FormFieldBox theme={theme}>
//       <FormControl fullWidth margin="normal">
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//           <TextField
//             InputProps={{
//               startAdornment: value?.map((key, label, index) => (
//                 <Chip
//                   key={index}
//                   tabIndex={-1}
//                   label="Deletable"
//                   // label={chip}
//                   onDelete={() => handleDeleteChip(key)}
//                   onAdd={() => handleAddChip(label)}
//                   variant="outlined"
//                   size="small"
//                   color="error"
//                 />
//               )),
//               onChange: (e) => onChange(e.target.value),
//               // onBlur,
//               // onChange: event => {
//               //   handleInputChange(event);
//               //   onChange(event);
//               // },
//               // onFocus
//             }}
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             placeholder={rest?.placeholder}
//             value={value}
//             onChange={(e) => onChange(e.target.value)}
//             InputLabelProps={{
//               shrink: !initialValue ? undefined : true,
//             }}
//             // error={!!errors[name]}
//             // helperText={errors[name]?.message}
//             {...rest}
//           />
//         </Box>
//       </FormControl>
//     </FormFieldBox>
//   );
