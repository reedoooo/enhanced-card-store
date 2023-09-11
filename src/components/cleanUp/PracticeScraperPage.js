import React, { useContext, useEffect } from 'react';
import ScraperContainer from './ScraperContainer';
import { BeatLoader } from 'react-spinners';
import { useCookies } from 'react-cookie';
import { ScraperContext } from '../../context/ScraperContext/ScraperContext';

const LoadingIndicator = ({ loading }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <BeatLoader color={'#123abc'} loading={loading} size={24} />
    </div>
  );
};

const ErrorIndicator = ({ error }) => {
  return <div>Error: {error}</div>;
};

const PracticeScraperPage = () => {
  const [cookies] = useCookies(['userCookie']);
  const { fetchExistingScrapeData, loading, error } =
    useContext(ScraperContext);

  // const cardName = cookies.cardName;
  // console.log('cardName:', cardName);

  useEffect(() => {
    fetchExistingScrapeData()
      .then((data) => {
        console.log('Successfully fetched scrape data:', data);
        // Optionally, display a success message to the user.
        // This would require you to manage a 'message' state.
        // setMessage('Successfully fetched scrape data.');
      })
      .catch((err) => {
        console.error('Failed to get card scrape data', err);
      });
  }, [fetchExistingScrapeData]);

  if (loading) {
    return <LoadingIndicator loading={loading} />;
  }

  if (error) {
    return <ErrorIndicator error={error} />;
  }

  return (
    <div>
      <h1>Web Scraper Page</h1>
      <ScraperContainer />
    </div>
  );
};

export default PracticeScraperPage;
