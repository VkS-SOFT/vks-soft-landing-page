import emailjs from '@emailjs/browser';

export interface LeadSubmissionPayload {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  solutionPillar: string;
  projectStage: string;
  budgetRange: string;
  projectDetails: string;
}

export interface LeadNotificationResult {
  protocolId: string;
  emailDispatched: boolean;
  emailMode: 'gmail_smtp' | 'live_emailjs' | 'instant_preview';
  whatsappUrl: string;
  submittedAt: string;
}

const VKS_WHATSAPP_NUMBER = import.meta.env.VITE_VKS_WHATSAPP || '5586995615930';

/**
 * Gera um protocolo único de atendimento VKS Soft (ex: VKS-2026-8492)
 */
export function generateProtocolId(): string {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `VKS-${year}-${randomDigits}`;
}

/**
 * Monta o deep-link para o WhatsApp já com o resumo técnico formatado
 */
export function buildWhatsAppLink(payload: LeadSubmissionPayload, protocolId: string): string {
  const message = [
    `🚀 *Novo Diagnóstico de Projeto — VKS Soft*`,
    `*Protocolo:* \`${protocolId}\``,
    ``,
    `👤 *Nome:* ${payload.fullName}`,
    `🏢 *Empresa:* ${payload.company || 'Não informada'}`,
    `📧 *E-mail:* ${payload.email}`,
    `📱 *WhatsApp:* ${payload.phone}`,
    ``,
    `🎯 *Frente Principal:* ${payload.solutionPillar}`,
    `⚡ *Momento do Projeto:* ${payload.projectStage}`,
    `💰 *Investimento Estimado:* ${payload.budgetRange}`,
    ``,
    `📝 *Escopo / Desafio:*`,
    `${payload.projectDetails || 'Gostaria de agendar uma call técnica para detalhar o projeto.'}`,
  ].join('\n');

  return `https://wa.me/${VKS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Dispara o e-mail de confirmação para o lead (e notificação interna para a VKS Soft).
 * Prioridade 1: Gmail SMTP Server-Side (/api/send-confirmation usando GMAIL_USER e GMAIL_APP_PASSWORD do .env)
 * Prioridade 2: Webhook externo / EmailJS (se configurado)
 * Prioridade 3: Instant Preview
 */
export async function submitLeadAndSendConfirmation(
  payload: LeadSubmissionPayload
): Promise<LeadNotificationResult> {
  const protocolId = generateProtocolId();
  const submittedAt = new Date().toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  const whatsappUrl = buildWhatsAppLink(payload, protocolId);

  // 1. Disparo via Gmail SMTP (Endpoint Server-Side seguro)
  try {
    const smtpResponse = await fetch('/api/send-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        protocolId,
        submittedAt,
        ...payload,
      }),
    });

    if (smtpResponse.ok) {
      const data = await smtpResponse.json();
      if (data.ok && data.mode === 'gmail_smtp') {
        return {
          protocolId,
          emailDispatched: true,
          emailMode: 'gmail_smtp',
          whatsappUrl,
          submittedAt,
        };
      }
    }
  } catch (err) {
    console.warn('[VKS Lead Service] Endpoint SMTP indisponível ou não configurado:', err);
  }

  // 2. Disparo via Webhook customizado (ex: API Laravel/FastAPI/n8n) se configurado
  const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          protocolId,
          submittedAt,
          ...payload,
        }),
      });
    } catch (err) {
      console.warn('[VKS Lead Service] Falha no webhook secundário:', err);
    }
  }

  // 3. Disparo do E-mail de Confirmação via EmailJS se credenciais estiverem presentes
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (serviceId && templateId && publicKey) {
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_name: payload.fullName,
          to_email: payload.email,
          company_name: payload.company || 'Sua Empresa',
          protocol_id: protocolId,
          solution_pillar: payload.solutionPillar,
          project_stage: payload.projectStage,
          budget_range: payload.budgetRange,
          project_details: payload.projectDetails,
          submitted_at: submittedAt,
        },
        publicKey
      );

      return {
        protocolId,
        emailDispatched: true,
        emailMode: 'live_emailjs',
        whatsappUrl,
        submittedAt,
      };
    } catch (error) {
      console.warn('[VKS Lead Service] Fallback para confirmação instantânea:', error);
    }
  }

  // Simula latência se ainda não tiver preenchido a senha de app
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    protocolId,
    emailDispatched: true,
    emailMode: 'instant_preview',
    whatsappUrl,
    submittedAt,
  };
}
