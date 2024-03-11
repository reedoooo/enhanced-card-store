import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ZenEnso = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const points = [];
    const detail = 100;
    const radius = 2;
    const incompleteFactor = 0.85; // Making the circle incomplete
    const variance = 0.2; // Increased randomness

    for (let i = 0; i <= detail * incompleteFactor; i++) {
      const ratio = i / detail;
      const angle = 2 * Math.PI * ratio;
      const randomVariance = 1 + Math.random() * variance - variance / 2;
      const x = radius * Math.cos(angle) * randomVariance;
      const y = radius * Math.sin(angle) * randomVariance;
      points.push(new THREE.Vector3(x, y, 0));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 2,
    }); // Slight width
    const enso = new THREE.Line(geometry, material);

    scene.add(enso);

    const animate = () => {
      requestAnimationFrame(animate);
      enso.rotation.z += 0.01; // Rotation
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default ZenEnso;
