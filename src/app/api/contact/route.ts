import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const name = String(data?.name || "").trim();
    const email = String(data?.email || "").trim();
    const message = String(data?.message || "").trim();
    const projectType = Array.isArray(data?.projectType) ? data.projectType : [];

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY || "";
    const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const to = process.env.TO_EMAIL || "yashbharvada4@gmail.com";

    const resend = new Resend(apiKey);
    const subject = `New inquiry from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\nLooking for: ${projectType.join(", ")}\n\nMessage:\n${message}`;

    const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c] || c));
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${escape(subject)}</title></head><body style="margin:0;padding:0;background:#0a0a0a;color:#111;font-family:Inter,Segoe UI,Roboto,Arial,sans-serif;"><div style="max-width:600px;margin:0 auto;background:#ffffff;color:#111;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;"><div style="padding:20px 24px;border-bottom:1px solid #e5e7eb;"><h1 style="margin:0;font-size:20px;line-height:28px;color:#111;">New Inquiry</h1><p style="margin:6px 0 0;font-size:14px;color:#6b7280;">${escape(subject)}</p></div><div style="padding:20px 24px;"><p style="margin:0 0 16px;font-size:16px;color:#111;">Dear <strong>Yash Bharvada</strong>,</p><p style="margin:0 0 20px;font-size:14px;color:#111;">You received a new message via your portfolio contact form. Details are below:</p><div style="margin:0 0 14px;"><div style="font-size:14px;color:#374151;margin-bottom:6px;">Name</div><div style="font-size:16px;color:#111;"><strong>${escape(name)}</strong></div></div><div style="margin:0 0 14px;"><div style="font-size:14px;color:#374151;margin-bottom:6px;">Email</div><div style="font-size:16px;color:#111;"><strong>${escape(email)}</strong></div></div><div style="margin:0 0 14px;"><div style="font-size:14px;color:#374151;margin-bottom:6px;">Selected Items</div><div style="font-size:16px;color:#111;"><strong>${escape(projectType.join(', ') || '—')}</strong></div></div><div style="margin:0 0 6px;"><div style="font-size:14px;color:#374151;margin-bottom:6px;">Brief Description</div><div style="font-size:16px;color:#111;line-height:1.5;"><strong>${escape(message)}</strong></div></div><p style="margin:16px 0 0;font-size:14px;color:#111;">Best regards,<br/><strong>${escape(name)}</strong></p></div><div style="padding:16px 24px;border-top:1px solid #e5e7eb;background:#f9fafb;color:#374151;"><p style="margin:0;font-size:12px;">Reply to this email to contact the sender: <strong>${escape(email)}</strong></p><p style="margin:8px 0 0;font-size:12px;">Sent from Portfolio</p></div></div></body></html>`;

    const result = await resend.emails.send({ to, from, subject, html, text, replyTo: email });

    return new Response(JSON.stringify({ ok: true, id: result?.data?.id || "" }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "Send failed" }), { status: 500 });
  }
}
