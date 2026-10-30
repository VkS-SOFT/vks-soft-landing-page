import React, { useState, useEffect } from 'react';
import {
  LeadSubmissionPayload,
  LeadNotificationResult,
  submitLeadAndSendConfirmation,
} from '../services/leadNotificationService';
import { VksLogo } from './VksLogo';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MailCheck,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
} from 'lucide-react';

interface LeadQualifierFormProps {
  preselectedPillar?: string;
}

const SOLUTION_PILLARS = [
  {
    id: 'Construtoras & Incorporadoras',
    title: 'Construtoras & Incorporadoras',
    desc: 'Gestão de obras, orçamento, cronograma, medições e app para o canteiro',
  },
  {
    id: 'Imobiliárias & Avaliação de Imóveis',
    title: 'Imobiliárias & Avaliação de Imóveis',
    desc: 'CRM imobiliário, portais de imóveis, laudos (NBR 14653) e vistorias',
  },
  {
    id: 'Escritórios de Engenharia & Arquitetura',
    title: 'Escritórios de Engenharia & Arquitetura',
    desc: 'Sites que geram clientes, simuladores, propostas e gestão de projetos',
  },
  {
    id: 'Outro negócio do setor',
    title: 'Outro negócio do setor',
    desc: 'Loteadoras, administradoras de condomínio, lojas de materiais, energia solar e afins',
  },
];

const PROJECT_STAGES = [
  'Tenho uma ideia de sistema ou app para o setor',
  'Já uso um sistema, mas ele não atende minha operação',
  'Quero trocar planilhas e papel por um sistema próprio',
  'Preciso de um site que gere clientes',
];

const BUDGET_RANGES = [
  'R$ 15k – R$ 35k (MVP / Automação Pontual)',
  'R$ 35k – R$ 80k (Plataforma / App Completo)',
  'Acima de R$ 80k (Ecossistema Enterprise / Escala)',
  'Prefiro definir junto com o arquiteto na call',
];

export const LeadQualifierForm: React.FC<LeadQualifierFormProps> = ({ preselectedPillar }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<LeadNotificationResult | null>(null);
  const [copiedProtocol, setCopiedProtocol] = useState(false);

  const [formData, setFormData] = useState<LeadSubmissionPayload>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    solutionPillar: SOLUTION_PILLARS[0].id,
    projectStage: PROJECT_STAGES[0],
    budgetRange: BUDGET_RANGES[1],
    projectDetails: '',
  });

  useEffect(() => {
    if (preselectedPillar) {
      setFormData((prev) => ({
        ...prev,
        solutionPillar: preselectedPillar,
      }));
    }
  }, [preselectedPillar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const response = await submitLeadAndSendConfirmation(formData);
      setResult(response);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyProtocol = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.protocolId);
    setCopiedProtocol(true);
    setTimeout(() => setCopiedProtocol(false), 2500);
  };

  return (
    <section id="diagnostico" className="relative py-24 lg:py-32 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-[2rem] p-6 sm:p-10 lg:p-12 border border-vks-primary/40 shadow-vks-glow relative overflow-hidden">
          {/* Glow Decorativo de Fundo */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-vks-primary/25 blur-[100px] pointer-events-none" />

          {!result ? (
            <>
              {/* Cabeçalho do Qualificador */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-8 border-b border-vks-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vks-primary/20 border border-vks-primary/40 text-xs font-mono text-vks-primaryGlow mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>DIAGNÓSTICO TÉCNICO & PROPOSTA</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">
                    Vamos digitalizar sua construtora, imobiliária ou escritório?
                  </h2>
                  <p className="text-sm text-vks-white/70 mt-1.5">
                    Configure o escopo em 3 passos rápidos. Você recebe o{' '}
                    <strong className="text-white">protocolo de confirmação no seu e-mail</strong> e pode iniciar a conversa técnica direto no WhatsApp.
                  </p>
                </div>

                {/* Indicador de Passos */}
                <div className="flex items-center gap-2 shrink-0">
                  {[1, 2, 3].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        if (s < step) setStep(s as 1 | 2 | 3);
                      }}
                      className={`w-10 h-10 rounded-xl font-mono text-sm font-bold flex items-center justify-center transition-all ${
                        step === s
                          ? 'bg-vks-primary text-vks-onPrimary shadow-vks-glow scale-105'
                          : step > s
                          ? 'bg-vks-primary/30 text-white border border-vks-primary/50 cursor-pointer'
                          : 'bg-vks-black/60 text-vks-white/40 border border-vks-white/10'
                      }`}
                    >
                      0{s}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* STEP 1: Frente Tecnológica */}
                {step === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <label className="block font-display text-lg font-semibold text-white mb-1">
                        1. Qual é o segmento da sua empresa?
                      </label>
                      <p className="text-xs text-vks-white/60 mb-4">
                        Assim já chegamos na conversa conhecendo os processos do seu negócio.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {SOLUTION_PILLARS.map((pillar) => {
                          const selected = formData.solutionPillar === pillar.id;
                          return (
                            <div
                              key={pillar.id}
                              onClick={() =>
                                setFormData({ ...formData, solutionPillar: pillar.id })
                              }
                              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                                selected
                                  ? 'bg-vks-primary/20 border-vks-primary shadow-vks-glow'
                                  : 'bg-vks-black/60 border-vks-white/10 hover:border-vks-white/30'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-display font-bold text-white text-base">
                                  {pillar.title}
                                </span>
                                <span
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                    selected
                                      ? 'border-vks-primary bg-vks-primary text-vks-onPrimary'
                                      : 'border-vks-white/30'
                                  }`}
                                >
                                  {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                                </span>
                              </div>
                              <p className="text-xs text-vks-white/70 leading-relaxed">
                                {pillar.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-vks-primary hover:bg-vks-primaryGlow text-vks-onPrimary font-semibold text-sm shadow-vks-glow transition-all"
                      >
                        <span>Avançar para Contexto</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Momento, Orçamento e Escopo */}
                {step === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2.5">
                          Momento atual do projeto
                        </label>
                        <div className="space-y-2.5">
                          {PROJECT_STAGES.map((stage) => (
                            <div
                              key={stage}
                              onClick={() => setFormData({ ...formData, projectStage: stage })}
                              className={`px-4 py-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-between ${
                                formData.projectStage === stage
                                  ? 'bg-vks-primary/20 border-vks-primary text-white font-medium'
                                  : 'bg-vks-black/60 border-vks-white/10 text-vks-white/75 hover:border-vks-white/30'
                              }`}
                            >
                              <span>{stage}</span>
                              {formData.projectStage === stage && (
                                <CheckCircle2 className="w-4 h-4 text-vks-primaryGlow shrink-0" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2.5">
                          Faixa de investimento estimada
                        </label>
                        <div className="space-y-2.5">
                          {BUDGET_RANGES.map((budget) => (
                            <div
                              key={budget}
                              onClick={() => setFormData({ ...formData, budgetRange: budget })}
                              className={`px-4 py-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-between ${
                                formData.budgetRange === budget
                                  ? 'bg-vks-primary/20 border-vks-primary text-white font-medium'
                                  : 'bg-vks-black/60 border-vks-white/10 text-vks-white/75 hover:border-vks-white/30'
                              }`}
                            >
                              <span>{budget}</span>
                              {formData.budgetRange === budget && (
                                <CheckCircle2 className="w-4 h-4 text-vks-primaryGlow shrink-0" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Conte-nos brevemente sobre o desafio ou objetivo (Opcional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.projectDetails}
                        onChange={(e) =>
                          setFormData({ ...formData, projectDetails: e.target.value })
                        }
                        placeholder="Ex: Controlamos 4 obras em planilhas e queremos um sistema de medições com app para os mestres de obra..."
                        className="w-full rounded-2xl bg-vks-black/80 border border-vks-white/15 focus:border-vks-primary focus:outline-none p-4 text-sm text-white placeholder:text-vks-white/40"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-vks-surface text-vks-white hover:text-white text-sm font-medium"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Voltar</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-vks-primary hover:bg-vks-primaryGlow text-vks-onPrimary font-semibold text-sm shadow-vks-glow transition-all"
                      >
                        <span>Último Passo: Dados para Envio</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Dados de Contato & Disparo do E-mail de Confirmação */}
                {step === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono uppercase text-vks-white/70 mb-2">
                          Seu Nome Completo *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-vks-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({ ...formData, fullName: e.target.value })
                            }
                            placeholder="Ex: Kauê Victor"
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-vks-black/80 border border-vks-white/15 focus:border-vks-primary focus:outline-none text-sm text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-vks-white/70 mb-2">
                          E-mail Corporativo (Para Confirmação) *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-vks-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="voce@suaempresa.com.br"
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-vks-black/80 border border-vks-white/15 focus:border-vks-primary focus:outline-none text-sm text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-vks-white/70 mb-2">
                          WhatsApp com DDD *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-vks-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder="(11) 99999-9999"
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-vks-black/80 border border-vks-white/15 focus:border-vks-primary focus:outline-none text-sm text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-vks-white/70 mb-2">
                          Empresa / Projeto
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-vks-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) =>
                              setFormData({ ...formData, company: e.target.value })
                            }
                            placeholder="Construtora, imobiliária ou escritório"
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-vks-black/80 border border-vks-white/15 focus:border-vks-primary focus:outline-none text-sm text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Resumo Antes do Envio */}
                    <div className="p-4 rounded-2xl bg-vks-black/60 border border-vks-primary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <span className="text-vks-white/60 block">Escopo selecionado:</span>
                        <strong className="text-white font-mono">{formData.solutionPillar}</strong>
                      </div>
                      <div className="flex items-center gap-2 text-vks-success font-mono">
                        <MailCheck className="w-4 h-4" />
                        <span>Disparo automático de confirmação habilitado</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-vks-surface text-vks-white hover:text-white text-sm font-medium"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Voltar</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-vks-primary hover:bg-vks-primaryGlow disabled:opacity-60 text-vks-onPrimary font-semibold text-base shadow-vks-glow hover:shadow-vks-glow-lg transition-all"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Gerando Protocolo & Enviando E-mail...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Receber Confirmação por E-mail & Iniciar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          ) : (
            /* TELA DE SUCESSO COM COMPROVANTE DE E-MAIL DE CONFIRMAÇÃO + INTEGRAÇÃO WHATSAPP */
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-vks-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-vks-success shrink-0">
                    <MailCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-vks-success uppercase tracking-wider">
                      SOLICITAÇÃO REGISTRADA COM SUCESSO
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                      Confirmação enviada para {formData.email}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto">
                  <div className="px-4 py-2 rounded-xl bg-vks-black border border-vks-primary/40 font-mono text-xs text-vks-white">
                    Protocolo: <strong className="text-vks-primaryGlow">{result.protocolId}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyProtocol}
                    className="p-2.5 rounded-xl bg-vks-surface hover:bg-vks-primary text-white hover:text-vks-onPrimary transition-colors"
                    title="Copiar protocolo"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {copiedProtocol && (
                <p className="text-xs font-mono text-vks-success -mt-4">
                  ✓ Protocolo copiado para a área de transferência!
                </p>
              )}

              {/* Preview do E-mail de Confirmação Oficial VKS Soft */}
              <div className="rounded-2xl bg-vks-darkest border border-vks-white/15 overflow-hidden shadow-2xl">
                <div className="px-5 py-3 bg-vks-surface/80 border-b border-vks-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-vks-white/70">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-vks-primaryGlow" />
                    <span>De: engenharia@vkssoft.com.br</span>
                    <span className="text-vks-white/30">|</span>
                    <span>Para: {formData.email}</span>
                  </div>
                  <span>{result.submittedAt}</span>
                </div>

                <div className="p-6 sm:p-8 space-y-5 text-sm">
                  <div className="flex items-center justify-between">
                    <VksLogo className="h-9" showSubtitle={true} />
                    <span className="px-3 py-1 rounded-full bg-vks-primary/20 text-vks-primaryGlow font-mono text-xs">
                      #{result.protocolId}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <p className="text-white font-semibold text-base">
                      Olá, {formData.fullName}! Recebemos o escopo do seu projeto na VKS Soft.
                    </p>
                    <p className="text-vks-white/75 leading-relaxed">
                      Nosso time de arquitetura já recebeu os parâmetros técnicos da sua demanda. Abaixo está o resumo oficial registrado sob o protocolo{' '}
                      <strong className="text-white">{result.protocolId}</strong>:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-vks-black border border-vks-white/10 text-xs">
                    <div>
                      <span className="text-vks-white/50 block">Frente Principal</span>
                      <strong className="text-white mt-0.5 block">{formData.solutionPillar}</strong>
                    </div>
                    <div>
                      <span className="text-vks-white/50 block">Estágio Atual</span>
                      <strong className="text-white mt-0.5 block">{formData.projectStage}</strong>
                    </div>
                    <div>
                      <span className="text-vks-white/50 block">Investimento Previsto</span>
                      <strong className="text-vks-primaryGlow mt-0.5 block">{formData.budgetRange}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-vks-white/60">
                    Um especialista entrará em contato em até 2 horas úteis. Caso queira priorizar o atendimento agora mesmo, clique no botão abaixo para abrir o WhatsApp já com o seu protocolo preenchido.
                  </p>
                </div>
              </div>

              {/* Ações Finais: WhatsApp Imediato ou Novo Diagnóstico */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setStep(1);
                  }}
                  className="px-5 py-3.5 rounded-xl bg-vks-surface text-vks-white/80 hover:text-white text-sm font-medium"
                >
                  Enviar outra solicitação
                </button>

                <a
                  href={result.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-[#111014] font-bold text-base shadow-lg transition-all"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Priorizar Atendimento no WhatsApp Agora</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
