import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Hero = () => {
  const containerRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x010000, 0);

    const geometry = new THREE.PlaneGeometry(50, 50, 50, 50);
    const material = new THREE.MeshBasicMaterial({
      color: 0x5A1818,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      linewidth: 1
    });
    
    const wave = new THREE.Mesh(geometry, material);
    wave.rotation.x = -Math.PI / 2.5;
    wave.position.y = -2;
    scene.add(wave);
    
    camera.position.z = 15;
    camera.position.y = 8;
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const positions = wave.geometry.attributes.position.array;
      const time = Date.now() * 0.0002;
      
      for(let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.3 + time) * Math.cos(y * 0.3 + time) * 2;
      }
      
      wave.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-dark">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background-dark z-10" />
      
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
            Sehsat Bozkurt
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed">
            Transforming Business Knowledge into Actionable Success Strategies
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#5A1818] hover:bg-[#380808] text-white rounded-full text-lg font-semibold transition-all duration-300 shadow-lg shadow-[#5A1818]/30"
            >
              Explore Insights
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#1E0000] hover:bg-[#080000] text-white rounded-full text-lg font-semibold transition-all duration-300"
            >
              View Resources
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;