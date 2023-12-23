import React from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import {
  FaDragon,
  FaLevelUpAlt,
  FaRegCopy,
  FaRegLightbulb,
  FaShieldAlt,
  FaVenusMars,
} from 'react-icons/fa';
import CardDetail from './CardDetail';
import { styled } from '@mui/system';

// Styled wrapper for icon for consistent styling
const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  fontSize: '1.5rem',
  color: theme.palette.text.secondary,
}));

const CardDetailsContainer = ({ card, className }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      {[
        { icon: FaLevelUpAlt, title: 'Level', value: card?.level },
        { icon: FaVenusMars, title: 'Type', value: card?.type },
        { icon: FaDragon, title: 'Race', value: card?.race },
        { icon: FaRegLightbulb, title: 'Attribute', value: card?.attribute },
        { title: 'ATK', value: card?.atk },
        { icon: FaShieldAlt, title: 'DEF', value: card?.def },
      ].map((detail, index) => (
        <Grid item xs={6} sm={4} md={2} key={index}>
          <CardDetail
            className={className}
            icon={
              detail.icon && (
                <IconWrapper>
                  <detail.icon aria-label={detail.title} />
                </IconWrapper>
              )
            }
            title={detail.title}
            value={detail.value}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardDetailsContainer;
