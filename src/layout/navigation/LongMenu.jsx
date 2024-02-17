import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BarChartIcon from '@mui/icons-material/BarChart';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
const ITEM_HEIGHT = 48;

// Wrap your component with React.forwardRef to forward the ref
const LongMenu = React.forwardRef(
  ({ onEdit, onDelete, onStats, onView, onSelect, collectionId }, ref) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Box>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            // maxHeight: ITEM_HEIGHT * 4.5,
            // width: 250,
            '& .MuiMenu-paper': {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 250,
              borderRadius: 2,
              marginTop: '45px',
              minWidth: '200px',
              backgroundColor: 'background.paper',
              boxShadow:
                'rgba(0, 0, 0, 0.1) 0px 4px 12px, rgba(0, 0, 0, 0.1) 0px 0px 1px',
            },
            '& .MuiMenuItem-root': {
              '&:hover': {
                backgroundColor: 'primary.light',
                '& .MuiListItemIcon-root, & .MuiTypography-root': {
                  color: 'primary.main',
                },
              },
            },
          }}
        >
          {[
            { text: 'Edit Collection', icon: <EditIcon />, action: onEdit },
            {
              text: 'Delete Collection',
              icon: <DeleteIcon />,
              action: () => onDelete(collectionId),
            },
            {
              text: 'Select Collection',
              icon: <SelectAllIcon />,
              action: () => onSelect(collectionId),
            },
            {
              text: 'Collection Stats',
              icon: <BarChartIcon />,
              action: onStats,
            },
            { text: 'Quick View', icon: <VisibilityIcon />, action: onView },
          ].map((item) => (
            <MenuItem
              key={item.text}
              onClick={() => {
                handleClose();
                item.action();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Typography variant="inherit" noWrap>
                {item.text}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  }
);

LongMenu.displayName = 'LongMenu';

export default LongMenu;
