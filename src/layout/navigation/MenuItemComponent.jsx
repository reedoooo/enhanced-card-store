import React from 'react';
import {
  styled,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Grow,
  ListItemAvatar,
  Avatar,
  Card,
  CardContent,
  ListItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMode } from '../../context';
import {
  StyledBox,
  StyledMenuItem,
} from '../../pages/pageStyles/StyledComponents';
import { useSpring, animated } from 'react-spring';
import MDTypography from '../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
const CardStyle = styled(Card)(({ theme }) => ({
  background: 'transparent',
  // marginBottom: '22px',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    // height: '100%',
    // width: '157px',
    // height: '157px',
    // background: theme.palette.primary[200],
    borderRadius: '50%',
    // top: '-105px',
    // right: '-96px',
  },
}));
const MenuItemComponent = ({ item, onClick, visibleItems, index }) => {
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
    <>
      <ListItemAvatar sx={{ mt: 0 }}>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.largeAvatar,
            color: theme.palette.primary.main,
            border: 'none',
            borderColor: theme.palette.primary.main,
            background: 'transparent',
            marginRight: '12px',
          }}
        >
          <ListItemIcon
            sx={{ minWidth: 'auto', mr: 1, justifyContent: 'center' }}
          >
            {item.icon}
          </ListItemIcon>{' '}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <MDTypography variant="subtitle1" color="primary" sx={{ mt: 0 }}>
            {item?.name}
          </MDTypography>
        }
        // secondary={
        //   <MDTypography variant="caption" color="primary" sx={{ mt: 0 }}>
        //     {item?.description}
        //   </MDTypography>
        // }
      />
    </>
  );
};

export default MenuItemComponent;
