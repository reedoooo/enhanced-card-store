// PaginationComponent.jsx
import React from 'react';
import MDPagination from '../../../REUSABLE_COMPONENTS/MDPAGINATION';
import MDBox from '../../../REUSABLE_COMPONENTS/MDBOX';
import MDInput from '../../../REUSABLE_COMPONENTS/MDINPUT';
import Icon from '@mui/material/Icon';
import MDTypography from '../../../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';

const PaginationComponent = ({
  pageOptions,
  pageIndex,
  gotoPage,
  canPreviousPage,
  canNextPage,
  nextPage,
  previousPage,
}) => (
  <MDPagination variant="gradient" color="info">
    {canPreviousPage && (
      <MDPagination item onClick={() => previousPage()}>
        <Icon sx={{ fontWeight: 'bold' }}>chevron_left</Icon>
      </MDPagination>
    )}
    {/* Render page numbers */}
    {pageOptions?.length > 1 ? (
      <MDBox width="5rem" mx={1}>
        <MDInput
          type="number"
          min={1}
          max={pageOptions?.length}
          value={pageIndex + 1}
          onChange={(e) => gotoPage(Number(e.target.value) - 1)}
        />
      </MDBox>
    ) : (
      <MDTypography variant="button" fontWeight="medium">
        Page {pageIndex + 1} of {pageOptions?.length}
      </MDTypography>
    )}
    {canNextPage && (
      <MDPagination item onClick={() => nextPage()}>
        <Icon sx={{ fontWeight: 'bold' }}>chevron_right</Icon>
      </MDPagination>
    )}
  </MDPagination>
);

export default PaginationComponent;

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
