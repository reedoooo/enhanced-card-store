// import { useMemo } from 'react';
// import PropTypes from 'prop-types';
// import { TableRow, Checkbox, Icon } from '@mui/material';
// import MDBox from '../../../REUSABLE_COMPONENTS/MDBOX';
// import MDTypography from '../../../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
// import { useMode } from '../../../../context';
// import FlexBetween from '../../../REUSABLE_COMPONENTS/FlexBetween';

// const DataTableHeadCell = ({ headerGroups, isSorted, setSortedValue }) => {
//   const { theme } = useMode();

//   const renderCellContent = (column, idx) => {
//     const sorted = setSortedValue(column, isSorted);
//     const shouldShowIcons = column.showIcons;

//     return (
//       <MDBox
//         component="th"
//         key={idx}
//         sx={{
//           borderBottom: `2px solid ${theme.palette.divider}`,
//           border: `1px solid ${theme.palette.divider}`,
//           fontWeight: theme.typography.fontWeightMedium,
//           letterSpacing: '0.0075em',
//           lineHeight: 1.5,
//           position: 'sticky',
//           top: 0,
//           zIndex: 2,
//           width: '100%',
//           // justifyContent: 'space-evenly',
//           // width: column.id === 'selection' ? '50px' : 'auto',
//           alignItems: 'center',
//           boxShadow:
//             '0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12)',
//           cursor: sorted ? 'pointer' : 'default',
//           flexGrow: 1,
//         }}
//       >
//         <FlexBetween
//           mt="0.25rem"
//           // gap="1.5rem"
//           sx={{
//             display: 'flex',
//             // alignItems: 'center',
//             justifyContent: 'space-evenly',
//             flexGrow: 1,
//           }}
//         >
//           <MDTypography
//             variant="h6"
//             color="text"
//             fontWeight="medium"
//             textTransform="uppercase"
//             sx={{
//               fontWeight: 'bold',
//               flexGrow: 1,
//               flexShrink: 0,
//               mx: '100%',
//             }}
//           >
//             {column.render('Header')}
//           </MDTypography>
//           {shouldShowIcons && sorted && (
//             <MDBox
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'flex-end',
//                 height: '100%',
//                 pr: 1, // Right padding to ensure some space before the edge
//               }}
//             >
//               <Icon color={sorted === 'asce' ? 'action' : 'disabled'}>
//                 arrow_drop_up
//               </Icon>
//               <Icon color={sorted === 'desc' ? 'action' : 'disabled'}>
//                 arrow_drop_down
//               </Icon>
//             </MDBox>
//           )}
//         </FlexBetween>
//       </MDBox>
//     );
//   };

//   return useMemo(
//     () => (
//       <>
//         {headerGroups.map((headerGroup, key) => (
//           <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map(renderCellContent)}
//           </TableRow>
//         ))}
//       </>
//     ),
//     [
//       headerGroups,
//       isSorted,
//       setSortedValue,
//       theme.palette.divider,
//       theme.typography.fontWeightMedium,
//     ]
//   );
// };

// DataTableHeadCell.propTypes = {
//   headerGroups: PropTypes.array.isRequired,
//   isSorted: PropTypes.bool.isRequired,
//   setSortedValue: PropTypes.func.isRequired,
// };

// export default DataTableHeadCell;
