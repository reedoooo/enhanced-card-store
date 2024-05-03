import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useMode } from 'context';
import Copyright from 'layout/REUSABLE_COMPONENTS/system-utils/Copyright';

const steps = ['Shipping address', 'Payment details', 'Review your order'];
function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}
export default function Checkout({ activeStep, setActiveStep }) {
  const { theme } = useMode();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const stripePromise = React.useMemo(
    () => loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY),
    [process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY]
  );
  return (
    <Elements stripe={stripePromise}>
      <React.Fragment>
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            mb: 4,
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              my: { xs: 3, md: 6 },
              p: { xs: 2, md: 3 },
              border: `5px solid ${theme.newPalette.success.main}`,
            }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom theme={theme}>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1" theme={theme}>
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
          <Copyright />
        </Container>
      </React.Fragment>
    </Elements>
  );
}
