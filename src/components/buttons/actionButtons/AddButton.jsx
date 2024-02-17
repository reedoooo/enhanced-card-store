import { LoadingButton } from '@mui/lab';
import MDButton from '../../../layout/REUSABLE_COMPONENTS/MDBUTTON'; // Assuming MDButton is used elsewhere or can be removed if not needed
import AddIcon from '@mui/icons-material/Add'; // Make sure this import is used if you need it elsewhere in your component or remove it if it's unused
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { useMode } from '../../../context';
import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import { getContextIcon } from '../../reusable/icons';

// Styled add button
const AddButton = ({
  onClick, // Make sure to use this if you need it for onClick events or replace it in the onClick prop below
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
      variant="contained"
      color="primary"
      size={buttonSize}
      loading={isLoading}
      onClick={() => handleCardAction('add')}
      startIcon={<AddCircleOutlineOutlined />}
      sx={{
        width: '100%',
        flexGrow: 1,
        borderRadius: theme.shape.borderRadius,
        maxWidth: '100%',
        backgroundColor: theme.palette.success.main,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <MDTypography
        variant={buttonVariant}
        sx={{ color: theme.palette.success.contrastText }}
      >
        {buttonLabel}
      </MDTypography>
    </LoadingButton>
  );
};

export default AddButton;
