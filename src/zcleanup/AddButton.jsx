// import { LoadingButton } from '@mui/lab';
// import MDButton from '../../../layout/REUSABLE_COMPONENTS/MDBUTTON'; // Assuming MDButton is used elsewhere or can be removed if not needed
// import AddIcon from '@mui/icons-material/Add'; // Make sure this import is used if you need it elsewhere in your component or remove it if it's unused
// import { AddCircleOutlineOutlined } from '@mui/icons-material';
// import { useMode } from '../../../context';
// import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
// import { getContextIcon } from '../../reusable/icons';
// import { useLoading } from '../../../context/hooks/useLoading';

// const getLabelAndVariant = (buttonSize, labelValue, action) => {
//   const labelTypeMap = {
//     extraSmall: null,
//     small: `${action}`,
//     medium: `${action}`,
//     // large: `${action}` + action === 'add' ? 'to ' : 'from ' + `${labelValue}`,
//     large: `${labelValue}`,
//   };
//   const buttonVariantMap = {
//     extraSmall: 'body4',
//     small: 'body3',
//     medium: 'body2',
//     large: 'body4',
//   };
//   return {
//     buttonLabel: labelTypeMap[buttonSize],
//     buttonVariant: buttonVariantMap[buttonSize],
//   };
// };
// // Styled add button
// const AddButton = ({ buttonSize, handleCardAction, labelValue, action }) => {
//   const { theme } = useMode();
//   // const currentContextIcon = getContextIcon(labelValue);
//   const tempLabel = action === 'add' ? 'Add' : 'Remove';
//   const { startLoading, stopLoading, isLoading } = useLoading();
//   const { buttonLabel, buttonVariant } = getLabelAndVariant(
//     buttonSize,
//     tempLabel,
//     // labelValue,
//     action
//   );

//   return (
//     <LoadingButton
//       variant="contained"
//       color="primary"
//       size={buttonSize}
//       loading={isLoading('addCardsToCollection')}
//       onClick={() => handleCardAction('add')}
//       startIcon={<AddCircleOutlineOutlined />}
//       sx={{
//         width: '100%',
//         flexGrow: 1,
//         borderRadius: theme.shape.borderRadius,
//         maxWidth: '100%',
//         backgroundColor: theme.palette.success.main,
//         justifyContent: 'center',
//         alignItems: 'center',
//         display: 'flex',
//       }}
//     >
//       <MDTypography
//         variant={buttonVariant}
//         sx={{ color: theme.palette.success.contrastText }}
//       >
//         {buttonLabel}
//       </MDTypography>
//     </LoadingButton>
//   );
// };

// export default AddButton;
