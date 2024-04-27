/* eslint-disable max-len */
import React, { useEffect } from 'react';
import {
  Typography,
  Skeleton,
  Box,
  Grid,
  Container,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import { useMode } from '../../context';
import GenericCard from '../../components/cards/GenericCard';
import Info from './Info';
import useManager from '../../context/useManager';
import { CardWrapper } from '../REUSABLE_STYLED_COMPONENTS/SpecificStyledComponents';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { flexbox } from '@mui/system';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';

const CartContent = ({ activeStep }) => {
  const { theme } = useMode();
  const { cart, fetchCart, hasFetchedCart } = useManager();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCart(); // Assuming fetchUserCart updates cartData
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    if (!hasFetchedCart) {
      fetchData();
    }
  }, [fetchCart]);
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
      <Container
        sx={{
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Grid container spacing={3}>
          <CardWrapper border={false} content={false} theme={theme}>
            <Box sx={{ p: 2 }}>
              <List sx={{ py: 0 }}>
                <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        color: '#fff',
                      }}
                    >
                      <TableChartOutlinedIcon fontSize="inherit" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      py: 0,
                      mt: 0.45,
                      mb: 0.45,
                    }}
                    primary={
                      <Typography
                        variant="h4"
                        sx={{ color: theme.palette.greenAccent.darkest }}
                      >
                        $203k
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        sx={{ color: 'primary.light', mt: 0.25 }}
                      >
                        Your Cart
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
          </CardWrapper>
          {/* </Grid> */}
          {cart?.items?.map((card, index) => (
            <Grid item xs={4} sm={4} md={4} lg={12} key={index}>
              {console.log(card)}
              <CardWrapper border={false} content={false} theme={theme}>
                <Box sx={{ p: 2 }}>
                  <List sx={{ py: 0 }}>
                    <ListItem
                      alignItems="center"
                      disableGutters
                      sx={{
                        py: 0,
                        display: flexbox,
                        flexDirection: 'row',
                        maxHeight: '200px',
                      }}
                    >
                      <MDBox>
                        <GenericCard
                          key={card.id + index}
                          cardClasses="base-card-no-quantity"
                          index={index}
                          card={card}
                          page={'Cart'}
                          context={'Cart'}
                          isDeckCard={true}
                        />
                      </MDBox>
                      <MDBox>
                        <ListItemText
                          sx={{
                            py: 0,
                            mt: 0.45,
                            mb: 0.45,
                          }}
                          primary={
                            <Info totalPrice={cart?.totalPrice || ''} />
                            // <Typography
                            //   variant="h4"
                            //   sx={{ color: theme.palette.greenAccent.darkest }}
                            // >
                            //   {card.name}
                            // </Typography>
                          }
                          secondary={
                            <Typography
                              variant="subtitle2"
                              sx={{ color: 'primary.light', mt: 0.25 }}
                            >
                              Your Cart
                            </Typography>
                          }
                        />
                      </MDBox>
                    </ListItem>
                  </List>
                </Box>
              </CardWrapper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CartContent;
