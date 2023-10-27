import React, { useEffect, useContext } from 'react';
import * as THREE from 'three';
import placeholder from '../assets/images/placeholder.jpeg';
import { useUtilityContext } from '../context/UtilityContext/UtilityContext';

const SplashPage = () => {
  const { fetchDirectedResponses } = useUtilityContext();

  useEffect(() => {
    // Initialize the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById('splash-container');

    if (container) {
      container.appendChild(renderer.domElement);
    }

    // Position the camera
    camera.position.z = 15;

    // Create a placeholder array with 6 images
    const imageUrls = Array(6).fill(placeholder);

    // Create a group to hold the objects
    const group = new THREE.Group();

    // Create objects and add them to the group
    for (let i = 0; i < imageUrls.length; i++) {
      const imageURL = imageUrls[i];
      const geometry = new THREE.BoxGeometry(2, 3, 0.2);
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(imageURL);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const object = new THREE.Mesh(geometry, material);

      // Position objects in a circle
      const angle = (i / imageUrls.length) * Math.PI * 2;
      const radius = 5;
      object.position.x = Math.cos(angle) * radius;
      object.position.z = Math.sin(angle) * radius;
      object.rotation.y = angle;

      // Add the object to the group
      group.add(object);
    }
    scene.add(group);

    // Create an animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate();

    // Fetch the directed responses
    fetchDirectedResponses();
  }, [fetchDirectedResponses]); // Add fetchDirectedResponses as a dependency to ensure it is called when the component mounts

  return <div id="splash-container"></div>;
};

export default SplashPage;
