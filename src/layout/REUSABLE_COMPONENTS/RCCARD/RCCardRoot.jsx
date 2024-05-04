import { Badge, Card } from '@mui/material';
import { useMode } from 'context';
import styled from 'styled-components';

export default styled(Card)(({ ownerState }) => {
  const { theme } = useMode();
  const { palette, typography, borders, functions } = theme;
  const {
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
  } = ownerState;

  const { white, dark, success, primary, secondary, error, text } = palette;
  const { size: fontSize, fontWeightBold } = typography;
  const { borderRadius, borderWidth } = borders;
  const { pxToRem, linearGradient } = functions;

  const getPrimaryStyle = () => ({
    background: success.main,
    color: success.hoverContrastText,
  });

  const getAccentStyle = () => ({
    background: success.tertiary,
    color: success.hoverContrastText,
  });

  const getTableOrChartStyle = () => ({
    background: white.main,
    color: success.main,
  });

  const getChartStyle = () => ({
    background: '#e0e0e0',
  });

  const getFormHeaderStyle = () => ({
    background: white.main,
    color: success.main,
    maxWidth: 'md',
    padding: theme.spacing(6), // Updated to use theme's spacing method if available
    borderRadius: '24px',
    boxShadow: '0px 3px 10px 0px rgba(0, 0, 0, 0.2)', // Custom shadow with blur
    margin: 'auto',
    width: '80%',
  });

  const getSelectorStyles = () => ({
    background: dark.state,
    padding: theme.spacing(3), // Updated to use theme's spacing method if available
    borderRadius: '24px',
    boxShadow: '0px 3px 10px 0px rgba(0, 0, 0, 0.2)', // Custom shadow with blur
    mb: theme.spacing(3),
    mt: theme.spacing(5),
    pt: theme.spacing(5),
    mx: 'auto',
    px: 'auto',
    justifyContent: 'center',
  });

  const getSearchFormHeaderStyle = () => ({
    background: white.main,
    color: success.main,
    maxWidth: 'lg',
    borderRadius: '24px',
    boxShadow: '0px 3px 10px 0px rgba(0, 0, 0, 0.2)', // Custom shadow with blur
    margin: 'auto',
    marginTop: '1rem',
    width: '98%',
  });

  const styles = {
    ...sx,
    width: '100%',
    padding: hasTitle ? 0 : theme.spacing(4),
    marginBottom: noBottomMargin ? 0 : theme.spacing(4),
    borderRadius: theme.spacing(3),
    background: white.main,
    color: text.colorText,
  };

  return {
    ...styles,
    ...(variant === 'chart' && getChartStyle()),
    ...(variant === 'selector' && getSelectorStyles()),
    ...(variant === 'search' && getSearchFormHeaderStyle()),
    ...(variant === 'form' && getFormHeaderStyle()),
    ...(variant === 'table' && getTableOrChartStyle()),
    ...(variant === 'primary' && getPrimaryStyle()),
    ...(variant === 'accent' && getAccentStyle()),
  };
});
