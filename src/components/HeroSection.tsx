import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ArrowRight,
  Building2,
  HardHat,
  Home,
  Ruler,
  ShieldCheck,
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
              <span>CONTECH & PROPTECH • CONSTRUÇÃO CIVIL & IMOBILIÁRIO</span>
            </div>

            {/* Headline Principal */}
            <h1 className="hero-reveal font-display text-4xl sm:text-6xl lg:text-[4.15rem] font-bold tracking-tight leading-[1.06] text-white">
              Software especialista em{' '}
              <span className="text-gradient-vks">construção civil</span> e mercado imobiliário.
            </h1>

            {/* Subheadline */}
            <p className="hero-reveal text-base sm:text-lg lg:text-xl text-vks-white/75 max-w-2xl leading-relaxed font-normal">
              Sistemas, apps e sites para <strong className="text-white font-semibold">construtoras e incorporadoras</strong>,{' '}
              <strong className="text-white font-semibold">imobiliárias e avaliadores</strong> e{' '}
              <strong className="text-white font-semibold">escritórios de engenharia e arquitetura</strong>.
              Desenvolvido por quem tem formação em Edificações e fala a língua do canteiro de obras.
            </p>

            {/* CTAs */}
            <div className="hero-reveal flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#diagnostico"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-vks-primary hover:bg-vks-primaryGlow text-white font-semibold text-base shadow-vks-glow hover:shadow-vks-glow-lg transition-all duration-300 group"
              >
                <span>Quero digitalizar minha operação</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#solucoes"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl glass-panel hover:border-vks-primary/50 text-vks-white hover:text-white font-medium text-base transition-all duration-300"
              >
                <span>Ver soluções por segmento</span>
              </a>
            </div>

            {/* Credenciais do Nicho */}
            <div className="hero-reveal pt-6 grid grid-cols-3 gap-4 sm:gap-8 border-t border-vks-white/10 max-w-xl">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white">NBR</p>
                <p className="text-xs sm:text-sm text-vks-white/60 mt-0.5">Laudos e cálculos em conformidade técnica</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-vks-primaryGlow">Edificações</p>
                <p className="text-xs sm:text-sm text-vks-white/60 mt-0.5">Formação técnica no setor</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white">100%</p>
                <p className="text-xs sm:text-sm text-vks-white/60 mt-0.5">Código e dados seus, sem lock-in</p>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Espaço dedicado para visualização do Notebook 3D + prédio holográfico no topo e HUD compacto na base */}
          <div className="lg:col-span-5 relative flex flex-col items-end justify-end lg:pt-80">
            <div className="hero-hud-card w-full max-w-md glass-card rounded-3xl p-5 sm:p-6 border border-vks-primary/35 shadow-2xl relative overflow-hidden">
              {/* Barra de topo */}
              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-vks-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  <span className="ml-1.5 font-mono text-[11px] text-vks-white/70">
                    &lt;/&gt; vks://construcao-imobiliario
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  SEGMENTOS
                </span>
              </div>

              {/* Segmentos atendidos */}
              <div className="grid grid-cols-1 gap-2.5">
                <div className="p-3 rounded-2xl bg-vks-black/80 border border-vks-white/10 hover:border-vks-primary/60 transition-all flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-vks-primary/20 text-vks-primaryGlow shrink-0">
                    <HardHat className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs sm:text-sm font-semibold text-white">Construtoras & Incorporadoras</h3>
                      <span className="font-mono text-[10px] text-vks-primaryGlow">Obras • Orçamento • Campo</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-vks-black/80 border border-vks-white/10 hover:border-vks-primary/60 transition-all flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-vks-primary/20 text-vks-primaryGlow shrink-0">
                    <Home className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs sm:text-sm font-semibold text-white">Imobiliárias & Avaliação</h3>
                      <span className="font-mono text-[10px] text-vks-primaryGlow">CRM • Portais • Laudos</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-vks-black/80 border border-vks-white/10 hover:border-vks-primary/60 transition-all flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-vks-primary/20 text-vks-primaryGlow shrink-0">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs sm:text-sm font-semibold text-white">Engenharia & Arquitetura</h3>
                      <span className="font-mono text-[10px] text-vks-primaryGlow">Sites • Propostas • Leads</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rodapé do Card HUD */}
              <div className="mt-3.5 pt-3 border-t border-vks-white/10 flex items-center justify-between text-[11px] text-vks-white/60 font-mono">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-vks-primaryGlow" />
                  Do canteiro ao cartório
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
