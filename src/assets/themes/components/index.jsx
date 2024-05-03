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
import slider from './slider';
import switchButton from './forms/switchButton';
import globals from '../base/globals';
import tabs from './tabs';
import tab from './tabs/tab';

export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      ...globals,
      ...container,
    },
  },
  MuiDivider: {
    ...divider,
  },
  MuiTableContainer: {
    ...tableContainer,
  },
  MuiTableCell: { ...tableCell },
  MuiTableHead: { ...tableHead },

  MuiButton: { ...button },
  MuiInput: {
    ...input,
  },
  MuiInputLabel: {
    ...inputLabel,
  },
  MuiSlider: { ...slider },
  MuiSwitch: { ...switchButton },

  MuiCard: { ...card },
  MuiCardMedia: { ...cardMedia },
  MuiCardContent: { ...cardContent },
  MuiTabs: { ...tabs },
  MuiTab: { ...tab },
  // MuiContainer: container,
};

export default components;
