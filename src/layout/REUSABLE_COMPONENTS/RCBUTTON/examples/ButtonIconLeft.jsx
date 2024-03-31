import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Icon from '@mui/material/Icon';
import { MDBox } from '../../MDBOX/index';
import RCButton from '..';

function ButtonsIconLeft() {
  return (
    <MDBox component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <RCButton color="info" size="small">
              <Icon sx={{ mr: 1 }}>favorite</Icon>
              small
            </RCButton>
            <RCButton color="info">
              <Icon sx={{ mr: 1 }}>favorite</Icon>
              default
            </RCButton>
            <RCButton color="info" size="large">
              <Icon sx={{ mr: 1 }}>favorite</Icon>
              large
            </RCButton>
          </Stack>
        </Grid>
      </Container>
    </MDBox>
  );
}

export default ButtonsIconLeft;
