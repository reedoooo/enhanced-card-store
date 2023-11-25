import React, { createContext, useContext, useEffect, useState } from 'react';

const CardImagesContext = createContext();

export const useCardImages = () => useContext(CardImagesContext);

const fetchWrapper = async (url, method, body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // crossOrigin: 'anonymous',
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // We handle non-ok responses immediately
      throw new Error(`API request failed with status ${response.status}`);
    }
    // updateLastRequestTime(method); // Assumed to be a function that updates some kind of state
    return await response.json(); // Directly returning the JSON response
  } catch (error) {
    console.error(`Fetch failed: ${error}`);
    console.trace();
    throw error; // Re-throwing the error for upstream catch blocks to handle
  }
};

export const CardImagesProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [images, setImages] = useState([]); // [
  const [randomCardImage, setRandomCardImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const BASE_API_URL = 'http://localhost:3001/api/card-image';
  const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/card-image`;

  const downloadCardImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetchWrapper(BASE_API_URL + '/download', 'GET');
      console.log('Response from fetchWrapper:', response);
      // If response is already JSON
      setCards(response.data); // Directly setting the response if it's already in the desired format
      cards.forEach((card) => {
        if (card.card_images && card.card_images.length > 0) {
          // Adding a dummy GET parameter to bypass caching
          const imageUrl =
            card.card_images[0].image_url + '?dummy=' + Date.now();
          setImages(imageUrl);
        }
      });
    } catch (error) {
      console.error('Error in downloadCardImages:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    downloadCardImages();
  }, []);

  useEffect(() => {
    if (cards && cards.length > 0) {
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      if (randomCard.card_images && randomCard.card_images.length > 0) {
        // Adding a dummy GET parameter to bypass caching
        const imageUrl =
          randomCard.card_images[0].image_url + '?dummy=' + Date.now();
        setRandomCardImage(imageUrl);
      }
    }
  }, [cards]);

  useEffect(() => {
    if (images && images.length > 0) {
      const randomCard = images[Math.floor(Math.random() * images.length)];
      if (randomCard.card_images && randomCard.card_images.length > 0) {
        setRandomCardImage(randomCard.card_images[0].image_url);
      }
    }
  }, [images]);

  return (
    <CardImagesContext.Provider
      value={{
        cards,
        images,
        randomCardImage,
        isLoading,
        error,
        downloadCardImages,
        setImages,
      }}
    >
      {children}
    </CardImagesContext.Provider>
  );
};

export default CardImagesProvider;
