import { forwardRef } from 'react';
import RCWrappedIconRoot from './RCWrappedIconRoot';
import { useMode } from '../../../context';

const RCWrappedIcon = forwardRef(({ color, size, children, ...rest }, ref) => {
  const { theme } = useMode();

  return <RCWrappedIconRoot {...rest} ref={ref} color={color} />;
});

RCWrappedIcon.displayName = 'RCWrappedIcon';

RCWrappedIcon.defaultProps = {
  color: 'black',
  size: '3rem',
};

export default RCWrappedIcon;
