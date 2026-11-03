import React from 'react';
import { Reveal } from './Reveal';
import {
  ArrowUpRight,
  Compass,
  ExternalLink,
  ClipboardCheck,
  GitBranch,
  Rocket,
  TrendingUp,
} from 'lucide-react';

export const ProcessAndCasesSection: React.FC = () => {
  const cases = [
    {
      category: 'SAAS IMOBILIÁRIO',
      client: 'Avalui',
      url: 'https://avalui.com.br',
      urlLabel: 'avalui.com.br',
      preview: '/assets/cases/avalui.webp',
      title: 'Plataforma de Avaliações Imobiliárias e Emissão de PTAM',
      summary:
        'SaaS que automatiza todo o ciclo de avaliações imobiliárias e vistorias: coleta de dados do imóvel, cálculo pelo Método Comparativo Direto, prévia protegida e liberação do laudo em PDF após a confirmação automática do pagamento.',
      highlights: [
        'Laudos em conformidade com a ABNT NBR 14653-2',
        'Cobrança integrada: laudo liberado só após o pagamento',
        'Painel administrativo de solicitações e clientes',
      ],
      stack: ['Laravel', 'Vue.js', 'PDF Engine', 'API Bancária'],
    },
    {
      category: 'ENGENHARIA & ENERGIA SOLAR',
      client: 'Luminar Solar',
      url: 'https://v0-luminar-solar.vercel.app',
      urlLabel: 'Luminar Solar Engenharia e Arquitetura',
      preview: '/assets/cases/luminar.webp',
      title: 'Site Institucional para Escritório de Engenharia Solar',
      summary:
        'Site da Luminar Solar Engenharia e Arquitetura, especializada em projetos e instalação de energia solar no litoral do Piauí. Apresenta serviços, portfólio de obras e depoimentos, com foco em transformar visitantes em pedidos de orçamento.',
      highlights: [
        'Portfólio de projetos executados e depoimentos de clientes',
        'Layout responsivo, rápido e com tema claro/escuro',
        'Estrutura pronta para blog, leads e WhatsApp',
      ],
      stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    },
  ];

  const steps = [
    {
      num: '01',
      icon: Compass,
      title: 'Diagnóstico da Operação',
      desc: 'Visitamos sua rotina: obra, escritório ou imobiliária. Mapeamos planilhas, normas e gargalos e entregamos um protótipo navegável.',
    },
    {
      num: '02',
      icon: GitBranch,
      title: 'Desenvolvimento em Etapas',
      desc: 'Entregas semanais em ambiente de teste. Você e sua equipe validam cada tela antes de ela entrar em uso.',
    },
    {
      num: '03',
      icon: ClipboardCheck,
      title: 'Testes, Normas & Segurança',
      desc: 'Conferimos cálculos e documentos com as normas aplicáveis, testamos o sistema e protegemos os dados conforme a LGPD.',
    },
    {
      num: '04',
      icon: Rocket,
      title: 'Implantação & Suporte',
      desc: 'Colocamos no ar, treinamos sua equipe e seguimos ao lado com suporte e melhorias contínuas.',
    },
  ];

  return (
    <section id="cases" className="relative py-24 lg:py-32 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        {/* Bloco 1: Cases de Impacto */}
        <div>
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vks-primary/15 border border-vks-primary/40 text-xs font-mono text-vks-primaryGlow mb-4">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>CLIENTES EM PRODUÇÃO</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Quem já constrói{' '}
                <span className="text-gradient-vks">com a VKS Soft</span>
              </h2>
            </div>
            <a
              href="#diagnostico"
              className="inline-flex items-center gap-2 text-sm font-semibold text-vks-primaryGlow hover:text-white transition-colors"
            >
              <span>Quero um projeto assim para minha empresa</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {cases.map((item, i) => (
              <Reveal key={item.client} delay={i * 120} className="h-full">
              <div
                className="glass-card h-full rounded-3xl p-7 flex flex-col justify-between border border-vks-white/10 hover:border-vks-primary/50"
              >
                <div>
                  {/* Preview do site em moldura de navegador */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir o site ${item.client}`}
                    className="group block mb-6 rounded-2xl overflow-hidden border border-vks-white/10 bg-vks-black/80 hover:border-vks-primary/60 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-vks-white/10">
                      <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                      <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                      <span className="ml-2 flex-1 truncate rounded-md bg-vks-surface px-2 py-0.5 font-mono text-[10px] text-vks-white/60">
                        {item.url.replace('https://', '')}
                      </span>
                    </div>
                    <img
                      src={item.preview}
                      alt={`Página inicial do site ${item.client}`}
                      width={1200}
                      height={575}
                      loading="lazy"
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </a>

                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-vks-primary/20 text-vks-primaryGlow border border-vks-primary/30">
                      {item.category}
                    </span>
                    <span className="font-mono text-xs text-vks-success font-semibold">
                      ● No ar
                    </span>
                  </div>

                  <p className="font-display text-sm font-semibold text-vks-primaryGlow mb-1">{item.client}</p>
                  <h3 className="font-display text-xl font-bold text-white mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-vks-white/70 leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                <div>
                  {/* Destaques */}
                  <ul className="space-y-2 p-4 rounded-2xl bg-vks-black/75 border border-vks-white/10 mb-5">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs sm:text-sm text-vks-white/85">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-vks-primaryGlow shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-vks-surface text-[11px] font-mono text-vks-white/75"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link para o projeto */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-2xl font-semibold text-sm flex items-center justify-between bg-vks-surfaceLight/80 text-vks-white hover:bg-vks-primary hover:text-vks-onPrimary transition-all duration-300"
                  >
                    <span>Visitar {item.urlLabel}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bloco 2: Metodologia de Entrega */}
        <div id="processo">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-vks-primaryGlow">
              COMO TRABALHAMOS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-3">
              Da planilha ao sistema em <span className="text-gradient-vks">4 etapas claras</span>
            </h2>
            <p className="text-vks-white/70 text-sm sm:text-base mt-4">
              Transparência em prazos, custos e entregas, com o mesmo cuidado de um cronograma de obra bem executado.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.num} delay={i * 100} className="h-full">
                <div
                  className="glass-card h-full rounded-3xl p-7 relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-vks-primary/20 text-vks-primaryGlow group-hover:bg-vks-primary group-hover:text-vks-onPrimary transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-display text-3xl font-bold text-vks-white/15 group-hover:text-vks-primary/40 transition-colors">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-vks-white/70 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
