import { Box, useTheme } from '@mui/material';
import { useMode } from '../../context';

const ProgressCircle = ({ progress = '0.75', size = '40' }) => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const primary = colors.primary.default;
  const blue = colors.blueAccent.default;
  const green = colors.greenAccent.default;

  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${primary} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${blue} ${angle}deg 360deg),
            ${green}`,
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
