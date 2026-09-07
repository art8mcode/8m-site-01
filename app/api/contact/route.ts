import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_REQUEST_BYTES = 8_000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 4_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SERVICES = new Set([
  'Marketing',
  'Reels Production',
  'Marketing + Reels Production',
  'Produkcja Reels',
  'Marketing + Produkcja Reels',
]);

type ContactSubmission = {
  name: string;
  email: string;
  service: string;
  message: string;
  companyWebsite: string;
};

function jsonError(error: string, status: number) {
  return Response.json({ error }, { status });
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character] ?? character,
  );
}

function validateSubmission(data: unknown): ContactSubmission | null {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;

  const input = data as Record<string, unknown>;
  if (
    typeof input.name !== 'string' ||
    typeof input.email !== 'string' ||
    typeof input.service !== 'string' ||
    typeof input.message !== 'string' ||
    (input.companyWebsite !== undefined &&
      typeof input.companyWebsite !== 'string')
  )
    return null;

  const submission = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    service: input.service.trim(),
    message: input.message.trim(),
    companyWebsite: input.companyWebsite?.trim() ?? '',
  };

  if (
    !submission.name ||
    submission.name.length > MAX_NAME_LENGTH ||
    /[\r\n]/.test(submission.name) ||
    !submission.email ||
    submission.email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_PATTERN.test(submission.email) ||
    !submission.message ||
    submission.message.length > MAX_MESSAGE_LENGTH ||
    (submission.service && !ALLOWED_SERVICES.has(submission.service)) ||
    submission.companyWebsite.length > 200
  )
    return null;

  return submission;
}

function createLeadContent(submission: ContactSubmission) {
  const service = submission.service || 'Not specified';
  const safeName = escapeHtml(submission.name);
  const safeEmail = escapeHtml(submission.email);
  const safeService = escapeHtml(service);
  const safeMessage = escapeHtml(submission.message).replace(/\r?\n/g, '<br>');

  return {
    subject: submission.service
      ? `New 8M Lead — ${submission.service}`
      : 'New 8M Lead',
    text: [
      '8M STUDIO',
      'NEW PROJECT REQUEST',
      '',
      'Name',
      submission.name,
      '',
      'Email',
      submission.email,
      '',
      'Interested in',
      service,
      '',
      'Project',
      submission.message,
      '',
      '---',
      'Submitted from: 8M Studio Website',
      'Reply directly to this email to contact the lead.',
    ].join('\n'),
    html: `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f4f4f4;color:#111;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:600px;margin:0 auto;padding:32px 20px">
      <div style="background:#fff;border:1px solid #ddd;border-radius:18px;padding:28px">
        <div style="font-size:12px;letter-spacing:.12em;color:#666">8M STUDIO</div>
        <h1 style="margin:10px 0 28px;font-size:28px;line-height:1.1">New project request</h1>
        <p style="margin:0 0 20px"><strong style="display:block;font-size:12px;color:#666">Name</strong><span style="font-size:17px">${safeName}</span></p>
        <p style="margin:0 0 20px"><strong style="display:block;font-size:12px;color:#666">Email</strong><a href="mailto:${safeEmail}" style="font-size:17px;color:#111">${safeEmail}</a></p>
        <p style="margin:0 0 20px"><strong style="display:block;font-size:12px;color:#666">Interested in</strong><span style="font-size:17px">${safeService}</span></p>
        <div style="margin:0 0 26px"><strong style="display:block;margin-bottom:5px;font-size:12px;color:#666">Project</strong><div style="font-size:17px;line-height:1.5">${safeMessage}</div></div>
        <div style="padding-top:20px;border-top:1px solid #ddd;font-size:13px;line-height:1.55;color:#666">Submitted from: 8M Studio Website<br>Reply directly to this email to contact the lead.</div>
      </div>
    </div>
  </body>
</html>`,
  };
}

const confirmationText = `Дякуємо за заявку.

Ми отримали інформацію про ваш проєкт і ознайомимося з деталями.

Повернемося з відповіддю найближчим часом.

8M Studio
Marketing & Production`;

const confirmationHtml = `<!doctype html>
<html lang="uk">
  <body style="margin:0;background:#f4f4f4;color:#111;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:600px;margin:0 auto;padding:32px 20px">
      <div style="background:#fff;border:1px solid #ddd;border-radius:18px;padding:28px">
        <div style="font-size:12px;letter-spacing:.12em;color:#666">8M STUDIO</div>
        <h1 style="margin:10px 0 24px;font-size:28px;line-height:1.1">Дякуємо за заявку.</h1>
        <p style="margin:0 0 16px;font-size:17px;line-height:1.5">Ми отримали інформацію про ваш проєкт і ознайомимося з деталями.</p>
        <p style="margin:0 0 28px;font-size:17px;line-height:1.5">Повернемося з відповіддю найближчим часом.</p>
        <div style="padding-top:20px;border-top:1px solid #ddd;font-size:14px;line-height:1.55;color:#666">8M Studio<br>Marketing &amp; Production</div>
      </div>
    </div>
  </body>
</html>`;

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin)
    return jsonError('Недозволений запит.', 403);

  const contentType = request.headers
    .get('content-type')
    ?.split(';', 1)[0]
    .trim()
    .toLowerCase();
  if (contentType !== 'application/json')
    return jsonError('Очікується JSON-запит.', 415);

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_REQUEST_BYTES)
    return jsonError('Повідомлення занадто довге.', 413);

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return jsonError('Некоректний запит.', 400);
  }

  const submission = validateSubmission(data);
  if (!submission)
    return jsonError('Перевірте ім’я, email, послугу та опис проєкту.', 400);

  // Bots commonly fill this visually hidden field. Respond without sending mail
  // so the form does not reveal the anti-spam rule.
  if (submission.companyWebsite) return Response.json({ ok: true });

  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '');
  const leadRecipient = process.env.LEAD_RECIPIENT?.trim();
  if (
    !gmailUser ||
    !EMAIL_PATTERN.test(gmailUser) ||
    !gmailAppPassword ||
    !leadRecipient ||
    !EMAIL_PATTERN.test(leadRecipient)
  ) {
    console.error('Contact form email configuration is incomplete.');
    return jsonError('Сервіс надсилання тимчасово недоступний.', 503);
  }

  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailAppPassword },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    tls: { minVersion: 'TLSv1.2', servername: 'smtp.gmail.com' },
  });
  const from = `8M Studio <${gmailUser}>`;
  const lead = createLeadContent(submission);

  try {
    await transport.sendMail({
      from,
      to: leadRecipient,
      replyTo: submission.email,
      subject: lead.subject,
      text: lead.text,
      html: lead.html,
    });
  } catch {
    console.error('Contact form lead delivery failed.');
    return jsonError('Не вдалося надіслати заявку.', 502);
  }

  try {
    await transport.sendMail({
      from,
      to: submission.email,
      subject: '8M — заявку отримано',
      text: confirmationText,
      html: confirmationHtml,
    });
  } catch {
    // The lead is already safe in the 8M inbox, so confirmation failure must not
    // turn a successful application into a duplicate-prone retry.
    console.error('Contact form visitor confirmation delivery failed.');
  }

  return Response.json({ ok: true });
}
