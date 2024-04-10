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
const HeroChartSection = ({ randomCards, activeCardIndex, shouldShow }) => {
  const { theme } = useMode();
  const chartData = useMemo(() => {
    return randomCards[activeCardIndex]?.averagedChartData?.['30d']?.data || [];
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
              <CardContent>
                <DashboardBox gridArea="b">
                  <img src={placeHolder} />
                </DashboardBox>
              </CardContent>
              <CardContent sx={{ flexGrow: 1 }}>
                <DashboardBox gridArea="b">
                  <BoxHeader
                    title="Revenue and Expenses"
                    subtitle="top line represents revenue, bottom line represents expenses"
                    sideText="+4%"
                  />{' '}
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
                        bottom: 55,
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
                      />
                      <Tooltip />
                      <Legend
                        height={20}
                        wrapperStyle={{
                          margin: '0 0 10px 0',
                        }}
                      />
                      <Line type="monotone" dataKey="y" stroke="#8884d8" />
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
