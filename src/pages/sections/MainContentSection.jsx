import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Stack,
  Container,
  useMediaQuery,
} from '@mui/material';
import {
  useAuthContext,
  useCollectionStore,
  useMode,
  useUserContext,
} from '../../context';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import MDAvatar from '../../layout/REUSABLE_COMPONENTS/MDAVATAR';
import MDButton from '../../layout/REUSABLE_COMPONENTS/MDBUTTON';
import useCardCronJob from '../../tests/useCardCronJob';
import SingleCardAnimation from '../../assets/animations/SingleCardAnimation';
import CardChart from '../../tests/CardChart';
import {
  StyledContainerBox,
  StyledPaper,
} from '../REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import placeHolder from '../../assets/images/placeholder.jpeg';

const MainContentSection = () => {
  const { theme } = useMode();
  const { authUser, basicData } = useAuthContext();
  const { user } = useUserContext();
  const { allCollections, selectedCollection } = useCollectionStore();
  const isDataLoaded = allCollections && allCollections.length > 0;
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const initialCardData = isDataLoaded ? allCollections[0].cards[0] : null;
  const { cardData } = useCardCronJob(initialCardData);

  const renderStatItem = (label, value) => (
    <MDTypography variant="body1" color="primary" component="div">
      <strong>{label}:</strong> {value}
    </MDTypography>
  );

  return (
    <section>
      <StyledContainerBox>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={7.5}>
            <StyledPaper>
              <Grid container spacing={1} direction="row">
                {isMdUp && (
                  <Grid item md={6}>
                    <MDBox
                      // center
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <SingleCardAnimation cardImage={cardData?.image} />
                    </MDBox>
                  </Grid>
                )}
                <Grid item xs={12} md={6}>
                  <Container>
                    <CardChart cardData={cardData} />
                  </Container>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} lg={4.5}>
            <StyledPaper>
              {authUser && (
                <Card>
                  <CardHeader
                    title="User Account"
                    subheader={`Welcome back, ${basicData.firstName}!`}
                    avatar={<MDAvatar src={placeHolder} alt={'User avatar'} />}
                  />
                  <CardContent>
                    <Stack direction={'row'} spacing={2}>
                      {renderStatItem(
                        'Total Value of Collections',
                        selectedCollection?.totalPrice
                      )}
                      {renderStatItem(
                        'Number of Decks',
                        user?.allDecks?.length
                      )}
                      {renderStatItem(
                        'Number of Collections',
                        allCollections?.length
                      )}
                      {renderStatItem(
                        'Total Cards Purchased',
                        user?.allCollections?.reduce(
                          (acc, collection) => acc + collection.cards.length,
                          0
                        )
                      )}
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <MDButton
                      variant="contained"
                      background={theme.palette.backgroundE.light}
                      color="primary"
                      size="medium"
                      sx={{
                        color: theme.palette.backgroundA.contrastText,
                        background: theme.palette.backgroundF.darker,
                        borderColor: theme.palette.backgroundB.darkest,
                        borderWidth: 2,
                        mt: 'auto',
                        flexGrow: 1,
                        justifySelf: 'bottom',
                        bottom: 0,
                        width: '100%',
                        '&:hover': {
                          color: theme.palette.backgroundA.contrastTextC,
                          fontWeight: 'bold',
                          background: theme.palette.backgroundF.dark,
                          borderColor: theme.palette.backgroundB.darkest,
                          border: `1px solid ${theme.palette.backgroundB.darkest}`,
                        },
                      }}
                    >
                      Manage Collections
                    </MDButton>
                    <MDButton variant="outlined" color="primary" size="medium">
                      View Purchase History
                    </MDButton>
                  </CardActions>
                </Card>
              )}
            </StyledPaper>
          </Grid>
        </Grid>
      </StyledContainerBox>
    </section>
  );
};

export default MainContentSection;
