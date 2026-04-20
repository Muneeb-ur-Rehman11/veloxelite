import { useGLTF, Center, Text } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
 
export default function CarModel({ modelPath = '/models/gwagon.glb', scale = 1.8 }) {
  const { scene, materials } = useGLTF(modelPath);
  const ref = useRef();
  const [showDetails, setShowDetails] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.01);
  const [hovered, setHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Apply custom materials
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        material.metalness = 0.8; // Slightly reduced for realism
        material.roughness = .3; // Adjusted for better highlights
        material.envMapIntensity = 1.2;
      });
      setIsLoaded(true);
    }
  }, [materials]);

  // Handle scroll events with throttling
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const newScrollY = window.scrollY;
          const delta = Math.abs(newScrollY - lastScrollY);
          setRotationSpeed(Math.max(0.005, delta * 0.00005)); // Adjusted multiplier
          lastScrollY = newScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth rotation animation
  useFrame((state, delta) => {
    if (ref.current && isLoaded) {
      ref.current.rotation.y += rotationSpeed * delta * 60; // Normalized for frame rate
      if (rotationSpeed < 0.008) {
        ref.current.rotation.y += delta * 0.05; // Slower idle rotation
      }
      if (hovered) {
        ref.current.position.y = -1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.03;
      } else {
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, -1, 0.1); // Smooth return
      }
    }
  });

  return (
    <Center>
      {isLoaded ? (
        <primitive
          ref={ref}
          object={scene}
          scale={scale}
          position={[0, -1, 0]}
          onClick={() => setShowDetails(true)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onTouchStart={() => setHovered(true)} // Add touch support
          onTouchEnd={() => setHovered(false)}
        />
      ) : (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
      )}

      {showDetails && (
        <group position={[0, 1.5, 0]}>
          <Text
            position={[0, 0.8, 0]}
            color="red"
            fontSize={0.35}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            Mercedes-AMG G 63
          </Text>
          <Text
            position={[0, 0.4, 0]}
            color="#d4af37"
            fontSize={0.2}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#000000"
          >
            4.0L V8 Biturbo | 577 HP
          </Text>
          <Text
            position={[0, 0, 0]}
            color="#aaaaaa"
            fontSize={0.15}
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
            textAlign="center"
          >
            Premium SUV with luxury interior, all-terrain capability
          </Text>
          <Text
            position={[0, -0.5, 0]}
            color="#ffffff"
            fontSize={0.18}
            anchorX="center"
            anchorY="middle"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(false);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              setShowDetails(false);
            }} // Add touch support
          >
            [ Close ]
          </Text>
        </group>
      )}

      {isLoaded && !showDetails && (
        <mesh
          position={[1.2, 0.2, 0]}
          onClick={() => setShowDetails(true)}
          onTouchStart={() => setShowDetails(true)} // Add touch support
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={2} />
        </mesh>
      )}
    </Center>
  );
}

useGLTF.preload('/models/gwagon.glb');