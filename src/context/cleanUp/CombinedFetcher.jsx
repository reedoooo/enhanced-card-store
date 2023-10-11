import axios from 'axios';
const BASE_API_URL_CRON = `${process.env.REACT_APP_SERVER}/other/cron`;
const BASE_API_URL_CHARTS = `${process.env.REACT_APP_SERVER}/other/chart-data`;

export const fetchFromAPI = async (endpoint) => {
  try {
    return await axios.get(`${BASE_API_URL_CRON}/${endpoint}`);
  } catch (error) {
    console.error(`Error in request to ${endpoint}:`, error);
    throw error;
  }
};

export const fetchDataForUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_API_URL_CHARTS}/charts/${userId}`);
    return response?.data;
  } catch (error) {
    console.error('Error fetching updated data:', error);
    throw error;
  }
};

export const updateServerDataForUser = async (userId, updatedData, io) => {
  try {
    const chartId = updatedData?._id || 'all';
    const name = updatedData?.name || 'all';
    const uniqueData = Array.from(
      new Set(
        (updatedData || []).flatMap((obj) => obj.data || []).map(JSON.stringify)
      )
    ).map(JSON.parse);

    await axios.post(
      `${BASE_API_URL_CHARTS}/charts/${userId}/${chartId}/updateChart`,
      { userId, chartId, name, datasets: uniqueData }
    );

    io.emit('RECEIVE_C2S_CHART_UPDATE', {
      userId,
      chartId,
      name,
      datasets: uniqueData,
    });
    return uniqueData;
  } catch (error) {
    console.error('Error updating server data:', error);
    throw error;
  }
};
