import React from 'react';
import {
  Divider,
  Switch,
  Icon,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
  TextField,
  InputLabel,
} from '@mui/material';
import ConfiguratorRoot from './ConfiguratorRoot';
import searchData from 'data/json-data/search.json';
import { StyledFormControl } from 'layout/REUSABLE_STYLED_COMPONENTS';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMode, useConfigurator } from 'context';
import { formFields } from 'data';
import { MDBox, RCButton, RCTypography } from '..';

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
  const { isConfiguratorOpen, toggleConfigurator } = useConfigurator();
  const { theme } = useMode();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(formFields['searchSettingsForm']),
    defaultValues: searchData.initialState,
  });

  const onSubmitForm = (data) => {
    console.log(data);
  };

  const renderSwitchSection = (title) => (
    <MDBox
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={3}
    >
      <RCTypography variant="h6">{title}</RCTypography>
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
        >
          <RCTypography variant="h5">Search Settings</RCTypography>
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
            <RCButton
              type="submit"
              variant="holo"
              color="success"
              size="large"
              withContainer={true}
            >
              Apply
            </RCButton>
          </form>
          {renderSwitchSection('Navbar Fixed')}
          <Divider />
          {renderSwitchSection('Light / Dark')}
          <Divider />
          <MDBox mt={3} textAlign="center">
            <RCButton
              variant="holo"
              color="success"
              size="large"
              withContainer={true}
            >
              view documentation
            </RCButton>
          </MDBox>
        </MDBox>
      </ConfiguratorRoot>
    </Slide>
  );
};

export default Configurator;
