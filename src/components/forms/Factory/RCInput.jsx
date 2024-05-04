import React, { useState } from 'react';
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
  Chip,
} from '@mui/material';
import PropTypes from 'prop-types';
import { StyledTextField } from 'layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import { useMode } from 'context';
import RCSwitch from './RCSwitch';
import useBreakpoint from 'context/hooks/useBreakPoint';
import useSelectorActions from 'context/hooks/useSelectorActions';
import useManager from 'context/useManager';
const RCInput = React.forwardRef(
  (
    {
      type,
      options,
      onChange,
      initialValue,
      value,
      placeholder,
      onSelectChange,
      error,
      helperText,
      ...rest
    },
    ref
  ) => {
    const { theme } = useMode();
    const { isMobile } = useBreakpoint();
    const { handleSelectChange, setTags, tags } = useSelectorActions();
    const { updateEntityField } = useManager();
    const [inputValue, setInputValue] = useState('');
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && inputValue.trim()) {
        event.preventDefault();
        console.log(`[INPUT]: ${inputValue}`);
        console.log(`[EVENT]: ${event.target.value}`);
        console.log(`[EVENT]: ${event}`);
        handleSelectChange({ target: { value: inputValue } }, 'tags', 'decks');
        setInputValue('');
      }
    };

    const handleDeleteTag = (tagToDelete) => () => {
      const updatedTags = tags.filter((tag) => tag.id !== tagToDelete.id);
      setTags(updatedTags); // Update local state
      updateEntityField('decks', 'deckId', 'tags', updatedTags); // Persist tags update
    };
    const { newPalette, functions } = theme;
    const {
      grey,
      transparent,
      error: colorError,
      success: colorSuccess,
    } = newPalette;
    const { pxToRem } = functions;
    const errorStyles = () => ({
      backgroundImage:
        // eslint-disable-next-line max-len
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23F44335' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23F44335' stroke='none'/%3E%3C/svg%3E\")",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `right ${pxToRem(12)} center`,
      backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,

      '& .Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline, &:after': {
          borderColor: colorError.main,
        },
      },

      '& .MuiInputLabel-root.Mui-focused': {
        color: colorError.main,
      },
    });
    const successStyles = () => ({
      backgroundImage:
        // eslint-disable-next-line max-len
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%234CAF50' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `right ${pxToRem(12)} center`,
      backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,

      '& .Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline, &:after': {
          borderColor: colorSuccess.main,
        },
      },

      '& .MuiInputLabel-root.Mui-focused': {
        color: colorSuccess.main,
      },
    });

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
            type={type}
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
            error={!!error}
            helperText={helperText}
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
                onChange(e.target.value);
                handleSelectChange(e, rest.name, rest.context);
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
              {options?.map((option, index) => (
                <MenuItem key={`${option.value}-${index}`} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'multiline':
        return (
          <StyledTextField
            theme={theme}
            type={type}
            variant="outlined"
            multiline
            fullWidth
            rows={rest?.rows || 4}
            placeholder={rest?.placeholder}
            value={value || ''}
            InputLabelProps={{
              shrink: !initialValue ? undefined : true,
            }}
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
          <StyledTextField
            fullWidth
            theme={theme}
            variant="outlined"
            margin="normal"
            placeholder={placeholder}
            label={rest?.label}
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputValue(e.target.value)}
            InputProps={{
              startAdornment: tags?.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.label}
                  onDelete={handleDeleteTag(tag)}
                />
              )),
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
