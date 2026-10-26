import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const gmailUser = (process.env.GMAIL_USER || '').trim();
  const gmailPass = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
  const internalRecipient = (process.env.VKS_INTERNAL_NOTIFICATION_EMAIL || gmailUser).trim();

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const {
      protocolId,
      submittedAt,
      fullName,
      email,
      phone,
      company,
      solutionPillar,
      projectStage,
      budgetRange,
      projectDetails,
    } = payload;

    if (
      !gmailUser ||
      !gmailPass ||
      gmailUser === 'seuemail@gmail.com' ||
      gmailPass === 'xxxxxxxxxxxxxxxx'
    ) {
      return res.status(200).json({
        ok: false,
        reason: 'missing_credentials',
        message: 'Defina GMAIL_USER e GMAIL_APP_PASSWORD nas Environment Variables da Vercel',
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const clientHtml = `
      <div style="font-family: 'Segoe UI', Roboto, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; background-color: #1B1A1F; color: #E2E2E2; border-radius: 16px; overflow: hidden; border: 1px solid rgba(80, 27, 237, 0.4);">
        <div style="background: linear-gradient(135deg, #501BED 0%, #360EB5 100%); padding: 28px 32px;">
          <div style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #E2E2E2; opacity: 0.9;">
            VKS SOFT • ENGENHARIA DE SOFTWARE
          </div>
          <h1 style="margin: 8px 0 0; font-size: 22px; color: #FFFFFF;">
            Diagnóstico Recebido • Protocolo #${protocolId}
          </h1>
        </div>

        <div style="padding: 32px;">
          <p style="font-size: 16px; color: #FFFFFF; margin-top: 0;">
            Olá, <strong>${fullName}</strong>!
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #E2E2E2;">
            Confirmamos o recebimento dos parâmetros técnicos do seu projeto na <strong>VKS Soft</strong>. Nosso time de arquitetura já está analisando o escopo abaixo:
          </p>

          <div style="background-color: #141317; border: 1px solid rgba(226, 226, 226, 0.12); border-radius: 12px; padding: 20px; margin: 24px 0;">
            <p style="margin: 6px 0; font-size: 13px;"><strong style="color: #9B7BFF;">Protocolo:</strong> ${protocolId}</p>
            <p style="margin: 6px 0; font-size: 13px;"><strong style="color: #9B7BFF;">Empresa:</strong> ${company || 'Não informada'}</p>
            <p style="margin: 6px 0; font-size: 13px;"><strong style="color: #9B7BFF;">Frente Principal:</strong> ${solutionPillar}</p>
            <p style="margin: 6px 0; font-size: 13px;"><strong style="color: #9B7BFF;">Momento do Projeto:</strong> ${projectStage}</p>
            <p style="margin: 6px 0; font-size: 13px;"><strong style="color: #9B7BFF;">Investimento Estimado:</strong> ${budgetRange}</p>
            ${
              projectDetails
                ? `<p style="margin: 12px 0 0; padding-top: 12px; border-top: 1px solid rgba(226,226,226,0.1); font-size: 13px;"><strong style="color: #9B7BFF;">Detalhes:</strong><br/>${projectDetails}</p>`
                : ''
            }
          </div>

          <p style="font-size: 13px; line-height: 1.6; color: #CFCFCF;">
            Um especialista entrará em contato em breve pelo seu WhatsApp (<strong>${phone}</strong>) ou por este e-mail.
          </p>
        </div>

        <div style="padding: 18px 32px; background-color: #141317; font-size: 12px; color: #8E8C99; text-align: center;">
          © ${new Date().getFullYear()} VKS Soft • Registrado em ${submittedAt}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"VKS Soft | Engenharia" <${gmailUser}>`,
      to: email,
      subject: `[VKS Soft] Confirmação de Diagnóstico Técnico (#${protocolId})`,
      html: clientHtml,
    });

    if (internalRecipient) {
      await transporter.sendMail({
        from: `"VKS Lead Bot" <${gmailUser}>`,
        to: internalRecipient,
        replyTo: email,
        subject: `🚀 Novo Lead VKS Soft: ${fullName} (${company || solutionPillar}) - #${protocolId}`,
        html: clientHtml,
      });
    }

    return res.status(200).json({ ok: true, mode: 'gmail_smtp' });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : 'Unknown SMTP error';
    console.error('[VKS Gmail SMTP Error]:', errMessage);
    return res.status(500).json({ ok: false, error: errMessage });
  }
}
