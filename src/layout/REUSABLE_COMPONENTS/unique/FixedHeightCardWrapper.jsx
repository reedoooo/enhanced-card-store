import { Card } from '@mui/material';
import React from 'react';

const FixedHeightCardWrapper = ({ theme, children, ...rest }) => {
  const cardStyle = {
    height: theme.heightCardMd,
    minHeight: theme.heightCardMd,
    maxHeight: theme.heightCardMd,
  };

  return (
    <Card style={cardStyle} {...rest}>
      {children}
    </Card>
  );
};

export default FixedHeightCardWrapper;
