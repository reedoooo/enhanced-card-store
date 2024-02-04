// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';
import MDBox from '../../../layout/REUSABLE_COMPONENTS/MDBOX';
import { useMode } from '../../../context';

// Material Dashboard 2 React components

function DataTableBodyCell({ noBorder, align, children }) {
  const { theme } = useMode();
  return (
    <MDBox
      component="td"
      textAlign={align}
      py={1.5}
      // px={3}
      px={{ xs: 1, sm: 2 }}
      borders={1}
      sx={{
        color: theme.palette.text.tertiary,
        fontSize: { xs: '0.75rem', sm: '1rem' }, // Example of responsive font size
        borderBottom: noBorder
          ? 'none'
          : `${theme.borders.borderWidth[1]} solid ${theme.palette.backgroundB.lightest}`,
      }}
    >
      <MDBox
        display="inline-block"
        width="max-content"
        color="text"
        sx={{ verticalAlign: 'middle' }}
      >
        {children}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of DataTableBodyCell
DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: 'left',
};

// Typechecking props for the DataTableBodyCell
DataTableBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'right', 'center']),
};

export default DataTableBodyCell;
