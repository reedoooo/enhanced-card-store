import { useState, useEffect } from 'react';
import { useCardImages } from '../CardImagesContext/CardImagesContext';

function useFetchAndDisplayImage(imageUrl) {
  const { downloadCardImage } = useCardImages();
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imageUrl) return;

    setLoading(true); // Indicate the start of an image download
    downloadCardImage(imageUrl) // This function should handle the API request
      .then((downloadedImgUrl) => {
        setImageSrc(downloadedImgUrl); // Update state with the new image URL
        setLoading(false); // Indicate that the image download is complete
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
        setError(error);
        setLoading(false); // Indicate that the image download is complete even if there was an error
      });
  }, [imageUrl, downloadCardImage]); // Dependency array includes downloadCardImage to handle updates to the function

  return { imageSrc, error, loading };
}

export default useFetchAndDisplayImage;
