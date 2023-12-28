// Import dependencies
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

const EditUserSettingsForm = ({ user }) => {
  const [cookies] = useCookies(['user']);
  const { theme } = useMode();
  const { user: currentUser } = cookies;
  const userId = currentUser?.id;

  const {
    userData,
    updateUser,
    fetchUserData,
    isLoading,
    setIsLoading,
    pageError,
    setPageError,
    logPageData,
  } = useUserContext();

  const {
    isPageLoading,
    setIsPageLoading,
    // pageError,
    // setPageError,
    // logPageData,
  } = usePageContext();

  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formError, setFormError] = useState(null);

  const { email, password, confirmPassword } = formState;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    try {
      setIsLoading(true);
      await updateUser(userId, formState);
      await fetchUserData();
      logPageData('EditUserSettingsForm', userData);
    } catch (e) {
      console.error('Failed to update user settings:', e);
      setPageError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;

    const initializeUser = async () => {
      setIsPageLoading(true);
      try {
        if (!userData || Object.keys(userData).length === 0) {
          await fetchUserData();
        }
        logPageData('EditUserSettingsForm', userData);
      } catch (e) {
        setPageError(e);
      } finally {
        setIsPageLoading(false);
      }
    };

    initializeUser();
  }, [userId]);

  if (isPageLoading) return <LoadingIndicator />;
  if (pageError) return <ErrorIndicator error={pageError} />;
  if (isLoading) return <LoadingIndicator />;

  return (
    <PageLayout>
      <PageHeader>
        <Typography variant="h4" color="primary">
          Edit User Settings
        </Typography>
      </PageHeader>
      <PageContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box mt={3} display="flex" justifyContent="center">
            <ThemeToggleButton />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            margin="normal"
          >
            Save
          </Button>
        </form>
      </PageContent>
    </PageLayout>
  );
};

export default EditUserSettingsForm;
