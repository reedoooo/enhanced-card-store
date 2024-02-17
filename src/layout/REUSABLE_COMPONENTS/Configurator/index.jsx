import React, { useState, useEffect } from 'react';
import {
  Divider,
  Switch,
  Icon,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
} from '@mui/material';
import ConfiguratorRoot from './ConfiguratorRoot';
import searchData from '../../../context/UTILITIES_CONTEXT/FormContext/search.json';
import {
  useConfiguratorContext,
  useFormContext,
  useMode,
} from '../../../context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { formSchemas } from '../../../context/UTILITIES_CONTEXT/FormContext/schemas';
import MDTypography from '../MDTYPOGRAPHY/MDTypography';
import MDBox from '../MDBOX';
import MDButton from '../MDBUTTON';

const FilterSelector = ({ control, name, label, options }) => {
  const { theme } = useMode();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth margin="normal">
          <Select
            {...field}
            displayEmpty
            input={<OutlinedInput />}
            label={label}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

const Configurator = () => {
  const { isConfiguratorOpen, toggleConfigurator } = useConfiguratorContext();
  const { theme } = useMode();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(formSchemas.searchSettings),
    defaultValues: searchData.initialState,
  });

  const onSubmitForm = (data) => {
    console.log(data);
    // Assuming onSubmit updates some context or state
  };

  const renderSwitchSection = (title) => (
    <MDBox
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={3}
    >
      <MDTypography variant="h6">{title}</MDTypography>
      <Switch />
    </MDBox>
  );

  return (
    <Slide direction="left" in={isConfiguratorOpen} mountOnEnter unmountOnExit>
      <ConfiguratorRoot
        variant="permanent"
        ownerState={{ open: isConfiguratorOpen }}
      >
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
          pt={4}
          pb={0.5}
          // px={3}
        >
          <MDTypography variant="h5">Search Settings</MDTypography>
          <Icon
            sx={{ fontSize: '2rem', cursor: 'pointer' }}
            onClick={toggleConfigurator}
          >
            close
          </Icon>
        </MDBox>
        <Divider />
        <MDBox pt={0.5} pb={3} px={3}>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            {searchData.filters.map((filter) => (
              <FilterSelector
                key={filter.name}
                control={control}
                name={filter.name}
                label={filter.label}
                options={filter.values}
              />
            ))}
            <MDButton type="submit" variant="contained" color="primary">
              Apply
            </MDButton>
          </form>
          {renderSwitchSection('Navbar Fixed')}
          <Divider />
          {renderSwitchSection('Light / Dark')}
          <Divider />
          <MDBox mt={3} textAlign="center">
            <MDButton color="primary" variant="contained">
              view documentation
            </MDButton>
          </MDBox>
        </MDBox>
      </ConfiguratorRoot>
    </Slide>
  );
};

export default Configurator;
