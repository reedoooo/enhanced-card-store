// import React, { useEffect } from 'react';
// import * as THREE from 'three';

// const CardDeckAnimation = () => {
//   useEffect(() => {
//     // Set up the scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer();

//     // Set the size of the rendering window
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     // Append the renderer to the container
//     document
//       .getElementById('card-deck-container')
//       .appendChild(renderer.domElement);

//     // Create a group to hold the cards
//     const cardGroup = new THREE.Group();

//     // Number of cards in the deck
//     const numCards = 10;

//     // Create cards and add them to the group
//     for (let i = 0; i < numCards; i++) {
//       const geometry = new THREE.BoxGeometry(1, 1.5, 0.1);
//       const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color
//       const card = new THREE.Mesh(geometry, material);

//       // Position cards in a circle
//       const angle = (i / numCards) * Math.PI * 2;
//       const radius = 5;
//       card.position.x = Math.cos(angle) * radius;
//       card.position.z = Math.sin(angle) * radius;

//       // Rotate cards around the Y-axis
//       card.rotation.y = angle;

//       // Add the card to the group
//       cardGroup.add(card);
//     }

//     // Add the card group to the scene
//     scene.add(cardGroup);

//     // Position the camera
//     camera.position.z = 15;

//     // Create an animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);

//       // Rotate the card group around the Y-axis
//       cardGroup.rotation.y += 0.01;

//       // Render the scene with the camera
//       renderer.render(scene, camera);
//     };

//     // Start the animation loop
//     animate();
//   }, []);

//   return <div id="card-deck-container"></div>;
// };

// export default CardDeckAnimation;

import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

const CardDeckAnimation = () => {
  const [monsterImageURLs, setMonsterImageURLs] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    // Fetch card image URLs from the server
    fetch(`${process.env.REACT_APP_SERVER}/api/card-images/random`)
      .then((response) => response.json())
      .then((data) => {
        // Select the first 10 image URLs
        const selectedURLs = data.slice(0, 10);
        setMonsterImageURLs(selectedURLs);
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch((error) => {
        console.error('Error fetching card images:', error);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  useEffect(() => {
    // Ensure we have image URLs before proceeding
    if (monsterImageURLs.length === 0 || loading) {
      return;
    }

    // Initialize the scene, camera, and renderer here
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    // Set the size of the rendering window
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append the renderer to the container
    document
      .getElementById('card-deck-container')
      .appendChild(renderer.domElement);

    // Function to start the animation
    const startAnimation = () => {
      // Position the camera
      camera.position.z = 15;

      // Create a group to hold the cards
      const cardGroup = new THREE.Group();

      // Number of cards in the deck
      const numCards = monsterImageURLs.length;

      // Create an animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the card group around the Y-axis
        cardGroup.rotation.y += 0.01;

        // Render the scene with the camera
        renderer.render(scene, camera);
      };

      // Create cards and add them to the group
      for (let i = 0; i < monsterImageURLs.length; i++) {
        const imageURL = monsterImageURLs[i];
        const geometry = new THREE.BoxGeometry(1, 1.5, 0.1);
        const textureLoader = new THREE.TextureLoader();
        const cardTexture = textureLoader.load(imageURL); // Load the texture for this card

        const material = new THREE.MeshBasicMaterial({ map: cardTexture }); // Apply the loaded texture to the material
        const card = new THREE.Mesh(geometry, material);

        // Position cards in a circle
        const angle = (i / numCards) * Math.PI * 2;
        const radius = 5;
        card.position.x = Math.cos(angle) * radius;
        card.position.z = Math.sin(angle) * radius;

        // Rotate cards around the Y-axis
        card.rotation.y = angle;

        // Add the card to the group
        cardGroup.add(card);
      }

      // Add the card group to the scene
      scene.add(cardGroup);

      // Start the animation loop
      animate();
    };

    // Start the animation once image URLs are loaded
    startAnimation();
  }, [monsterImageURLs, loading]);

  return <div id="card-deck-container"></div>;
};

export default CardDeckAnimation;
