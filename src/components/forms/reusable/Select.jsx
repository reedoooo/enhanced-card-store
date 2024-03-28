import React from 'react';
import { Select, MenuItem } from '@mui/material';
import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import { useMode } from '../../../context';

const SelectComponent = React.forwardRef(
  ({ value, onChange, options, fullWidth = true }, ref) => {
    const { theme } = useMode();
    const safeValue = value !== undefined ? value : '';

    return (
      <Select
        ref={ref}
        value={safeValue}
        onChange={onChange}
        fullWidth={fullWidth}
        displayEmpty
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
        }}
      >
        {/* <MenuItem value="" disabled>
          <MDTypography
            variant="button"
            sx={{
              color: theme.palette.chartTheme.redAccent.default,
              fontSize: '1.2rem',
            }}
          >
            Select Option
          </MDTypography>
        </MenuItem> */}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    );
  }
);

SelectComponent.displayName = 'SelectComponent';

export default SelectComponent;
