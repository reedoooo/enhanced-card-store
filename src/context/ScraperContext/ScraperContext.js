/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { useCookies } from 'react-cookie';

const defaultContextValue = {
  scrapeData: {
    _id: '',
    url: '',
    pricingData: [],
    pricingData2: [],
    listingGeneralInfo: {
      otherListings: '',
      lowestAvailablePrice: '',
    },
    listingSpotlightInfo: {
      spotlightCondition: '',
      spotlightPrice: '',
      spotlightShipping: '',
      spotlightSeller: '',
    },
  },
  setScrapeData: () => {},
  fetchExistingScrapeData: () => {},
  createScrapeData: () => {},
};

export const ScraperContext = createContext(defaultContextValue);

export const ScrapeDataProvider = ({ children }) => {
  const [scrapeData, setScrapeData] = useState({
    _id: '',
    url: '',
    pricingData: [],
    pricingData2: [],
    listingGeneralInfo: {
      otherListings: '',
      lowestAvailablePrice: '',
    },
    listingSpotlightInfo: {
      spotlightCondition: '',
      spotlightPrice: '',
      spotlightShipping: '',
      spotlightSeller: '',
    },
  });
  const [scrapeDataBackup, setScrapeDataBackup] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [, setCookie] = useCookies(['userCookie', 'scrapeData']);

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const scrapeForData = async (cardName) => {
    try {
      const finalCardName = cardName || 'Dark Magician';

      const response = await fetch(
        `${
          process.env.REACT_APP_SERVER
        }/api/scrape?cardName=${encodeURIComponent(finalCardName)}`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.pricingData) {
        // checking one property as an example
        setScrapeDataBackup(data);
        setScrapeData(data);
      }

      setCookie('scrapeData', data, { path: '/' });
      return data;
    } catch (error) {
      console.error('Error scraping data:', error);
    }
  };

  const fetchExistingScrapeData = useCallback(async () => {
    if (!isMountedRef.current) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/scrape`
      );
      console.log('FETCH EXISTING SCRAPE DATA RESPONSE:', response);
      const data = await response.json();
      console.log('FETCH EXISTING SCRAPE DATA:', data);
      if (
        !response.ok ||
        response.headers.get('content-type') !== 'application/json'
      ) {
        setCookie('scrapeData', Array.isArray(data.scrape) ? data.scrape : [], {
          path: '/',
        });
        throw new Error(data.message || 'Server response was not ok.');
      }

      if (Array.isArray(data.scrape)) {
        setScrapeDataBackup(data.scrape);
        setScrapeData(data.scrape);
        setCookie('scrapeData', data.scrape, { path: '/' });
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err.message);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [setCookie]);

  useEffect(() => {
    console.log('SCRAPER CONTEXT (ScrapeProvider):', {
      scrapeData,
      loading,
      error,
    });
  }, [scrapeData, loading, error]);

  return (
    <ScraperContext.Provider
      value={{
        scrapeData,
        setScrapeData,
        fetchExistingScrapeData,
        scrapeForData,
        loading,
        error,
      }}
    >
      {children}
    </ScraperContext.Provider>
  );
};

export const useScraperStore = () => {
  const context = useContext(ScraperContext);
  if (!context) {
    throw new Error('useScraperStore must be used within a ScrapeDataProvider');
  }

  return context;
};
