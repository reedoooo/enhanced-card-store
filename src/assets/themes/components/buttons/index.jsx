import root from './root';
import contained from './contained';
import outlined from './outlined';
import buttonText from './text';
import holo from './holo';

export default {
  styleOverrides: {
    root: { ...root },
    contained: { ...contained.base },
    containedSizeSmall: { ...contained.small },
    containedSizeLarge: { ...contained.large },
    containedPrimary: { ...contained.primary },
    containedSecondary: { ...contained.secondary },
    outlined: { ...outlined.base },
    outlinedSizeSmall: { ...outlined.small },
    outlinedSizeLarge: { ...outlined.large },
    outlinedPrimary: { ...outlined.primary },
    outlinedSecondary: { ...outlined.secondary },
    holo: { ...holo.base },
    holoSizeSmall: { ...holo.small },
    holoSizeMedium: { ...holo.medium },
    holoSizeLarge: { ...holo.large },
    holoPrimary: { ...holo.primary },
    holoSecondary: { ...holo.secondary },
    text: { ...buttonText.base },
    textSizeSmall: { ...buttonText.small },
    textSizeLarge: { ...buttonText.large },
    textPrimary: { ...buttonText.primary },
    textSecondary: { ...buttonText.secondary },
  },
};
