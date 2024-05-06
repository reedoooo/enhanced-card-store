import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMode } from 'context';

const useBreakpoint = () => {
  const { theme } = useMode();
  const isIpod = useMediaQuery(theme.breakpoints.down('xs'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('xl'));

  // Checks for specific breakpoints
  const isMobileUp = useMediaQuery(theme.breakpoints.up('sm'));

  const matchesXS = useMediaQuery(theme.breakpoints.only('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.only('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.only('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.only('lg'));
  const matchesXL = useMediaQuery(theme.breakpoints.only('xl'));

  // Checks for ranges
  const matchesXSBetweenSM = useMediaQuery(
    theme.breakpoints.between('xs', 'sm')
  );
  const matchesSMBetweenMD = useMediaQuery(
    theme.breakpoints.between('sm', 'md')
  );
  const matchesMDBetweenLG = useMediaQuery(
    theme.breakpoints.between('md', 'lg')
  );
  const matchesLGBetweenXL = useMediaQuery(
    theme.breakpoints.between('lg', 'xl')
  );

  return {
    // Checks for specific breakpoints
    isXs: isIpod,
    isMobile: isMobile,
    isMd: isTablet,
    isLg: isLaptop,
    isXl: isDesktop,

    // Checks for points above
    isMobileUp: isMobileUp,

    // Checks for ranges
    isBetweenXsAndSm: matchesXSBetweenSM,
    isBetweenSmAndMd: matchesSMBetweenMD,
    isBetweenMdAndLg: matchesMDBetweenLG,
    isBetweenLgAndXl: matchesLGBetweenXL,
  };
};

export default useBreakpoint;
// EXAMPLE USE:
