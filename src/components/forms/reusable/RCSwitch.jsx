import React from 'react';
import { Switch, FormControlLabel, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMode } from '../../../context';
import { renderToStaticMarkup } from 'react-dom/server';
import { useCookies } from 'react-cookie';

// Convert SVG icons to data URI
const convertSvg = (svg) => {
  const markup = renderToStaticMarkup(svg);
  const encoded = encodeURIComponent(markup);
  const dataUri = `url('data:image/svg+xml;utf8,${encoded}')`;
  return dataUri;
};

// Generic switch component
const RCSwitch = ({
  checked,
  onChange,
  labelLeft,
  labelRight,
  iconLeft,
  iconRight,
  size = { width: 50, height: 14, thumbWidth: 22, thumbHeight: 22 },
}) => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const cookies = useCookies('colorMode');
  const mode = cookies.colorMode;
  const green = colors.greenAccent.light;
  const lihhtgreen = colors.greenAccent.default;
  const calculateTransform = () => {
    const trackPadding = 2; // Adjust based on your design
    const transformDistance = size.width - size.thumbWidth - trackPadding;
    return transformDistance;
  };
  const SwitchBaseStyles = {
    // pt: 1.5,
    // pl: 1.5,
    my: 1.7,
    // ml: 1.5,
    '&.Mui-checked': {
      transform: `translateX(${calculateTransform()}px)`,
      color: theme.palette.common.white,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  };

  const ThumbStyles = (icon) => ({
    width: size.thumbWidth,
    height: size.thumbHeight,
    // backgroundColor: theme.palette.common.white,
    backgroundColor: mode === 'dark' ? green : lihhtgreen,

    '&:before': {
      content: '" "',
      display: 'block',
      backgroundImage: convertSvg(icon),
      width: '100%',
      height: '100%',
      backgroundSize: '50%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
  });

  const TrackStyles = {
    backgroundColor: theme.palette.grey.light,
    opacity: 1,
    // borderRadius: 20,
    width: size.width,
    height: size.height,
  };

  const SwitchStyles = {
    ...SwitchBaseStyles,
    '& .MuiSwitch-thumb': checked
      ? ThumbStyles(iconRight)
      : ThumbStyles(iconLeft),
    '& .MuiSwitch-track': TrackStyles,
  };

  return (
    <FormControl component="fieldset" sx={{ alignItems: 'center' }}>
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={onChange} sx={SwitchStyles} />
        }
        label={checked ? labelRight : labelLeft}
        style={{ margin: 'auto', justifyContent: 'center' }}
      />
    </FormControl>
  );
};

export default RCSwitch;
