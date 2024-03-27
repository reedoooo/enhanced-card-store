import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import placeholder from '../../assets/images/placeholder.jpeg';
import { Box } from '@mui/material';

const SplashPage2 = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Camera position
    camera.position.z = 5;

    // Texture loader
    const textureLoader = new THREE.TextureLoader();
    const cardTexture = textureLoader.load(placeholder);

    // Define card geometry and material
    const geometry = new THREE.PlaneGeometry(1, 1.4);
    const material = new THREE.MeshBasicMaterial({ map: cardTexture });

    // Rows and columns configuration
    const rows = 4;
    const cardSpacing = 1.8; // Spacing between cards

    // Function to calculate the number of cards per row based on current viewport width
    const calculateCardsPerRow = () => {
      return Math.floor(
        window.innerWidth / (geometry.parameters.width * cardSpacing)
      );
    };

    let cardsPerRow = calculateCardsPerRow(); // Initial number of cards per row

    // Create card meshes and add to scene
    const cardRows = [];
    for (let i = 0; i < rows; i++) {
      const row = new THREE.Group();
      for (let j = 0; j < cardsPerRow; j++) {
        const card = new THREE.Mesh(geometry, material);
        card.position.x = (j - cardsPerRow / 2) * cardSpacing;
        card.position.y = (i - rows / 2) * cardSpacing;
        row.add(card);
      }
      // Alternate direction for each row
      row.userData = { direction: i % 2 === 0 ? 0.005 : -0.005 };
      cardRows.push(row);
      scene.add(row);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update card positions
      cardRows.forEach((row) => {
        row.children.forEach((card) => {
          card.position.x += row.userData.direction;
          // Wrap position if it's off-screen
          if (
            card.position.x >
            window.innerWidth / 2 + geometry.parameters.width / 2
          ) {
            card.position.x =
              -window.innerWidth / 2 - geometry.parameters.width / 2;
          } else if (
            card.position.x <
            -window.innerWidth / 2 - geometry.parameters.width / 2
          ) {
            card.position.x =
              window.innerWidth / 2 + geometry.parameters.width / 2;
          }
        });
      });

      renderer.render(scene, camera);
    };

    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      cardsPerRow = calculateCardsPerRow();
      updateRowsWithNewCardCount();
    }

    function updateRowsWithNewCardCount() {
      cardRows.forEach((row) => {
        while (row.children.length) {
          row.remove(row.children[0]);
        }
        for (let j = 0; j < cardsPerRow; j++) {
          const card = new THREE.Mesh(geometry, material);
          card.position.x = (j - cardsPerRow / 2) * cardSpacing;
          row.add(card);
        }
      });
    }

    animate();
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', onWindowResize, false);
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        alignItems: 'flex-start',
        zIndex: -500,
      }}
    ></Box>
  );
};

export default SplashPage2;
