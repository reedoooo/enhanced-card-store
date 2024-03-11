import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMode } from '../../../context';

// Updated SimpleSectionHeader component with additional parameters
const SimpleSectionHeader = ({
  sectionName,
  userName,
  sectionDescription,
  lastUpdated,
}) => {
  const { theme } = useMode();
  return (
    <Box
      sx={{
        margin: 'auto',
        maxWidth: 1200,
        padding: '20px',
        textAlign: 'center',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
      }}
    >
      <Typography level="title-lg" component="h1">
        {sectionName}
        <Typography
          level="title-lg"
          color="var(--joy-palette-success-plainColor)"
          fontFamily="monospace"
          sx={{ opacity: '50%' }}
        >
          {` ${userName}'s Portfolio`}
        </Typography>
      </Typography>
      <Typography level="body-md" component="p">
        {sectionDescription}
        <Typography
          level="body-md"
          // textColor="var(--joy-palette-success-plainColor)"
          fontFamily="monospace"
          sx={{ opacity: '50%' }}
        >
          {` ${lastUpdated}`}
        </Typography>
      </Typography>
    </Box>
  );
};

export default SimpleSectionHeader;
