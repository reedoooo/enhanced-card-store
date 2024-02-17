import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import { Grid } from '@mui/material';
import { useMode } from '../../context';

function PageLayout({ background, backCol, children }) {
  const { pathname } = useLocation();
  const { theme } = useMode();
  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={backCol ? '#3D3D3D' : 'transparent'}
      sx={{ overflowX: 'hidden' }}
    >
      <Grid container sx={{ height: '100vh', width: '100vw', p: 0 }}>
        {children}
      </Grid>
    </MDBox>
  );
}

// Setting default values for the props for PageLayout
PageLayout.defaultProps = {
  background: 'default',
  backCol: true,
};

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  background: PropTypes.oneOf(['white', 'light', 'default']),
  children: PropTypes.node.isRequired,
  backCol: PropTypes.bool,
};

export default PageLayout;
