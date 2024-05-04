import { useMode } from 'context';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import PropTypes from 'prop-types';

function DashBoardLayout({ children }) {
  const { theme } = useMode();

  return (
    <MDBox
      sx={({ breakpoints, transitions }) => ({
        position: 'relative',
        marginLeft: theme.functions.pxToRem(0), // Adjust based on sidebar width
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

// Typechecking props for the DashBoardLayout
DashBoardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashBoardLayout;
