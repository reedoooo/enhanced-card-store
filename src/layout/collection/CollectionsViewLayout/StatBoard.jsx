/* eslint-disable react/jsx-key */
import { Grid } from '@mui/material';

import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import FlexBetween from 'layout/REUSABLE_COMPONENTS/layout-utils/FlexBetween';
import useBreakpoint from 'context/hooks/useBreakPoint';
import StatBoxes from './stats/StatBoxes';
import ValueCircle from './stats/ValueCircle';
import PriceList from './stats/PriceList';
import RCCard from 'layout/REUSABLE_COMPONENTS/RCCARD';

const StatBoard = () => {
  const { isMobile } = useBreakpoint();
  return (
    <RCCard hasTitle={false} noBottomMargin={true}>
      <Grid
        container
        sx={{
          alignItems: 'flex-start',
          ...(isMobile
            ? {
                flexDirection: 'column', // Stack items vertically on mobile
                maxHeight: 'none', // Remove maxHeight to allow content to flow
                minHeight: 'none', // Adjust minHeight accordingly
                my: 1, // Adjust vertical margin
              }
            : {
                maxHeight: '270px',
                minHeight: '270px',
                my: 2, // Maintain original styling for larger screens
              }),
        }}
      >
        {[<StatBoxes />, <ValueCircle />, <PriceList />].map(
          (component, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              key={index}
              sx={{ width: '100%', minHeight: '100%', maxHeight: 270 }}
            >
              <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
                <MDBox
                  sx={{
                    width: '100%',
                    minHeight: '100%',
                    flexGrow: 1,
                    maxHeight: 270,
                    border: 'none',
                  }}
                >
                  {component}
                </MDBox>
              </FlexBetween>
            </Grid>
          )
        )}
      </Grid>
    </RCCard>
  );
};

export default StatBoard;
