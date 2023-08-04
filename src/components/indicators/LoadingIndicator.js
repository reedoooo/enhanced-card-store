import React from 'react';
import { BeatLoader } from 'react-spinners';

const LoadingIndicator = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <BeatLoader color={'#123abc'} loading={true} size={24} />
    </div>
  );
};

export default LoadingIndicator;
