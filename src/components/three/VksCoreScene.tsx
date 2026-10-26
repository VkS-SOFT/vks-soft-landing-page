import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  MeshDistortMaterial,
  Environment,
  RoundedBox,
  Torus,
  Icosahedron,
  PointMaterial,
  Points,
} from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
  activeServiceIndex: number;
}

/**
 * Campo de partículas de alta densidade que simula uma malha neural / fluxo de dados
 */
const NeuralParticleField: React.FC<{ scrollProgress: number; mousePos: { x: number; y: number } }> = ({
  scrollProgress,
  mousePos,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const count = 1800;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4.5 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 2;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      mousePos.y * 0.15 + scrollProgress * 0.8,
      0.05
    );
    pointsRef.current.position.z = THREE.MathUtils.lerp(
      pointsRef.current.position.z,
      scrollProgress * 3.5,
      0.05
    );
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#7C4DFF"
        size={0.042}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

/**
 * Cápsulas 3D orbitais inspiradas diretamente na geometria da logo VKS Soft
 */
const VksOrbitalCapsules: React.FC<{ scrollProgress: number; activeServiceIndex: number }> = ({
  scrollProgress,
  activeServiceIndex,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      // Desloca suavemente conforme o scroll da página
      const targetX = scrollProgress < 0.25 ? 2.3 : scrollProgress < 0.65 ? -2.6 : 0;
      const targetY = Math.sin(scrollProgress * Math.PI * 2) * 0.6;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.04);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.04);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.35;
      ring1Ref.current.rotation.y += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.28;
      ring2Ref.current.rotation.x -= delta * 0.15;
    }
  });

  const primaryColor = '#501BED';
  const accentColor = activeServiceIndex === 1 ? '#8F6BFF' : activeServiceIndex === 2 ? '#E2E2E2' : '#501BED';

  return (
    <group ref={groupRef} position={[2.2, 0.1, 0]}>
      {/* Núcleo Quântico Distorcido VKS */}
      <Float speed={2.4} rotationIntensity={1.2} floatIntensity={1.4}>
        <Icosahedron args={[1.15, 12]}>
          <MeshDistortMaterial
            color={primaryColor}
            emissive="#310B9E"
            emissiveIntensity={0.65}
            roughness={0.15}
            metalness={0.85}
            distort={0.36}
            speed={2.5}
          />
        </Icosahedron>
      </Float>

      {/* Wireframe Externo Técnico */}
      <Icosahedron args={[1.55, 2]}>
        <meshStandardMaterial
          color="#E2E2E2"
          wireframe
          transparent
          opacity={0.14}
        />
      </Icosahedron>

      {/* Anéis Toroidais de Arquitetura */}
      <Torus ref={ring1Ref} args={[2.15, 0.022, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial
          color={accentColor}
          emissive={primaryColor}
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </Torus>

      <Torus ref={ring2Ref} args={[2.65, 0.015, 16, 100]} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <meshStandardMaterial
          color="#E2E2E2"
          emissive="#E2E2E2"
          emissiveIntensity={0.35}
          transparent
          opacity={0.5}
        />
      </Torus>

      {/* Cápsulas Flutuantes que remetem aos traços da Logo VKS */}
      <Float speed={3} rotationIntensity={0.8} floatIntensity={1.8}>
        <RoundedBox
          args={[0.32, 1.35, 0.32]}
          radius={0.15}
          smoothness={4}
          position={[-1.9, 1.1, 0.8]}
          rotation={[0.2, 0.4, -0.5]}
        >
          <meshStandardMaterial
            color="#501BED"
            emissive="#501BED"
            emissiveIntensity={0.45}
            metalness={0.7}
            roughness={0.2}
          />
        </RoundedBox>
      </Float>

      <Float speed={2.6} rotationIntensity={1.1} floatIntensity={1.6}>
        <RoundedBox
          args={[0.28, 1.15, 0.28]}
          radius={0.14}
          smoothness={4}
          position={[1.85, -1.05, 0.9]}
          rotation={[-0.3, -0.2, 0.65]}
        >
          <meshStandardMaterial
            color="#E2E2E2"
            metalness={0.85}
            roughness={0.15}
          />
        </RoundedBox>
      </Float>

      <Float speed={3.4} rotationIntensity={1.4} floatIntensity={2.0}>
        <RoundedBox
          args={[0.24, 0.95, 0.24]}
          radius={0.12}
          smoothness={4}
          position={[0.7, 1.85, -0.9]}
          rotation={[0.6, 0.2, 0.78]}
        >
          <meshStandardMaterial
            color="#6A38FF"
            emissive="#501BED"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>
      </Float>
    </group>
  );
};

/**
 * Rig de iluminação e câmera reativo ao mouse
 */
const CameraRig: React.FC<{ mousePos: { x: number; y: number } }> = ({ mousePos }) => {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mousePos.x * 0.55, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mousePos.y * 0.35, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

export const VksCoreScene: React.FC<SceneProps> = ({
  scrollProgress,
  mousePos,
  activeServiceIndex,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Glow Radial Ambiental no Background */}
      <div
        className="absolute w-[680px] h-[680px] rounded-full blur-[150px] opacity-30 transition-all duration-1000 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #501BED 0%, rgba(80,27,237,0) 70%)',
          top: `${15 + scrollProgress * 45}%`,
          left: scrollProgress < 0.3 ? '58%' : scrollProgress < 0.7 ? '18%' : '45%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 5]} intensity={2.2} color="#E2E2E2" />
        <pointLight position={[-5, -4, 4]} intensity={3.5} color="#501BED" distance={15} />
        <pointLight position={[3, 4, -3]} intensity={2.5} color="#8E65FF" distance={12} />

        <Environment preset="city" />

        <CameraRig mousePos={mousePos} />
        <NeuralParticleField scrollProgress={scrollProgress} mousePos={mousePos} />
        <VksOrbitalCapsules scrollProgress={scrollProgress} activeServiceIndex={activeServiceIndex} />
      </Canvas>
    </div>
  );
};
