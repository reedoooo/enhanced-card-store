import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import { useMode } from 'context';
import React from 'react';
import RCCardRoot from './RCCardRoot';
import RCTypography from '../RCTYPOGRAPHY';
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
};

// ==============================|| CUSTOM CARD ||============================== //
const CardTitle = ({ theme, children, variant }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.spacing(11),
      padding: `0 ${theme.spacing(4)}`,
      color: '#A4A3A6',
      fontSize: theme.spacing(5),
    }}
  >
    <RCTypography
      variant="h6"
      color={variant === 'table' ? theme.palette.success.main : '#A4A3A6'}
      component="div"
    >
      {children}
    </RCTypography>
  </div>
);
const RCCard = React.forwardRef(
  (
    {
      title = '',
      content = '',
      icon = '',
      value = '',

      size = 'md',
      bgColor = '',
      color = '',

      variant = 'default',
      shadow = true,
      border = true,
      noBottomMargin = true,
      hasTitle = false,

      heroText = '',
      heroIcon = '',

      sx = {},
      children,
      ...rest
    },
    ref
  ) => {
    const { theme } = useMode();

    return (
      <RCCardRoot
        ownerState={{
          title,
          hasTitle,
          content,
          icon,
          value,
          size,
          bgColor,
          color,
          variant,
          shadow,
          border,
          noBottomMargin,
          sx,
          children,
          ...rest,
        }}
        ref={ref}
      >
        {hasTitle && (
          <>
            <CardTitle theme={theme} variant={variant}>
              {title}
            </CardTitle>
            <div
              style={{ padding: `0 ${theme.spacing(4)} ${theme.spacing(5)}` }}
            >
              {children}
            </div>
          </>
        )}
        {!hasTitle && children}
        {/* {!content && children} */}
      </RCCardRoot>
    );
  }
);
RCCard.displayName = 'RCCard';

RCCard.propTypes = {
  // CONTENT
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // STYLE PROPERTIES
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  bgColor: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'error',
    'white',
    'dark',
  ]),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'error',
    'white',
    'dark',
  ]),
  shadow: PropTypes.bool,
  border: PropTypes.bool,
  hasTitle: PropTypes.bool,
  noBottomMargin: PropTypes.bool,

  variant: PropTypes.oneOf([
    'chart',
    'form',
    'search',
    'table',
    'selector',
    'default',
    'primary',
    'accent',
  ]),
  sx: PropTypes.object,

  // secondary: PropTypes.oneOfType([
  //   PropTypes.node,
  //   PropTypes.string,
  //   PropTypes.object,
  // ]),

  // HERO PROPERTIES
  children: PropTypes.node,
};

export default RCCard;
