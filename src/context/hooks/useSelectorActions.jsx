/* eslint-disable no-case-declarations */
import { useState } from 'react';
import useLocalStorage from './useLocalStorage';
import useManager from '../state/useManager';
import { nanoid } from 'nanoid';

function useSelectorActions() {
  const {
    updateEntityField,
    selectedCollection,
    handleSelectCollection,
    selectedDeck,
    handleSelectDeck,
    fetchDeckById,
  } = useManager();
  const [time, setTime] = useState('24hr');
  const [stat, setStat] = useState('highpoint');
  const [theme, setTheme] = useState('light');
  const [tags, setTags] = useState([]); // Initially, tags are empty
  const [selectorValues, setSelectorValues] = useLocalStorage('selectors', {
    selectedTimeRange: time,
    selectedStat: stat,
    selectedTheme: theme,
  });
  const themes = {
    light: 'light',
    dark: 'dark',
  };
  const handleSelectChange = async (e, selectorName, context) => {
    console.log('SELECTOR VALUES CHANGED', e, selectorName, context);
    const selectedCollectionId = localStorage.getItem('selectedCollectionId');
    const selectedDeckId = localStorage.getItem('selectedDeckId');
    const selected = localStorage.getItem('selected' + context);
    const selectedCollection = JSON.parse(selected);
    const selectedDeck = JSON.parse(selected);
    // setTags(selectedDeck.tags);
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
      case 'tags':
        let updatedTags = [...selectedDeck.tags]; // Copy current tags to manipulate
        const { name, description, color } = selectedDeck;

        if (e.type === 'add') {
          const newTag = { id: nanoid(), label: e.target.value };
          if (!updatedTags.some((tag) => tag.label === newTag.label)) {
            // Check if tag already exists by label
            updatedTags.push(newTag); // Add new tag if not present
          }
        } else if (e.type === 'delete') {
          updatedTags = updatedTags.filter(
            (tag) => tag.id !== e.target.value.id
          ); // Remove tag by id
        }

        // Update tags in state and backend
        setTags(updatedTags); // Update local state
        await updateEntityField(
          'decks',
          selectedDeckId,
          ['tags', 'name', 'description', 'color'],
          [updatedTags, name, description, color]
        ); // Persist tags update

        const updatedDeck = await fetchDeckById(selectedDeckId);
        console.log('UPDATED DECK', updatedDeck);
        handleSelectDeck(updatedDeck);
        // e.target.value = ''; // Clear the input after adding a tag
        break;
      case 'deck':
      default:
        break;
    }
  };

  return {
    setTime,
    setStat,
    setTheme,
    handleSelectChange,
    setTags,
    selectorValues,
    selectedTheme: selectedCollection?.selectedThemeDataKey,
    selectedTimeRange: selectedCollection?.selectedChartDataKey,
    selectedStat: selectedCollection?.selectedStatDataKey,
    tags: selectedDeck?.tags,
  };
}

export default useSelectorActions;
