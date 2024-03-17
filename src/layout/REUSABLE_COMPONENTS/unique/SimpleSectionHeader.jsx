import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMode } from '../../../context';
import MDTypography from '../MDTYPOGRAPHY/MDTypography';
import { useMediaQuery, useTheme } from '@mui/material';
import MDBox from '../MDBOX';

const SimpleSectionHeader = ({
  sectionName,
  userName,
  sectionDescription,
  lastUpdated,
}) => {
  const { theme } = useMode();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box
      sx={{
        margin: 'auto',
        maxWidth: 1200,
        padding: '20px',
        textAlign: 'left',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '8px',
        flexGrow: 1,
        width: '100%',
      }}
    >
      {/* Container for Section Name and Username adjusts direction based on lgDown */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: lgDown ? 'column' : 'row',
          alignItems: 'baseline',
          marginBottom: '8px',
        }}
      >
        <MDTypography level="title-lg" component="h1" variant="h3">
          {sectionName}
        </MDTypography>
        <MDTypography
          level="title-sm"
          color="text"
          fontWeight="bold"
          // color="var(--joy-palette-success-plainColor)"
          fontFamily="monospace"
          sx={{
            opacity: '50%',
            marginLeft: lgDown ? '0' : '8px',
            marginTop: lgDown ? '4px' : '0',
          }} // Adjust spacing based on lgDown
          variant="h5"
        >
          {`${userName}'s Portfolio`}
        </MDTypography>
      </Box>
      <MDBox
        sx={{
          borderColor: theme.palette.primary.main,
          p: theme.spacing(1),
          maxWidth: '25%',
        }}
      >
        {/* Section Description */}
        <Typography level="body-md" component="p" sx={{ marginBottom: '8px' }}>
          {sectionDescription}
        </Typography>

        {/* Last Updated */}
        <Typography
          level="body-md"
          fontFamily="monospace"
          sx={{ opacity: '50%' }}
        >
          {`${lastUpdated}`}
        </Typography>
      </MDBox>
    </Box>
  );
};

export default SimpleSectionHeader;
