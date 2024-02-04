import { useMode, useSidebarContext } from '../../../context';

// react-router-dom components
import { useLocation } from 'react-router-dom';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// Material Dashboard 2 React components
import MDBox from '../../REUSABLE_COMPONENTS/MDBOX/index';

function DashboardLayout({ children }) {
  const { pathname } = useLocation();
  const { isSidebarOpen } = useSidebarContext();
  const { theme } = useMode();
  const { pxToRem } = theme.functions;

  return (
    <MDBox
      sx={({ breakpoints, transitions }) => ({
        p: 3,
        position: 'relative',
        marginLeft: isSidebarOpen
          ? theme.functions.pxToRem(250)
          : theme.functions.pxToRem(0), // Adjust based on sidebar width
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
