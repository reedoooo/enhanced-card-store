import React from 'react';
import {
  styled,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// import { Link } from 'react-router-dom';

// Create a StyledMenuItem component with extensive styling
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
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
  const navigate = useNavigate();
  const { icon, to, name } = item;

  const handleClick = () => {
    navigate(to); // Navigate to the desired path
    onClick(); // Perform any additional onClick logic (like closing the drawer)
  };

  return (
    <StyledMenuItem onClick={handleClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        disableTypography
        primary={<Typography variant="body1">{name}</Typography>}
      />
    </StyledMenuItem>
  );
};

// const MenuItemComponent = ({ item, onClick }) => {
//   const { icon, to, name } = item;

//   return (
//     <StyledMenuItem component={Link} to={to} onClick={() => onClick(to)}>
//       <ListItemIcon>{icon}</ListItemIcon>
//       <ListItemText
//         disableTypography
//         primary={<Typography variant="body1">{name}</Typography>}
//       />
//     </StyledMenuItem>
//   );
// };

export default MenuItemComponent;
