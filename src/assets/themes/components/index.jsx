import input from './forms/input';
import inputLabel from './forms/inputLabel';
import button from './buttons/index';
import container from './container/container';
import divider from './divider/divider';
import tableContainer from './table/tableContainer';
import tableCell from './table/tableCell';
import tableHead from './table/tableHead';
import card from './card/index';
import cardMedia from './card/cardMedia';
import cardContent from './card/cardContent';
const cssbaseline = {
  styleOverrides: `
  body {
    background-color: #f0f2f5; // Example background color
    font-family: 'Roboto', sans-serif; // Default font
    display: 'flex',
    flexGrow: 1,
  }
  `,
};

export const components = {
  MuiCssBaseline: cssbaseline,
  MuiButton: button,
  // MuiListItemButton: listItemButton,
  MuiContainer: container,
  MuiDivider: divider,

  MuiTableContainer: tableContainer,
  MuiTableCell: tableCell,
  MuiTableHead: tableHead,

  // MuiOutlinedInput: outlinedInput,
  MuiInput: input,
  MuiInputLabel: inputLabel,

  MuiCard: card,
  MuiCardMedia: cardMedia,
  MuiCardContent: cardContent,
};

export default components;
