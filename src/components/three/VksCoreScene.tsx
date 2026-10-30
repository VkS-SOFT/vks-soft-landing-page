import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  Environment,
  RoundedBox,
  PointMaterial,
  Points,
  ContactShadows,
  Edges,
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
    ctx.fillText('GestaoDeObra.ts', 160, 37);

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
        { text: '{ Obra, Orcamento, Laudo } ', color: '#E2E2E2' },
        { text: 'from ', color: '#9B7BFF' },
        { text: "'@vks-soft/construcao'", color: '#27C93F' },
      ],
      [],
      [
        { text: 'export class ', color: '#9B7BFF' },
        { text: 'GestaoDeObra ', color: '#501BED' },
        { text: 'implements ', color: '#9B7BFF' },
        { text: 'CronogramaFisicoFinanceiro {', color: '#E2E2E2' },
      ],
      [
        { text: '  private readonly ', color: '#9B7BFF' },
        { text: 'norma = ', color: '#E2E2E2' },
        { text: "'NBR 14653'", color: '#FFBD2E' },
        { text: ';', color: '#E2E2E2' },
      ],
      [],
      [
        { text: '  public async ', color: '#9B7BFF' },
        { text: 'executarEtapa', color: '#7344FF' },
        { text: '(obra: ', color: '#E2E2E2' },
        { text: 'Obra', color: '#27C93F' },
        { text: ') {', color: '#E2E2E2' },
      ],
      [
        { text: '    await ', color: '#9B7BFF' },
        { text: 'Orcamento.calcular({ bdi: ', color: '#E2E2E2' },
        { text: '0.25', color: '#FFBD2E' },
        { text: ', base: ', color: '#E2E2E2' },
        { text: "'SINAPI'", color: '#27C93F' },
        { text: ' });', color: '#E2E2E2' },
      ],
      [
        { text: '    await ', color: '#9B7BFF' },
        { text: 'obra.registrarDiario({ fotos: ', color: '#E2E2E2' },
        { text: 'true', color: '#FFBD2E' },
        { text: ' });', color: '#E2E2E2' },
      ],
      [
        { text: '    return ', color: '#9B7BFF' },
        { text: 'Laudo.emitirPDF(', color: '#E2E2E2' },
        { text: "'medicao-mensal'", color: '#27C93F' },
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
    ctx.fillText('➜  obra-residencial ✓ Etapa 6/6 concluída • Medição aprovada', 175, 525);
    ctx.fillStyle = '#E2E2E2';
    ctx.font = '18px monospace';
    ctx.fillText('Módulos: [Gestão de Obras] • [CRM Imobiliário] • [Laudos NBR]', 175, 565);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, []);
}

const FLOOR_COUNT = 6;
const FLOOR_HEIGHT = 0.22;
const BUILD_CYCLE = 7; // segundos: sobe os andares, segura pronto e recomeça

/**
 * Holograma 3D de um prédio em construção (estilo BIM / wireframe) com grua,
 * projetado pelo notebook: une desenvolvimento de software e construção civil.
 */
const BlueprintBuilding3D: React.FC<{
  position?: [number, number, number];
  scale?: number;
  accentColor: string;
}> = ({ position = [0, 0, 0], scale = 1, accentColor }) => {
  const buildingRef = useRef<THREE.Group>(null);
  const floorRefs = useRef<Array<THREE.Group | null>>([]);
  const craneJibRef = useRef<THREE.Group>(null);
  const hookRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (buildingRef.current) {
      buildingRef.current.position.y = position[1] + Math.sin(t * 2.2) * 0.06;
      buildingRef.current.rotation.y = Math.sin(t * 0.5) * 0.35;
    }

    // Os andares sobem um a um durante ~70% do ciclo
    const progress = ((t % BUILD_CYCLE) / BUILD_CYCLE) / 0.7;
    floorRefs.current.forEach((floor, i) => {
      if (!floor) return;
      const p = THREE.MathUtils.clamp(progress * FLOOR_COUNT - i, 0, 1);
      floor.visible = p > 0;
      floor.scale.y = Math.max(p, 0.001);
    });

    if (craneJibRef.current) {
      craneJibRef.current.rotation.y = Math.sin(t * 0.7) * 0.9;
    }
    if (hookRef.current) {
      hookRef.current.position.x = 0.35 + Math.sin(t * 1.1) * 0.25;
    }
  });

  const edgeColor = '#9B7BFF';

  return (
    <group ref={buildingRef} position={position} scale={scale}>
      {/* Terreno / Planta baixa */}
      <mesh position={[0, -0.03, 0]}>
        <boxGeometry args={[2.2, 0.04, 1.5]} />
        <meshBasicMaterial color="#501BED" transparent opacity={0.18} />
        <Edges color={edgeColor} />
      </mesh>
      {[-0.66, -0.22, 0.22, 0.66].map((x) => (
        <mesh key={`gx${x}`} position={[x, 0, 0]}>
          <boxGeometry args={[0.006, 0.005, 1.5]} />
          <meshBasicMaterial color={edgeColor} transparent opacity={0.35} />
        </mesh>
      ))}
      {[-0.375, 0, 0.375].map((z) => (
        <mesh key={`gz${z}`} position={[0, 0, z]}>
          <boxGeometry args={[2.2, 0.005, 0.006]} />
          <meshBasicMaterial color={edgeColor} transparent opacity={0.35} />
        </mesh>
      ))}

      {/* Andares do prédio: laje + pilares + fachada de vidro */}
      {Array.from({ length: FLOOR_COUNT }).map((_, i) => (
        <group
          key={i}
          ref={(el) => (floorRefs.current[i] = el)}
          position={[-0.25, i * FLOOR_HEIGHT, 0]}
        >
          <mesh position={[0, FLOOR_HEIGHT - 0.015, 0]}>
            <boxGeometry args={[1.0, 0.03, 0.8]} />
            <meshStandardMaterial
              color="#E2E2E2"
              emissive={accentColor}
              emissiveIntensity={0.6}
              metalness={0.6}
              roughness={0.25}
            />
          </mesh>
          {[
            [-0.47, -0.37],
            [0.47, -0.37],
            [-0.47, 0.37],
            [0.47, 0.37],
          ].map(([x, z]) => (
            <mesh key={`${x}${z}`} position={[x, FLOOR_HEIGHT / 2, z]}>
              <boxGeometry args={[0.04, FLOOR_HEIGHT, 0.04]} />
              <meshStandardMaterial color="#501BED" emissive="#501BED" emissiveIntensity={0.85} />
            </mesh>
          ))}
          <mesh position={[0, FLOOR_HEIGHT / 2, 0]}>
            <boxGeometry args={[0.94, FLOOR_HEIGHT - 0.03, 0.74]} />
            <meshBasicMaterial color="#7344FF" transparent opacity={0.14} depthWrite={false} />
            <Edges color={edgeColor} />
          </mesh>
        </group>
      ))}

      {/* Grua de obra */}
      <group position={[0.75, 0, -0.35]}>
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[0.07, 1.6, 0.07]} />
          <meshStandardMaterial color="#FFBD2E" emissive="#FFBD2E" emissiveIntensity={0.45} />
          <Edges color="#FFD166" />
        </mesh>
        <group ref={craneJibRef} position={[0, 1.6, 0]}>
          {/* Lança e contralança */}
          <mesh position={[0.2, 0, 0]}>
            <boxGeometry args={[1.3, 0.05, 0.05]} />
            <meshStandardMaterial color="#FFBD2E" emissive="#FFBD2E" emissiveIntensity={0.45} />
          </mesh>
          {/* Contrapeso */}
          <mesh position={[-0.38, -0.05, 0]}>
            <boxGeometry args={[0.14, 0.1, 0.1]} />
            <meshStandardMaterial color="#1F1D26" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Cabo + gancho com viga */}
          <group ref={hookRef} position={[0.35, 0, 0]}>
            <mesh position={[0, -0.25, 0]}>
              <boxGeometry args={[0.008, 0.5, 0.008]} />
              <meshBasicMaterial color="#E2E2E2" />
            </mesh>
            <mesh position={[0, -0.52, 0]}>
              <boxGeometry args={[0.3, 0.035, 0.05]} />
              <meshStandardMaterial color="#E2E2E2" emissive={accentColor} emissiveIntensity={0.5} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};

/**
 * Notebook 3D Ultra-Clean (DevBook Pro VKS) + Holograma do prédio em construção
 * Posicionado e dimensionado pelo slot #hero-3d-slot do HeroSection
 */
const LAPTOP_Z = -0.4;
// Caixa aproximada do modelo (notebook + prédio + grua) em unidades locais, usada para caber no slot
const MODEL_WIDTH = 3.3;
const MODEL_HEIGHT = 3.0;
const MODEL_CENTER_Y = 0.8;
const slotDepth = new THREE.Vector3(0, 0, LAPTOP_Z);

const VksDeveloperLaptop3D: React.FC<{
  mousePos: { x: number; y: number };
  activeServiceIndex: number;
}> = ({ mousePos, activeServiceIndex }) => {
  const laptopGroupRef = useRef<THREE.Group>(null);
  const screenTexture = useCodeScreenTexture();

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

  useFrame((state, delta) => {
    const group = laptopGroupRef.current;
    if (!group) return;

    // O notebook ocupa o espaço reservado no hero (#hero-3d-slot) e rola junto com a página,
    // então nunca fica por trás dos títulos das outras seções.
    const rect = document.getElementById('hero-3d-slot')?.getBoundingClientRect();
    const onScreen = !!rect && rect.width > 0 && rect.bottom > 0 && rect.top < state.size.height;
    group.visible = onScreen;
    if (!rect || !onScreen) return;

    const pxToWorld = state.viewport.getCurrentViewport(state.camera, slotDepth).width / state.size.width;
    const scale = Math.min(
      (rect.width * pxToWorld) / MODEL_WIDTH,
      (rect.height * pxToWorld) / MODEL_HEIGHT
    );
    const centerX = (rect.left + rect.width / 2 - state.size.width / 2) * pxToWorld;
    const centerY = (state.size.height / 2 - (rect.top + rect.height / 2)) * pxToWorld;

    group.scale.setScalar(scale);
    group.position.set(centerX, centerY - MODEL_CENTER_Y * scale, LAPTOP_Z);

    // Rotação suave seguindo o mouse (sem girar demais para não sair do slot)
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, -0.38 + mousePos.x * 0.22, delta * 4);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, 0.2 - mousePos.y * 0.12, delta * 4);
  });

  const accentColor =
    activeServiceIndex === 1 ? '#8F6BFF' : activeServiceIndex === 2 ? '#27C93F' : '#501BED';

  return (
    <group ref={laptopGroupRef} rotation={[0.2, -0.38, 0]} visible={false}>
      <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.3}>
        {/* Prédio holográfico em construção flutuando logo acima da tela */}
        <BlueprintBuilding3D position={[-0.35, 1.12, 0.25]} scale={0.62} accentColor={accentColor} />

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

// Sem WebGL (GPU desativada, navegador antigo) o Canvas lança erro no mount;
// isolamos a falha para que só a cena 3D suma, sem derrubar a página inteira.
class SceneErrorBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

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

      <SceneErrorBoundary>
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
            mousePos={mousePos}
            activeServiceIndex={activeServiceIndex}
          />
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
};
