import React from 'react';
import useCardCronJob from './useCardCronJob'; // path to your hook
import initialCardData from './initialCardData';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
} from '@mui/material';
import { useMode } from '../context';
import { format } from 'date-fns';

const CardComponent = () => {
  const { theme } = useMode();
  const { cardData, startUpdates, pauseUpdates, resetData } =
    useCardCronJob(initialCardData);
  // Format timestamp to be more human readable
  const formatTimestamp = (timestamp) =>
    format(new Date(timestamp), "MMM do, yyyy 'at' HH:mm");

  return (
    <Box
      sx={{
        maxWidth: 500,
        maxHeight: 50,
        // margin: 'auto',
        textAlign: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
      }}
    >
      <Card
        variant="outlined"
        sx={{ background: theme.palette.background.paper }}
      >
        <CardContent sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" gutterBottom>
            Card Cron Job Simulator
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: 2,
              height: '60%',
            }}
          >
            <Button
              variant="contained"
              onClick={startUpdates}
              sx={{
                marginRight: 2,
                padding: theme.spacing(1),
                color: theme.palette.text.primary,
                width: '100%',
                fontSize: '0.75rem',
                background: theme.palette.backgroundA.dark,
                '&:hover': {
                  background: theme.palette.backgroundA.darkest,
                },
              }}
            >
              Start Updates
            </Button>
            <Button
              variant="contained"
              onClick={pauseUpdates}
              sx={{
                marginRight: 2,
                color: theme.palette.text.primary,
                width: '100%',

                background: theme.palette.backgroundA.dark,
                '&:hover': {
                  background: theme.palette.backgroundA.darkest,
                },
              }}
            >
              Pause Updates
            </Button>
            <Button
              variant="outlined"
              onClick={resetData}
              sx={{
                marginRight: 2,
                color: theme.palette.text.primary,
                width: '100%',
                background: theme.palette.backgroundA.dark,
                '&:hover': {
                  background: theme.palette.backgroundA.darkest,
                },
              }}
            >
              Reset Data
            </Button>
          </Box>

          {/* Displaying the card data for demonstration */}
          <Card variant="outlined">
            <CardContent>
              {/* Card Data */}
              {/* <Typography
                color="textSecondary"
                gutterBottom
                variant="subtitle1"
              >
                Card Data:
              </Typography> */}

              <Typography variant="body2" gutterBottom>
                Daily Price History:
              </Typography>
              <List dense>
                {cardData?.dailyPriceHistory?.map((entry, index) => (
                  <ListItem
                    key={index}
                    divider
                    sx={{ justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">
                      Quantity: {cardData?.quantity}
                    </Typography>
                    <Typography variant="body2">
                      Price: ${entry?.num}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {formatTimestamp(entry?.timestamp)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardComponent;
