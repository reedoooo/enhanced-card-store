import { Grid } from '@mui/material';
import PortfolioChart from '../other/PortfolioChart';
import PortfolioListContainer from '../../containers/PortfolioListContainer';
import PortfolioCardSearch from '../search/PortfolioCardSearch';
import PortfolioHeader from '../headings/PortfolioHeader';
import { Box } from '@mui/system';
import { useCardStore } from '../../context/CardContext/CardStore';
import { useUtility } from '../../context/UtilityContext/UtilityContext';

const initialState = {
  name: '',
  race: '',
  type: '',
  attribute: '',
  level: '',
};

const PortfolioContent = ({ error, chartData, selectedCards, removeCard }) => {
  const { searchParams, setSearchParams } = useUtility(initialState);
  const { handleRequest } = useCardStore();

  // const classes = useStyles();

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <PortfolioHeader error={error} />
      <PortfolioCardSearch
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleRequest={handleRequest}
      />
      <Grid container direction="column" spacing={2} sx={{ flexGrow: 1 }}>
        <PortfolioChart data={chartData} />
        <PortfolioListContainer
          selectedCards={selectedCards}
          removeCard={removeCard}
        />
      </Grid>
    </Box>
  );
};

export default PortfolioContent;
