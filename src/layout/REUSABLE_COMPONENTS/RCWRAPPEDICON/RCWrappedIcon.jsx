import { forwardRef } from 'react';
import RCWrappedIconRoot from './RCWrappedIconRoot';
import { useMode } from '../../../context';
import MDBox from '../MDBOX';

const RCWrappedIcon = forwardRef(({ color, size, children, ...rest }, ref) => {
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
});

RCWrappedIcon.displayName = 'RCWrappedIcon';

RCWrappedIcon.defaultProps = {
  color: 'black',
  background: 'white',
  size: '3rem',
};

export default RCWrappedIcon;
