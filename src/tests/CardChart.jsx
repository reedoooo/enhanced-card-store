import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CardLinearChart from './CardLinearChart';
import {
  ErrorBoundary,
  useCollectionStore,
  useMode,
  usePageContext,
} from '../context';
import useCardCronJob from './useCardCronJob';
import initialCardData from './initialCardData';
import { format } from 'date-fns';
import SingleCardAnimation from '../assets/animations/SingleCardAnimation';
import LoadingCardAnimation from '../assets/animations/LoadingCardAnimation';
import ImageDisplayFromHook from '../components/other/dataDisplay/ImageDisplayFromHook';

// Adjust the padding, margin, and other styles as needed
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
// A square, responsive container for the chart
const SquareChartContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%', // 100% of the parent width
  paddingTop: '100%', // Maintain aspect ratio (1:1)
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
  const theme2 = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const { selectedCollection, allCollections } = useCollectionStore();
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const { startUpdates, pauseUpdates, resetData } =
    useCardCronJob(initialCardData);
  const formatTimestamp = (timestamp) =>
    format(new Date(timestamp), "MMM do, yyyy 'at' HH:mm");

  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const { setLoading, loadingStatus, returnDisplay } = usePageContext();
  if (!cardData || !cardData?.dailyPriceHistory) {
    console.log('Card data not found', cardData);
    // setLoading('isLoading', true);
  }
  const safeCardData = cardData || { dailyPriceHistory: [] };
  const dailyPriceHistory = safeCardData?.dailyPriceHistory;

  // effect for loading animation while data for chart is loading
  // useEffect(() => {
  //   // shouldLoad is true if cardData or cardData.dailyPriceHistory is null or empty
  //   const shouldLoad =
  //     !cardData ||
  //     !cardData?.dailyPriceHistory ||
  //     !cardData.dailyPriceHistory.length;
  //   console.warn('Should load:', shouldLoad);
  //   // Set loading status if shouldLoad is different from loadingStatus.isLoading
  //   // if (shouldLoad !== loadingStatus.isLoading) {
  //   //   setLoading('isLoading', shouldLoad);
  //   // }
  //   // if (shouldLoad) {
  //   //   setLoading('isLoading', true);
  //   // } else {
  //   //   setLoading('isLoading', false);
  //   // }
  // }, [cardData, loadingStatus.isLoading, setLoading]); // Add loadingStatus.isLoading to dependencies

  // useEffect to set image state when cardData changes
  useEffect(() => {
    if (cardData?.imageUrl) {
      setImageUrl(cardData?.image);
    }
  }, [cardData?.imageUrl]);

  const chartData = useMemo(
    () =>
      dailyPriceHistory?.map((priceEntry) => ({
        x: priceEntry?.timestamp,
        y: priceEntry?.num,
      })),
    [dailyPriceHistory] // dependency array
  );
  const nivoReadyData = useMemo(
    () => [
      {
        id: cardData?.name || 'default', // Fallback ID if cardData.name is not available
        data: chartData,
      },
    ],
    [chartData, cardData?.name]
  );
  // Ensure this effect doesn't set loading when not necessary
  useEffect(() => {
    if (nivoReadyData && nivoReadyData.length > 0 && loadingStatus.isLoading) {
      setLoading('isLoading', false);
    }
  }, [nivoReadyData, setLoading, loadingStatus.isLoading]);
  // Add responsive chart dimension handling
  useEffect(() => {
    // Example of setting dynamic chart dimensions (could be more complex based on container size)
    const updateDimensions = () => {
      const width = window.innerWidth < 500 ? window.innerWidth : 500; // or some other logic
      const height = 300; // Fixed height or based on aspect ratio
      setChartDimensions({ width, height });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions(); // Initial call

    return () => {
      window.removeEventListener('resize', updateDimensions); // Cleanup listener
    };
  }, []); // Empty array ensures this effect runs only once after initial render
  // Simplified for demonstration
  const renderLoadingAnimation = () => {
    return <LoadingCardAnimation selected={true} />;
  };
  const renderHeaderWithAnimation = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center', // Align items vertically
        }}
      >
        <CardHeader
          title="Card Cron Job Simulator"
          sx={{
            padding: theme.spacing(1),
            margin: theme.spacing(1),
          }}
        />
        {/* Conditionally render animation based on size or other conditions */}
        {isLgUp && renderLoadingAnimation()}
      </Box>
    );
  };
  // const renderImageLoadTestWithErrorHandling = () => {
  //   const handleImageLoad = () => {
  //     console.log('Image loaded');
  //   };
  //   const handleImageError = () => {
  //     console.log('Image error');
  //   };
  //   return (
  //     <ErrorBoundary>
  //       <ImageDisplayFromHook
  //         imageUrl={imageUrl}
  //         handleImageLoad={handleImageLoad}
  //         handleImageError={handleImageError}
  //       />
  //     </ErrorBoundary>
  //   );
  // };
  // const renderImageLoadTest = () => {
  //   if (!imageUrl && allCollections?.length > 0) return null;
  //   // if (!imageUrl && allCollections?.length > 0) {
  //   //   setImageUrl(allCollections[0]?.cards[0]?.image);
  //   // }
  //   const handleImageLoad = () => {
  //     console.log('Image loaded');
  //   };
  //   const handleImageError = () => {
  //     console.log('Image error');
  //   };
  //   return (
  //     <ImageDisplayFromHook
  //       imageUrl={imageUrl}
  //       handleImageLoad={handleImageLoad}
  //       handleImageError={handleImageError}
  //     />
  //   );
  // };
  // const renderLoadingAnimation = () => {
  //   if (isLgUp) {
  //     console.log('Loading animation');
  //     return (
  //       <Container
  //         sx={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           height: '50%',
  //           width: '50%',
  //         }}
  //       >
  //         {/* Use LoadingCardAnimation with the correct props */}
  //         <LoadingCardAnimation
  //           cards={[]}
  //           isLoading={true}
  //           error={null}
  //           cardData={cardData}
  //         />
  //       </Container>
  //     );
  //   }
  //   return null;
  // };

  return (
    <React.Fragment>
      <Card
        variant="outlined"
        sx={{
          background: theme.palette.backgroundA.lightest,
          // width: '100%',
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
            // background: theme.palette.backgroundA.lightest,
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
              // width: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              padding: theme.spacing(2),
            }}
          >
            {renderHeaderWithAnimation()}
          </Box>
          {/* <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              // width: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              padding: theme.spacing(2),
            }}
          >
            {renderImageLoadTest()}
          </Box> */}
          <SquareChartContainer>
            <ChartArea theme={theme}>
              {loadingStatus?.isLoading ? (
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
            // background: theme.palette.backgroundA.lightest,
            elevation: 2,
            boxShadow: 2,
            // marginTop: 2,
            // py: 1,
          }}
        >
          {/* Card displaying data with responsive typography */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              background: theme.palette.backgroundA.lightest,
              // py: 1,
              width: '100%',
              height: '100%',
            }}
          >
            <CardActions
              sx={{
                justifyContent: 'space-between',
                width: '100%',
                margin: 0,
                padding: 0,
              }}
            >
              {/* Responsive Button Styling */}
              {/* Iterate through buttons to reduce redundancy */}
              {['Start Updates', 'Pause Updates', 'Reset Data'].map(
                (text, index) => (
                  <Button
                    key={index}
                    variant={text === 'Reset Data' ? 'outlined' : 'contained'}
                    onClick={() => {
                      if (text === 'Start Updates') {
                        startUpdates();
                      } else if (text === 'Pause Updates') {
                        pauseUpdates();
                      } else if (text === 'Reset Data') {
                        resetData();
                      }
                    }}
                    sx={{
                      // padding: theme.spacing(1), // Reduced padding
                      fontSize: '0.7rem', // Reduced font size
                      width: '30%', // Adjusted width
                      height: '75%',
                      mx: '0.5rem',
                      my: '0.5rem',
                      // margin: '0 5px', // Adjust margin for spacing
                      color: theme.palette.text.primary,
                      background: theme.palette.backgroundA.darker,
                      '&:hover': {
                        background: theme.palette.backgroundA.darkest,
                      },
                    }}
                  >
                    {text}
                  </Button>
                )
              )}
            </CardActions>
          </Box>
          <CardContent
            sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}
          >
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
                  maxHeight: { xs: '120px', sm: '150px', md: '200px' }, // Responsive max height
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
