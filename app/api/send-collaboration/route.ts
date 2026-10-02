import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  checkRateLimit,
  escapeHtml,
  isValidEmail,
  sanitizeText,
  verifyOrigin,
} from "@/lib/security";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // 1. Verify Origin (Anti-CSRF)
    if (!verifyOrigin(request)) {
      return NextResponse.json(
        { error: "Forbidden: Invalid request origin." },
        { status: 403 }
      );
    }

    // 2. Rate Limiting (5 requests per 10 minutes per IP)
    const rateLimit = checkRateLimit(request, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many requests. Please try again in ${rateLimit.resetInSec} seconds.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetInSec.toString(),
          },
        }
      );
    }

    // 3. Parse and Validate Body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    // 4. Honeypot check (bots that autofill hidden fields get rejected)
    if (body.website || body.company_fax) {
      return NextResponse.json({ success: true }); // Silently drop bot submissions
    }

    const { fullName, email, contactNo, purpose } = body;

    // Validate Required Fields
    if (!fullName || !email || !contactNo || !purpose) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Validate Email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 5. Sanitize & Escaped inputs (Prevent XSS / HTML Injection in Emails)
    const cleanFullName = sanitizeText(fullName, 100);
    const cleanEmail = email.trim().slice(0, 150);
    const cleanContactNo = sanitizeText(contactNo, 30);
    const cleanPurpose = sanitizeText(purpose, 3000);

    // 6. Send Email Safely
    const { data, error } = await resend.emails.send({
      from: "SIC Collaboration <onboarding@resend.dev>",
      to: [process.env.RECIPIENT_EMAIL || "your@email.com"],
      replyTo: cleanEmail,
      subject: `New Collaboration Proposal — ${cleanFullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
            .wrapper { max-width: 640px; margin: 32px auto; background: #fff; border: 1px solid #e0e4eb; }
            .header { background: #e65100; padding: 28px 32px; }
            .header h1 { color: #fff; margin: 0; font-size: 22px; font-family: Georgia, serif; }
            .header p { color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; }
            .body { padding: 28px 32px; }
            .section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #e65100; border-bottom: 1px solid #e0e4eb; padding-bottom: 6px; margin: 20px 0 14px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
            .field { margin-bottom: 2px; }
            .label { font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 3px; }
            .value { font-size: 14px; color: #1a1a2e; font-weight: 600; }
            .textarea-value { font-size: 13px; color: #1a1a2e; line-height: 1.7; background: #f5f7fa; padding: 10px 12px; border-left: 3px solid #e65100; margin-top: 4px; white-space: pre-wrap; }
            .footer { background: #f5f7fa; padding: 16px 32px; font-size: 11px; color: #9ca3af; border-top: 1px solid #e0e4eb; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <p>Startup &amp; Innovation Cell · ICFAI University Tripura</p>
              <h1>New Collaboration Proposal</h1>
            </div>
            <div class="body">

              <div class="section-label">Contact Details</div>
              <div class="grid">
                <div class="field">
                  <span class="label">Full Name</span>
                  <span class="value">${cleanFullName}</span>
                </div>
                <div class="field">
                  <span class="label">Contact Number</span>
                  <span class="value">${cleanContactNo}</span>
                </div>
                <div class="field">
                  <span class="label">Email Address</span>
                  <span class="value">${escapeHtml(cleanEmail)}</span>
                </div>
              </div>

              <div class="section-label">Purpose of Collaboration</div>
              <div class="field">
                <div class="textarea-value">${cleanPurpose}</div>
              </div>

            </div>
            <div class="footer">
              This email was auto-generated from the SIC collaboration form on the ICFAI University Tripura website.
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
