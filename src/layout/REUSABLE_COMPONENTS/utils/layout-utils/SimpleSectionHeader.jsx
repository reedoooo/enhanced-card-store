import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMode } from 'context';
import RCTypography from 'layout/REUSABLE_COMPONENTS/RCTYPOGRAPHY';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import styled from 'styled-components';
import useBreakpoint from 'context/hooks/useBreakPoint';

const HeaderContainer = styled(Box)`
  flex: 1;
  max-width: 50%;
`;
const SimpleSectionHeader = ({
  sectionName,
  userName,
  sectionDescription,
  lastUpdated,
  type,
}) => {
  const { theme } = useMode();
  const { isMobile, isLg } = useBreakpoint();

  return (
    <HeaderContainer>
      <Box
        sx={{
          margin: isMobile ? 0 : 'auto',
          padding: isMobile ? 0 : '20px',
          textAlign: 'left',
          backgroundColor: theme.palette.background.paper,
          borderRadius: '8px',
          flexGrow: 1,
          width: isMobile ? '100vw' : '100%',
          maxWidth: isMobile ? '100vw' : 1200,
          justifyContent: isMobile ? 'space-between' : 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isLg ? 'column' : 'row',
            width: isMobile ? '60%' : 'auto',
            alignItems: 'baseline',
            marginBottom: '8px',
          }}
        >
          <RCTypography level="title-lg" component="h1" variant="h3">
            {sectionName}
          </RCTypography>
          <RCTypography
            level="title-sm"
            color="text"
            fontWeight="bold"
            fontFamily="monospace"
            sx={{
              opacity: '50%',
              marginLeft: isLg ? '0' : '8px',
              marginTop: isLg ? '4px' : '0',
            }}
            variant="h5"
          >
            {`${userName}'s ` + `${type}`}
          </RCTypography>
        </Box>
        <MDBox
          sx={{
            borderColor: theme.palette.success.secondary,
            borderWidth: '2px',
            p: theme.spacing(1),
            width: isMobile ? '40%' : '25%',
          }}
        >
          {/* Section Description */}
          <Typography
            level="body-md"
            component="p"
            sx={{ marginBottom: '8px' }}
          >
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
    </HeaderContainer>
  );
};

export default SimpleSectionHeader;
