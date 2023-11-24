import React, { useEffect } from 'react';
import * as THREE from 'three';
import placeholder from '../images/placeholder.jpeg';

const CardDeckAnimation = () => {
  // Initialize the scene, camera, and renderer here
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById('card-deck-container');

    if (container) {
      container.appendChild(renderer.domElement);
    }

    document
      .getElementById('card-deck-container')
      .appendChild(renderer.domElement);

    // Position the camera
    camera.position.z = 15;
    // Create a placeholder array with 6 images
    const monsterImageUrls = Array(6).fill(placeholder);

    // Create a group to hold the cards
    const cardGroup = new THREE.Group();

    // Create cards and add them to the group
    for (let i = 0; i < monsterImageUrls.length; i++) {
      const imageURL = monsterImageUrls[i];
      const geometry = new THREE.BoxGeometry(2, 3, 0.2);
      const textureLoader = new THREE.TextureLoader();
      const cardTexture = textureLoader.load(imageURL);
      const material = new THREE.MeshBasicMaterial({ map: cardTexture });
      const card = new THREE.Mesh(geometry, material);

      // Position cards in a circle
      const angle = (i / monsterImageUrls.length) * Math.PI * 2;
      const radius = 5;
      card.position.x = Math.cos(angle) * radius;
      card.position.z = Math.sin(angle) * radius;
      card.rotation.y = angle;

      // Add the card to the group
      cardGroup.add(card);
    }
    scene.add(cardGroup);

    // Create an animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cardGroup.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return <div id="card-deck-container"></div>;
};

export default CardDeckAnimation;
