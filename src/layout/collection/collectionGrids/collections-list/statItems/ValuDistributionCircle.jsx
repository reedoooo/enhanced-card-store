/* eslint-disable max-len */
import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import MDBox from '../../../../REUSABLE_COMPONENTS/MDBOX';
import { useMode } from '../../../../../context';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

import ProgressCircle from '../../../../REUSABLE_COMPONENTS/ProgressCircle';
import BoxHeader from '../../../../REUSABLE_COMPONENTS/BoxHeader';

const ValuDistributionCircle = ({ collections }) => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const grey = colors.grey.darkest;
  const lightGrey = colors.grey.lightest;
  const primary = colors.primary.dark;
  const greenAccent = colors.greenAccent.light;

  const collectionMetaData = collections?.reduce(
    (meta, collection) => {
      meta.totalValue += collection?.totalPrice;
      meta.tooltips.push(
        `${collection?.name}: $${collection?.totalPrice.toFixed(2)}`
      );
      return meta;
    },
    { totalValue: 0, tooltips: [] }
  );
  const data = collections.map((collection) => ({
    name: collection.name,
    value: collection.totalPrice,
  }));
  const COLORS = [
    theme.palette.chartTheme.blueAccent.default,
    theme.palette.chartTheme.greenAccent.light,
    '#FFBB28',
    '#FF8042',
  ];

  return (
    <MDBox
      sx={{
        width: '100%',
        height: '100%',
        flexGrow: 1,
        // p: 2,
        maxHeight: 270,
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.chartTheme.primary.dark,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          borderRadius: theme.shape.borderRadius,
          width: '100%',
          height: '100%',
          minHeight: 270,
          maxHeight: 270,
        }}
      >
        <MDBox>
          <Card
            sx={{
              p: theme.spacing(2),
              background: theme.palette.chartTheme.grey.darkest,
              border: theme.palette.chartTheme.greenAccent.dark,
              width: '100%',
            }}
          >
            <BoxHeader
              title="Collection Value Distribution"
              subtitle="none"
              sideText=""
              colorVariant={greenAccent}
              useSX={true}
              titleVariant="h5"
              paddingVariant={theme.spacing(2)}
              sx={{
                color: greenAccent,
              }}
            />
          </Card>
        </MDBox>
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </MDBox>
  );
};

export default ValuDistributionCircle;
