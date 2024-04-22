import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import placeHolder from '../../assets/images/placeholder.jpeg';
import { Card, CardContent, Zoom } from '@mui/material';
import FlexBetween from '../REUSABLE_COMPONENTS/FlexBetween';
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
import DashboardBox from '../REUSABLE_COMPONENTS/DashboardBox';
import BoxHeader from '../REUSABLE_COMPONENTS/BoxHeader';
import { useMode } from '../../context';
import { useMemo } from 'react';
import {
  FaDragon,
  FaLevelUpAlt,
  FaRegLightbulb,
  FaShieldAlt,
  FaVenusMars,
} from 'react-icons/fa';
import RCWrappedIcon from '../REUSABLE_COMPONENTS/RCWRAPPEDICON/RCWrappedIcon';
const HeroChartSection = ({
  card,
  randomCards,
  activeCardIndex,
  shouldShow,
}) => {
  const { theme } = useMode();
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
                <DashboardBox
                  gridArea="b"
                  // style={{ maxWidth: '50%', maxHeight: '100%' }}
                >
                  <img
                    src={cardData?.image}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </DashboardBox>
              </CardContent>
              <CardContent
                sx={{
                  flexGrow: 1,
                  border: theme.palette.chartTheme.greenAccent.default,
                  borderWidth: 5,
                }}
              >
                <DashboardBox
                  gridArea="b"
                  // style={{ width: '100%', height: '100%', flexGrow: 1 }}
                  sx={{
                    flexGrow: 1,
                    border: theme.palette.chartTheme.greenAccent.default,
                    borderWidth: 5,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Card
                    sx={{
                      width: '100%',
                      justifyContent: 'center',
                      // borderRadius: theme.spacing(4),
                      p: theme.spacing(2),
                      background: theme.palette.transparent.main,
                      border: theme.palette.chartTheme.greenAccent.dark,
                      borderWidth: 5,

                      borderRadius: 'inherit',
                    }}
                  >
                    <BoxHeader
                      title={cardData?.name}
                      // subtitle={`$${cardData?.price}`}
                      titleVariant={'h3'}
                      subtitle="none"
                      sideText={`$${cardData?.price}`}
                      // sideText="+4%"
                      icon={
                        <MDBox
                          sx={{
                            border: 'none',
                          }}
                        >
                          <RCWrappedIcon
                            color="white"
                            sx={{
                              background:
                                theme.palette.greenAccent.pureGreenBlue,
                            }}
                          >
                            <FaShieldAlt
                              fontSize={theme.typography.pxToRem(20)}
                            />{' '}
                          </RCWrappedIcon>
                        </MDBox>
                      }
                      // useSX={true}
                      // paddingVariant={'1rem'}
                      // sx={{
                      //   root: {
                      //     padding: theme.spacing(1),
                      //     marginBottom: theme.spacing(2),
                      //   },
                      //   title: {
                      //     fontWeight: 'bold',
                      //     fontSize: '1.5rem',
                      //     color: theme.palette.text.primary,
                      //   },
                      //   subtitle: {
                      //     color: theme.palette.text.secondary,
                      //     fontSize: '1rem',
                      //   },
                      //   sideText: {
                      //     color: theme.palette.primary.main,
                      //     fontWeight: 'bold',
                      //     fontSize: '1rem',
                      //   },
                      // }}
                    />
                  </Card>
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    minHeight={300}
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
                        stroke={theme.palette.chartTheme.grey.default}
                      />
                      <XAxis dataKey="x" style={{ fontSize: '10px' }} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        style={{ fontSize: '10px' }}
                        domain={yDomain}
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
                        stroke={theme.palette.success.main}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </DashboardBox>
              </CardContent>
            </FlexBetween>
          </Card>
        </MDBox>
      </Zoom>
    </FlexBetween>
  );
};

export default HeroChartSection;
