// Client-side JavaScript (e.g., in a React component or similar)
import axios from 'axios';
import { useContext, useState } from 'react';
import { CollectionContext } from './CollectionContext';
import { useCombinedContext } from '../CombinedProvider';
import { createApiUrl, fetchWrapper } from './collectionUtility';
import { useCookies } from 'react-cookie';

async function checkServerForUpdates() {
  const { socket } = useCombinedContext();
  const [updateResponse, setUpdateResponse] = useState(null);
  try {
    // Send an API request to check for updates
    socket.emit('UPDATE_REQUEST_CHECK', {
      message: 'Checking for updates...',
    });

    socket.on('UPDATE_CHECK_INITIAL_RESPONSE', (response) => {
      console.log('UPDATE_CHECK_INITIAL_RESPONSE', response);
      setUpdateResponse(response.message);
    });

    socket.on('UPDATES_RECEIVED', (response) => {
      console.log('UPDATE_CHECK_RESPONSE', response);
      if (response.hasUpdates) {
        // If there are updates, call your client-side update function
        updateCollectionClientSide(response.data);
      }
      setUpdateResponse(response.message);
    });
  } catch (error) {
    console.error('Error checking for updates:', error);
  }
}
setInterval(checkServerForUpdates, 300000); // Check every 5 minutes

const updateCollectionClientSide = async (response) => {
  const { collection, setCollection, updateCollectionState } =
    useContext(CollectionContext);
  try {
    updateCollectionState(response);
    // Now, send an API request to save the updated collection data
    await saveUpdatedCollectionData(response);
  } catch (error) {
    console.error('Error updating collection client-side:', error);
  }
};

const saveUpdatedCollectionData = async (response) => {
  const [cookies] = useCookies(['user']);
  const userId = cookies.user?.id;
  const collectionId = response._id;
  try {
    const collectionEndpoint = createApiUrl(
      `${userId}/collections/${collectionId || ''}`
    );
    const collectionResponse = await fetchWrapper(collectionEndpoint, 'PUT', {
      response,
    });

    console.log('collectionResponse', collectionResponse);
    console.log('Collection data saved successfully');
  } catch (error) {
    console.error('Error saving updated collection data:', error);
  }
};
