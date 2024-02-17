import { TableRow } from '@mui/material';
import MDBox from '../../../REUSABLE_COMPONENTS/MDBOX';
import DataTableHeadCell from './DataTableHeadCell';

export const DataTableHeadComponent = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headerGroups,
    isSorted,
    setSortedValue,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <MDBox component="thead">
      {headerGroups?.map((headerGroup, key) => (
        <TableRow
          key={key}
          {...headerGroup.getHeaderGroupProps()}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {/* <DataTableHeadCell padding="checkbox">
						<Checkbox
							color="primary"
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
						/>
					</DataTableHeadCell> */}
          {headerGroup.headers.map((column, idx) => (
            <DataTableHeadCell
              key={idx}
              {...column.getHeaderProps(
                isSorted && column.getSortByToggleProps()
              )}
              width={column.width ? column.width : 'auto'}
              align={column.align ? column.align : 'left'}
              sorted={setSortedValue(column, isSorted)}
            >
              {column.render('Header')}
            </DataTableHeadCell>
          ))}
        </TableRow>
      ))}
    </MDBox>
  );
};
