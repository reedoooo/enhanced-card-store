import placeHolder from 'assets/images/placeholder.jpeg';
import { Card, CardContent, Zoom } from '@mui/material';
import {
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
} from 'recharts';
import { useMode } from 'context';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  BoxHeader,
  DashboardBox,
  FlexBetween,
  MDBox,
  RCWrappedIcon,
} from 'layout/REUSABLE_COMPONENTS';
const currencyFormatter = (value, separator = '.') => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(numericValue);
};
const HeroChartSection = ({
  card = {},
  randomCards = [],
  activeCardIndex = 0,
  shouldShow = false,
}) => {
  const { theme } = useMode();
  const [isContainerReady, setIsContainerReady] = useState(false);
  const chartContainerRef = useRef(null);

  const chartData = useMemo(() => {
    return randomCards[activeCardIndex]?.averagedChartData?.['30d']?.data || [];
  }, [randomCards, activeCardIndex]);
  const yDomain = useMemo(() => {
    if (!chartData.length) return [0, 0]; // Default domain if no data
    const values = chartData.map((item) => item.y);
    const minY = Math.min(...values);
    const maxY = Math.max(...values);
    return [minY, maxY];
  }, [chartData]);
  const cardData = useMemo(() => {
    return randomCards[activeCardIndex];
  }, [randomCards, activeCardIndex]);
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        setIsContainerReady(true);
      }
    });

    if (chartContainerRef.current) {
      observer.observe(chartContainerRef.current);
    }

    return () => {
      if (chartContainerRef.current) {
        observer.unobserve(chartContainerRef.current);
      }
    };
  }, []);

  return (
    <FlexBetween
      sx={{
        width: '100%',
        maxHeight: 'calc(1000% - 64px)',
        overflow: 'auto',
      }}
    >
      <Zoom in={shouldShow}>
        <MDBox
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            flexGrow: 1,
            padding: theme.spacing(1),
          }}
          ref={chartContainerRef}
        >
          <Card
            sx={{
              width: '100%',
              height: '100%', // Make card full height of its container

              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'transparent',
              overflow: 'hidden',
            }}
          >
            <FlexBetween
              sx={{
                width: '100%',
                justifyContent: 'space-around', // Distribute space evenly around content
                padding: theme.spacing(2), // Adjust padding for even spacing
              }}
            >
              <CardContent style={{ maxWidth: '25%', maxHeight: '100%' }}>
                <DashboardBox gridArea="b">
                  <img
                    src={cardData?.image}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </DashboardBox>
              </CardContent>
              <CardContent
                sx={{
                  flexGrow: 1,
                  border: theme.palette.success.dark,
                  borderWidth: 5,
                }}
              >
                <DashboardBox
                  gridArea="b"
                  sx={{
                    flexGrow: 1,
                    border: theme.palette.success.dark,
                    borderWidth: 5,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Card
                    sx={{
                      width: '100%',
                      justifyContent: 'center',
                      p: theme.spacing(2),
                      background: theme.palette.transparent.main,
                      border: theme.palette.success.darkest,
                      borderWidth: 5,
                      borderRadius: 'inherit',
                    }}
                  >
                    <BoxHeader
                      title={cardData?.name}
                      titleVariant={'h3'}
                      subtitle="none"
                      sideText={`$${cardData?.price}`}
                      icon={
                        <MDBox
                          sx={{
                            border: 'none',
                          }}
                        >
                          <RCWrappedIcon
                            size="large"
                            bgColor="success"
                            // color="white"
                            // sx={{
                            //   background: '#4e93a6',
                            // }}
                          >
                            <FaShieldAlt
                              fontSize={theme.typography.pxToRem(20)}
                            />{' '}
                          </RCWrappedIcon>
                        </MDBox>
                      }
                    />
                  </Card>
                  {isContainerReady && (
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                      minHeight={300}
                      minWidth={0}
                    >
                      <LineChart
                        width={500}
                        height={400}
                        data={chartData}
                        margin={{
                          top: 20,
                          right: 0,
                          left: -10,
                          bottom: 10,
                        }}
                      >
                        <CartesianGrid
                          vertical={false}
                          stroke={theme.palette.grey.default}
                        />
                        <XAxis dataKey="x" style={{ fontSize: '10px' }} />
                        <YAxis
                          dataKey="y"
                          tickLine={false}
                          axisLine={false}
                          style={{ fontSize: '10px' }}
                          domain={yDomain}
                          tickFormatter={(item) => currencyFormatter(item)}
                        />
                        <Tooltip />
                        <Legend
                          height={20}
                          wrapperStyle={{
                            margin: '0 0 10px 0',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="y"
                          format={(value) => `$${value}`}
                          stroke={theme.palette.success.main}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </DashboardBox>
              </CardContent>
            </FlexBetween>
          </Card>
        </MDBox>
      </Zoom>
    </FlexBetween>
  );
};

HeroChartSection.propTypes = {
  card: PropTypes.object,
  randomCards: PropTypes.array,
  activeCardIndex: PropTypes.number,
  shouldShow: PropTypes.bool,
};

export default HeroChartSection;
