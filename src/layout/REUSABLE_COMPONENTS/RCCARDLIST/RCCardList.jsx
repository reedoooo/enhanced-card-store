import { Link } from 'react-router-dom';

// prop-types is library for typechecking of props
import PropTypes from 'prop-types';
import MDBox from '../MDBOX';
import MDAvatar from '../MDAVATAR';
import MDTypography from '../MDTYPOGRAPHY/MDTypography';
import MDButton from '../MDBUTTON';
import { Box, Card, Chip, Paper } from '@mui/material';
import FlexBetween from '../FlexBetween';

function RCCardList({ title, items, shadow }) {
  const renderCards = items.map(
    ({ name, description, totalQuantity, action, image, cards }) => (
      <FlexBetween
        key={name}
        component="li"
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: 1,
          mb: 1,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // Divider style
          '&:last-child': {
            borderBottom: 'none',
          },
        }}
      >
        <Paper elevation={3} sx={{ p: 0.5, display: 'inline-block' }}>
          <MDAvatar src={cards[0]?.image} alt="Card Avatar" shadow="md" />
        </Paper>
        <MDBox
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexGrow: 1, // Ensure it takes available space
          }}
        >
          <MDTypography variant="button" fontWeight="medium">
            {name}
          </MDTypography>
          <MDTypography variant="caption" color="text">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip label="5 Stars" variant="outlined" />
          <Chip label="10k Downloads" variant="outlined" />
        </MDBox>
        <MDBox sx={{ ml: 'auto' }}>
          <MDButton onClick={action.onClick} variant="text" color="info">
            {name}
          </MDButton>
        </MDBox>
      </FlexBetween>
    )
  );

  return (
    <Card sx={{ height: '100%', boxShadow: !shadow && 'none' }}>
      <MDBox pt={2} px={2}>
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2} sx={{ height: 'calc(100% - 48px)', overflowY: 'auto' }}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderCards}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfilesList
RCCardList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
RCCardList.propTypes = {
  title: PropTypes.string.isRequired,
  decks: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default RCCardList;
