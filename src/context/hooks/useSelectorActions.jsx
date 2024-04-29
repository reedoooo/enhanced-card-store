import { useState } from 'react';
import useLocalStorage from './useLocalStorage';
import useManager from '../useManager';

function useSelectorActions() {
  const { updateEntityField, selectedCollection, handleSelectCollection } =
    useManager();
  const [time, setTime] = useState('24hr');
  const [stat, setStat] = useState('highpoint');
  const [theme, setTheme] = useState('light');
  const [selectorValues, setSelectorValues] = useLocalStorage('selectors', {
    selectedTimeRange: time,
    selectedStat: stat,
    selectedTheme: theme,
  });
  const themes = {
    light: 'light',
    dark: 'dark',
  };
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
        updateEntityField(
          'collections',
          selectedCollectionId,
          ['selectedChartDataKey', 'selectedChartData'],
          [e.target.value, selectedCollection.averagedChartData[e.target.value]]
        );
        selectedCollection.selectedChartDataKey = e.target.value;
        selectedCollection.selectedChartData =
          selectedCollection.averagedChartData[e.target.value];
        setSelectorValues({
          selectedTimeRange: e.target.value,
          selectedStat: selectedCollection.selectedStatDataKey,
          selectedTheme: selectedCollection.selectedThemeDataKey,
        });
        handleSelectCollection(selectedCollection);
        break;
      case 'statRange':
        setStat(e.target.value);
        updateEntityField(
          'collections',
          selectedCollectionId,
          ['selectedStatDataKey', 'selectedStatData'],
          [
            e.target.value,
            selectedCollection.collectionStatistics[e.target.value],
          ]
        );
        selectedCollection.selectedStatDataKey = e.target.value;
        selectedCollection.selectedStatData =
          selectedCollection.collectionStatistics[e.target.value];
        setSelectorValues({
          selectedTimeRange: selectedCollection.selectedChartDataKey,
          selectedStat: e.target.value,
          selectedTheme: selectedCollection.selectedThemeDataKey,
        });
        handleSelectCollection(selectedCollection);
        break;
      case 'themeRange':
        setTheme(e.target.value);
        updateEntityField(
          'collections',
          selectedCollectionId,
          ['selectedThemeDataKey', 'selectedThemeData'],
          [e.target.value, themes[e.target.value]]
        );
        selectedCollection.selectedThemeDataKey = e.target.value;
        selectedCollection.selectedThemeData = themes[e.target.value];
        setSelectorValues({
          selectedTimeRange: selectedCollection.selectedChartDataKey,
          selectedStat: selectedCollection.selectedStatDataKey,
          selectedTheme: e.target.value,
        });
        handleSelectCollection(selectedCollection);
        break;
      default:
        break;
    }
  };

  return {
    setTime,
    setStat,
    setTheme,
    handleSelectChange,
    selectorValues,
    selectedTheme: selectedCollection?.selectedThemeDataKey,
    selectedTimeRange: selectedCollection?.selectedChartDataKey,
    selectedStat: selectedCollection?.selectedStatDataKey,
  };
}

export default useSelectorActions;
