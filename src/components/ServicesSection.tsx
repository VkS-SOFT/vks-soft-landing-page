import React from 'react';
import { Reveal } from './Reveal';
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  HardHat,
  Home,
  Layers,
  Ruler,
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
      id: 'construtoras',
      badge: 'SEGMENTO 01 • CONSTRUÇÃO CIVIL',
      title: 'Construtoras & Incorporadoras',
      subtitle: 'Gestão de Obras, Orçamento, Cronograma e Equipe de Campo',
      description:
        'Tire a obra das planilhas e do WhatsApp. Desenvolvemos sistemas e apps que conectam escritório e canteiro: orçamento, medições, compras e diário de obra em um só lugar, com visão gerencial em tempo real.',
      icon: HardHat,
      metrics: 'Cronograma Físico-Financeiro • Medições • App Offline para o Canteiro',
      deliverables: [
        'Orçamento de obras com composições, BDI e base SINAPI/própria',
        'Cronograma físico-financeiro, medições e controle de custos por etapa',
        'Diário de obra digital com fotos, checklists e assinatura do responsável',
        'Portal do cliente/comprador para acompanhar o andamento da obra',
      ],
      stack: ['Gestão de Obras', 'App de Campo', 'Compras & Suprimentos', 'Dashboards'],
    },
    {
      id: 'imobiliario',
      badge: 'SEGMENTO 02 • MERCADO IMOBILIÁRIO',
      title: 'Imobiliárias & Avaliação de Imóveis',
      subtitle: 'CRM Imobiliário, Portais, Laudos e Vistorias',
      description:
        'Mais velocidade do lead ao contrato. Criamos plataformas para captar, avaliar e vender imóveis: de sites com busca inteligente a SaaS de laudos técnicos com cálculo estatístico e cobrança automatizada.',
      icon: Home,
      metrics: 'NBR 14653 • Método Comparativo • Pagamento Integrado (Pix/Boleto)',
      deliverables: [
        'Laudos e PTAM automatizados conforme ABNT NBR 14653',
        'Vistorias de entrada/saída e cautelares com fotos e relatório em PDF',
        'CRM imobiliário com funil de leads, agenda de visitas e integração com portais',
        'Sites de imóveis e lançamentos com busca, filtros e captação via WhatsApp',
      ],
      stack: ['SaaS de Laudos', 'CRM', 'Portais de Imóveis', 'Pix / Boleto'],
    },
    {
      id: 'engenharia',
      badge: 'SEGMENTO 03 • ENGENHARIA & ARQUITETURA',
      title: 'Escritórios de Engenharia & Arquitetura',
      subtitle: 'Sites que Geram Clientes, Propostas e Automação Técnica',
      description:
        'Presença digital à altura do seu projeto. Fazemos sites institucionais que transformam visitas em orçamentos, além de ferramentas que automatizam propostas, simulações e o acompanhamento de cada projeto.',
      icon: Ruler,
      metrics: 'SEO Local • Captação de Leads • Simuladores e Calculadoras',
      deliverables: [
        'Sites institucionais e portfólio de obras otimizados para o Google',
        'Simuladores e calculadoras técnicas (ex.: dimensionamento de energia solar)',
        'Geração automática de propostas, memoriais e documentos técnicos',
        'Gestão de projetos, ARTs/RRTs, prazos e clientes em um só painel',
      ],
      stack: ['Sites & SEO', 'Simuladores', 'Propostas', 'Gestão de Projetos'],
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
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vks-primary/15 border border-vks-primary/40 text-xs font-mono text-vks-primaryGlow mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>SOLUÇÕES POR SEGMENTO</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Software feito para quem{' '}
              <span className="text-gradient-vks">constrói, projeta e vende imóveis</span>
            </h2>
          </div>
          <p className="text-vks-white/70 max-w-md text-sm sm:text-base leading-relaxed">
            Cada segmento tem processos, normas e dores próprias. Selecione o seu e veja o que podemos construir para a sua operação.
          </p>
        </Reveal>

        {/* Grid de Cards Interativos 3D */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isActive = activeServiceIndex === idx;

            return (
              <Reveal key={pillar.id} delay={idx * 120} className="h-full">
              <div
                onMouseEnter={() => onSelectService(idx)}
                onClick={() => onSelectService(idx)}
                className={`group relative h-full rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer ${
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
                          ? 'bg-vks-primary text-vks-onPrimary shadow-vks-glow'
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
                        ? 'bg-vks-primary text-vks-onPrimary shadow-vks-glow hover:bg-vks-primaryGlow'
                        : 'bg-vks-surfaceLight/80 text-vks-white hover:bg-vks-primary hover:text-vks-onPrimary'
                    }`}
                  >
                    <span>Orçar esta solução</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>

        {/* Faixa de Diferencial: conhecimento do setor */}
        <div id="diferencial" className="mt-16 glass-card rounded-3xl p-8 sm:p-10 border border-vks-primary/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-vks-primaryGlow">
                <HardHat className="w-4 h-4" />
                <span>POR QUE A VKS SOFT</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Tecnologia feita por quem entende de obra.
              </h3>
              <p className="text-sm text-vks-white/70 leading-relaxed">
                Nosso fundador tem <strong className="text-white">formação técnica em Edificações</strong>. Unimos esse
                conhecimento do setor com engenharia de software moderna para entregar sistemas que fazem sentido no
                dia a dia de construtoras, imobiliárias e escritórios técnicos.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-vks-black/70 border border-vks-white/10">
                <ClipboardCheck className="w-5 h-5 text-vks-primaryGlow mb-2.5" />
                <h4 className="font-display font-bold text-white text-base">Normas e Processos</h4>
                <p className="text-xs text-vks-white/65 mt-1.5 leading-relaxed">
                  Conhecemos NBRs, ART/RRT, medições e memoriais. Você não precisa ensinar o básico do setor.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-vks-black/70 border border-vks-white/10">
                <FileText className="w-5 h-5 text-vks-primaryGlow mb-2.5" />
                <h4 className="font-display font-bold text-white text-base">Do Papel ao Sistema</h4>
                <p className="text-xs text-vks-white/65 mt-1.5 leading-relaxed">
                  Transformamos planilhas, laudos e checklists em fluxos digitais com PDF, assinatura e histórico.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-vks-black/70 border border-vks-white/10">
                <Workflow className="w-5 h-5 text-vks-primaryGlow mb-2.5" />
                <h4 className="font-display font-bold text-white text-base">Escritório + Canteiro</h4>
                <p className="text-xs text-vks-white/65 mt-1.5 leading-relaxed">
                  Web para a gestão, app para a obra e automações via WhatsApp conectando todo mundo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
