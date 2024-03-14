import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardLinearChart from './CardLinearChart';
import { ErrorBoundary, useMode, usePageContext } from '../context';
import useCardCronJob from './useCardCronJob';
import initialCardData from '../data/initialCardData';
import { format } from 'date-fns';
import LoadingCardAnimation from '../assets/animations/LoadingCardAnimation';
import styled from 'styled-components';
import MDButton from './REUSABLE_COMPONENTS/MDBUTTON';
import { useLoading } from '../context/hooks/useLoading';

const ChartArea = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #000',
  borderRadius: '5px',
}));
const SquareChartContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '100%',
  overflow: 'hidden',
  '& > *': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));

const CardChart = ({ cardData = initialCardData }) => {
  // STYLING AND MEDIA QUERY HOOKS
  const { theme } = useMode();
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const [imageUrl, setImageUrl] = useState(null);
  const { startUpdates, pauseUpdates, resetData } =
    useCardCronJob(initialCardData);
  const formatTimestamp = (timestamp) =>
    format(new Date(timestamp), "MMM do, yyyy 'at' HH:mm");
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const { returnDisplay } = usePageContext();
  const { isLoading } = useLoading();
  useEffect(() => {
    if (cardData?.imageUrl) {
      console.log('Setting image url', cardData?.imageUrl);
      setImageUrl(cardData?.image);
    }
  }, [cardData?.imageUrl]);

  const nivoReadyData = useMemo(
    () => [
      {
        id: cardData?.name || 'default',
        data: cardData?.dailyPriceHistory?.map(({ timestamp, num }) => ({
          x: timestamp,
          y: num,
        })),
      },
    ],
    [cardData]
  );
  const renderLoadingAnimation = () =>
    isLgUp && <LoadingCardAnimation selected={true} />;
  useEffect(() => {
    if (isLoading('fetchCollections')) {
      console.log('Fetching collections');
    }
  }, [isLoading('fetchCollections')]);
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth < 500 ? window.innerWidth : 500;
      const height = 300;
      setChartDimensions({ width, height });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  const renderHeaderWithAnimation = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Card Cron Job Simulator"
          subheader={cardData?.name || 'Card Name'}
          sx={{
            padding: theme.spacing(1),
            margin: theme.spacing(1),
          }}
        />
        {isLgUp && renderLoadingAnimation()}
      </Box>
    );
  };
  return (
    <React.Fragment>
      <Card
        variant="outlined"
        sx={{
          background: theme.palette.backgroundA.lightest,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #000',
          borderRadius: '5px',
          elevation: 2,
          boxShadow: 2,
          marginTop: 2,
        }}
      >
        <CardContent
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(1),
            margin: theme.spacing(1),
            elevation: 2,
            boxShadow: 2,
            marginTop: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '100%',
              maxHeight: '100%',
              padding: theme.spacing(2),
            }}
          >
            {renderHeaderWithAnimation()}
          </Box>

          <SquareChartContainer>
            <ChartArea theme={theme}>
              {isLoading('fetchCollections') ? (
                returnDisplay()
              ) : (
                <ErrorBoundary>
                  <CardLinearChart
                    nivoReadyData={nivoReadyData}
                    dimensions={chartDimensions}
                  />
                </ErrorBoundary>
              )}
            </ChartArea>
          </SquareChartContainer>
        </CardContent>

        <Card
          sx={{
            elevation: 2,
            boxShadow: 2,
          }}
        >
          <CardActions
            sx={{
              justifyContent: 'space-between',
              width: '100%',
              m: 0,
              p: 0,
            }}
          >
            {['Start Updates', 'Pause Updates', 'Reset Data'].map(
              (text, index) => (
                <MDButton
                  key={index}
                  onClick={() => {
                    if (text === 'Start Updates') startUpdates();
                    else if (text === 'Pause Updates') pauseUpdates();
                    else if (text === 'Reset Data') resetData();
                  }}
                  color="primary"
                  variant="contained"
                  sx={{
                    color: theme.palette.backgroundA.contrastText,
                    background: theme.palette.backgroundF.darker,
                    borderColor: theme.palette.backgroundB.darkest,
                    borderWidth: 2,
                    mt: 'auto',
                    flexGrow: 1,
                    justifySelf: 'bottom',
                    bottom: 0,
                    width: '100%',
                    '&:hover': {
                      color: theme.palette.backgroundA.contrastTextC,
                      fontWeight: 'bold',
                      background: theme.palette.backgroundF.dark,
                      borderColor: theme.palette.backgroundB.darkest,
                      border: `1px solid ${theme.palette.backgroundB.darkest}`,
                    },
                  }}
                >
                  {text}
                </MDButton>
              )
            )}
          </CardActions>
          <CardContent sx={{ padding: 0, '&:last-child': { pb: 0 } }}>
            <Paper
              sx={{
                background: theme.palette.backgroundA.lighter,
                border: `1px solid${theme.palette.backgroundA.darker}`,
                borderRadius: '5px',
                elevation: 2,
                boxShadow: 2,
                padding: theme.spacing(1),
                margin: theme.spacing(1),
              }}
            >
              <List
                dense
                sx={{
                  maxHeight: { xs: '120px', sm: '150px', md: '200px' },
                  overflowY: 'auto',
                }}
              >
                {cardData?.dailyPriceHistory?.map((entry, index) => (
                  <ListItem
                    key={index}
                    divider
                    sx={{ justifyContent: 'space-between' }}
                  >
                    <Typography variant="caption">
                      Quantity: {cardData?.quantity}
                    </Typography>
                    <Typography variant="caption">
                      Price: ${entry?.num}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {formatTimestamp(entry?.timestamp)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </CardContent>
        </Card>
      </Card>
    </React.Fragment>
  );
};

export default CardChart;
