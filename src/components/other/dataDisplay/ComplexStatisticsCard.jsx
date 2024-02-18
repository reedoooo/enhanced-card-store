import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import MDBox from '../../../layout/REUSABLE_COMPONENTS/MDBOX/index';
import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import { useMode } from '../../../context';

function ComplexStatisticsCard({ color, title, count, percentage, icon, sx }) {
  const { theme } = useMode();
  const textColor = color === 'light' ? 'dark' : 'white';

  const gradientColor = theme.palette[color]?.main || theme.palette.info.main;

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    ...sx,
  };

  const iconBoxStyle = {
    variant: 'gradient',
    bgColor: color,
    color: textColor,
    coloredShadow: color,
    borderRadius: 'xl',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '4rem',
    height: '4rem',
    transform: 'translateY(-50%)',
    background: `linear-gradient(145deg, ${gradientColor}, ${theme.palette[color]?.dark || theme.palette.info.dark})`,
  };

  const statisticsBoxStyle = {
    textAlign: 'right',
    lineHeight: 1.25,
    mt: -3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    height: '6rem',
  };

  const percentageStyle = {
    component: 'p',
    variant: 'button',
    color: 'text',
    display: 'flex',
    justifyContent: 'space-between',
    mt: 1,
  };
  return (
    <Card sx={cardStyle}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        m={0}
        sx={{
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
        }}
      >
        <MDBox
          sx={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',

            width: '4rem',
            height: '4rem',
            bgcolor: 'info.main',
            color: textColor,
            borderRadius: '50%',
            boxShadow: theme.shadows[3],
          }}
        >
          <Icon
            fontSize="medium"
            color="inherit"
            sx={{
              m: 0,
            }}
          >
            {icon}
          </Icon>
        </MDBox>
        <MDBox>
          <MDTypography variant="caption" color="primary">
            {title}
          </MDTypography>
          <MDTypography variant="h5">{count}</MDTypography>
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox
        p={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{
          bgcolor: theme.palette[color]?.light || theme.palette.info.light,
          color:
            theme.palette[color]?.contrastText ||
            theme.palette.info.contrastText,
        }}
      >
        <MDTypography sx={percentageStyle}>
          <MDTypography
            component="span"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.amount}
          </MDTypography>
          {percentage.label}
        </MDTypography>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: 'info',
  percentage: {
    color: 'success',
    text: '',
    label: '',
  },
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
      'dark',
      'white',
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;
