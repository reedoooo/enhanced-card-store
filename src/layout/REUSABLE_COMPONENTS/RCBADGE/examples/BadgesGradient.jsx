import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import RCBadge from '..';
import { MDBox } from 'MDBOX/index';

function BadgesGradient() {
  return (
    <MDBox component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="flex-end" spacing={0.5}>
            <RCBadge badgeContent="primary" color="primary" container />
            <RCBadge badgeContent="secondary" color="secondary" container />
            <RCBadge badgeContent="success" color="success" container />
            <RCBadge badgeContent="error" color="error" container />
            <RCBadge badgeContent="warning" color="warning" container />
            <RCBadge badgeContent="info" color="info" container />
            <RCBadge badgeContent="light" color="light" container />
            <RCBadge badgeContent="dark" color="dark" container />
          </Stack>
        </Grid>
      </Container>
    </MDBox>
  );
}

export default BadgesGradient;
