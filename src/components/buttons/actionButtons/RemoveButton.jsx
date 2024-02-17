import { LoadingButton } from '@mui/lab';
import MDButton from '../../../layout/REUSABLE_COMPONENTS/MDBUTTON';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMode } from '../../../context';
import { RemoveCircleOutlineOutlined } from '@mui/icons-material';
import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import { getContextIcon } from '../../reusable/icons';
// Styled remove button
const RemoveButton = ({
  onClick,
  buttonSize,
  isLoading,
  handleCardAction,
  buttonLabel,
  buttonVariant,
  labelValue,
}) => {
  const { theme } = useMode();
  const currentContextIcon = getContextIcon(labelValue);

  return (
    <LoadingButton
      variant="outlined"
      color="secondary"
      size={buttonSize}
      loading={isLoading}
      onClick={() => handleCardAction('remove')}
      // getButtonLabel={getButtonLabel}
      startIcon={<RemoveCircleOutlineOutlined />}
      sx={{
        width: '100%', // Button grows to fill the container
        flexGrow: 1, // Grow to fill the parent container
        // minWidth: buttonSize === 'small' ? '25px' : '100px', // Ensure buttons have a minimum width
        backgroundColor: theme.palette.error.main,
        borderRadius: theme.shape.borderRadius, // Use theme values for consistent styling
        // width: '100%', // Button grows to fill the container
        // minWidth: '100px', // Ensure buttons have a minimum width
        maxWidth: '100%', // Ensure buttons have a maximum width
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        // p: 1,
        '&:hover': {
          backgroundColor: theme.palette.error.dark,
        },
      }}
    >
      <MDTypography
        variant={buttonVariant}
        sx={{ color: theme.palette.error.contrastText }}
      >
        {buttonLabel}
      </MDTypography>
    </LoadingButton>
  );
};

export default RemoveButton;
