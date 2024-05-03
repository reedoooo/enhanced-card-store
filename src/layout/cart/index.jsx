/* eslint-disable max-len */
import React from 'react';
import { Typography, Box, Grid, CardContent, Card, Stack } from '@mui/material';
import { useMode } from '../../context';
import useManager from '../../context/useManager';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';

const CartContent = () => {
  const { theme } = useMode();
  const { cart } = useManager();
  return (
    <MDBox
      sx={{
        flexGrow: 1,
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        overflow: 'hidden',
        p: 2,
      }}
    >
      <Grid container spacing={1}>
        {/* CARD LIST */}
        {cart?.items?.map((card, index) => (
          <Grid item xs={4} sm={4} md={12} lg={6} xl={4} key={card.id}>
            <Card
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
            >
              <Box
                sx={{
                  flex: '1 1 auto', // Allows balanced space between image and content
                  padding: theme.spacing(2),
                }}
                theme={theme}
              >
                <MDBox
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MDBox
                    sx={{
                      display: 'flex',
                      flexDirection: 'row', // Changed from 'column' to 'row'
                      justifyContent: 'space-between', // Ensures spacing between name and price
                      alignItems: 'center',
                      width: '100%', // Ensures it spans the full width of the card
                      padding: theme.spacing(2),
                    }}
                  >
                    <Typography
                      variant="body1"
                      noWrap
                      theme={theme}
                      color="primary"
                    >
                      {card.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      noWrap
                      theme={theme}
                      color="secondary"
                    >
                      {`$${card.price}`}
                    </Typography>
                  </MDBox>
                  <MDBox
                    component="img"
                    sx={{
                      width: '100%',
                      objectFit: 'cover',
                      '&:lg': { width: 270, height: 'auto' }, // Custom styling at `lg` breakpoint
                    }}
                    src={card?.image}
                    alt={card.name}
                  />
                </MDBox>
                {/* <Typography variant="h6" noWrap theme={theme}>
                  {`$${card.price}`}
                </Typography> */}
              </Box>
              <CardContent
                sx={{
                  flexGrow: 1,
                  overflow: 'hidden',
                  flex: '1 1 auto', // Ensures content occupies balanced space
                  padding: theme.spacing(3),
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'start',
                  maxHeight: 150,
                }}
              >
                <Typography
                  variant="body1"
                  flexWrap={1}
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                  theme={theme}
                >
                  {card.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </MDBox>
  );
};

export default CartContent;
