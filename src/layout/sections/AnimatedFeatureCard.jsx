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
import MDButton from '../REUSABLE_COMPONENTS/MDBUTTON';
import SimpleButton from '../REUSABLE_COMPONENTS/unique/SimpleButton';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';

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
        justifyContent: 'flex-end',
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
          sx={{
            backgroundColor: theme.palette.backgroundA.dark,
            height: '20%',
          }}
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
        <CardActions
          sx={{
            // alignSelf: 'end',
            // justifyContent: 'flex-end',
            // alignItems: 'baseline',
            // flexGrow: 1,
            marginTop: 'auto',
            width: '100%', // Ensure CardActions takes full width
            justifyContent: 'flex-end', // Align button to the end
          }}
        >
          <SimpleButton
            color="primary"
            customSize="md"
            customColor={theme.palette.chartTheme.greenAccent.light}
            customTextColor={theme.palette.chartTheme.primary.lighter}
            theme={uniqueTheme}
            onClick={() => onOpenModal(tier.title)}
            sx={{
              flexGrow: 1,
              justifySelf: 'bottom',
              bottom: 0,
              width: '100%',
              mt: 'auto',
              borderColor: theme.palette.chartTheme.greenAccent.darker,
              borderWidth: 2,
              '&:hover': {
                borderColor: theme.palette.chartTheme.greenAccent.dark,
              },
            }}
          >
            Manage {tier.title}
          </SimpleButton>
        </CardActions>
      </FeatureCard>
    </AnimatedBox>
  );
};
