import React from 'react';
import {
  ArrowUpRight,
  Compass,
  Cpu,
  GitBranch,
  Rocket,
  TrendingUp,
} from 'lucide-react';

export const ProcessAndCasesSection: React.FC = () => {
  const cases = [
    {
      category: 'SAAS & ERP LOGÍSTICO',
      title: 'Plataforma Multi-Tenant de Gestão & Faturamento em Tempo Real',
      impact: '+310% em capacidade operacional',
      metrics: [
        { label: 'Latência média de API', value: '< 42ms' },
        { label: 'Redução de retrabalho', value: '78%' },
      ],
      stack: ['Laravel', 'Vue.js', 'PostgreSQL', 'Redis Queues'],
      summary:
        'Unificação de 6 sistemas fragmentados em um único SaaS com emissão fiscal automatizada, conciliação bancária via webhook e painel gerencial ao vivo.',
    },
    {
      category: 'APP MOBILE CROSS-PLATFORM',
      title: 'Super App B2B/B2C com Operação Offline-First & Pix Instantâneo',
      impact: '4.9★ nas lojas e +85k usuários ativos',
      metrics: [
        { label: 'Framerate constante', value: '60 FPS' },
        { label: 'Conversão no checkout', value: '+44%' },
      ],
      stack: ['Flutter', 'FastAPI', 'WebSockets', 'Push Engine'],
      summary:
        'Aplicativo iOS e Android com sincronização inteligente em áreas sem sinal, carteira digital integrada e notificações em tempo real.',
    },
    {
      category: 'IA & HIPERAUTOMAÇÃO',
      title: 'Ecossistema de Agentes de IA & Orquestração de Filas de Atendimento',
      impact: 'Atendimento 24/7 com 82% de resolução autônoma',
      metrics: [
        { label: 'Tempo de 1ª resposta', value: '1.8 seg' },
        { label: 'ROI atingido em', value: '45 dias' },
      ],
      stack: ['Python', 'FastAPI', 'LLM / RAG', 'WhatsApp API'],
      summary:
        'Pipeline assíncrono que qualifica leads automaticamente, consulta estoque/ERP em tempo real, gera propostas e transfere apenas leads prontos para o time comercial.',
    },
  ];

  const steps = [
    {
      num: '01',
      icon: Compass,
      title: 'Discovery & Arquitetura',
      desc: 'Mapeamos gargalos operacionais, regras de negócio, requisitos de escala e definimos a arquitetura ideal com prototipação de alta fidelidade.',
    },
    {
      num: '02',
      icon: GitBranch,
      title: 'Sprints Ágeis & Clean Code',
      desc: 'Ciclos semanais com entregas visíveis em ambiente de homologação. Você acompanha a evolução em tempo real, sem caixas-pretas.',
    },
    {
      num: '03',
      icon: Cpu,
      title: 'QA, Stress Test & Segurança',
      desc: 'Testes automatizados, validação de carga em filas/banco de dados, blindagem de endpoints e conformidade total com a LGPD.',
    },
    {
      num: '04',
      icon: Rocket,
      title: 'Deploy Contínuo & Escala',
      desc: 'Infraestrutura containerizada, monitoramento ativo 24/7, zero-downtime deploy e acompanhamento próximo pós-lançamento.',
    },
  ];

  return (
    <section id="cases" className="relative py-24 lg:py-32 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        {/* Bloco 1: Cases de Impacto */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vks-primary/15 border border-vks-primary/40 text-xs font-mono text-vks-primaryGlow mb-4">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>RESULTADOS EM PRODUÇÃO</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Engenharia que se paga em{' '}
                <span className="text-gradient-vks">performance e ROI</span>
              </h2>
            </div>
            <a
              href="#diagnostico"
              className="inline-flex items-center gap-2 text-sm font-semibold text-vks-primaryGlow hover:text-white transition-colors"
            >
              <span>Quero um resultado similar na minha empresa</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {cases.map((item, index) => (
              <div
                key={index}
                className="glass-card rounded-3xl p-7 flex flex-col justify-between border border-vks-white/10 hover:border-vks-primary/50"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-vks-primary/20 text-vks-primaryGlow border border-vks-primary/30">
                      {item.category}
                    </span>
                    <span className="font-mono text-xs text-emerald-400 font-semibold">
                      {item.impact}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-vks-white/70 leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                <div>
                  {/* Métricas Lado a Lado */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-vks-black/75 border border-vks-white/10 mb-5">
                    {item.metrics.map((m, i) => (
                      <div key={i}>
                        <p className="font-display text-xl font-bold text-white">{m.value}</p>
                        <p className="text-[11px] text-vks-white/60">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-vks-surface text-[11px] font-mono text-vks-white/75"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bloco 2: Metodologia de Entrega */}
        <div id="processo">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-vks-primaryGlow">
              METODOLOGIA DE EXECUÇÃO VKS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-3">
              Do diagnóstico ao deploy em <span className="text-gradient-vks">4 etapas claras</span>
            </h2>
            <p className="text-vks-white/70 text-sm sm:text-base mt-4">
              Transparência total em código, prazos e arquitetura para que você tenha previsibilidade do início ao fim.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="glass-card rounded-3xl p-7 relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-vks-primary/20 text-vks-primaryGlow group-hover:bg-vks-primary group-hover:text-white transition-colors">
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
