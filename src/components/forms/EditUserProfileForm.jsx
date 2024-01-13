import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useMode } from '../../context/hooks/colormode';
import { useUserContext } from '../../context/UserContext/UserContext';
import { usePageContext } from '../../context/PageContext/PageContext';
import { useTheme } from '@mui/styles';
import { useSpring, animated } from 'react-spring';
import { PageLayout, PageHeader, PageContent } from '../../layout';
import LoadingIndicator from '../../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../../components/reusable/indicators/ErrorIndicator';
import ThemeToggleButton from '../../components/reusable/buttons/ThemeToggleButton';
import { FormWrapper, StyledTextField, StyledButton } from './styled';
import { useFormContext } from '../../context';

const EditUserProfileForm = () => {
  const { theme } = useMode();
  // const { user } = useAuthContext();
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
  useEffect(() => {
    if (!userId) return;

    const initializeUser = async () => {
      setIsPageLoading(true);
      try {
        if (!user || Object.keys(user).length === 0) {
          await fetchUserData();
        }
      } catch (e) {
        setPageError(e);
      } finally {
        setIsPageLoading(false);
      }
    };

    initializeUser();
  }, [userId]);

  return (
    <PageLayout>
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
    </PageLayout>
  );
};

export default EditUserProfileForm;
