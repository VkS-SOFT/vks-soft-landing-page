import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  Environment,
  RoundedBox,
  PointMaterial,
  Points,
  ContactShadows,
} from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
  activeServiceIndex: number;
}

/**
 * Gera uma textura de alta resolução em Canvas 2D simulando a IDE / Monitor do DevBook VKS Soft
 */
function useCodeScreenTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d')!;

    // Fundo escuro da IDE (#131218)
    ctx.fillStyle = '#131218';
    ctx.fillRect(0, 0, 1024, 640);

    // Topbar da IDE
    ctx.fillStyle = '#1B1A1F';
    ctx.fillRect(0, 0, 1024, 54);

    // Botões de janela (Mac style)
    const dots = [
      { x: 32, color: '#FF5F56' },
      { x: 58, color: '#FFBD2E' },
      { x: 84, color: '#27C93F' },
    ];
    dots.forEach((d) => {
      ctx.beginPath();
      ctx.arc(d.x, 27, 8, 0, Math.PI * 2);
      ctx.fillStyle = d.color;
      ctx.fill();
    });

    // Aba ativa na IDE
    ctx.fillStyle = '#262330';
    ctx.fillRect(130, 8, 280, 46);
    ctx.fillStyle = '#501BED';
    ctx.fillRect(130, 8, 280, 3);
    ctx.font = 'bold 18px monospace';
    ctx.fillStyle = '#E2E2E2';
    ctx.fillText('VksArchitecture.ts', 160, 37);

    // Sidebar esquerda
    ctx.fillStyle = '#17161C';
    ctx.fillRect(0, 54, 72, 586);
    ctx.strokeStyle = 'rgba(226, 226, 226, 0.08)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(72, 54);
    ctx.lineTo(72, 640);
    ctx.stroke();

    // Números de linha
    ctx.font = '20px monospace';
    ctx.fillStyle = '#4E4B5C';
    for (let i = 1; i <= 16; i++) {
      ctx.fillText(String(i).padStart(2, '0'), 94, 72 + i * 32);
    }

    // Linhas de código com syntax highlighting VKS (#501BED, #9B7BFF, #27C93F, #E2E2E2)
    const codeLines: Array<Array<{ text: string; color: string }>> = [
      [
        { text: 'import ', color: '#9B7BFF' },
        { text: '{ VksCluster, AIWorker, FlutterBridge } ', color: '#E2E2E2' },
        { text: 'from ', color: '#9B7BFF' },
        { text: "'@vks-soft/core'", color: '#27C93F' },
      ],
      [],
      [
        { text: 'export class ', color: '#9B7BFF' },
        { text: 'EnterpriseEngine ', color: '#501BED' },
        { text: 'implements ', color: '#9B7BFF' },
        { text: 'HighAvailability {', color: '#E2E2E2' },
      ],
      [
        { text: '  private readonly ', color: '#9B7BFF' },
        { text: 'slaTarget = ', color: '#E2E2E2' },
        { text: '99.98', color: '#FFBD2E' },
        { text: ';', color: '#E2E2E2' },
      ],
      [],
      [
        { text: '  public async ', color: '#9B7BFF' },
        { text: 'deployEcosystem', color: '#7344FF' },
        { text: '(tenant: ', color: '#E2E2E2' },
        { text: 'ClientConfig', color: '#27C93F' },
        { text: ') {', color: '#E2E2E2' },
      ],
      [
        { text: '    await ', color: '#9B7BFF' },
        { text: 'VksCluster.scaleWebSaaS({ multiTenant: ', color: '#E2E2E2' },
        { text: 'true', color: '#FFBD2E' },
        { text: ' });', color: '#E2E2E2' },
      ],
      [
        { text: '    await ', color: '#9B7BFF' },
        { text: 'FlutterBridge.compileNative({ fps: ', color: '#E2E2E2' },
        { text: '120', color: '#FFBD2E' },
        { text: ' });', color: '#E2E2E2' },
      ],
      [
        { text: '    return ', color: '#9B7BFF' },
        { text: 'AIWorker.dispatchQueue(', color: '#E2E2E2' },
        { text: "'lead-automation'", color: '#27C93F' },
        { text: ');', color: '#E2E2E2' },
      ],
      [{ text: '  }', color: '#E2E2E2' }],
      [{ text: '}', color: '#E2E2E2' }],
    ];

    ctx.font = 'bold 21px monospace';
    codeLines.forEach((line, idx) => {
      let currentX = 148;
      const currentY = 104 + idx * 32;
      line.forEach((token) => {
        ctx.fillStyle = token.color;
        ctx.fillText(token.text, currentX, currentY);
        currentX += ctx.measureText(token.text).width;
      });
    });

    // Card de Status / Terminal na parte inferior da tela
    ctx.fillStyle = 'rgba(80, 27, 237, 0.16)';
    ctx.fillRect(145, 480, 820, 115);
    ctx.strokeStyle = '#501BED';
    ctx.lineWidth = 3;
    ctx.strokeRect(145, 480, 820, 115);

    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = '#27C93F';
    ctx.fillText('➜  vks-soft-production ✓ Build & Deploy Ready (42ms)', 175, 525);
    ctx.fillStyle = '#E2E2E2';
    ctx.font = '18px monospace';
    ctx.fillText('Active Modules: [Laravel/React SaaS] • [Flutter Mobile] • [FastAPI AI]', 175, 565);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, []);
}

/**
 * Símbolo 3D "</>" (Code Brackets + Slash) construído com cápsulas geométricas no estilo da logo VKS
 */
const CodeSymbol3D: React.FC<{
  position?: [number, number, number];
  scale?: number;
  accentColor: string;
}> = ({ position = [0, 0, 0], scale = 1, accentColor }) => {
  const symbolRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!symbolRef.current) return;
    symbolRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 2.2) * 0.08;
    symbolRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.22;
  });

  const barRadius = 0.085;
  const barThickness = 0.18;

  return (
    <group ref={symbolRef} position={position} scale={scale}>
      {/* Símbolo "<" (Esquerda) */}
      <group position={[-0.95, 0, 0]}>
        <RoundedBox
          args={[barThickness, 0.72, barThickness]}
          radius={barRadius}
          smoothness={4}
          position={[0, 0.21, 0]}
          rotation={[0, 0, -Math.PI / 4]}
        >
          <meshStandardMaterial
            color="#501BED"
            emissive="#501BED"
            emissiveIntensity={0.85}
            metalness={0.65}
            roughness={0.2}
          />
        </RoundedBox>
        <RoundedBox
          args={[barThickness, 0.72, barThickness]}
          radius={barRadius}
          smoothness={4}
          position={[0, -0.21, 0]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <meshStandardMaterial
            color="#501BED"
            emissive="#501BED"
            emissiveIntensity={0.85}
            metalness={0.65}
            roughness={0.2}
          />
        </RoundedBox>
      </group>

      {/* Barra "/" (Centro) */}
      <RoundedBox
        args={[barThickness, 1.25, barThickness]}
        radius={barRadius}
        smoothness={4}
        position={[0, 0, 0.06]}
        rotation={[0, 0, -0.38]}
      >
        <meshStandardMaterial
          color="#E2E2E2"
          emissive={accentColor}
          emissiveIntensity={0.45}
          metalness={0.85}
          roughness={0.15}
        />
      </RoundedBox>

      {/* Símbolo ">" (Direita) */}
      <group position={[0.95, 0, 0]}>
        <RoundedBox
          args={[barThickness, 0.72, barThickness]}
          radius={barRadius}
          smoothness={4}
          position={[0, 0.21, 0]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <meshStandardMaterial
            color="#501BED"
            emissive="#501BED"
            emissiveIntensity={0.85}
            metalness={0.65}
            roughness={0.2}
          />
        </RoundedBox>
        <RoundedBox
          args={[barThickness, 0.72, barThickness]}
          radius={barRadius}
          smoothness={4}
          position={[0, -0.21, 0]}
          rotation={[0, 0, -Math.PI / 4]}
        >
          <meshStandardMaterial
            color="#501BED"
            emissive="#501BED"
            emissiveIntensity={0.85}
            metalness={0.65}
            roughness={0.2}
          />
        </RoundedBox>
      </group>
    </group>
  );
};

/**
 * Notebook 3D Ultra-Clean (DevBook Pro VKS) + Holograma "</>"
 * Responsivo aos limites reais do viewport para nunca cortar nas bordas da tela
 */
const VksDeveloperLaptop3D: React.FC<{
  scrollProgress: number;
  mousePos: { x: number; y: number };
  activeServiceIndex: number;
}> = ({ scrollProgress, mousePos, activeServiceIndex }) => {
  const laptopGroupRef = useRef<THREE.Group>(null);
  const screenTexture = useCodeScreenTexture();
  const { viewport } = useThree();

  // Posição das teclas mecânicas retroiluminadas no chassi
  const keyPositions = useMemo(() => {
    const keys: Array<[number, number, number, number]> = [];
    const rows = 4;
    const cols = 10;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = -1.22 + c * 0.27;
        const z = -0.52 + r * 0.22;
        keys.push([x, 0.08, z, 0.21]);
      }
    }
    return keys;
  }, []);

  // Escala dinâmica baseada na largura da tela (+1% de escala conforme solicitado)
  const isMobile = viewport.width < 6.2;
  const responsiveScale = isMobile
    ? Math.min(viewport.width * 0.1414, 0.5656)
    : Math.min(viewport.width * 0.08686, 0.7575);

  useFrame((_, delta) => {
    if (!laptopGroupRef.current) return;

    // Alinha exatamente na coluna da direita (afastado do título à esquerda) e mais abaixo
    const heroOffsetX = isMobile ? 0 : Math.min(viewport.width * 0.275, 2.38);
    const sectionOffsetX = isMobile ? 0 : Math.min(viewport.width * 0.25, 2.15);

    const targetX =
      scrollProgress < 0.28
        ? heroOffsetX
        : scrollProgress < 0.68
        ? -sectionOffsetX
        : heroOffsetX * 0.85;

    const targetY = isMobile ? 0.35 : scrollProgress < 0.28 ? -0.18 : -0.25;
    const targetZ = -0.4;

    laptopGroupRef.current.position.x = THREE.MathUtils.lerp(
      laptopGroupRef.current.position.x,
      targetX,
      delta * 4
    );
    laptopGroupRef.current.position.y = THREE.MathUtils.lerp(
      laptopGroupRef.current.position.y,
      targetY,
      delta * 4
    );
    laptopGroupRef.current.position.z = THREE.MathUtils.lerp(
      laptopGroupRef.current.position.z,
      targetZ,
      delta * 4
    );

    // Rotação suave seguindo o mouse + scroll (sem girar demais para não sair do quadro)
    const baseRotY = scrollProgress < 0.28 ? -0.38 : scrollProgress < 0.68 ? 0.38 : -0.25;
    const targetRotY = baseRotY + mousePos.x * 0.22;
    const targetRotX = 0.2 - mousePos.y * 0.12;

    laptopGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      laptopGroupRef.current.rotation.y,
      targetRotY,
      delta * 4
    );
    laptopGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      laptopGroupRef.current.rotation.x,
      targetRotX,
      delta * 4
    );
  });

  const accentColor =
    activeServiceIndex === 1 ? '#8F6BFF' : activeServiceIndex === 2 ? '#27C93F' : '#501BED';

  return (
    <group
      ref={laptopGroupRef}
      position={[2.32, -0.18, -0.4]}
      rotation={[0.2, -0.38, 0]}
      scale={responsiveScale}
    >
      <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.3}>
        {/* Símbolo Holográfico 3D "</>" flutuando em altura contida logo acima da tela */}
        <CodeSymbol3D position={[0, 1.52, 0.25]} scale={0.68} accentColor={accentColor} />

        {/* ================= BASE DO NOTEBOOK (CHASSI INFERIOR) ================= */}
        <group position={[0, -0.55, 0]}>
          {/* Corpo de Alumínio Space Black (#1B1A1F) */}
          <RoundedBox args={[3.1, 0.14, 2.15]} radius={0.05} smoothness={4}>
            <meshStandardMaterial
              color="#1F1D26"
              metalness={0.85}
              roughness={0.22}
            />
          </RoundedBox>

          {/* Faixa de LED Neon VKS na borda frontal do chassi */}
          <mesh position={[0, -0.02, 1.08]}>
            <boxGeometry args={[1.4, 0.025, 0.02]} />
            <meshBasicMaterial color="#501BED" />
          </mesh>

          {/* Cavidade do Teclado Retroiluminado */}
          <mesh position={[0, 0.072, -0.18]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.78, 1.05]} />
            <meshBasicMaterial color="#3812A8" transparent opacity={0.55} />
          </mesh>

          {/* Teclas Individuais */}
          {keyPositions.map(([kx, ky, kz, kw], idx) => (
            <mesh key={idx} position={[kx, ky, kz]}>
              <boxGeometry args={[kw, 0.025, 0.16]} />
              <meshStandardMaterial
                color="#141318"
                emissive="#501BED"
                emissiveIntensity={0.15}
                roughness={0.4}
              />
            </mesh>
          ))}

          {/* Barra de Espaço */}
          <mesh position={[0, 0.08, 0.36]}>
            <boxGeometry args={[1.15, 0.025, 0.16]} />
            <meshStandardMaterial
              color="#141318"
              emissive="#501BED"
              emissiveIntensity={0.25}
            />
          </mesh>

          {/* Trackpad Glass */}
          <mesh position={[0, 0.073, 0.74]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.95, 0.52]} />
            <meshStandardMaterial
              color="#18171E"
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>

          {/* ================= TAMPA / TELA DO NOTEBOOK ================= */}
          <group position={[0, 0.07, -1.02]} rotation={[-0.26, 0, 0]}>
            {/* Moldura Traseira da Tela */}
            <RoundedBox
              args={[3.1, 2.05, 0.09]}
              radius={0.04}
              smoothness={4}
              position={[0, 1.02, 0]}
            >
              <meshStandardMaterial
                color="#1B1A1F"
                metalness={0.88}
                roughness={0.2}
              />
            </RoundedBox>

            {/* Borda Neon Sutil ao redor do Display */}
            <mesh position={[0, 1.02, 0.046]}>
              <planeGeometry args={[2.94, 1.9]} />
              <meshBasicMaterial color="#501BED" />
            </mesh>

            {/* Display com o Código da VKS Soft Renderizado */}
            <mesh position={[0, 1.02, 0.049]}>
              <planeGeometry args={[2.88, 1.84]} />
              <meshBasicMaterial map={screenTexture} toneMapped={false} />
            </mesh>
          </group>
        </group>

        {/* Sombra de Contato realista sob o notebook */}
        <ContactShadows
          position={[0, -0.95, 0]}
          opacity={0.55}
          scale={6.5}
          blur={2.4}
          far={2.5}
          color="#501BED"
        />
      </Float>
    </group>
  );
};

/**
 * Partículas discretas de fundo para profundidade espacial
 */
const BackgroundCodeParticles: React.FC<{
  scrollProgress: number;
  mousePos: { x: number; y: number };
}> = ({ scrollProgress, mousePos }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const count = 900;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = -3 - Math.random() * 10;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      mousePos.x * 0.4,
      0.05
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      scrollProgress * 1.8,
      0.05
    );
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#7C4DFF"
        size={0.038}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
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
        className="absolute w-[580px] h-[580px] rounded-full blur-[150px] opacity-25 transition-all duration-1000 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #501BED 0%, rgba(80,27,237,0) 70%)',
          top: `${26 + scrollProgress * 38}%`,
          left: scrollProgress < 0.3 ? '66%' : scrollProgress < 0.7 ? '26%' : '55%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <Canvas
        camera={{ position: [0, 0.1, 7.2], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[5, 8, 6]} intensity={2.4} color="#E2E2E2" />
        <pointLight position={[-4, 2, 4]} intensity={3.2} color="#501BED" distance={15} />
        <pointLight position={[3, 3, 2]} intensity={2.2} color="#8E65FF" distance={12} />

        <Environment preset="city" />

        <BackgroundCodeParticles scrollProgress={scrollProgress} mousePos={mousePos} />
        <VksDeveloperLaptop3D
          scrollProgress={scrollProgress}
          mousePos={mousePos}
          activeServiceIndex={activeServiceIndex}
        />
      </Canvas>
    </div>
  );
};
