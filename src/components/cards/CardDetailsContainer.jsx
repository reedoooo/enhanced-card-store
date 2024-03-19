import React from 'react';
import { Box, Grid } from '@mui/material';
import {
  FaDragon,
  FaLevelUpAlt,
  FaRegLightbulb,
  FaShieldAlt,
  FaVenusMars,
} from 'react-icons/fa';
import { GiAxeSword } from 'react-icons/gi';
import CardDetail from './CardDetail';
import { useMode } from '../../context';
import styled from 'styled-components';

const IconWrapper = styled(Box)(({ theme }) => ({
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
    <Grid
      container
      spacing={2}
      sx={{
        background: theme.palette.chartTheme.greenAccent.light,
        justifyContent: 'center',
        borderRadius: theme.shape.borderRadius,
      }}
    >
      {[
        { icon: FaLevelUpAlt, title: 'Level', value: card?.level },
        { icon: FaVenusMars, title: 'Type', value: card?.type },
        { icon: FaDragon, title: 'Race', value: card?.race },
        { icon: FaRegLightbulb, title: 'Attribute', value: card?.attribute },
        { icon: GiAxeSword, title: 'ATK', value: card?.atk },
        { icon: FaShieldAlt, title: 'DEF', value: card?.def },
      ].map((detail, index) => (
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={index}>
          <CardDetail
            theme={theme}
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
            quantity={card?.quantity}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardDetailsContainer;
