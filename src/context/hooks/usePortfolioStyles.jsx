import { makeStyles } from '@mui/styles';

export const usePortfolioStyles = makeStyles((theme) => ({
  // portfolioBox: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   maxWidth: '100vw',
  //   width: '100%',
  //   height: '100%',
  //   margin: theme.spacing(0, 'auto'),
  //   padding: theme.spacing(1, 2, 3),
  //   backgroundColor: theme.palette.background.paper,
  //   color: theme.palette.text.primary,
  // },
  statisticPaper: {
    padding: theme.spacing(2),
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: '100%',
    height: '100%',
    width: '100%',
    boxShadow: theme.shadows[3],
  },
  statisticHeader: {
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  },
  statisticsContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    height: '100%',
    width: '100%',
  },
  paper: {
    background: theme.palette.backgroundD.darkest,
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 'auto',
    width: '100%',
    padding: {
      xs: theme.spacing(1),
      sm: theme.spacing(1),
      md: theme.spacing(2),
      lg: theme.spacing(2),
    },
    borderRadius: theme.shape.borderRadius,
  },

  gridContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.quaternary,
    borderRadius: theme.shape.borderRadius,
    border: '3px solid',
    borderColor: theme.palette.backgroundB.lightest,

    // color: theme.palette.text.primary,
    // background: theme.palette.backgroundB.lighter,
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    background: theme.palette.success.main,
    borderRadius: theme.shape.borderRadius,
  },
  portfolioBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    flexGrow: 1,
    // background: theme.palette.success.main,
    background: theme.palette.backgroundC.dark,
    padding: theme.spacing(4),
    height: 'auto',
    width: '100%',
    // height: '100%',
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  portfolioBoxB: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    flexGrow: 1,
    // background: theme.palette.success.main,
    background: theme.palette.backgroundD.dark,
    padding: theme.spacing(4),
    // height: 'auto',
    width: '100%',
    height: '100%',
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  typography: {
    fontWeight: 700,
    color: theme.palette.backgroundC.contrastText,
    fontSize: '1.5rem',
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    },
  },

  // Add more custom styles as needed
  // gridContainer: {
  //   width: '100%',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   padding: theme.spacing(1),
  // },
  // Additional styles
  dialogButton: {
    textTransform: 'none', // or other style adjustments for dialog buttons
  },
  listContainer: {
    // marginTop: theme.spacing(2),
    maxHeight: '60vh', // or other appropriate height
    overflowY: 'auto',
    padding: theme.spacing(2),
    // background: theme.palette.backgroundC.lighter,
  },
  dialogContent: {
    padding: theme.spacing(2),
    background: theme.palette.background.paper,
    // height: '100%',
  },
  boxStyle: {
    padding: theme.spacing(2),
    justifyContent: 'center',
    margin: 'auto',
  },
  cardStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    padding: theme.spacing(2),
    maxWidth: '100%',
    maxHeight: '100%',
  },
  cardContentStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    padding: theme.spacing(2),
    maxWidth: '100%',
    maxHeight: '100%',
  },
  cardMediaStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    padding: theme.spacing(2),
    maxWidth: '100%',
    maxHeight: '100%',
  },

  // OFFICIAL UPDATED STYLES
  cardListContainerBox: {
    maxWidth: '100%',
    background: theme.palette.backgroundB.dark,
    borderRadius: theme.shape.borderRadius,
    width: {
      xs: '100%', // Full width on mobile screens
      md: '100%',
    },
    padding: theme.spacing(4),
  },
  cardListContainerGrid: {
    // background: theme.palette.backgroundB.default,
    maxHeight: '100%',
    width: '100%',
  },
  tablePaper: {
    maxWidth: 'lg',
    margin: 'auto',
    overflowX: 'auto', // Ensures table doesn't overflow the paper
    background: theme.palette.backgroundB.default,
    padding: theme.spacing(2),
    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing(1), // Smaller padding for xs
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2), // Medium padding for sm
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2), // Larger padding for md
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(2), // Extra larger padding for lg
    },
    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(2), // Maximum padding for xl
    },
  },
  tableContainer: {
    // maxHeight: '60vh',
    maxWidth: 'lg',
    overflowY: 'auto', // Allows table to scroll vertically
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    background: theme.palette.backgroundB.light,
    borderRadius: theme.shape.borderRadius,
  },
  table: {
    minWidth: 300,
    width: '100%',
    background: theme.palette.backgroundA.lightest,
  },
  tableRow: {
    // '&:nth-of-type(odd)': {
    //   background: theme.palette.backgroundA.light,
    // },
    // '&:nth-of-type(even)': {
    //   background: theme.palette.backgroundA.lighter,
    // },
  },
  tableCell: {
    border: '2px solid',
    borderColor: theme.palette.divider,
    // background: theme.palette.backgroundA.light,

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      fontSize: '0.7rem',
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2),
      fontSize: '1rem',
    },
  },
  tableHeader: {
    background: theme.palette.backgroundA.lighter,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
    },
  },
  tableBody: {
    background: theme.palette.backgroundA.lightest,
    border: '2px solid',
    borderColor: theme.palette.divider,
  },
  tableFooter: {
    background: theme.palette.backgroundA.lighter,
  },
  tablePriceBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2),
    background: theme.palette.backgroundB.lighter,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
    },
  },
  // Add any other styles from CardPortfolio, PortfolioContent, and SelectCollection components
}));

export default usePortfolioStyles;
