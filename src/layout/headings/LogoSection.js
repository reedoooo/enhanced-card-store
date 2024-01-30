import { ButtonBase } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/icons/deckIcon2.svg'; // Import SVG as a component
import config from '../../config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(config?.defaultPath);
  };

  return (
    <ButtonBase
      disableRipple
      component={Link}
      to={config.defaultPath}
      onClick={handleClick}
      // sx={{ width: '100%', maxWidth: 150 }} // Responsive styles
      sx={{
        // width: defaultSize, // Standard icon size, adjustable via props
        // height: defaultSize, // Standard icon size, adjustable via props
        width: '50px',
        height: '50px',
        padding: '8px', // Padding to provide space around the icon
        marginRight: '8px',
        // padding: '8px', // Padding to provide some space around the icon
        // bottom: '2rem',
        // right: '2rem',
        color: 'rgba(0, 0, 0, 0.54)',
        margin: '0', // Adjust margin as needed
        // color: '#777',
        '&:hover': {
          // backgroundColor: defaultHoverColor, // Hover effect color
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        '& img': {
          maxWidth: '100%',
          maxHeight: '100%',
        },
      }}
    >
      <img src={Logo} alt="Logo" style={{ width: '100%', height: 'auto' }} />
    </ButtonBase>
  );
};

export default LogoSection;
