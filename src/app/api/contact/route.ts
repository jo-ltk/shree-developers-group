import { NextResponse } from "next/server";
import { Resend } from "resend";
import { COMPANY_CONTACT } from "@/lib/contact";

type ContactBody = {
  name?: string;
  phone?: string;
  email?: string;
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

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (!name || !phone || !email) {
    return NextResponse.json(
      { error: "Name, phone, and email are required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL ??
    "Shree Developers Group <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return NextResponse.json(
      {
        error:
          "Our enquiry form is temporarily unavailable. Please email or call us directly.",
      },
      { status: 503 },
    );
  }

  const subjectParts = ["Website enquiry"];
  if (body.projectTitle?.trim()) {
    subjectParts.push(`— ${body.projectTitle.trim()}`);
  } else if (body.source?.trim()) {
    subjectParts.push(`— ${body.source.trim()}`);
  }

  const html = `
    <h2>New website enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${body.callbackTime ? `<p><strong>Preferred callback:</strong> ${escapeHtml(body.callbackTime)}</p>` : ""}
    ${body.callbackMethod ? `<p><strong>Callback method:</strong> ${escapeHtml(body.callbackMethod)}</p>` : ""}
    ${body.projectTitle ? `<p><strong>Project:</strong> ${escapeHtml(body.projectTitle)}</p>` : ""}
    ${body.source ? `<p><strong>Source:</strong> ${escapeHtml(body.source)}</p>` : ""}
  `.trim();

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: COMPANY_CONTACT.email,
    replyTo: email,
    subject: subjectParts.join(" "),
    html,
  });

  if (error) {
    console.error("[contact] Resend error:", JSON.stringify(error));
    return NextResponse.json(
      { error: "We could not send your enquiry. Please try again or contact us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
