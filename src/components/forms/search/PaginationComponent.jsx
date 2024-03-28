import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const PaginationComponent = ({ pageOptions }) => {
  // Initialize the pageIndex state to 0 (first page)
  const [pageIndex, setPageIndex] = useState(0);

  // Check if there's a previous or next page available
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageOptions?.length - 1;

  // Define the function to navigate to a specific page
  const gotoPage = (page) => {
    const pageNumber = Math.max(0, Math.min(page, pageOptions.length - 1));
    setPageIndex(pageNumber);
  };

  // Define the function for going to the next page
  const nextPage = () => {
    if (canNextPage) setPageIndex((currentPageIndex) => currentPageIndex + 1);
  };

  // Define the function for going to the previous page
  const previousPage = () => {
    if (canPreviousPage)
      setPageIndex((currentPageIndex) => currentPageIndex - 1);
  };

  return (
    <Box display="flex" alignItems="center">
      {canPreviousPage && (
        <IconButton onClick={previousPage} aria-label="Previous page">
          <ChevronLeft />
        </IconButton>
      )}

      {pageOptions?.length > 1 ? (
        <TextField
          size="small"
          variant="outlined"
          type="number"
          inputProps={{ min: 1, max: pageOptions?.length }}
          value={pageIndex + 1}
          onChange={(e) => gotoPage(Number(e.target.value) - 1)}
          sx={{ width: '5rem', marginX: 1 }}
        />
      ) : (
        <Typography variant="button" sx={{ marginX: 1 }}>
          Page {pageIndex + 1} of {pageOptions?.length}
        </Typography>
      )}

      {canNextPage && (
        <IconButton onClick={nextPage} aria-label="Next page">
          <ChevronRight />
        </IconButton>
      )}
    </Box>
  );
};

export default PaginationComponent;

// // PaginationComponent.jsx
// import React from 'react';
// import MDPagination from '../../../layout/REUSABLE_COMPONENTS/MDPAGINATION';
// import MDBox from '../../../layout/REUSABLE_COMPONENTS/MDBOX';
// import MDInput from '../../../layout/REUSABLE_COMPONENTS/MDINPUT';
// import Icon from '@mui/material/Icon';
// import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';

// const PaginationComponent = ({
//   pageOptions,
//   pageIndex,
//   gotoPage,
//   canPreviousPage,
//   canNextPage,
//   nextPage,
//   previousPage,
// }) => (
//   <MDPagination variant="gradient" color="info">
//     {canPreviousPage && (
//       <MDPagination item onClick={() => previousPage()}>
//         <Icon sx={{ fontWeight: 'bold' }}>chevron_left</Icon>
//       </MDPagination>
//     )}
//     {/* Render page numbers */}
//     {pageOptions?.length > 1 ? (
//       <MDBox width="5rem" mx={1}>
//         <MDInput
//           type="number"
//           min={1}
//           max={pageOptions?.length}
//           value={pageIndex + 1}
//           onChange={(e) => gotoPage(Number(e.target.value) - 1)}
//         />
//       </MDBox>
//     ) : (
//       <MDTypography variant="button" fontWeight="medium">
//         Page {pageIndex + 1} of {pageOptions?.length}
//       </MDTypography>
//     )}
//     {canNextPage && (
//       <MDPagination item onClick={() => nextPage()}>
//         <Icon sx={{ fontWeight: 'bold', color: 'blue' }}>chevron_right</Icon>
//       </MDPagination>
//     )}
//   </MDPagination>
// );

// export default PaginationComponent;

{
  /* <MDBox
display="flex"
flexDirection={{ xs: 'column', sm: 'row' }}
justifyContent="space-between"
alignItems={{ xs: 'flex-start', sm: 'center' }}
p={!showTotalEntries && data?.length === 1 ? 0 : 3}
>
{showTotalEntries && (
	<MDBox mb={{ xs: 3, sm: 0 }}>
		<MDTypography variant="button" color="white" fontWeight="regular">
			Showing {entriesStart} to {entriesEnd} of {data?.length} entries
		</MDTypography>
	</MDBox>
)}
{pageOptions?.length > 1 && (
	<MDPagination
		variant={pagination.variant ? pagination.variant : 'gradient'}
		color={pagination.color ? pagination.color : 'info'}
	>
		{canPreviousPage && (
			<MDPagination item onClick={() => previousPage()}>
				<Icon sx={{ fontWeight: 'bold' }}>chevron_left</Icon>
			</MDPagination>
		)}
		{pageOptions?.length > 1 ? (
			<MDBox width="5rem" mx={1}>
				<MDInput
					inputProps={{
						type: 'number',
						min: 1,
						max: customizedPageOptions?.length,
					}}
					value={customizedPageOptions[pageIndex]}
					onChange={(handleInputPagination, handleInputPaginationValue)}
				/>
			</MDBox>
		) : (
			<MDBox width="5rem" mx={1}>
				<MDTypography variant="button" fontWeight="medium">
					{customizedPageOptions[pageIndex]}
				</MDTypography>
			</MDBox>
		)}
		{canNextPage && (
			<MDPagination item onClick={() => nextPage()}>
				<Icon sx={{ fontWeight: 'bold' }}>chevron_right</Icon>
			</MDPagination>
		)}

		{renderPagination}
	</MDPagination>
)}
</MDBox> */
}
