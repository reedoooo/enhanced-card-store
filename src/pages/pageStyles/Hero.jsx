import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Canvas } from '@react-three/fiber';
import Cube from './Cube';

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    backgroundImage: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    minHeight: '100vh',
    padding: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Hero = () => {
  const classes = useStyles();
  return (
    <Box className={classes.bannerBox}>
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
        camera={{ position: [0, 0, 5] }}
      >
        <ambientLight />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <pointLight position={[10, 10, 10]} />
        <Cube />
      </Canvas>
      <Container
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" gutterBottom>
          Buy Amazing Cards
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
