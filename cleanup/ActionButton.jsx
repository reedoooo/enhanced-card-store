import { LoadingButton } from '@mui/lab';
import { useMode } from '../src/context';
import MDTypography from '../src/layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import { useLoading } from '../src/context/hooks/useLoading';
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlined from '@mui/icons-material/RemoveCircleOutlineOutlined';

// Determines the label and variant based on button size and action
const getLabelAndVariant = (buttonSize, labelValue, action) => {
  const labelTypeMap = {
    extraSmall: null,
    small: action,
    medium: action,
    large: labelValue,
  };
  const buttonVariantMap = {
    extraSmall: 'body4',
    small: 'body3',
    medium: 'body2',
    large: 'body4',
  };
  return {
    buttonLabel: labelTypeMap[buttonSize],
    buttonVariant: buttonVariantMap[buttonSize],
  };
};

// Generic Action Button Component
const ActionButton = ({
  buttonSize,
  handleCardAction,
  labelValue,
  actionType,
  card,
  selectedEntity,
  variant,
}) => {
  const { theme } = useMode();
  const { isLoading } = useLoading();
  const adjustedButtonSize = variant === 'data-table' ? 'small' : buttonSize;
  const actionIcon =
    actionType === 'add' ? (
      <AddCircleOutlineOutlined />
    ) : (
      <RemoveCircleOutlineOutlined />
    );
  const loadingKey =
    actionType === 'add' ? 'addCardsToCollection' : 'removeCardsFromCollection';

  return (
    <LoadingButton
      variant={'contained'}
      // color={actionType === 'add' ? 'success.main' : 'error'}
      size={adjustedButtonSize}
      loading={isLoading(loadingKey)}
      onClick={handleCardAction}
      startIcon={actionIcon}
      sx={{
        width: '100%',
        flexGrow: 1,
        borderRadius: theme.shape.borderRadius,
        maxWidth: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor:
          labelValue === 'add'
            ? theme.palette.success.main
            : theme.palette.error.main,
        '&:hover': {
          backgroundColor: labelValue === 'add' ? '#3da58a' : '#cc4a4aff',
        },
      }}
    >
      <MDTypography
        variant="button"
        sx={{
          color:
            theme.palette[labelValue === 'add' ? 'success' : 'error']
              .contrastText,
        }}
      >
        {String(labelValue)} {/* Force conversion to string */}
      </MDTypography>
    </LoadingButton>
  );
};

export default ActionButton;
