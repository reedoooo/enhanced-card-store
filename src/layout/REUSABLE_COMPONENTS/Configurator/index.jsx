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
import searchData from '../../../data/search.json';
import { useConfiguratorContext, useMode } from '../../../context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import MDTypography from '../MDTYPOGRAPHY/MDTypography';
import MDBox from '../MDBOX';
import MDButton from '../MDBUTTON';
import { formFields } from '../../../components/forms/formsConfig';
import { TextField, InputLabel } from '@mui/material';
import { StyledFormControl } from '../../../pages/pageStyles/StyledComponents';

const SearchSettingsForm = ({
  searchSettings,
  handleSearch,
  handleSearchBy,
  handleSortBy,
}) => {
  const { theme } = useMode();
  return (
    <>
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchSettings.search}
        onChange={handleSearch}
        placeholder="Search"
      />
      <StyledFormControl fullWidth theme={theme}>
        <InputLabel>Search by</InputLabel>
        <Select
          value={searchSettings.searchBy}
          onChange={handleSearchBy}
          label="Search by"
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="genres">Genre</MenuItem>
        </Select>
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={searchSettings.sortBy}
          onChange={handleSortBy}
          label="Sort by"
        >
          <MenuItem value="release_date">Release date</MenuItem>
          <MenuItem value="vote_average">Rating</MenuItem>
        </Select>
      </StyledFormControl>
    </>
  );
};

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
    resolver: zodResolver(formFields['searchSettingsForm']),
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
