import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ count = 5000 }) {
  const mesh = useRef();
  
  // Generate random positions for particles
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Spread particles in a wider area
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Gradient colors from blue to purple
      const gradient = Math.random();
      colors[i * 3] = 0.4 + gradient * 0.4; // Red
      colors[i * 3 + 1] = 0.6 + gradient * 0.2; // Green  
      colors[i * 3 + 2] = 0.8 + gradient * 0.2; // Blue
    }
    
    return [positions, colors];
  }, [count]);
  
  // Animate particles
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
      
      // Animate individual particles
      const positions = mesh.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.001;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <Points ref={mesh} positions={positions} colors={colors}>
      <PointMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function WaveGeometry() {
  const mesh = useRef();
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.02;
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });
  
  return (
    <mesh ref={mesh} position={[0, 0, -5]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <meshBasicMaterial
        color="#667eea"
        transparent
        opacity={0.1}
        wireframe
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

const ModernBackground = ({ className = "" }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ParticleField count={3000} />
        <WaveGeometry />
      </Canvas>
    </div>
  );
};

export default ModernBackground;
