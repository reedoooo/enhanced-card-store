import React from 'react';

// Assuming theme and media query values need to be passed as props or derived from context
const InfoStackWrapper = ({
  label,
  value,
  hideBottomMargin,
  isValueFirst,
  alignItems = 'center',
  theme,
  ...rest
}) => {
  // Inline styles replacing the styled-components
  const wrapperStyle = {
    display: 'flex',
    alignItems: alignItems,
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: !hideBottomMargin ? theme.lenMd1 : '0',
  };

  // Responsiveness can be handled via useState and useEffect with window listeners or a context providing screen size
  const getValueFontSize = () => {
    if (window.innerWidth >= theme.screenWidthSm) {
      return theme.lenLg1;
    } else if (window.innerWidth >= theme.screenWidthXs) {
      return theme.lenMd3;
    }
    return theme.lenMd2;
  };

  const [valueFontSize, setValueFontSize] = React.useState(getValueFontSize());

  React.useEffect(() => {
    const handleResize = () => {
      setValueFontSize(getValueFontSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme]); // Assuming theme is stable, otherwise it should be included in dependencies properly

  const valueStyle = {
    marginBottom: isValueFirst ? theme.lenSm1 : '0',
    color: theme.colorText,
    fontSize: valueFontSize,
  };

  const labelStyle = {
    color: theme.colorLabel,
    fontSize: theme.lenMd1,
    marginBottom: !isValueFirst ? theme.lenSm1 : '0',
  };

  return (
    <div style={wrapperStyle} {...rest}>
      {isValueFirst ? (
        <>
          <div style={valueStyle}>{value}</div>
          <div style={labelStyle}>{label}</div>
        </>
      ) : (
        <>
          <div style={labelStyle}>{label}</div>
          <div style={valueStyle}>{value}</div>
        </>
      )}
    </div>
  );
};

export default InfoStackWrapper;
