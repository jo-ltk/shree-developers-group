import { COMPANY_CONTACT } from "@/lib/contact";

export type ContactEnquiryEmailData = {
  name: string;
  phone: string;
  email: string;
  callbackTime?: string;
  callbackMethod?: string;
  projectTitle?: string;
  source?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/^https?:\/\//, "")}`;
  }

  return "https://shreedevelopersgroup.com";
}

function detailRow(label: string, value: string, options?: { href?: string }) {
  const safeValue = escapeHtml(value);
  const valueCell = options?.href
    ? `<a href="${escapeHtml(options.href)}" class="value-link" style="color:#D43F33;text-decoration:none;font-weight:500;">${safeValue}</a>`
    : `<span style="color:#1C1208;font-weight:500;">${safeValue}</span>`;

  return `
    <tr class="detail-row">
      <td class="detail-label" style="padding:16px 0 6px;border-bottom:1px solid rgba(28,18,8,0.08);width:34%;vertical-align:top;">
        <span class="label-text" style="font-family:'Montserrat',Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(28,18,8,0.45);">${escapeHtml(label)}</span>
      </td>
      <td class="detail-value" style="padding:6px 0 16px 20px;border-bottom:1px solid rgba(28,18,8,0.08);vertical-align:top;">
        <span class="value-text" style="font-family:'Montserrat',Arial,sans-serif;font-size:15px;line-height:1.5;">${valueCell}</span>
      </td>
    </tr>
  `.trim();
}

const RESPONSIVE_STYLES = `
  body, table, td, p, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }

  .email-card { width: 100%; max-width: 640px; }
  .desktop-meta-sep { display: inline; }
  .mobile-meta-break { display: none; }

  @media only screen and (max-width: 620px) {
    .email-shell { padding: 12px 8px !important; }
    .email-card { max-width: 100% !important; border-left: 0 !important; border-right: 0 !important; }
    .header-pad { padding: 22px 16px 18px !important; }
    .logo-img { max-width: 148px !important; width: 148px !important; }
    .rust-line { width: 52px !important; margin: 16px auto 14px !important; }
    .title-text { font-size: 24px !important; line-height: 1.15 !important; }
    .meta-text { font-size: 10px !important; letter-spacing: 0.06em !important; line-height: 1.7 !important; }
    .desktop-meta-sep { display: none !important; }
    .mobile-meta-break { display: block !important; height: 4px !important; }
    .section-pad { padding: 6px 12px 18px !important; }
    .detail-pad { padding: 14px 14px 4px !important; }
    .details-heading { font-size: 11px !important; margin-bottom: 10px !important; }
    .detail-row { display: block !important; width: 100% !important; }
    .detail-label,
    .detail-value {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      border-bottom: none !important;
    }
    .detail-label { padding: 14px 0 4px !important; }
    .detail-value { padding: 0 0 14px !important; border-bottom: 1px solid rgba(28,18,8,0.08) !important; }
    .label-text { font-size: 10px !important; }
    .value-text { font-size: 16px !important; line-height: 1.45 !important; }
    .reply-pad { padding: 0 12px 18px !important; }
    .reply-copy { font-size: 14px !important; line-height: 1.65 !important; }
    .footer-pad { padding: 20px 16px !important; }
    .footer-title { font-size: 20px !important; }
    .footer-tagline { font-size: 10px !important; margin-bottom: 12px !important; }
    .footer-links { font-size: 13px !important; line-height: 1.9 !important; }
    .footer-sep { display: none !important; }
    .footer-link-block { display: block !important; margin-top: 4px !important; }
  }

  @media only screen and (min-width: 621px) {
    .email-shell { padding: 36px 20px !important; }
    .header-pad { padding: 40px 40px 30px !important; }
    .logo-img { max-width: 240px !important; width: 240px !important; }
    .rust-line { width: 80px !important; margin: 24px auto 20px !important; }
    .title-text { font-size: 38px !important; }
    .meta-text { font-size: 12px !important; }
    .section-pad { padding: 10px 40px 32px !important; }
    .detail-pad { padding: 22px 28px 10px !important; }
    .detail-label { padding: 18px 0 !important; }
    .detail-value { padding: 18px 0 18px 24px !important; }
    .value-text { font-size: 15px !important; }
    .reply-pad { padding: 0 40px 32px !important; }
    .reply-copy { font-size: 13px !important; }
    .footer-pad { padding: 28px 40px !important; }
    .footer-title { font-size: 24px !important; }
    .footer-tagline { font-size: 11px !important; }
    .footer-links { font-size: 12px !important; }
    .footer-link-block { display: inline !important; }
  }
`.trim();

export function buildContactEnquiryEmailHtml(data: ContactEnquiryEmailData) {
  const siteUrl = getSiteUrl();
  const logoUrl = `${siteUrl}/images/logo-black.png`;
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const contextLabel = data.projectTitle?.trim() || data.source?.trim() || "Website form";

  const rows = [
    detailRow("Name", data.name),
    detailRow("Phone", data.phone, { href: `tel:${data.phone.replace(/\s/g, "")}` }),
    detailRow("Email", data.email, { href: `mailto:${data.email}` }),
  ];

  if (data.callbackTime?.trim()) {
    rows.push(detailRow("Preferred callback", data.callbackTime.trim()));
  }

  if (data.callbackMethod?.trim()) {
    rows.push(detailRow("Callback method", data.callbackMethod.trim()));
  }

  if (data.projectTitle?.trim()) {
    rows.push(detailRow("Project", data.projectTitle.trim()));
  }

  if (data.source?.trim()) {
    rows.push(detailRow("Source", data.source.trim()));
  }

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>New website enquiry</title>
    <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
    <![endif]-->
    <style type="text/css">
      ${RESPONSIVE_STYLES}
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#EDE8DF;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#EDE8DF;">
      <tr>
        <td align="center" class="email-shell" style="padding:36px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="email-card" style="max-width:640px;background-color:#F5F0E8;border:1px solid rgba(28,18,8,0.1);">
            <tr>
              <td class="header-pad" style="padding:40px 40px 30px;text-align:center;background-color:#F5F0E8;">
                <a href="${escapeHtml(siteUrl)}" style="text-decoration:none;display:inline-block;">
                  <img
                    src="${escapeHtml(logoUrl)}"
                    alt="Shree Developers Group"
                    width="240"
                    class="logo-img"
                    style="display:block;margin:0 auto;max-width:240px;width:100%;height:auto;border:0;"
                  />
                </a>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="80" class="rust-line" style="margin:24px auto 20px;">
                  <tr>
                    <td style="height:2px;background-color:#D43F33;font-size:0;line-height:0;">&nbsp;</td>
                  </tr>
                </table>
                <p class="title-text" style="margin:0 0 10px;font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:38px;line-height:1.1;font-weight:400;color:#1C1208;">
                  New Website Enquiry
                </p>
                <p class="meta-text" style="margin:0;font-family:'Montserrat',Arial,sans-serif;font-size:12px;line-height:1.6;letter-spacing:0.08em;text-transform:uppercase;color:rgba(28,18,8,0.45);">
                  ${escapeHtml(contextLabel)}
                  <span class="desktop-meta-sep"> &middot; </span>
                  <span class="mobile-meta-break"></span>
                  ${escapeHtml(submittedAt)} ET
                </p>
              </td>
            </tr>

            <tr>
              <td class="section-pad" style="padding:10px 40px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFFFFF;border:1px solid rgba(28,18,8,0.08);">
                  <tr>
                    <td class="detail-pad" style="padding:22px 28px 10px;">
                      <p class="details-heading" style="margin:0 0 14px;font-family:'Montserrat',Arial,sans-serif;font-size:12px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#D43F33;">
                        Enquiry Details
                      </p>
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        ${rows.join("")}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="reply-pad" style="padding:0 40px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:rgba(212,63,51,0.06);border-left:3px solid #D43F33;">
                  <tr>
                    <td style="padding:16px 18px;">
                      <p class="reply-copy" style="margin:0;font-family:'Montserrat',Arial,sans-serif;font-size:13px;line-height:1.6;color:rgba(28,18,8,0.72);">
                        Reply directly to this email to reach <strong style="color:#1C1208;">${escapeHtml(data.name)}</strong> at
                        <a href="mailto:${escapeHtml(data.email)}" style="color:#D43F33;text-decoration:none;font-weight:600;">${escapeHtml(data.email)}</a>.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="footer-pad" style="padding:28px 40px;background-color:#1C1208;text-align:center;">
                <p class="footer-title" style="margin:0 0 6px;font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:24px;line-height:1.2;color:#F5F0E8;">
                  Shree Developers Group
                </p>
                <p class="footer-tagline" style="margin:0 0 14px;font-family:'Montserrat',Arial,sans-serif;font-size:11px;line-height:1.6;letter-spacing:0.1em;text-transform:uppercase;color:rgba(245,240,232,0.55);">
                  Luxury Residential Communities &middot; Georgia
                </p>
                <p class="footer-links" style="margin:0;font-family:'Montserrat',Arial,sans-serif;font-size:12px;line-height:1.8;color:rgba(245,240,232,0.72);">
                  <a href="${escapeHtml(COMPANY_CONTACT.googleMapsUrl)}" style="color:#F5F0E8;text-decoration:none;">${escapeHtml(COMPANY_CONTACT.address)}</a><br />
                  <span class="footer-link-block">
                    <a href="tel:${escapeHtml(COMPANY_CONTACT.phoneE164)}" style="color:#D43F33;text-decoration:none;">${escapeHtml(COMPANY_CONTACT.phoneDisplay)}</a>
                    <span class="footer-sep">&nbsp;&middot;&nbsp;</span>
                    <a href="${escapeHtml(COMPANY_CONTACT.instagramUrl)}" style="color:#D43F33;text-decoration:none;">Instagram</a>
                  </span>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}
