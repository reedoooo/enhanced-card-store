import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import placeholder from 'assets/images/placeholder.jpeg';

const CardRowsAnimation = () => {
  const containerRef = useRef(null);

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
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    camera.position.z = 5;

    const textureLoader = new THREE.TextureLoader();
    const cardTexture = textureLoader.load(placeholder);

    const geometry = new THREE.PlaneGeometry(1, 1.4);
    const material = new THREE.MeshBasicMaterial({ map: cardTexture });

    const rows = 4; // Define how many rows of cards you want
    const cardSpacing = 1.8; // Define the spacing between cards
    let cardsPerRow = Math.floor(
      window.innerWidth / (geometry.parameters.width * cardSpacing)
    );

    const cardRows = [];
    for (let i = 0; i < rows; i++) {
      const row = new THREE.Group();
      for (let j = 0; j < cardsPerRow; j++) {
        const card = new THREE.Mesh(geometry, material);
        card.position.x = (j - cardsPerRow / 2) * cardSpacing;
        card.position.y = -i * cardSpacing; // Flipping the direction for y
        row.add(card);
      }
      cardRows.push(row);
      scene.add(row);
    }
    const animate = () => {
      requestAnimationFrame(animate);

      // Update card positions
      cardRows.forEach((row) => {
        row.children.forEach((card) => {
          card.position.x += row.userData.direction;
          // Reset position if it's off-screen
          if (
            card.position.x > window.innerWidth / 2 ||
            card.position.x < -window.innerWidth / 2
          ) {
            card.position.x = -card.position.x;
          }
        });
      });

      renderer.render(scene, camera);
    };

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      cardsPerRow = Math.floor(
        window.innerWidth / (geometry.parameters.width * cardSpacing)
      );
    }

    animate();

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', onWindowResize, false);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh' }}></div>
  );
};

export default CardRowsAnimation;
