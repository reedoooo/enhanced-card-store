import React from 'react';
import { useCardImages } from '../../../context';

const ImageDisplayFromHook = () => {
  console.log('ImageDisplayFromHook');
  // // const { downloadCardImages, error, imageSrc } = useCardImages();

  // // React.useEffect(() => {
  // //   downloadCardImages();
  // // }, [downloadCardImages, imageUrl]);

  // if (error) return <div>Error fetching image: {error.message}</div>;

  // if (!imageSrc) return <div>Loading...</div>;

  // return <img src={imageSrc} alt="Fetched" />;
};

export default ImageDisplayFromHook;
