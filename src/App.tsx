import React, { useState, useEffect, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessAndCasesSection } from './components/ProcessAndCasesSection';
import { LeadQualifierForm } from './components/LeadQualifierForm';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { VksCoreScene } from './components/three/VksCoreScene';

export function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [selectedLeadPillar, setSelectedLeadPillar] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress =
        totalScroll > 0 ? Math.min(Math.max(window.scrollY / totalScroll, 0), 1) : 0;
      setScrollProgress(currentProgress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-vks-black text-vks-white relative selection:bg-vks-primary selection:text-vks-onPrimary bg-grid-pattern">
      {/* Cena 3D Interativa em Three.js (@react-three/fiber) */}
      <Suspense fallback={null}>
        <VksCoreScene
          scrollProgress={scrollProgress}
          mousePos={mousePos}
          activeServiceIndex={activeServiceIndex}
        />
      </Suspense>

      {/* Navegação Fixa Glassmorphism */}
      <Navbar />

      {/* Conteúdo Principal */}
      <main className="relative z-10">
        <HeroSection />

        <ServicesSection
          activeServiceIndex={activeServiceIndex}
          onSelectService={setActiveServiceIndex}
          onSelectPillarForLead={(pillar) => setSelectedLeadPillar(pillar)}
        />

        <ProcessAndCasesSection />

        <LeadQualifierForm preselectedPillar={selectedLeadPillar} />
      </main>

      {/* Rodapé Oficial */}
      <Footer />

      {/* CTA Flutuante do WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
