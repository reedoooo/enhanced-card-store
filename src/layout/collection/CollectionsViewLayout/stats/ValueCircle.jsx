/* eslint-disable max-len */
import React from 'react';
import { Box, Card, Icon } from '@mui/material';
import { useMode } from 'context';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import BoxHeader from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/BoxHeader';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import useManager from 'context/useManager';
import RCWrappedIcon from 'layout/REUSABLE_COMPONENTS/RCWRAPPEDICON';

const ValuDistributionCircle = () => {
  const { theme } = useMode();
  const { collectionMetaData } = useManager();
  const colors = theme.palette;
  const { main_lighter, darkest, light, dark } = colors.success;
  const greyDark = colors.grey.dark;
  const greyDarkest = colors.grey.darkest;
  const contrastText = colors.grey.contrastText;
  const primaryDark = colors.primary.dark;
  const COLORS = [colors.success.dark, main_lighter, light, dark, darkest];
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: '0.875rem' }}
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <MDBox
      sx={{
        width: '100%',
        height: '100%',
        flexGrow: 1,
        // p: 2,
        maxHeight: 270,
        border: 'none',
        borderRadius: theme.borders.borderRadius.md,
      }}
    >
      <Box
        sx={{
          background: primaryDark,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          borderRadius: theme.borders.borderRadius.md,
          width: '100%',
          height: '100%',
          minHeight: 270,
          maxHeight: 270,
        }}
      >
        <MDBox
          sx={{
            border: 'none',
          }}
        >
          <Card
            sx={{
              p: theme.spacing(2),
              background: greyDarkest,
              border: dark,
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <BoxHeader
              title="Collection Value Distribution"
              icon={
                <RCWrappedIcon
                  color={greyDark}
                  sx={{
                    background: theme.palette.success.main,
                  }}
                >
                  <Icon>show_chart</Icon>
                </RCWrappedIcon>
              }
              subtitle="none"
              sideText=""
              colorVariant={light}
              useSX={true}
              titleVariant="h5"
              paddingVariant={theme.spacing(2)}
              sx={{
                color: colors.success.main_light,
                borderRadius: theme.borders.borderRadius.lg,
              }}
            />
          </Card>
        </MDBox>
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie
              data={collectionMetaData?.pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              color={contrastText}
              innerRadius={18}
              outerRadius="80%"
              label={renderCustomLabel}
            >
              {collectionMetaData?.pieChartData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              variant="body2"
              color="secondary"
              contentStyle={{ color: 'white' }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconSize={10}
              wrapperStyle={{ color: 'white' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </MDBox>
  );
};

const ValueCircle = () => {
  return <ValuDistributionCircle />;
};

export default ValueCircle;
