import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import MDBox from '../../../REUSABLE_COMPONENTS/MDBOX';
import MDTypography from '../../../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import { Avatar } from '@mui/material';
import RCButton from 'layout/REUSABLE_COMPONENTS/RCBUTTON';

function DefaultProjectCard({
  image,
  label,
  title,
  description,
  action,
  authors,
}) {
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <Avatar
        src={media}
        alt={name}
        size="xs"
        sx={{
          border: '2px solid white',
          // border: `${borderWidth[2]} solid ${white.main}`,
          cursor: 'pointer',
          position: 'relative',
          ml: -1.25,

          '&:hover, &:focus': {
            zIndex: '10',
          },
        }}
      />
    </Tooltip>
  ));

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        overflow: 'visible',
      }}
    >
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: '100%',
            margin: 0,
            boxShadow: '0 16px 40px -12.125px rgba(0,0,0,0.3)',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </MDBox>
      <MDBox mt={1} mx={0.5}>
        <MDTypography
          variant="button"
          fontWeight="regular"
          color="text"
          textTransform="capitalize"
        >
          {label}
        </MDTypography>
        <MDBox mb={1}>
          {action.type === 'internal' ? (
            <MDTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          ) : (
            <MDTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          )}
        </MDBox>
        <MDBox mb={3} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {action.type === 'internal' ? (
            <RCButton
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </RCButton>
          ) : (
            <RCButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </RCButton>
          )}
          <MDBox display="flex">{renderAuthors}</MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(['external', 'internal']),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
      'light',
      'dark',
      'white',
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProjectCard;
