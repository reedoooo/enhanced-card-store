/* eslint-disable max-len */
import React from 'react';
import {
  Typography,
  Skeleton,
  Box,
  Grid,
  Container,
  Button,
} from '@mui/material';
import { useMode } from '../../context';
import GenericCard from '../../components/cards/GenericCard';
import { useCartManager } from '../../context/MAIN_CONTEXT/CartContext/useCartManager';
import LoadingOverlay from '../../layout/REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Info from './Info';
const CartContent = ({ activeStep }) => {
  const { theme } = useMode();
  const { cart } = useCartManager();
  const logoStyle = {
    width: '140px',
    height: '56px',
    marginLeft: '-4px',
    marginRight: '-8px',
  };
  return (
    <Box
      sx={{
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.grey.lighterSimpleGrey,
        borderRadius: '5px',
        padding: '0.5rem',
        overflowY: 'auto',
        [theme.breakpoints.up('sm')]: {
          padding: '1rem',
        },
        [theme.breakpoints.up('md')]: {
          padding: '1.5rem',
        },
      }}
    >
      {/* <Container
        sx={{
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: theme.palette.text.primary,
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.75rem',
            },
          }}
        >
          Your Cart
        </Typography>
      </Container> */}
      <Container
        sx={{
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={12}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              backgroundColor: 'background.paper',
              borderRight: { sm: 'none', md: '1px solid' },
              borderColor: { sm: 'none', md: 'divider' },
              alignItems: 'start',
              pt: 4,
              px: 10,
              gap: 4,
            }}
          >
            {' '}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: theme.palette.text.primary,
                [theme.breakpoints.down('sm')]: {
                  fontSize: '1.75rem',
                },
              }}
            >
              Your Cart
            </Typography>
            {/* <Box
              sx={{
                display: 'flex',
                alignItems: 'end',
                height: 150,
              }}
            >
              <Button
                startIcon={<ArrowBackRoundedIcon />}
                component="a"
                href="/material-ui/getting-started/templates/landing-page/"
                sx={{ ml: '-8px' }}
              >
                Back to
                <img
                  src={
                    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                  }
                  style={logoStyle}
                  alt="Sitemark's logo"
                />
              </Button>
            </Box> */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                maxWidth: 500,
              }}
            >
              <Info totalPrice={cart?.totalPrice || ''} />
            </Box>
          </Grid>
          {cart?.items?.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              {console.log(card)}
              <GenericCard
                key={card.id + index}
                cardClasses="base-card-no-quantity"
                index={index}
                card={card}
                page={'Cart'}
                context={'Cart'}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CartContent;
