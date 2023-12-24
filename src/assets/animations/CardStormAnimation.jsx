import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import placeholder from '../images/placeholder.jpeg';

const CardStormAnimation = () => {
  const mountRef = useRef(null);
  const cards = [];
  const textureLoader = new THREE.TextureLoader();
  // Configuration
  const initialPullRange = 1;
  const orderlinessThreshold = 300;
  const gravitationalPull = 0.01;
  const rotationSpeed = 0.005; // Uniform rotation speed for all cards

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
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // Card creation
    for (let i = 0; i < 100; i++) {
      const geometry = new THREE.BoxGeometry(0.5, 0.7, 0.01);
      const material = new THREE.MeshStandardMaterial({
        map: textureLoader.load(placeholder),
      });
      const card = new THREE.Mesh(geometry, material);
      card.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      card.castShadow = true;
      card.receiveShadow = true;
      cards.push(card);
      scene.add(card);
    }

    camera.position.z = 5;

    // Mouse position
    let mouseX = 0,
      mouseY = 0;
    const onDocumentMouseMove = (event) => {
      const vector = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      mouseX = pos.x;
      mouseY = pos.y;
    };
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    const animate = () => {
      requestAnimationFrame(animate);

      cards.forEach((card) => {
        const dx = card.position.x - mouseX;
        const dy = card.position.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        if (distance < initialPullRange || card.isInfluenced) {
          card.isInfluenced = true;
          card.timeInfluenced = card.timeInfluenced || 0;
          card.timeInfluenced++;

          if (card.timeInfluenced > orderlinessThreshold) {
            const targetRotation = Math.atan2(
              mouseY - card.position.y,
              mouseX - card.position.x
            );
            card.rotation.z = THREE.MathUtils.lerp(
              card.rotation.z,
              targetRotation,
              0.01
            );
          }

          // Velocity for orbital movement
          card.velocityX = card.velocityX || 0.01 * (Math.random() - 0.5);
          card.velocityY = card.velocityY || 0.01 * (Math.random() - 0.5);

          card.velocityX -= gravitationalPull * Math.cos(angle);
          card.velocityY -= gravitationalPull * Math.sin(angle);

          card.position.x += card.velocityX;
          card.position.y += card.velocityY;

          // Reducing gravitational pull gradually
          if (card.timeInfluenced > orderlinessThreshold) {
            const pullReductionFactor =
              1 -
              (card.timeInfluenced - orderlinessThreshold) /
                orderlinessThreshold;
            card.velocityX *= pullReductionFactor;
            card.velocityY *= pullReductionFactor;
          }
        }

        // Applying continuous rotation for a smooth effect
        card.rotation.x += rotationSpeed;
        card.rotation.y += rotationSpeed;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      mountRef?.current?.removeChild(renderer.domElement);
      document?.removeEventListener('mousemove', onDocumentMouseMove, false);
    };
  }, []); // Only re-run the effect if mountRef changes

  return <div ref={mountRef} />;
};

export default CardStormAnimation;
