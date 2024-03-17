import React from 'react';
import { styled } from '@mui/material/styles';
import * as MuiIcons from '@mui/icons-material';
import uniqueTheme from '../unique/uniqueTheme';
import { Box } from '@mui/material';
import { useMode } from '../../../context';

const StyledIcon = styled(Box)(({ theme }) => ({
  borderRadius: '50%',
  border: `1px solid ${theme.palette.chartTheme.primary.dark}`,
  padding: '5px',
  display: 'inline-flex',
  fontSize: '30px',
  alignItems: 'center',
  justifyContent: 'center',
  bgColor: theme.palette.chartTheme.primary.main,
}));
// function ColoredAvatars() {
//   return (
//     <AvatarContainer>
//       <Avatar sx={{ bgcolor: green[500] }}>G</Avatar>
//       <Avatar sx={{ bgcolor: blue[500] }}>B</Avatar>
//       <Avatar sx={{ bgcolor: deepPurple[500] }}>P</Avatar>
//     </AvatarContainer>
//   );
// }

const RCIcon = ({
  iconName,
  size = '30px',
  color = uniqueTheme.colorPrimary,
}) => {
  const { theme } = useMode();
  // Dynamically get the icon component; ensure it's a valid icon name
  const IconComponent = MuiIcons[iconName] || null;

  if (!IconComponent) {
    return <span>Icon not found</span>; // Display error message if the icon is not found
  }

  return (
    <StyledIcon style={{ fontSize: size, color }} theme={theme}>
      <IconComponent style={{ fontSize: 'inherit', color: 'black' }} />
    </StyledIcon>
  );
};

export default RCIcon;
