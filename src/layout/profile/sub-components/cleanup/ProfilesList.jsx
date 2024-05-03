// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Card from '@mui/material/Card';
// import MDBox from '../../REUSABLE_COMPONENTS/MDBOX';
// import MDTypography from '../../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
// import { Avatar } from '@mui/material';
// import RCButton from 'layout/REUSABLE_COMPONENTS/RCBUTTON';

// function ProfilesList({ title, profiles, shadow }) {
//   const renderProfiles = profiles.map(
//     ({ image, name, description, action }) => (
//       <MDBox
//         key={name}
//         component="li"
//         display="flex"
//         alignItems="center"
//         py={1}
//         mb={1}
//       >
//         <MDBox mr={2}>
//           <Avatar src={image} alt="something here" shadow="md" />
//         </MDBox>
//         <MDBox
//           display="flex"
//           flexDirection="column"
//           alignItems="flex-start"
//           justifyContent="center"
//         >
//           <MDTypography variant="button" fontWeight="medium">
//             {name}
//           </MDTypography>
//           <MDTypography variant="caption" color="text">
//             {description}
//           </MDTypography>
//         </MDBox>
//         <MDBox ml="auto">
//           {action.type === 'internal' ? (
//             <RCButton
//               component={Link}
//               to={action.route}
//               variant="text"
//               color="info"
//             >
//               {action.label}
//             </RCButton>
//           ) : (
//             <RCButton
//               component="a"
//               href={action.route}
//               target="_blank"
//               rel="noreferrer"
//               variant="text"
//               color={action.color}
//             >
//               {action.label}
//             </RCButton>
//           )}
//         </MDBox>
//       </MDBox>
//     )
//   );

//   return (
//     <Card sx={{ height: '100%', boxShadow: !shadow && 'none' }}>
//       <MDBox pt={2} px={2}>
//         <MDTypography
//           variant="h6"
//           fontWeight="medium"
//           textTransform="capitalize"
//         >
//           {title}
//         </MDTypography>
//       </MDBox>
//       <MDBox p={2}>
//         <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
//           {renderProfiles}
//         </MDBox>
//       </MDBox>
//     </Card>
//   );
// }

// // Setting default props for the ProfilesList
// ProfilesList.defaultProps = {
//   shadow: true,
// };

// // Typechecking props for the ProfilesList
// ProfilesList.propTypes = {
//   title: PropTypes.string.isRequired,
//   profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
//   shadow: PropTypes.bool,
// };

// export default ProfilesList;
