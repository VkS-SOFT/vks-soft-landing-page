import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ArrowRight,
  Code2,
  Cpu,
  ShieldCheck,
  Smartphone,
  Terminal,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.hero-hud-card',
        { scale: 0.94, opacity: 0, y: 24 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: 0.35,
          ease: 'expo.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 lg:pt-36 lg:pb-24 flex items-center z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          {/* Coluna Esquerda: Copywriting de Conversão */}
          <div className="lg:col-span-7 space-y-8">
            {/* Badge de Autoridade */}
            <div className="hero-reveal inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-vks-primary/15 border border-vks-primary/40 text-xs sm:text-sm font-mono text-vks-white">
              <span className="w-2 h-2 rounded-full bg-vks-primary animate-ping" />
              <span className="w-2 h-2 rounded-full bg-vks-primary -ml-4" />
              <span>SOFTWARE HOUSE • ARQUITETURA ESCALÁVEL & IA</span>
            </div>

            {/* Headline Principal */}
            <h1 className="hero-reveal font-display text-4xl sm:text-6xl lg:text-[4.15rem] font-bold tracking-tight leading-[1.06] text-white">
              Engenharia de software que{' '}
              <span className="text-gradient-vks">multiplica receita</span> e automatiza sua operação.
            </h1>

            {/* Subheadline */}
            <p className="hero-reveal text-base sm:text-lg lg:text-xl text-vks-white/75 max-w-2xl leading-relaxed font-normal">
              Da concepção de <strong className="text-white font-semibold">SaaS e ERPs sob medida</strong> até{' '}
              <strong className="text-white font-semibold">Apps Mobile Cross-Platform</strong> e{' '}
              <strong className="text-white font-semibold">Agentes de IA / Mensageria de alta vazão</strong>.
              Construímos o ativo tecnológico que coloca sua empresa anos à frente.
            </p>

            {/* CTAs */}
            <div className="hero-reveal flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#diagnostico"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-vks-primary hover:bg-vks-primaryGlow text-white font-semibold text-base shadow-vks-glow hover:shadow-vks-glow-lg transition-all duration-300 group"
              >
                <span>Agendar Diagnóstico Técnico</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#solucoes"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl glass-panel hover:border-vks-primary/50 text-vks-white hover:text-white font-medium text-base transition-all duration-300"
              >
                <span>Explorar Ecossistema</span>
              </a>
            </div>

            {/* Métricas de Impacto */}
            <div className="hero-reveal pt-6 grid grid-cols-3 gap-4 sm:gap-8 border-t border-vks-white/10 max-w-xl">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white">99.98%</p>
                <p className="text-xs sm:text-sm text-vks-white/60 mt-0.5">SLA & Alta Disponibilidade</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-vks-primaryGlow">3.8x</p>
                <p className="text-xs sm:text-sm text-vks-white/60 mt-0.5">Mais velocidade de entrega</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white">+40%</p>
                <p className="text-xs sm:text-sm text-vks-white/60 mt-0.5">Redução de custo operacional</p>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Espaço dedicado para visualização do Notebook 3D + "</>" no topo e HUD compacto na base */}
          <div className="lg:col-span-5 relative flex flex-col items-end justify-end lg:pt-64">
            <div className="hero-hud-card w-full max-w-md glass-card rounded-3xl p-5 sm:p-6 border border-vks-primary/35 shadow-2xl relative overflow-hidden">
              {/* Barra de topo estilo terminal de engenharia */}
              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-vks-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  <span className="ml-1.5 font-mono text-[11px] text-vks-white/70">
                    &lt;/&gt; vks-devbook://cluster-prod
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  INTERACTIVE 3D
                </span>
              </div>

              {/* Resumo enxuto das 3 Frentes */}
              <div className="grid grid-cols-1 gap-2.5">
                <div className="p-3 rounded-2xl bg-vks-black/80 border border-vks-white/10 hover:border-vks-primary/60 transition-all flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-vks-primary/20 text-vks-primaryGlow shrink-0">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs sm:text-sm font-semibold text-white">Sistemas Web, SaaS & ERPs</h3>
                      <span className="font-mono text-[10px] text-vks-primaryGlow">Laravel • React • Vue</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-vks-black/80 border border-vks-white/10 hover:border-vks-primary/60 transition-all flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-vks-primary/20 text-vks-primaryGlow shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs sm:text-sm font-semibold text-white">Apps Mobile Cross-Platform</h3>
                      <span className="font-mono text-[10px] text-vks-primaryGlow">Flutter • iOS & Android</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-vks-black/80 border border-vks-white/10 hover:border-vks-primary/60 transition-all flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-vks-primary/20 text-vks-primaryGlow shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs sm:text-sm font-semibold text-white">IA, Bots & Filas Assíncronas</h3>
                      <span className="font-mono text-[10px] text-vks-primaryGlow">FastAPI • Queues • LLMs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rodapé do Card HUD */}
              <div className="mt-3.5 pt-3 border-t border-vks-white/10 flex items-center justify-between text-[11px] text-vks-white/60 font-mono">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-vks-primaryGlow" />
                  Zero Lock-in • Código 100% Seu
                </span>
                <span className="flex items-center gap-1 text-vks-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-vks-primaryGlow" />
                  LGPD & Security First
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
