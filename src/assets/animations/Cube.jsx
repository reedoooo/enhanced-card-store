import React from 'react';
import { Canvas } from '@react-three/fiber';

const Cube = () => {
  return (
    <mesh>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={0x00ff00} />
    </mesh>
  );
};

export default Cube;
