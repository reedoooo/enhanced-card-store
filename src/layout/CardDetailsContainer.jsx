import React from 'react';
import { Grid } from '@mui/material';
import {
  FaDragon,
  FaLevelUpAlt,
  FaRegLightbulb,
  FaShieldAlt,
  FaVenusMars,
} from 'react-icons/fa';
import { GiAxeSword } from 'react-icons/gi';
import CardDetail from '../components/cards/CardDetail';
import { styled } from '@mui/system';
import { useMode } from '../context';

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  fontSize: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1rem',
  },
  color: theme.palette.text.primary,
}));

const CardDetailsContainer = ({ card, className }) => {
  const { theme } = useMode();

  return (
    <Grid container spacing={2}>
      {[
        { icon: FaLevelUpAlt, title: 'Level', value: card?.level },
        { icon: FaVenusMars, title: 'Type', value: card?.type },
        { icon: FaDragon, title: 'Race', value: card?.race },
        { icon: FaRegLightbulb, title: 'Attribute', value: card?.attribute },
        { icon: GiAxeSword, title: 'ATK', value: card?.atk },
        { icon: FaShieldAlt, title: 'DEF', value: card?.def },
      ].map((detail, index) => (
        // Adjust Grid item sizing based on breakpoints
        // At xs and sm sizes, each detail takes full width making it a single column
        // At md size, each detail takes 6 spaces (out of 12), creating 2 equal columns
        // For lg and xl, you might want to adjust accordingly or keep the same as md
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={index}>
          <CardDetail
            className={className}
            icon={
              detail.icon && (
                <IconWrapper theme={theme}>
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
