import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { MDBox } from 'layout/REUSABLE_COMPONENTS';

function PageLayout({ children }) {
  return (
    <MDBox
      // className="gradient-background"
      width="100vw"
      height="100%"
      minHeight="100vh"
      maxWidth="100%"
      sx={{ overflowX: 'hidden', m: 0, p: 0 }} // Ensure no margins or paddings
    >
      <Grid
        container
        sx={{ minHeight: '100vh', minWidth: '100vw', m: 0, p: 0 }}
      >
        {children}
      </Grid>
    </MDBox>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
