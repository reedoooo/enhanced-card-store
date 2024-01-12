import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const sizes = {
  extraSmall: { width: 0.3, height: 0.4 },
  small: { width: 0.5, height: 0.7 },
  medium: { width: 1, height: 1.4 },
  large: { width: 2, height: 2.8 },
  extraLarge: { width: 3, height: 4.2 },
};

function LoadingCardAnimation({ selected, size = 'medium' }) {
  const mount = useRef(null);
  const placeholderImage = '../../assets/images/placeholder.png'; // Replace with your placeholder image path
  const placeholderTexture = new THREE.TextureLoader().load(placeholderImage);

  useEffect(() => {
    if (!selected) return;

    const currentMount = mount.current;

    // Get dimensions from the sizes object
    const { width, height } = sizes[size];

    // Scene, Camera, and Renderer setup
    const scene = new THREE.Scene();
    // Smaller FOV can make objects appear larger within the same canvas size
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    // Keep the canvas size the same but make the content appear larger
    renderer.setSize(width * 100, height * 100); // Keeping canvas size

    currentMount.appendChild(renderer.domElement);

    // Geometry and Material setup
    const cardGeometry = new THREE.BoxGeometry(1, 1.4, 0.01); // Standard size for the geometry
    const cardMaterial = new THREE.MeshBasicMaterial({
      map: placeholderTexture,
    });

    const card = new THREE.Mesh(cardGeometry, [
      cardMaterial,
      cardMaterial,
      cardMaterial,
      cardMaterial,
      cardMaterial,
      cardMaterial,
    ]);

    // Scale the card based on size prop
    card.scale.set(width, height, 1); // Scaling the card

    scene.add(card);
    // Adjust the camera position closer to make the object appear larger
    camera.position.z = 2;

    const animate = function () {
      requestAnimationFrame(animate);
      card.rotation.y += 0.01; // Speed of rotation
      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      currentMount.removeChild(renderer.domElement);
      scene.remove(card);
      cardMaterial.dispose();
      cardGeometry.dispose();
    };
  }, [selected, size]); // Rerun effect if selected or size changes

  if (!selected) {
    return null;
  }

  return (
    <div
      ref={mount}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
      }}
    />
  );
}

export default LoadingCardAnimation;
