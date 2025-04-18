import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Individual particle
const Particle = ({ index, count, mouse }) => {
  const mesh = useRef();
  
  // Calculate initial position based on index
  const position = useMemo(() => {
    const pos = new THREE.Vector3();
    // Place particles in a spherical pattern
    const radius = 12;
    const phi = Math.acos(-1 + (2 * index) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    
    pos.x = radius * Math.sin(phi) * Math.cos(theta);
    pos.y = radius * Math.sin(phi) * Math.sin(theta);
    pos.z = radius * Math.cos(phi);
    
    return pos;
  }, [index, count]);
  
  // Initial random rotation values
  const rotation = useMemo(() => [
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  ], []);
  
  // Update particle on each frame
  useFrame(() => {
    if (!mesh.current) return;
    
    // Subtle floating movement
    mesh.current.position.x = position.x + Math.sin(Date.now() * 0.001 + index * 0.1) * 0.5;
    mesh.current.position.y = position.y + Math.cos(Date.now() * 0.001 + index * 0.1) * 0.5;
    
    // Mouse interaction - move particles slightly in direction of mouse
    if (mouse.current) {
      const distance = mesh.current.position.distanceTo(new THREE.Vector3(mouse.current.x * 20, mouse.current.y * 20, 0));
      if (distance < 10) {
        mesh.current.position.x += (mouse.current.x * 20 - mesh.current.position.x) * 0.01;
        mesh.current.position.y += (mouse.current.y * 20 - mesh.current.position.y) * 0.01;
      }
    }
    
    // Subtle rotation
    mesh.current.rotation.x += 0.003;
    mesh.current.rotation.y += 0.003;
  });
  
  return (
    <mesh ref={mesh} position={[position.x, position.y, position.z]} rotation={rotation}>
      <dodecahedronGeometry args={[0.2]} />
      <meshStandardMaterial color="#bee9e8" emissive="#83c5be" emissiveIntensity={1.0} />
    </mesh>
  );
};

// Particles container
const ParticlesScene = () => {
  // Store mouse position
  const mouse = useRef({ x: 0, y: 0 });
  
  // Update mouse position
  const handleMouseMove = (e) => {
    mouse.current = { 
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1
    };
  };
  
  // Number of particles
  const count = 200;
  
  return (
    <div 
      className="fixed inset-0 -z-10"
      onMouseMove={handleMouseMove}
    >
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* Render particles */}
        {Array.from({ length: count }, (_, i) => (
          <Particle key={i} index={i} count={count} mouse={mouse} />
        ))}
      </Canvas>
    </div>
  );
};

export default ParticlesScene;