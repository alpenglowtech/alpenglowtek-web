/**
 * ============================================
 * Alpenglow Tek — Contact Form Cloudflare Worker
 * ============================================
 *
 * 部署方式：
 *   1. 安裝 wrangler: npm install -g wrangler
 *   2. 登入: wrangler login
 *   3. 設定 Secrets (不要把 key 直接寫在程式碼裡！):
 *        wrangler secret put RESEND_API_KEY
 *        wrangler secret put TURNSTILE_SECRET_KEY
 *   4. 部署: wrangler deploy
 *   5. 把 Worker URL 更新到 main.js 的 CONTACT_API_URL 常數
 *
 * Environment Variables (在 wrangler.toml 或 Cloudflare Dashboard 設定):
 *   RESEND_API_KEY         — Resend.com API Key (re_xxxx...)
 *   TURNSTILE_SECRET_KEY   — Cloudflare Turnstile Secret Key
 *   RECIPIENT_EMAIL        — 收件人 Email (預設 phyllis_huang@alpenglowtek.com)
 *   FROM_EMAIL             — 寄件人 Email (必須是 Resend 驗證過的域名)
 *   ALLOWED_ORIGIN         — 允許的前端網域 (e.g. https://alpenglowtek.com)
 */

const CATEGORY_LABELS = {
  sales:  '銷售｜報價與採購',
  tech:   '技術合作',
  invest: '投資',
  media:  '媒體與活動',
  other:  '其他',
};

export default {
  async fetch(request, env) {
    // ── CORS ──
    const allowedOrigin = env.ALLOWED_ORIGIN || '*';
    const corsHeaders = {
      'Access-Control-Allow-Origin':  allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ ok: false, message: 'Method Not Allowed' }, 405, corsHeaders);
    }

    // ── Parse Body ──
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ ok: false, message: 'Invalid JSON' }, 400, corsHeaders);
    }

    const { name, title, company, email, phone, country, category, message, captchaToken } = body;

    // ── Basic server-side validation ──
    if (!name || !company || !email || !country || !category || !message || !captchaToken) {
      return jsonResponse({ ok: false, message: 'Missing required fields' }, 400, corsHeaders);
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      return jsonResponse({ ok: false, message: 'Invalid email format' }, 400, corsHeaders);
    }

    // ── Cloudflare Turnstile Verification ──
    const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret:   env.TURNSTILE_SECRET_KEY,
        response: captchaToken,
        remoteip: request.headers.get('CF-Connecting-IP') || undefined,
      }),
    });
    const turnstileData = await turnstileRes.json();

    if (!turnstileData.success) {
      console.error('Turnstile verification failed:', turnstileData);
      return jsonResponse({ ok: false, error: 'captcha_failed', message: 'CAPTCHA verification failed' }, 422, corsHeaders);
    }

    // ── Build Email HTML ──
    const recipientEmail = env.RECIPIENT_EMAIL || 'phyllis_huang@alpenglowtek.com';
    const fromEmail      = env.FROM_EMAIL      || 'contact@alpenglowtek.com';
    const categoryLabel  = CATEGORY_LABELS[category] || category;

    const htmlBody = `
<!DOCTYPE html>
<html lang="zh-TW">
<head><meta charset="UTF-8"><title>新聯絡表單訊息</title></head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; background: #f4f8ff; margin: 0; padding: 24px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr>
      <td style="background:#004aad;border-radius:12px 12px 0 0;padding:28px 32px;">
        <h1 style="color:#fff;font-size:1.4rem;margin:0;font-weight:800;">臻至科技 — 新聯絡表單</h1>
        <p style="color:rgba(255,255,255,0.65);font-size:0.85rem;margin:4px 0 0;">Alpenglow Tek Contact Form</p>
      </td>
    </tr>
    <tr>
      <td style="background:#fff;border:1px solid #e0e8f8;border-top:none;border-radius:0 0 12px 12px;padding:32px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row('姓名', escHtml(name))}
          ${title ? row('職稱', escHtml(title)) : ''}
          ${row('所屬公司', escHtml(company))}
          ${row('Email', `<a href="mailto:${escHtml(email)}" style="color:#004aad;">${escHtml(email)}</a>`)}
          ${phone ? row('聯絡電話', escHtml(phone)) : ''}
          ${row('國家', escHtml(country))}
          ${row('需求類別', escHtml(categoryLabel))}
        </table>
        <div style="margin-top:20px;padding:16px 20px;background:#f4f8ff;border-left:4px solid #2fe8fa;border-radius:4px;">
          <p style="font-size:0.78rem;font-weight:700;color:#004aad;margin:0 0 8px;text-transform:uppercase;letter-spacing:.06em;">訊息內容</p>
          <p style="color:#3a4a6b;font-size:0.95rem;line-height:1.8;margin:0;white-space:pre-wrap;">${escHtml(message)}</p>
        </div>
        <p style="font-size:0.75rem;color:#8a9bc4;margin-top:24px;text-align:center;">
          此郵件由臻至科技官網聯絡表單自動發送 · ${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // ── Send via Resend API ──
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from:    `臻至科技 Contact Form <${fromEmail}>`,
        to:      [recipientEmail],
        reply_to: email,
        subject: `[網站聯絡] ${categoryLabel} — ${name} (${company})`,
        html:    htmlBody,
      }),
    });

    if (!resendRes.ok) {
      const errData = await resendRes.json().catch(() => ({}));
      console.error('Resend API error:', errData);
      return jsonResponse({ ok: false, message: 'Email delivery failed', detail: errData }, 500, corsHeaders);
    }

    return jsonResponse({ ok: true, message: 'Email sent successfully' }, 200, corsHeaders);
  },
};

/* ── Helpers ── */
function jsonResponse(data, status, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label, value) {
  return `
  <tr>
    <td style="padding:8px 0;border-bottom:1px solid #eef2fa;width:30%;vertical-align:top;">
      <span style="font-size:0.78rem;font-weight:700;color:#6b7ba0;text-transform:uppercase;letter-spacing:.05em;">${label}</span>
    </td>
    <td style="padding:8px 0 8px 16px;border-bottom:1px solid #eef2fa;vertical-align:top;">
      <span style="font-size:0.92rem;color:#061a3a;font-weight:500;">${value}</span>
    </td>
  </tr>`;
}
