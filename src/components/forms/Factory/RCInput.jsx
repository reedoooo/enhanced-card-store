import React from 'react';
import { AttachFile as AttachFileIcon } from '@mui/icons-material';
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
  Switch,
  Input,
  Autocomplete,
  InputAdornment,
  Chip,
  Box,
  OutlinedInput,
  useMediaQuery,
} from '@mui/material';
import {
  FormFieldBox,
  StyledTextField,
} from '../../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import { useMode } from '../../../context';
import RCSwitch from '../reusable/RCSwitch';

const RCInput = ({ value, onChange, initialValue, type, options, ...rest }) => {
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleDeleteChip = (chipToDelete) => {
    const newValue = value.filter((chip) => chip !== chipToDelete);
    onChange(newValue); // Notify react-hook-form of the change
  };
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
          // {...register(name)}
          theme={theme}
          variant="outlined"
          margin="normal"
          fullWidth
          placeholder={rest?.placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          InputLabelProps={{
            shrink: !initialValue ? undefined : true,
          }}
          fontSize={isMobile ? '1rem' : '1.25rem'}
          // error={!!errors[name]}
          // helperText={errors[name]?.message}
          {...rest}
        />
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
    case 'select':
      return (
        <FormFieldBox theme={theme}>
          <FormControl fullWidth margin="normal">
            <InputLabel>{rest.label}</InputLabel>
            <Select
              // {...formMethods.register(field.name)}
              value={value}
              label={rest.label}
              onChange={(e) => onChange(e.target.value)}
              input={<OutlinedInput />}
              sx={{
                width: '100%',
                marginBottom: 2,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.chartTheme.redAccent.default,
                },
                '& .MuiSvgIcon-root': {
                  color: theme.palette.text.primary,
                },
                ...(isMobile && {
                  fontSize: '0.875rem', // Adjust font size for mobile
                }),
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormFieldBox>
      );
    case 'chips':
      return (
        <FormFieldBox theme={theme}>
          <FormControl fullWidth margin="normal">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <TextField
                InputProps={{
                  startAdornment: value.map((chip, index) => (
                    <Chip
                      key={index}
                      tabIndex={-1}
                      label={chip}
                      className={chip}
                      onDelete={() => handleDeleteChip(chip)}
                    />
                  )),
                  onChange: (e) => onChange(e.target.value),
                  // onBlur,
                  // onChange: event => {
                  //   handleInputChange(event);
                  //   onChange(event);
                  // },
                  // onFocus
                }}
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder={rest?.placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                InputLabelProps={{
                  shrink: !initialValue ? undefined : true,
                }}
                // error={!!errors[name]}
                // helperText={errors[name]?.message}
                {...rest}
              />
            </Box>
          </FormControl>
        </FormFieldBox>
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
            {rest?.options.map((option) => (
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
            {rest?.options.map((option) => (
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
    default:
      return null;
  }
};

export default RCInput;
