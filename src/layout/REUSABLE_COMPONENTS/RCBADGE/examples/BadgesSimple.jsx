import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import RCBadge from '..';
import { MDBox } from '../../MDBOX/index';

function BadgesSimple() {
  return (
    <MDBox component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="flex-end" spacing={0.5}>
            <RCBadge
              badgeContent="primary"
              variant="contained"
              color="primary"
              container
            />
            <RCBadge
              badgeContent="secondary"
              variant="contained"
              color="secondary"
              container
            />
            <RCBadge
              badgeContent="success"
              variant="contained"
              color="success"
              container
            />
            <RCBadge
              badgeContent="error"
              variant="contained"
              color="error"
              container
            />
            <RCBadge
              badgeContent="warning"
              variant="contained"
              color="warning"
              container
            />
            <RCBadge
              badgeContent="info"
              variant="contained"
              color="info"
              container
            />
            <RCBadge
              badgeContent="light"
              variant="contained"
              color="light"
              container
            />
            <RCBadge
              badgeContent="dark"
              variant="contained"
              color="dark"
              container
            />
          </Stack>
        </Grid>
      </Container>
    </MDBox>
  );
}

export default BadgesSimple;
