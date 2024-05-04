import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import MDBox from '../../MDBOX';
import { Grid } from '@mui/material';
import { useMode } from 'context';

function PageLayout({ children }) {
  const { pathname } = useLocation();
  const { theme } = useMode();
  return (
    <MDBox
      className="gradient-background"
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

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  background: PropTypes.oneOf(['white', 'light', 'default']),
  children: PropTypes.node.isRequired,
  backCol: PropTypes.bool,
};

export default PageLayout;
