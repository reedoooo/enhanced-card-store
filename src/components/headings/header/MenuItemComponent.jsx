import React from 'react';
import {
  styled,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

// Create a StyledMenuItem component with extensive styling
const StyledMenuItem = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiListItemIcon-root': {
    minWidth: '35px',
  },
  '& .MuiTypography-root': {
    fontSize: '1.2em',
    fontWeight: 500,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.5em',
    marginRight: theme.spacing(1),
  },
}));

const MenuItemComponent = ({ item, onClick }) => {
  const { icon, to, name } = item;

  return (
    <StyledMenuItem onClick={() => onClick(to)} component="div">
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        disableTypography
        primary={<Typography variant="body1">{name}</Typography>}
      />
    </StyledMenuItem>
  );
};

export default MenuItemComponent;
