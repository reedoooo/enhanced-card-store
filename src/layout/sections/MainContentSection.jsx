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
import SingleCardAnimation from '../../assets/animations/SingleCardAnimation';
import CardChart from '../../layout/CardChart';
import useCardCronJob from '../../layout/useCardCronJob';
import {
  StyledContainerBox,
  StyledPaper,
} from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import placeHolder from '../../assets/images/placeholder.jpeg';
import { DEFAULT_COLLECTION } from '../../context/constants';
import useCollectionManager from '../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import SimpleButton from '../../layout/REUSABLE_COMPONENTS/unique/SimpleButton';
import uniqueTheme from '../../layout/REUSABLE_COMPONENTS/unique/uniqueTheme';

const MainContentSection = () => {
  const { theme } = useMode();
  const { isLoggedIn } = useAuthContext();
  const { user } = useUserContext();
  const { hasFetchedCollections } = useCollectionManager();
  const { allCollections, selectedCollection } = useSelectedCollection();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const initialCardsData = hasFetchedCollections
    ? allCollections[0]?.cards[0]
    : DEFAULT_COLLECTION.addMultipleDefaultCards(5);
  const { cardData } = useCardCronJob(initialCardsData);

  const renderStatItem = (label, value) => (
    <MDTypography variant="body1" color="primary" component="div">
      <strong>{label}:</strong> {value}
    </MDTypography>
  );

  return (
    <section className="main-content-section">
      <StyledContainerBox>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={7.5}>
            <StyledPaper>
              <Grid container spacing={1} direction="row">
                {isMdUp && (
                  <Grid item md={6}>
                    <MDBox
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
              {isLoggedIn && (
                <Card>
                  <CardHeader
                    title="User Account"
                    subheader={`Welcome back, ${user?.userBasicData?.firstName}!`}
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
                    <SimpleButton
                      // variant="contained"
                      color="primary"
                      customSize="lg"
                      customColor={theme.palette.chartTheme.greenAccent.light}
                      customTextColor={theme.palette.chartTheme.primary.lighter}
                      // isDisabled={false}
                      // isDefault={false}
                      theme={uniqueTheme}
                      onClick={() => {
                        console.log('clicked');
                      }}
                    >
                      Manage Collections
                    </SimpleButton>
                    {/* <MDButton
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
                    </MDButton> */}
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
