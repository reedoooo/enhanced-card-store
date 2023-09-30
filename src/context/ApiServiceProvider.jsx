import { useCallback, useMemo } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useCombinedContext } from './CombinedProvider';
import { useSocket } from './SocketProvider';

export const useApiServiceProvider = () => {
  const BASE_API_URL_CHARTS = `${process.env.REACT_APP_SERVER}/other/chart-data`;
  const BASE_API_URL_CRON = `${process.env.REACT_APP_SERVER}/other/cron`;
  const CRON_JOB_DELAY = 60000;
  const { userCookie } = useCookies(['userCookie']);
  const { userId } = userCookie || {};
  const { setState, setChartData, setIsCronJobTriggered } =
    useCombinedContext();
  const socket = useSocket();

  const fetchData = useCallback(async () => {
    if (!userId) return;

    // Update state to handle loading status
    setState((prevState) => ({ ...prevState, isLoading: true, error: null }));

    try {
      const response = await axios.get(
        `${BASE_API_URL_CHARTS}/charts/${userId}`
      );
      setChartData(response?.data);
    } catch (error) {
      console.error('Error fetching updated data:', error);

      // Update state to handle error status
      setState((prevState) => ({ ...prevState, error: 'Error fetching data' }));
    } finally {
      // Reset loading status in any case (success or failure)
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, [userId, setChartData]);

  const updateServerData = useCallback(
    async (updatedData) => {
      if (!userId) return;
      const chartId = updatedData?._id || 'all';
      const name = updatedData?.name || 'all';
      const updateChartDataClient = (chartId, name, datasets, userId) => {
        socket.emit('RECEIVE_C2S_CHART_UPDATE', {
          chartId,
          name,
          datasets,
          userId,
        });
      };

      const uniqueData = useMemo(
        () =>
          Array.from(
            new Set(
              (updatedData || [])
                .flatMap((obj) => obj.data || [])
                .map(JSON.stringify)
            )
          ).map(JSON.parse),
        [updatedData]
      );

      try {
        const response = await axios.post(
          `${BASE_API_URL_CHARTS}/charts/${userId}/${chartId}/updateChart`,
          {
            userId: userId,
            // data: uniqueData || [],
            chartId: chartId || 'all',
            name: name || 'all',
            // _id: dataSetId || 'all',
            datasets: uniqueData || [],
          }
        );

        updateChartDataClient(
          response.data._id,
          response.data.name,
          uniqueData,
          userId
        );

        socket.emit('RECEIVE_C2S_CHART_UPDATE', {
          // data: {
          userId: userId,
          chartId: chartId || 'all',
          name: name || 'all',
          datasets: uniqueData || [],
          // },
          // _id: chartId || 'all',
          // datasets: uniqueData || [],
        });

        console.log('UPDATE SERVER DATA RESPONSE:', response);
        const { returnValue } = response.data;

        console.log('RETURN VALUE:', returnValue);
        // Update chartData state here
        setState((prevState) => ({ ...prevState, chartData: uniqueData }));
        setIsCronJobTriggered(true);
      } catch (error) {
        console.error('Error updating server data:', error);
      }
    },
    [userId, setIsCronJobTriggered]
  );

  //... other API services
  return { fetchData, updateServerData };
};

export default useApiServiceProvider;
