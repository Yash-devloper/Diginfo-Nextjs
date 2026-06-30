import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ASSESSMENT_FILENAME = "AI_Search_Readiness_Assessment.pdf";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: unknown;
      website?: unknown;
    };

    // Silently accept bot submissions without sending an email.
    if (typeof body.website === "string" && body.website.trim()) {
      return NextResponse.json({
        message: "Welcome aboard! Check your inbox for the assessment.",
      });
    }

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from =
      process.env.RESEND_FROM_EMAIL ||
      "AI BizBytes <newsletter@diginfo.ai>";

    if (!apiKey) {
      console.error("Newsletter email is missing RESEND_API_KEY.");
      return NextResponse.json(
        { message: "Newsletter delivery is not configured yet." },
        { status: 503 }
      );
    }

    const assessmentPath = path.join(
      process.cwd(),
      "public",
      ASSESSMENT_FILENAME
    );
    const assessment = await readFile(assessmentPath);
    const subscriberHash = createHash("sha256").update(email).digest("hex");

    const contactResponse = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
      }),
      cache: "no-store",
    });

    // A duplicate contact is already subscribed and can continue to welcome delivery.
    if (!contactResponse.ok && contactResponse.status !== 409) {
      const providerError = await contactResponse.text();
      console.error("Resend contact error:", providerError);
      return NextResponse.json(
        { message: "We couldn't save your subscription. Please try again." },
        { status: 502 }
      );
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `newsletter-welcome-${subscriberHash.slice(0, 32)}`,
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Welcome to AI BizBytes — your free assessment is inside",
        html: welcomeEmailHtml,
        text: welcomeEmailText,
        attachments: [
          {
            filename: ASSESSMENT_FILENAME,
            content: assessment.toString("base64"),
          },
        ],
        tags: [{ name: "campaign", value: "newsletter_welcome" }],
      }),
      cache: "no-store",
    });

    if (!resendResponse.ok) {
      const providerError = await resendResponse.text();
      console.error("Resend newsletter error:", providerError);
      return NextResponse.json(
        { message: "We couldn't send your welcome email. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: "Welcome aboard! Check your inbox for the assessment.",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { message: "Unable to subscribe right now. Please try again." },
      { status: 500 }
    );
  }
}

const welcomeEmailHtml = `
<!doctype html>
<html lang="en">
  <body style="margin:0;background:#0b0912;font-family:Arial,sans-serif;color:#f7f4ff;">
    <div style="display:none;max-height:0;overflow:hidden;">Your AI-Search Readiness Assessment is attached.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b0912;padding:36px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#171322;border:1px solid #2b2440;border-radius:20px;overflow:hidden;">
            <tr><td style="height:5px;background:linear-gradient(90deg,#f97316,#d946a8,#8a5cf6);"></td></tr>
            <tr>
              <td style="padding:42px 42px 20px;">
                <p style="margin:0 0 16px;color:#d946a8;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">AI BizBytes · Diginfo</p>
                <h1 style="margin:0;color:#ffffff;font-size:34px;line-height:1.15;">Welcome to the AI-search shift.</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 42px 42px;color:#c8c1d8;font-size:16px;line-height:1.7;">
                <p>Thanks for subscribing. Every week, you'll get one concise playbook to help your brand get found, cited, and chosen across search and AI answers.</p>
                <p>Your free <strong style="color:#ffffff;">AI-Search Readiness Assessment</strong> is attached to this email. Use its 20 checkpoints to see where your brand is strong—and where it risks becoming invisible.</p>
                <p style="margin-bottom:28px;">Start with the assessment, note your score, and keep it nearby. The ideas in AI BizBytes will help you improve it week by week.</p>
                <a href="https://diginfo.ai/newsletter" style="display:inline-block;border-radius:9px;background:#d946a8;color:#ffffff;font-size:15px;font-weight:700;padding:15px 22px;text-decoration:none;">Explore AI BizBytes →</a>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #2b2440;padding:24px 42px;color:#827a94;font-size:12px;line-height:1.6;">
                Diginfo · Building brands for Google, Social, and AI Search<br />
                Vijay Nagar, Indore, Madhya Pradesh, India
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const welcomeEmailText = `Welcome to AI BizBytes by Diginfo.

Thanks for subscribing. Every week, you'll get one concise playbook to help your brand get found, cited, and chosen across search and AI answers.

Your free AI-Search Readiness Assessment is attached to this email. Use its 20 checkpoints to see where your brand is strong—and where it risks becoming invisible.

Explore AI BizBytes: https://diginfo.ai/newsletter
`;
