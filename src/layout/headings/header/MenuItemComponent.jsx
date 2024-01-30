import React from 'react';
import {
  styled,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Grow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMode } from '../../../context';
import { StyledMenuItem } from '../../../pages/pageStyles/StyledComponents';
import { useSpring, animated } from 'react-spring';

const MenuItemComponent = ({ item, onClick }) => {
  const { theme } = useMode();
  const navigate = useNavigate();

  const itemAnimation = useSpring({
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' },
    delay: 200,
  });

  const handleClick = () => {
    navigate(item.to);
    if (onClick) onClick();
  };

  return (
    <animated.div style={itemAnimation}>
      <StyledMenuItem onClick={handleClick} theme={theme}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant="body1">{item.name}</Typography>}
        />
      </StyledMenuItem>
    </animated.div>
  );
};

export default MenuItemComponent;
