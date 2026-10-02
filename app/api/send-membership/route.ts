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

    const {
      fullName,
      idNo,
      program,
      year,
      phoneNo,
      whatsappNo,
      email,
      whySelect,
      valueBring,
      timeContribute,
      expectToLearn,
      previousClub,
      linkedin,
    } = body;

    // Validate Required Fields
    if (!fullName || !idNo || !program || !year || !phoneNo || !email) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
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
    const cleanIdNo = sanitizeText(idNo, 50);
    const cleanProgram = sanitizeText(program, 100);
    const cleanYear = sanitizeText(year, 50);
    const cleanPhoneNo = sanitizeText(phoneNo, 30);
    const cleanWhatsappNo = sanitizeText(whatsappNo || phoneNo, 30);
    const cleanEmail = email.trim().slice(0, 150);
    const cleanWhySelect = sanitizeText(whySelect, 2000);
    const cleanValueBring = sanitizeText(valueBring, 2000);
    const cleanTimeContribute = sanitizeText(timeContribute, 100);
    const cleanExpectToLearn = sanitizeText(expectToLearn, 2000);
    const cleanPreviousClub = sanitizeText(previousClub, 500);

    // Sanitize URL for LinkedIn
    let cleanLinkedin = "";
    if (linkedin && typeof linkedin === "string") {
      const trimmed = linkedin.trim();
      if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("linkedin.com") || trimmed.startsWith("www.linkedin.com")) {
        cleanLinkedin = sanitizeText(trimmed, 200);
      }
    }

    // 6. Send Email Safely
    const { data, error } = await resend.emails.send({
      from: "SIC Membership <onboarding@resend.dev>",
      to: [process.env.RECIPIENT_EMAIL || "your@email.com"],
      replyTo: cleanEmail,
      subject: `New Membership Application — ${cleanFullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
            .wrapper { max-width: 640px; margin: 32px auto; background: #fff; border: 1px solid #e0e4eb; }
            .header { background: #1a237e; padding: 28px 32px; }
            .header h1 { color: #fff; margin: 0; font-size: 22px; font-family: Georgia, serif; }
            .header p { color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; }
            .body { padding: 28px 32px; }
            .section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #e65100; border-bottom: 1px solid #e0e4eb; padding-bottom: 6px; margin: 20px 0 14px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
            .field { margin-bottom: 2px; }
            .label { font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 3px; }
            .value { font-size: 14px; color: #1a1a2e; font-weight: 600; }
            .textarea-value { font-size: 13px; color: #1a1a2e; line-height: 1.7; background: #f5f7fa; padding: 10px 12px; border-left: 3px solid #1a237e; margin-top: 4px; white-space: pre-wrap; }
            .footer { background: #f5f7fa; padding: 16px 32px; font-size: 11px; color: #9ca3af; border-top: 1px solid #e0e4eb; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <p>Startup &amp; Innovation Cell · ICFAI University Tripura</p>
              <h1>New Membership Application</h1>
            </div>
            <div class="body">

              <div class="section-label">Personal &amp; Academic Profile</div>
              <div class="grid">
                <div class="field">
                  <span class="label">Full Name</span>
                  <span class="value">${cleanFullName}</span>
                </div>
                <div class="field">
                  <span class="label">ID Number</span>
                  <span class="value">${cleanIdNo}</span>
                </div>
                <div class="field">
                  <span class="label">Program / Course</span>
                  <span class="value">${cleanProgram}</span>
                </div>
                <div class="field">
                  <span class="label">Year / Semester</span>
                  <span class="value">${cleanYear}</span>
                </div>
                <div class="field">
                  <span class="label">Phone Number</span>
                  <span class="value">${cleanPhoneNo}</span>
                </div>
                <div class="field">
                  <span class="label">WhatsApp Number</span>
                  <span class="value">${cleanWhatsappNo}</span>
                </div>
                <div class="field">
                  <span class="label">Email Address</span>
                  <span class="value">${escapeHtml(cleanEmail)}</span>
                </div>
              </div>

              <div class="section-label">Alignment &amp; Motivation</div>

              <div class="field" style="margin-bottom:12px">
                <span class="label">Why should we select you?</span>
                <div class="textarea-value">${cleanWhySelect}</div>
              </div>
              <div class="field" style="margin-bottom:12px">
                <span class="label">What value can you bring to the Cell?</span>
                <div class="textarea-value">${cleanValueBring}</div>
              </div>
              <div class="field" style="margin-bottom:12px">
                <span class="label">Time commitment per week</span>
                <div class="textarea-value">${cleanTimeContribute}</div>
              </div>
              <div class="field" style="margin-bottom:12px">
                <span class="label">What do you expect to learn?</span>
                <div class="textarea-value">${cleanExpectToLearn}</div>
              </div>
              <div class="field" style="margin-bottom:12px">
                <span class="label">Previous club / society membership</span>
                <div class="textarea-value">${cleanPreviousClub || "None"}</div>
              </div>
              <div class="field">
                <span class="label">LinkedIn Profile</span>
                <div class="textarea-value">${cleanLinkedin ? `<a href="${cleanLinkedin}" target="_blank" rel="noopener noreferrer" style="color:#1a237e">${cleanLinkedin}</a>` : "Not provided"}</div>
              </div>

            </div>
            <div class="footer">
              This email was auto-generated from the SIC membership form on the ICFAI University Tripura website.
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to submit application. Please try again later." },
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
