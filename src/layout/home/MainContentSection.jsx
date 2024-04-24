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
import { useMode } from '../../context';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import MDTypography from '../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import MDAvatar from '../../layout/REUSABLE_COMPONENTS/MDAVATAR';
import MDButton from '../REUSABLE_COMPONENTS/MDBUTTON';
import SingleCardAnimation from '../../assets/animations/SingleCardAnimation';
import CardChart from '../../layout/CardChart';
import useCardCronJob from '../../layout/useCardCronJob';
import {
  StyledContainerBox,
  StyledPaper,
} from '../REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import placeHolder from '../../assets/images/placeholder.jpeg';
import { DEFAULT_COLLECTION } from '../../context/constants';
import useManageCookies from '../../context/hooks/useManageCookies';
import RCButton from '../REUSABLE_COMPONENTS/RCBUTTON';
import useUserData from '../../context/MAIN_CONTEXT/UserContext/useUserData';
import useManager from '../../context/MAIN_CONTEXT/CollectionContext/useManager';

const MainContentSection = () => {
  const { theme } = useMode();
  const { getCookie } = useManageCookies();
  const { isLoggedIn } = getCookie(['isLoggedIn']);
  const { user } = useUserData();
  const {
    collections: allCollections,
    selectedCollection,
    hasFetchedCollections,
  } = useManager();
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
                    <RCButton
                      color="success"
                      size="large"
                      variant="holo"
                      withContainer={false}
                      onClick={() => {
                        console.log('clicked');
                      }}
                    >
                      Manage Collections
                    </RCButton>
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
