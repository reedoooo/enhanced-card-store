import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import RCBadge from '..';
import { MDBox } from 'MDBOX/index';

function BadgesSimpleRounded() {
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
              circular
            />
            <RCBadge
              badgeContent="secondary"
              variant="contained"
              color="secondary"
              container
              circular
            />
            <RCBadge
              badgeContent="success"
              variant="contained"
              color="success"
              container
              circular
            />
            <RCBadge
              badgeContent="error"
              variant="contained"
              color="error"
              container
              circular
            />
            <RCBadge
              badgeContent="warning"
              variant="contained"
              color="warning"
              container
              circular
            />
            <RCBadge
              badgeContent="info"
              variant="contained"
              color="info"
              container
              circular
            />
            <RCBadge
              badgeContent="light"
              variant="contained"
              color="light"
              container
              circular
            />
            <RCBadge
              badgeContent="dark"
              variant="contained"
              color="dark"
              container
              circular
            />
          </Stack>
        </Grid>
      </Container>
    </MDBox>
  );
}

export default BadgesSimpleRounded;
