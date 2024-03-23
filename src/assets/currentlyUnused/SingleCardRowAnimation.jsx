import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import placeholder from '../../assets/images/placeholder.jpeg';

const SingleCardRowAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let camera, scene, renderer, cardRow, cardTexture;

    const textureLoader = new THREE.TextureLoader();
    cardTexture = textureLoader.load(placeholder); // Load the texture once and reuse it

    const calculateCardsPerRow = () => {
      const cardWidth = 1 * 1.8; // assuming geometry and spacing are constant
      return Math.floor(containerRef.current.clientWidth / cardWidth);
    };

    const updateRowWithNewCardCount = (cardsPerRow) => {
      const geometry = new THREE.PlaneGeometry(1, 1.4);
      const material = new THREE.MeshBasicMaterial({ map: cardTexture });
      while (cardRow.children.length) {
        cardRow.remove(cardRow.children[0]);
      }
      for (let j = 0; j < cardsPerRow; j++) {
        const card = new THREE.Mesh(geometry, material);
        card.position.x = (j - cardsPerRow / 2) * 1.8;
        card.position.y = -containerRef.current.clientHeight / 2 + 1.4 / 2; // Top position
        cardRow.add(card);
      }
    };

    const onWindowResize = () => {
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      const newCardsPerRow = calculateCardsPerRow();
      updateRowWithNewCardCount(newCardsPerRow);
    };

    const onSetup = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      containerRef.current.appendChild(renderer.domElement);
      camera.position.z = 5;

      const geometry = new THREE.PlaneGeometry(1, 1.4);
      const material = new THREE.MeshBasicMaterial({ map: cardTexture });

      let cardsPerRow = calculateCardsPerRow();
      const topPosition = -containerRef.current.clientHeight / 2 + 1.4 / 2;

      cardRow = new THREE.Group();
      for (let j = 0; j < cardsPerRow; j++) {
        const card = new THREE.Mesh(geometry, material);
        card.position.x = (j - cardsPerRow / 2) * 1.8;
        card.position.y = topPosition;
        cardRow.add(card);
      }
      cardRow.userData = { direction: 0.005 };
      scene.add(cardRow);

      const animate = () => {
        requestAnimationFrame(animate);
        cardRow.children.forEach((card) => {
          card.position.x += cardRow.userData.direction;
          wrapPosition(card);
        });
        renderer.render(scene, camera);
      };

      const wrapPosition = (card) => {
        if (
          card.position.x >
          containerRef.current.clientWidth / 2 + 1 / 2 // considering the width of the card is 1 unit
        ) {
          card.position.x = -containerRef.current.clientWidth / 2 - 1 / 2;
        } else if (
          card.position.x <
          -containerRef.current.clientWidth / 2 - 1 / 2
        ) {
          card.position.x = containerRef.current.clientWidth / 2 + 1 / 2;
        }
      };

      animate();
    };

    if (containerRef.current) {
      onSetup();
    }

    window.addEventListener('resize', onWindowResize);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>
  );
};

export default SingleCardRowAnimation;
