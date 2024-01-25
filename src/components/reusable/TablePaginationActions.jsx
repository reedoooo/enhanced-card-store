// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';
// import { useMode } from '../../context';
// import { PortfolioPaginationActionsTableContentsContainer } from '../../context/hooks/style-hooks/usePortfolioStyles';

// const TablePaginationActions = (props) => {
//   const { theme } = useMode();
//   const { count, page, rowsPerPage, onRowsPerPageChange, onPageChange } = props;

//   // Simplify button click handlers
//   const handleFirstPageButtonClick = () => onPageChange(0);
//   const handleBackButtonClick = () => onPageChange(page - 1);
//   const handleNextButtonClick = () => onPageChange(page + 1);
//   const handleLastPageButtonClick = () =>
//     onPageChange(Math.max(0, Math.ceil(count / rowsPerPage) - 1));

//   // const handleButtonClick = (event, newPage) => {
//   //   onPageChange(event, newPage);
//   //   onRowsPerPageChange(event);
//   // };

//   const isRtl = theme.direction === 'rtl';
//   return (
//     <PortfolioPaginationActionsTableContentsContainer theme={theme}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {isRtl ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label="previous page"
//       >
//         {isRtl ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {isRtl ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {isRtl ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </PortfolioPaginationActionsTableContentsContainer>
//   );
// };

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

// export default TablePaginationActions;
