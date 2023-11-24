import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useCardImages } from '../../context/CardImagesContext/CardImagesContext';
import placeholderImage from '../images/placeholder.jpeg'; // Adjust the path as necessary
function LoadingCardAnimation() {
  const { cards, isLoading, error } = useCardImages();
  const [randomCardImage, setRandomCardImage] = useState();

  useEffect(() => {
    if (cards && cards.length > 0) {
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      if (randomCard.card_images && randomCard.card_images.length > 0) {
        // Constructing the local file name
        const name = randomCard.name.replace(/[/\\?%*:|"<>]/g, '');
        console.log('name', name);
        const folder = 'images';
        console.log('folder', folder);
        const folder2 = 'cards';
        const folder3 = `${
          randomCard?.type === 'Spell Card' || randomCard?.type === 'Trap Card'
            ? 'spell_trap'
            : 'monster'
        }`;
        console.log('folder2', folder2);
        const extension = 'jpg'; // Assuming all images are jpg
        console.log('naextensionme', extension);
        const fullName = `${name}_${randomCard.race}_${randomCard.type}${
          randomCard.level ? '_lvl' + randomCard.level : ''
        }${
          randomCard.attribute ? '_' + randomCard.attribute : ''
        }.${extension}`;
        console.log('fullName', fullName);
        const filePath = `../${folder}/${folder2}/${folder3}/${fullName}`;
        console.log('filePath', filePath);
        console.log('placeholderImage', placeholderImage);
        setRandomCardImage(filePath);
      }
    }
    console.log('cards', cards);
    console.log('randomCardImage', randomCardImage);
  }, [cards]);

  useEffect(() => {
    if (!randomCardImage) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const loadingIconContainer = document.getElementById('loadingIcon');
    if (!loadingIconContainer) return;

    loadingIconContainer.appendChild(renderer.domElement);

    // Load the placeholder texture
    const placeholderTexture = new THREE.TextureLoader().load(placeholderImage);

    // Load the card image texture
    new THREE.TextureLoader().load(
      randomCardImage,
      (texture) => {
        const cardMaterialFront = new THREE.MeshBasicMaterial({ map: texture });
        const cardMaterialBack = new THREE.MeshBasicMaterial({
          map: placeholderTexture,
        });

        const cardGeometry = new THREE.BoxGeometry(1, 1.4, 0.01);
        const card = new THREE.Mesh(cardGeometry, [
          cardMaterialBack, // Left side
          cardMaterialBack, // Right side
          cardMaterialBack, // Top side
          cardMaterialBack, // Bottom side
          cardMaterialFront, // Front side
          cardMaterialBack, // Back side
        ]);
        scene.add(card);
        camera.position.z = 5;

        const animate = () => {
          requestAnimationFrame(animate);
          card.rotation.y += 0.05;
          renderer.render(scene, camera);
        };

        animate();
      },
      undefined, // onProgress callback not supported
      (err) => {
        console.error('An error occurred while loading the texture:', err);
      }
    );

    return () => {
      if (loadingIconContainer.contains(renderer.domElement)) {
        loadingIconContainer.removeChild(renderer.domElement);
      }
    };
  }, [randomCardImage]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="loadingIcon" style={{ width: '100%', height: '400px' }}>
      Three.js animation should appear here
    </div>
  );
}

export default LoadingCardAnimation;

// import * as THREE from 'three';
// import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
// import placeholderImage from '../images/placeholder.jpeg';
// import { useCardImages } from '../../context/CardImagesContext/CardImagesContext';

// function LoadingCardAnimation() {
//   const { selectedCollection, allCollections } = useCollectionStore();
//   const [randomCardImage, setRandomCardImage] = useState(null);
//   const { images, isLoading, error, downloadCardImages, getRandomCardImages } =
//     useCardImages();

//   if (isLoading) {
//     console.log('Loading...');
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     console.error(error);
//     return <div>Error: {error}</div>;
//   }

//   if (images && images.length > 0) {
//     return (
//       <div>
//         {images.map((image, index) => (
//           <img src={image} alt="card" key={index} />
//         ))}
//       </div>
//     );
//   }

//   useEffect(() => {
//     const selectRandomCardImage = (collection) => {
//       const filteredCards = collection.cards.filter(
//         (card) => card.card_images && card.card_images.length > 0
//       );
//       if (filteredCards.length > 0) {
//         const randomCard =
//           filteredCards[Math.floor(Math.random() * filteredCards.length)];
//         return randomCard.card_images[0].image_url;
//       }
//       return placeholderImage;
//     };

//     const collection =
//       selectedCollection ||
//       (allCollections.length > 0
//         ? allCollections[Math.floor(Math.random() * allCollections.length)]
//         : null);
//     if (collection) {
//       setRandomCardImage(selectRandomCardImage(collection));
//     } else {
//       setRandomCardImage(placeholderImage);
//     }
//   }, [selectedCollection, allCollections]);

//   useEffect(() => {
//     if (!randomCardImage) return;

//     const loadingIconContainer = document.getElementById('loadingIcon');
//     if (!loadingIconContainer) {
//       console.error('Loading icon container not found');
//       return;
//     }

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true });
//     renderer.setSize(400, 400);

//     loadingIconContainer.appendChild(renderer.domElement);

//     const placeholderTexture = new THREE.TextureLoader().load(placeholderImage);
//     const randomCardTexture = new THREE.TextureLoader().load(randomCardImage);
//     const cardMaterialFront = new THREE.MeshBasicMaterial({
//       map: placeholderTexture,
//     });
//     const cardMaterialBack = new THREE.MeshBasicMaterial({
//       map: randomCardTexture,
//     });

//     const cardGeometry = new THREE.BoxGeometry(1, 1.4, 0.01);
//     const card = new THREE.Mesh(cardGeometry, [
//       cardMaterialBack,
//       cardMaterialBack,
//       cardMaterialBack,
//       cardMaterialBack,
//       cardMaterialFront,
//       cardMaterialBack,
//     ]);
//     scene.add(card);

//     camera.position.z = 5;

//     const animate = function () {
//       requestAnimationFrame(animate);
//       card.rotation.y += 0.05;
//       renderer.render(scene, camera);
//     };

//     animate();

//     return () => {
//       loadingIconContainer.removeChild(renderer.domElement);
//     };
//   }, [randomCardImage]);

//   return <div id="loadingIcon"></div>;
// }

// export default LoadingCardAnimation;
