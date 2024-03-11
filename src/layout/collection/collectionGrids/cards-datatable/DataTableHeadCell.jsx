// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React components

// Material Dashboard 2 React contexts
import MDBox from '../../../REUSABLE_COMPONENTS/MDBOX';
import { useMode } from '../../../../context';
import MDTypography from '../../../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';

function DataTableHeadCell({ width, children, sorted, align, ...rest }) {
  const { theme } = useMode();
  return (
    <MDBox
      component="th"
      sx={{
        py: { xs: 0.5, sm: 1.5 }, // Example of responsive padding
        fontSize: { xs: '0.75rem', sm: '1rem' }, // Example of responsive font size
        px: { xs: 1, sm: 2 }, // Responsive padding
        // width: width || 'auto',
        // fontSize: theme.typography.body1.fontSize,
        borderBottom: `2px solid ${theme.palette.divider}`,
        border: `1px solid ${theme.palette.divider}`,
        textAlign: align,
        background: theme.palette.backgroundE.light, // Ensures contrast with the table body
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: '0.0075em',
        lineHeight: 1.5,
        position: 'sticky',
        top: 0,
        zIndex: 2, // Keeps header above other elements
        alignItems: 'center',
        boxShadow:
          '0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12)', // Subtle shadow for depth
        cursor: sorted ? 'pointer' : 'default',
        '&:hover': {
          opacity: sorted ? 1 : 0.8,
        },
        // [theme.breakpoints.down('sm')]: {
        //   py: 1,
        //   px: 2,
        // },
      }}
    >
      <MDBox
        display="flex"
        justifyContent={align === 'right' ? 'flex-end' : 'flex-start'}
        alignItems="center"
        gap={0.5} // Adds space between text and icon if sorted
      >
        <MDTypography
          variant="h6"
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            marginRight: sorted ? theme.spacing(1) : 0,
          }}
        >
          {children}
        </MDTypography>{' '}
        {sorted && (
          <MDBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <MDBox
              position="absolute"
              top={-6}
              color={sorted === 'asce' ? 'text' : 'secondary'}
              opacity={sorted === 'asce' ? 1 : 0.5}
            >
              <Icon>arrow_drop_up</Icon>
            </MDBox>
            <MDBox
              position="absolute"
              top={0}
              color={sorted === 'desc' ? 'text' : 'secondary'}
              opacity={sorted === 'desc' ? 1 : 0.5}
            >
              <Icon>arrow_drop_down</Icon>
            </MDBox>
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of DataTableHeadCell
DataTableHeadCell.defaultProps = {
  width: 'auto',
  sorted: 'none',
  align: 'left',
};

// Typechecking props for the DataTableHeadCell
DataTableHeadCell.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  sorted: PropTypes.oneOf([false, 'none', 'asce', 'desc']),
  align: PropTypes.oneOf(['left', 'right', 'center']),
};

export default DataTableHeadCell;
