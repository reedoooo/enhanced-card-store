import React from 'react';
import {
  styled,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMode } from '../../../context';
import { StyledMenuItem } from '../../../pages/pageStyles/StyledComponents';

const MenuItemComponent = ({ item, onClick }) => {
  const { theme } = useMode();
  const navigate = useNavigate();
  const { icon, to, name } = item;

  const handleClick = () => {
    navigate(to); // Navigate to the desired path
    // onClick(); // Perform any additional onClick logic (like closing the drawer)
  };

  return (
    <StyledMenuItem onClick={handleClick} theme={theme}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        disableTypography
        primary={<Typography variant="body1">{name}</Typography>}
      />
    </StyledMenuItem>
  );
};

export default MenuItemComponent;
