import { useMode } from 'context';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import MDBox from '../../MDBOX/index';

function DashboardLayout({ children }) {
  const { pathname } = useLocation();
  const { theme } = useMode();
  const { pxToRem } = theme.functions;

  return (
    <MDBox
      sx={({ breakpoints, transitions }) => ({
        // p: 3,
        position: 'relative',
        marginLeft: theme.functions.pxToRem(0), // Adjust based on sidebar width
        // marginLeft: isSidebarOpen
        //   ? theme.functions.pxToRem(250)
        //   : theme.functions.pxToRem(0), // Adjust based on sidebar width
        transition: transitions.create(['margin-left', 'margin-right'], {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),
        [breakpoints.up('xl')]: {
          // You can adjust this breakpoint as necessary
        },
      })}
    >
      {children}
    </MDBox>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
