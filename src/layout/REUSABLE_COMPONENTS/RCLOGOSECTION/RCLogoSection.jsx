import React from 'react';
import { ButtonBase, Typography, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../../config';
import DeckBuilderIcon from '../icons/DeckBuilderIcon'; // Import DeckBuilderIcon

// ==============================|| MAIN LOGO ||============================== //

const RCLogoSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <ButtonBase
      disableRipple
      component={Link}
      to={config.defaultPath}
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        height: '50px',
        padding: '8px',
        marginRight: '8px',
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {/* Encapsulate DeckBuilderIcon within an Avatar */}
      <Avatar
        sx={{
          marginRight: '5px',
          width: 23,
          height: 23,
          // backgroundColor: 'transparent',
          color: 'white',
          background: 'white',
          border: '2px solid black', // Adjust thickness and color as needed
        }}
      >
        <DeckBuilderIcon
          style={{ fontSize: '1.5rem', color: 'black' }}
          iconColor="black"
        />
      </Avatar>
      <Typography
        variant="h6"
        component="h1"
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
          color: 'white',
        }}
      >
        DeckMaster
      </Typography>
    </ButtonBase>
  );
};

export default RCLogoSection;
