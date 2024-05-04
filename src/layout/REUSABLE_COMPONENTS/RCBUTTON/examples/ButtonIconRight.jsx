import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Icon from '@mui/material/Icon';
import { MDBox } from 'MDBOX/index';
import RCButton from '..';
function ButtonsIconRight() {
  return (
    <MDBox component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <RCButton color="info" size="small">
              small
              <Icon sx={{ ml: 1 }}>favorite</Icon>
            </RCButton>
            <RCButton color="info">
              default
              <Icon sx={{ ml: 1 }}>favorite</Icon>
            </RCButton>
            <RCButton color="info" size="large">
              large
              <Icon sx={{ ml: 1 }}>favorite</Icon>
            </RCButton>
          </Stack>
        </Grid>
      </Container>
    </MDBox>
  );
}

export default ButtonsIconRight;
