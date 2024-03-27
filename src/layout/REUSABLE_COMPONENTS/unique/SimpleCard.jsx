import React from 'react';
import MDTypography from '../MDTYPOGRAPHY/MDTypography';
import styled from 'styled-components';
import { AspectRatio, CardContent, IconButton, Typography } from '@mui/joy';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useMode } from '../../../context';
import { Icon, useMediaQuery } from '@mui/material';
import MDBox from '../MDBOX';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CollectionsIcon from '@mui/icons-material/Collections';
import FlexBetween from '../FlexBetween';

const getPrimaryStyle = (theme, isPrimary) => ({
  background: isPrimary ? theme.colorPrimary : undefined,
  color: isPrimary ? theme.colorPrimaryText : undefined,
});

const getAccentStyle = (theme, isAccent) => ({
  background: isAccent ? theme.colorAccent : undefined,
  color: isAccent ? theme.colorAccentText : undefined,
});

const getTableOrChartStyle = (theme, isTableOrChart) => ({
  background: isTableOrChart ? theme.colorCardBackground : undefined,
  color: isTableOrChart ? theme.colorPrimary : undefined,
});

const getFormHeaderStyle = (theme, isFormHeader) => ({
  background: isFormHeader ? theme.colorCardBackground : undefined,
  color: isFormHeader ? theme.colorPrimary : undefined,
  maxWidth: 'md',
  padding: theme.lenMd3, // Updated to use theme's spacing method if available
  borderRadius: '24px',
  boxShadow: '0px 3px 10px 0px rgba(0, 0, 0, 0.2)', // Custom shadow with blur
  margin: 'auto',
  width: '80%',
});

const getSearchFormHeaderStyle = (theme, isSearchFormHeader) => ({
  background: isSearchFormHeader ? theme.colorCardBackground : undefined,
  color: isSearchFormHeader ? theme.colorPrimary : undefined,
  maxWidth: 'lg',
  // padding: theme.lenMd3, // Updated to use theme's spacing method if available
  borderRadius: '24px',
  boxShadow: '0px 3px 10px 0px rgba(0, 0, 0, 0.2)', // Custom shadow with blur
  margin: 'auto',
  marginTop: '1rem',
  // marginLeft: '5rem',
  // marginRight: '5rem',
  // marginTop: 'auto',
  // marginBottom: 'auto',
  width: '98%',
});

const getHeroDisplayStyles = (theme, isHeroDisplay) => ({
  background: 'transparent',
  color: isHeroDisplay ? theme.colorPrimary : undefined,
  root: {
    minWidth: 275,
    background: 'transparent',
    backgroundImage:
      'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
    backdropFilter: 'blur(40)px',
    boxShadow: '10px 10px 10px rgba(30,30,30,.1)',
    borderRadius: 10,
  },
});

// const CardContent = ({ theme, children }) => (
//   <div style={{ padding: `0 ${theme.lenMd1} ${theme.lenMd2}` }}>{children}</div>
// );

const CardTitle = ({ theme, children, isTableOrChart }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.lenXl2,
      padding: `0 ${theme.lenMd1}`,
      // color: theme.colorLabel,
      color: theme.colorLabel,
      fontSize: theme.lenMd2,
      // overflow: 'hidden',
    }}
  >
    <MDTypography
      variant="h6"
      color={isTableOrChart ? theme.colorPrimary : theme.colorLabel}
      component="div"
    >
      {children}
    </MDTypography>
  </div>
);
const iconStyles = {
  // Adjust icon size to be larger based on the parent size
  fontSize: '8rem', // Example size, adjust as needed
  color: '#000000', // Example color, adjust as needed
  maxWidth: '100%',
  maxHeight: '100%',
};
const String2Icon = (icon) => {
  switch (icon) {
    case 'AddIcon':
      return <AddIcon style={iconStyles} />;
    case 'SaveIcon':
      return <SaveIcon style={iconStyles} />;
    case 'CollectionsIcon':
      return <CollectionsIcon style={iconStyles} />;
    default:
      return null;
  }
};

const SimpleCard = ({
  theme,
  hasTitle,
  isPrimary,
  isAccent,
  isTableOrChart,
  noBottomMargin,
  children,
  cardTitle,
  data,
  isFormHeader,
  isSearchFormHeader,
  isHeroDisplay,
  heroText,
  heroIcon,
  ...rest
}) => {
  const { theme: themeSettings } = useMode();
  const isMobileView = useMediaQuery(themeSettings.breakpoints.down('sm'));
  const cardStyle = {
    // display: 'flex',
    width: '100%',
    padding: hasTitle ? 0 : theme.lenMd1,
    marginBottom: noBottomMargin ? 0 : theme.lenMd1,
    borderRadius: theme.borderRadius,
    background: theme.colorCardBackground,
    color: theme.colorText,
    ...(isHeroDisplay && getHeroDisplayStyles(theme, true)),
    ...(isSearchFormHeader && getSearchFormHeaderStyle(theme, true)),
    ...(isFormHeader && getFormHeaderStyle(theme, true)),
    ...(isTableOrChart && getTableOrChartStyle(theme, true)),
    ...(isPrimary && getPrimaryStyle(theme, true)),
    ...(isAccent && getAccentStyle(theme, true)),
  };

  return (
    <div style={cardStyle} {...rest}>
      {cardTitle && (
        <>
          <CardTitle theme={theme} isTableOrChart={isTableOrChart}>
            {cardTitle}
          </CardTitle>
          <div style={{ padding: `0 ${theme.lenMd1} ${theme.lenMd2}` }}>
            {children}
          </div>
        </>
      )}
      {!cardTitle && children}
      {isHeroDisplay && (
        <CardContent
          sx={{
            height: '100%',
            // width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // flexGrow: 1,
            background: 'transparent',
          }}
        >
          <MDBox
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 'auto', // Adjust as needed
            }}
          >
            <IconButton
              disabled={false}
              variant="outlined"
              style={{
                color: themeSettings.palette.primary.main, // Adjust color directly via theme
                '& .MuiIcon-root': { fontSize: isMobileView ? '3rem' : '4rem' }, // Use theme to adjust icon size conditionally
              }}
            >
              <Icon
                style={{
                  // Adjust icon size to be larger based on the parent size
                  fontSize: '8rem', // Example size, adjust as needed
                  color: theme.colorPrimary,
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              >
                {String2Icon(heroIcon)}
              </Icon>
            </IconButton>
          </MDBox>
          <FlexBetween
            sx={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              mt: themeSettings.spacing(2), // Add some top margin
            }}
          >
            <AspectRatio
              sx={{
                width: isMobileView ? '3rem' : '4rem', // Control width based on view
                height: 'auto', // Let height adjust to maintain aspect ratio
                // maxHeight: 200,
                // marginRight: themeSettings.spacing(4), // Right margin for spacing
              }}
              ratio="1" // Maintain a 1:1 aspect ratio
            >
              <IconButton
                disabled={false}
                sx={{
                  color: themeSettings.palette.primary.main, // Adjust color directly via theme
                  // '& .MuiIcon-root': {
                  //   fontSize: isMobileView ? '3rem' : '4rem',
                  // }, // Inherit fontSize
                }}
              >
                <CheckCircleOutlineOutlinedIcon
                  style={{
                    // Adjust icon size to be larger based on the parent size
                    // fontSize: '4rem', // Example size, adjust as needed
                    fontSize: isMobileView ? '2rem' : '4rem', // Scaling text size by 8
                    color: theme.colorPrimary,
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                />
                {/* No need for additional style */}
              </IconButton>
            </AspectRatio>
            <Typography
              variant={isMobileView ? 'subtitle1' : 'h6'} // Adjust based on isMobileView
              sx={{
                marginLeft: themeSettings.spacing(4), // Left margin for spacing
                fontSize: isMobileView ? '2rem' : '4rem', // Scaling text size by 8
              }}
            >
              {heroText} {/* Display heroText */}
            </Typography>
          </FlexBetween>
        </CardContent>
      )}
    </div>
  );
};

export default SimpleCard;
