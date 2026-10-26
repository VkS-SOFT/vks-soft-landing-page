import React from 'react';
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Database,
  Globe,
  Layers,
  Smartphone,
  Workflow,
} from 'lucide-react';

interface ServicesSectionProps {
  activeServiceIndex: number;
  onSelectService: (index: number) => void;
  onSelectPillarForLead: (pillarName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  activeServiceIndex,
  onSelectService,
  onSelectPillarForLead,
}) => {
  const pillars = [
    {
      id: 'web-saas',
      badge: 'PILAR 01 • CORE WEB & CLOUD',
      title: 'Desenvolvimento Web & Sistemas Sob Medida',
      subtitle: 'SaaS Multi-Tenant, Plataformas Corporativas, ERPs & Portais B2B',
      description:
        'Projetamos plataformas robustas capazes de escalar de centenas a milhões de requisições sem gargalos. Substituímos planilhas fragmentadas e softwares engessados por sistemas proprietários desenhados para a sua operação.',
      icon: Globe,
      metrics: 'Arquitetura Service Pattern • REST/GraphQL • Real-time WebSockets',
      deliverables: [
        'Plataformas SaaS prontas para recorrência (assinaturas, billing, multi-empresa)',
        'ERPs, CRMs e Backoffices customizados com controle granular de permissões (RBAC)',
        'Dashboards analíticos de alta densidade com atualização em tempo real',
        'Refatoração e modernização de sistemas legados com migração segura de banco de dados',
      ],
      stack: ['PHP / Laravel', 'React.js', 'Vue.js', 'TypeScript', 'PostgreSQL', 'MySQL', 'Redis'],
    },
    {
      id: 'mobile-apps',
      badge: 'PILAR 02 • ECOSSISTEMA MOBILE',
      title: 'Aplicativos Mobile & Cross-Platform',
      subtitle: 'Apps iOS & Android com Performance Nativa em Código Único',
      description:
        'Coloque sua empresa no bolso do seu cliente ou da sua equipe de campo. Desenvolvemos aplicativos fluidos a 60/120fps em Flutter e tecnologias nativas, reduzindo o time-to-market pela metade sem abrir mão da qualidade visual.',
      icon: Smartphone,
      metrics: 'Publicação App Store & Google Play • Offline-First • Push Notifications',
      deliverables: [
        'Aplicativos B2C de alta retenção (Fintechs, Delivery, Marketplaces, EdTechs, Saúde)',
        'Apps corporativos para força de vendas, logística e operação em campo com sincronização offline',
        'Integração nativa com biometria, câmera, geolocalização em background, Bluetooth e NFC',
        'Gateways de pagamento integrados (Pix dinâmico, Apple Pay, Google Pay, Split de pagamento)',
      ],
      stack: ['Flutter', 'Dart', 'iOS / Android', 'Firebase', 'WebSockets', 'Clean Architecture'],
    },
    {
      id: 'ai-automation',
      badge: 'PILAR 03 • HIPERAUTOMAÇÃO & IA',
      title: 'Automações, IA & Arquitetura de Alta Performance',
      subtitle: 'APIs de Alta Vazão, Mensageria Assíncrona, Bots & Agentes LLM',
      description:
        'Elimine tarefas manuais repetitivas e integre todo o seu ecossistema. Construímos microsserviços em Python/FastAPI, filas distribuídas e agentes de Inteligência Artificial que qualificam leads e operam 24/7.',
      icon: Bot,
      metrics: 'Filas & Workers Assíncronos • RAG / Agentes de IA • Integrações Complexas',
      deliverables: [
        'Agentes de IA conversacionais e copilotos internos treinados nos dados da sua empresa (RAG)',
        'Orquestração de filas, mensageria e workers para processamento pesado sem travar o sistema',
        'Integrações bidirecionais entre ERPs, gateways financeiros, WhatsApp Business API e CRMs',
        'Scrapers, pipelines de dados automatizados e monitoramento ativo de infraestrutura',
      ],
      stack: ['Python', 'FastAPI', 'RabbitMQ / Redis Queues', 'OpenAI / LLMs', 'Docker', 'Webhooks'],
    },
  ];

  const handleCtaClick = (title: string) => {
    onSelectPillarForLead(title);
    const el = document.getElementById('diagnostico');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="solucoes" className="relative py-24 lg:py-32 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vks-primary/15 border border-vks-primary/40 text-xs font-mono text-vks-primaryGlow mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>NOSSAS FRENTES DE ENGENHARIA</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Três pilares tecnológicos para{' '}
              <span className="text-gradient-vks">dominar seu mercado</span>
            </h2>
          </div>
          <p className="text-vks-white/70 max-w-md text-sm sm:text-base leading-relaxed">
            Passe o cursor ou selecione uma frente para sincronizar o núcleo 3D e explorar como desenhamos cada arquitetura.
          </p>
        </div>

        {/* Grid de Cards Interativos 3D */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isActive = activeServiceIndex === idx;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => onSelectService(idx)}
                onClick={() => onSelectService(idx)}
                className={`group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer ${
                  isActive
                    ? 'glass-card border-vks-primary shadow-vks-glow -translate-y-2'
                    : 'glass-card hover:-translate-y-1.5'
                }`}
              >
                {/* Glow de topo ativo */}
                <div
                  className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-vks-primary to-transparent transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />

                <div>
                  {/* Topo do Card */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="font-mono text-[11px] tracking-wider uppercase text-vks-primaryGlow font-semibold">
                      {pillar.badge}
                    </span>
                    <div
                      className={`p-3 rounded-2xl transition-colors duration-300 ${
                        isActive
                          ? 'bg-vks-primary text-white shadow-vks-glow'
                          : 'bg-vks-surfaceLight text-vks-white group-hover:bg-vks-primary/30'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Título e Subtítulo */}
                  <h3 className="font-display text-2xl font-bold text-white mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-mono text-vks-primaryGlow/90 mb-4">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm text-vks-white/75 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Entregáveis */}
                  <div className="space-y-2.5 mb-7 border-t border-vks-white/10 pt-5">
                    {pillar.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-vks-white/85">
                        <CheckCircle2 className="w-4 h-4 text-vks-primaryGlow shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tags de Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {pillar.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-vks-black/80 border border-vks-white/10 font-mono text-[11px] text-vks-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Botão de Ação Direta */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCtaClick(pillar.title);
                    }}
                    className={`w-full py-3.5 px-5 rounded-2xl font-semibold text-sm flex items-center justify-between transition-all duration-300 ${
                      isActive
                        ? 'bg-vks-primary text-white shadow-vks-glow hover:bg-vks-primaryGlow'
                        : 'bg-vks-surfaceLight/80 text-vks-white hover:bg-vks-primary hover:text-white'
                    }`}
                  >
                    <span>Orçar esta solução</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Faixa de Diferencial de Arquitetura */}
        <div id="arquitetura" className="mt-16 glass-card rounded-3xl p-8 sm:p-10 border border-vks-primary/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-vks-primaryGlow">
                <Workflow className="w-4 h-4" />
                <span>PADRÃO DE ENGENHARIA VKS SOFT</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Código limpo, desacoplado e preparado para escala real.
              </h3>
              <p className="text-sm text-vks-white/70 leading-relaxed">
                Nada de código espaguete ou soluções improvisadas que travam quando sua operação cresce.
                Aplicamos <strong className="text-white">Clean Code, SOLID, Service Patterns, Filas Assíncronas e CI/CD</strong> desde o primeiro commit.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-vks-black/70 border border-vks-white/10">
                <Database className="w-5 h-5 text-vks-primaryGlow mb-2.5" />
                <h4 className="font-display font-bold text-white text-base">Dados & Cache Otimizados</h4>
                <p className="text-xs text-vks-white/65 mt-1.5 leading-relaxed">
                  Modelagem relacional avançada em PostgreSQL/MySQL combinada com Redis para respostas em milissegundos.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-vks-black/70 border border-vks-white/10">
                <Workflow className="w-5 h-5 text-vks-primaryGlow mb-2.5" />
                <h4 className="font-display font-bold text-white text-base">Mensageria & WebSockets</h4>
                <p className="text-xs text-vks-white/65 mt-1.5 leading-relaxed">
                  Jobs em background, filas resilientes com retentativa automática e eventos em tempo real.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-vks-black/70 border border-vks-white/10">
                <Globe className="w-5 h-5 text-vks-primaryGlow mb-2.5" />
                <h4 className="font-display font-bold text-white text-base">UX/UI de Alta Conversão</h4>
                <p className="text-xs text-vks-white/65 mt-1.5 leading-relaxed">
                  Interfaces rápidas, acessíveis e desenhadas no Figma com foco na produtividade do usuário final.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
