import React from 'react';
import { Typography, Link } from '@mui/material';
import { useMode } from 'context';
function Copyright() {
  const { theme } = useMode();
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      theme={theme}
    >
      {`Copyright © ReedThaHuman ${new Date().getFullYear()}`}
      <Link color="inherit" href="www.reedthahuman.com">
        ReedThaHuman Industries
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default Copyright;
