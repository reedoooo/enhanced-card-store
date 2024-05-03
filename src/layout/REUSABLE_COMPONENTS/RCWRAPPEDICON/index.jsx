import { forwardRef } from 'react';
import RCWrappedIconRoot from './RCWrappedIconRoot';
import { useMode } from 'context';
import MDBox from '../MDBOX';
import PropTypes from 'prop-types';

// ==============================|| WRAPPED ICON ||============================== //

const RCWrappedIcon = forwardRef(
  (
    { color = 'black', size = '3rem', children, background = 'white', ...rest },
    ref
  ) => {
    const { theme } = useMode();

    return (
      <MDBox
        sx={{
          border: 'none',
        }}
      >
        <RCWrappedIconRoot {...rest} ref={ref} color={color}>
          {children}
        </RCWrappedIconRoot>
      </MDBox>
    );
  }
);

RCWrappedIcon.displayName = 'RCWrappedIcon';

RCWrappedIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
  background: PropTypes.string,
};

export default RCWrappedIcon;
