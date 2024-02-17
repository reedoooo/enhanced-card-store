import React from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import {
  StyledContainerBox,
  StyledPaper,
} from '../REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import { AnimatedFeatureCard } from '../../components/cards/AnimatedFeatureCard';
import { useModalContext } from '../../context/UTILITIES_CONTEXT/ModalContext/ModalContext';
import { useMode } from '../../context';
import { HeroBox } from '../REUSABLE_STYLED_COMPONENTS/SpecificStyledComponents';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import MDButton from '../../layout/REUSABLE_COMPONENTS/MDBUTTON';
import ImageWithFallback from '../pageStyles/ImageWithFallback';
import pages from '../../assets/data/pages.json';

const HeroSection = () => {
  const { theme } = useMode();
  const breakpoints = theme.breakpoints;
  const { tiers, introText } = pages;

  return (
    <section className="hero-section">
      <StyledContainerBox theme={theme}>
        <HeroBox>
          <StyledPaper theme={theme}>
            <MDBox>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={7} md={7}>
                  <MDBox
                    sx={{
                      display: 'flex',
                      px: theme.spacing(3),
                      py: theme.spacing(2),
                      borderRadius: theme.shape.borderRadius,
                      background: theme.palette.backgroundE.lightest,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      width: '100%',
                      margin: 'auto',
                      flexGrow: 1,
                    }}
                  >
                    <MDBox
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                        margin: 'auto',
                        flexGrow: 1,
                      }}
                    >
                      {/* <ScaleText> */}
                      <MDTypography variant="h3" color="primary">
                        {introText.mainTitle}
                      </MDTypography>
                      {/* </ScaleText> */}
                    </MDBox>
                    <MDBox
                      sx={{
                        my: 'auto',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        margin: 'auto',
                        flexGrow: 1,
                      }}
                    >
                      <MDTypography variant="h6" paragraph color="primary">
                        {introText.description}
                      </MDTypography>
                    </MDBox>

                    <MDButton
                      variant="contained"
                      color="info"
                      size="large"
                      circular={true}
                      sx={{
                        // color: theme.palette.backgroundA.contrastText,
                        color: 'white',
                        background: theme.palette.backgroundF.darker,
                      }}
                    >
                      <MDTypography
                        // textGradient="true"
                        color="white"
                        fontWeight="medium"
                        variant="button"
                        sx={{
                          color: 'white',
                        }}
                      >
                        Get Started
                      </MDTypography>
                    </MDButton>
                  </MDBox>
                  {/* </StyledPaper> */}
                </Grid>
                <Grid item xs={12} sm={5} md={5}>
                  <MDBox
                    sx={{
                      display: 'flex',
                      px: theme.spacing(3),
                      py: theme.spacing(2),
                      my: 'auto',
                      height: '100%',
                      // borderRadius: theme.shape.borderRadius,
                      // background: theme.palette.backgroundE.lightest,
                      // flexDirection: 'column',
                      // justifyContent: 'center',
                      // alignItems: 'center',
                      // height: '100%',
                      // width: '100%',
                      // margin: 'auto',
                      // flexGrow: 1,
                    }}
                  >
                    <ImageWithFallback />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </StyledPaper>
        </HeroBox>
      </StyledContainerBox>{' '}
    </section>
  );
};

export default HeroSection;
