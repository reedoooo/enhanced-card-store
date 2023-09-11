import { Box, Grid, Paper } from '@mui/material';
import PortfolioHeader from '../headings/PortfolioHeader';
// import AddCardForm from './AddCardForm';
// import { Line } from 'react-chartjs-2';
// import { Linear } from 'react-chartjs-2';

// import { Chart, LinearScale } from 'chart.js';
import 'chart.js/auto';

import CardList from '../grids/CardList';
// import SearchBar from '../search/SearchBar';
import CardNameInput from '../other/CardNameInput';
import { useCardStore } from '../../context/CardContext/CardStore';
import SearchButton from '../buttons/SearchButton';
import { useUtility } from '../../context/UtilityContext/UtilityContext';
import LinearChart from './LinearChart';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  chartPaper: {
    background:
      'linear-gradient(45deg, rgba(255,255,255,1) 30%, rgba(204,204,204,1) 100%)',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  },
  listPaper: {
    background:
      'linear-gradient(45deg, rgba(255,255,255,1) 30%, rgba(204,204,204,1) 100%)',
    borderRadius: '12px',
    padding: '20px',
    height: '100%',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  },
}));

const initialState = {
  name: '',
  race: '',
  type: '',
  attribute: '',
  level: '',
};

// components/PortfolioContent.js
export const PortfolioContent = ({
  error,
  newCard,
  setNewCard,
  newCardPrice,
  setNewCardPrice,
  newCardCondition,
  setNewCardCondition,
  addCard,
  chartData,
  selectedCards,
  removeCard,
}) => {
  // const [searchParams, setSearchParams] = useUtility();
  // const [searchParams, setSearchParams] = useUtility(initialState);
  const { searchParams, setSearchParams } = useUtility(initialState);
  const { handleRequest } = useCardStore();
  console.log('(5) -- PORTFOLIO CONTENT (SELECTEDCARDS):', selectedCards);
  console.log('(5) -- PORTFOLIO CONTENT (NEWCARD):', newCard);
  console.log('(5) -- PORTFOLIO CONTENT (NEWCARDPRICE):', newCardPrice);
  console.log('(5) -- PORTFOLIO CONTENT (NEWCARDCONDITION):', newCardCondition);
  console.log('(5) -- PORTFOLIO CONTENT (SEARCHPARAMS):', searchParams);
  console.log('(5) -- PORTFOLIO CONTENT (SETSEARCHPARAMS):', setSearchParams);
  console.log('(5) -- PORTFOLIO CONTENT (HANDLESEARCH):', handleRequest);
  console.log('(5) -- PORTFOLIO CONTENT (CHARTDATA):', chartData);
  console.log('(5) -- PORTFOLIO CONTENT (ERROR):', error);
  const classes = useStyles();

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <PortfolioHeader error={error} />
      <Grid item xs={12}>
        <CardNameInput
          value={searchParams}
          setValue={(newValue) =>
            setSearchParams((prevState) => ({
              ...prevState,
              name: newValue,
            }))
          }
          handleRequest={() => handleRequest(searchParams)}
        />
        <SearchButton searchParams={searchParams || []} />
      </Grid>
      <Grid container direction="column" spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} sx={{ height: '70%' }}>
          <Paper elevation={3} className={classes.chartPaper}>
            {chartData ? (
              <LinearChart
                data={chartData}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            ) : (
              <p>No data available</p>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ height: '30%' }}>
          <Paper elevation={3} className={classes.listPaper}>
            <CardList selectedCards={selectedCards} removeCard={removeCard} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioContent;
