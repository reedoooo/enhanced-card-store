import { Box, CardActions, CardContent, CardHeader } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useSpring, animated as a, animated } from 'react-spring';
import {
  ActionButton,
  CardListItem,
  CardUnorderedList,
  FeatureCard,
} from '../../pages/pageStyles/StyledComponents';
import { useMode } from '../../context';

const AnimatedBox = animated(Box);

export const AnimatedFeatureCard = ({ tier, onOpenModal }) => {
  const { theme } = useMode();
  const [tiltAnimation, api] = useSpring(() => ({
    transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
  }));

  const handleMouseEnter = () =>
    api.start({
      transform: 'perspective(600px) rotateX(5deg) rotateY(5deg) scale(1.05)',
    });
  const handleMouseLeave = () =>
    api.start({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
    });
  return (
    <AnimatedBox
      style={tiltAnimation}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        height: '100%',
        width: '100%',
      }}
    >
      <FeatureCard
        theme={theme}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <CardHeader
          title={tier.title}
          subheader={tier.subheader}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
          sx={{ backgroundColor: theme.palette.backgroundA.dark }}
        />
        <CardContent>
          <CardUnorderedList>
            {tier.description.map((line, index) => (
              <CardListItem key={index} theme={theme}>
                {line}
              </CardListItem>
            ))}
          </CardUnorderedList>
        </CardContent>
        <CardActions sx={{ alignSelf: 'end' }}>
          <ActionButton
            fullWidth
            variant="outlined"
            theme={theme}
            onClick={() => onOpenModal(tier.title)}
            sx={{
              ...theme.responsiveStyles.getButtonTypographyVariant2(
                theme.breakpoints
              ),
              ...theme.genericButtonStyles.addButton,
            }}
          >
            {tier.buttonText}
          </ActionButton>
        </CardActions>
      </FeatureCard>
    </AnimatedBox>
  );
};
