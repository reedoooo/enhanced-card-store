import React from 'react';
import { Typography } from '@mui/material';
import { useUserContext } from '../../context/UserContext/UserContext';
import { usePageContext } from '../../context/PageContext/PageContext';
import { PageHeader, PageContent } from '../../layout';
import { FormWrapper, StyledTextField, StyledButton } from './styled';
import { useFormContext, useMode } from '../../context';

const EditUserProfileForm = () => {
  const { theme } = useMode();
  const { user, fetchUserData } = useUserContext();
  const userId = user?.id;
  const { isPageLoading, setIsPageLoading, setPageError } = usePageContext();
  const { forms, handleChange, handleSubmit, formErrors } = useFormContext();
  const userDataValues = forms.updateUserDataForm;
  const userDataErrors = formErrors.updateUserDataForm || {};

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit('updateUserDataForm');
  };
  return (
    <>
      <PageHeader>
        <Typography variant="h4" color="primary">
          Edit User Settings
        </Typography>
      </PageHeader>
      <PageContent>
        <FormWrapper onSubmit={handleSubmit('updateUserDataForm')}>
          <StyledTextField
            label="Email"
            placeholder="Enter your email"
            value={userDataValues.email}
            onChange={handleChange('updateUserDataForm', 'email')}
            margin="normal"
            variant="outlined"
            type="email"
            required
            theme={theme}
          />
          <StyledTextField
            label="First Name"
            placeholder="Enter your first name"
            value={userDataValues.firstName}
            onChange={handleChange('updateUserDataForm', 'firstName')}
            margin="normal"
            variant="outlined"
            required
            theme={theme}
          />
          <StyledTextField
            label="Last Name"
            placeholder="Enter your last name"
            value={userDataValues.lastName}
            onChange={handleChange('updateUserDataForm', 'lastName')}
            margin="normal"
            variant="outlined"
            required
            theme={theme}
          />
          <StyledTextField
            label="Phone"
            placeholder="Enter your role data"
            value={userDataValues.phone}
            onChange={handleChange('updateUserDataForm', 'phone')}
            margin="normal"
            variant="outlined"
            required
            theme={theme}
          />
          <StyledButton
            type="submit"
            fullWidth
            margin="normal"
            variant="contained"
            theme={theme}
          >
            Save
          </StyledButton>
        </FormWrapper>
      </PageContent>
    </>
  );
};

export default EditUserProfileForm;
