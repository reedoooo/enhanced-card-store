import { forwardRef } from 'react';
import RCWrappedIconRoot from './RCWrappedIconRoot';
import { useMode } from '../../../context';

const RCWrappedIcon = forwardRef(({ color, size, children, ...rest }, ref) => {
  const { theme } = useMode();

  return (
    <RCWrappedIconRoot {...rest} ref={ref} color={color}>
      {children}
    </RCWrappedIconRoot>
  );
});

RCWrappedIcon.displayName = 'RCWrappedIcon';

RCWrappedIcon.defaultProps = {
  color: 'black',
  background: 'white',
  size: '3rem',
};

export default RCWrappedIcon;
