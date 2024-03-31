import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { MDBox } from '../../MDBOX/index';
import RCButton from '..';

function ButtonsGradient() {
  return (
    <MDBox component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="flex-end" spacing={1}>
            <RCButton variant="gradient" color="primary">
              primary
            </RCButton>
            <RCButton variant="gradient" color="secondary">
              secondary
            </RCButton>
            <RCButton variant="gradient" color="info">
              info
            </RCButton>
            <RCButton variant="gradient" color="success">
              success
            </RCButton>
            <RCButton variant="gradient" color="warning">
              warning
            </RCButton>
            <RCButton variant="gradient" color="error">
              error
            </RCButton>
            <RCButton variant="gradient" color="light">
              light
            </RCButton>
            <RCButton variant="gradient" color="dark">
              dark
            </RCButton>
            <RCButton variant="gradient" color="white">
              White
            </RCButton>
          </Stack>
        </Grid>
      </Container>
    </MDBox>
  );
}

export default ButtonsGradient;
