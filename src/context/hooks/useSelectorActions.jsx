import { useState } from 'react';
import useLocalStorage from './useLocalStorage';
import useManager from '../useManager';

function useSelectorActions() {
  // const [timeRange, setTimeRange] = useLocalStorage('timeRange', '24hr');
  // const [stat, setStat] = useLocalStorage('stat', 'highpoint');
  // const [theme, setTheme] = useLocalStorage('theme', 'light');
  const { updateEntityField, selectedCollection, handleSelectCollection } =
    useManager();
  const [time, setTime] = useState('24hr');
  const [stat, setStat] = useState('highpoint');
  const [theme, setTheme] = useState('light');
  const selectorValues = useLocalStorage('selectorValues', {
    selectedTimeRange: time,
    selectedStat: stat,
    selectedTheme: theme,
  });
  const themes = new Map(
    Object.entries({
      light: 'light',
      dark: 'dark',
    })
  );
  const [selectedTheme, setSelectedTheme] = useState(themes['light']);

  const handleSelectChange = (e, selectorName, context) => {
    console.log(
      'SELECTOR VALUES CHANGED',
      e.target.value,
      selectorName,
      context
    );
    const selectedCollectionId = localStorage.getItem('selectedCollectionId');
    const selected = localStorage.getItem('selected' + context);
    const selectedCollection = JSON.parse(selected);
    switch (selectorName) {
      case 'timeRange':
        setTime(e.target.value);
        // setSelectedChartData(
        //   selectedCollection.averagedChartData[e.target.value]
        // );
        updateEntityField(
          'collections',
          selectedCollectionId,
          ['selectedChartDataKey', 'selectedChartData'],
          [e.target.value, selectedCollection.averagedChartData[e.target.value]]
        );
        selectedCollection.selectedChartDataKey = e.target.value;
        selectedCollection.selectedChartData =
          selectedCollection.averagedChartData[e.target.value];
        handleSelectCollection(selectedCollection);
        break;
      case 'statRange':
        setStat(e.target.value);
        // setSelectedStat(selectedCollection.collectionStatistics[stat]);
        // updateEntityField(
        //   'collections',
        //   selectedCollectionId,
        //   ['selectedStatDataKey', 'selectedStat'],
        //   [
        //     e.target.value,
        //     selectedCollection.collectionStatistics
        //       .get(selectedCollection.selectedChartDataKey)
        //       .data.get(e.target.value),
        //   ]
        // );
        break;
      case 'themeRange':
        setTheme(e.target.value);
        setSelectedTheme(themes[selectorValues.selectedTheme]);
        break;
      default:
        break;
    }
  };

  // useEffect(() => {
  //   // Assuming setSelectedChartData is a function that sets some state elsewhere
  //   setSelectedChartData(selectedCollection.averagedChartData[timeRange]);
  // }, [timeRange, selectedCollection]);

  // useEffect(() => {
  //   setSelectedChartData(selectedCollection.collectionStatistics[stat]);
  // }, [stat, selectedCollection]);

  // useEffect(() => {
  //   setSelectedChartData(themes.get(theme));
  // }, [theme, themes]);

  return {
    setTime,
    setStat,
    setTheme,
    handleSelectChange,
    selectorValues,
    selectedTheme: theme,
    selectedTimeRange: time,
    selectedStat: stat,
  };
}

export default useSelectorActions;
