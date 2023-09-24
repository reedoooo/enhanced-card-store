import React, { useEffect } from 'react';
import * as THREE from 'three';

const ThreeJsCube = () => {
  useEffect(() => {
    // Three.js code for rendering the cube
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
      .getElementById('threejs-container')
      .appendChild(renderer.domElement);

    // Create a cube with a basic material
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color
    const cube = new THREE.Mesh(geometry, material);

    // Add the cube to the scene
    scene.add(cube);

    // Position the camera
    camera.position.z = 5;

    // Create an animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Render the scene with the camera
      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate();
  }, []);

  return <div id="threejs-container"></div>;
};

export default ThreeJsCube;
