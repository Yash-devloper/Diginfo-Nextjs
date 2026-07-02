import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseClient";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isHttpUrl(value: string) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (text(body.website, 200)) {
      return NextResponse.json({ message: "Application received." });
    }

    const jobId = text(body.jobId, 160);
    const name = text(body.name, 100);
    const email = text(body.email, 254).toLowerCase();
    const phone = text(body.phone, 30);
    const portfolioUrl = text(body.portfolioUrl, 500);
    const resumeUrl = text(body.resumeUrl, 700);
    const message = text(body.message, 2000);

    if (!jobId || name.length < 2 || !EMAIL_PATTERN.test(email) || !phone) {
      return NextResponse.json(
        { message: "Please provide your name, email, phone number, and job opening." },
        { status: 400 }
      );
    }

    if (!resumeUrl || !isHttpUrl(resumeUrl) || !isHttpUrl(portfolioUrl)) {
      return NextResponse.json(
        { message: "Please upload a resume and provide a valid portfolio URL." },
        { status: 400 }
      );
    }

    const jobSnapshot = await getDoc(doc(db, "jobs", jobId));
    const jobData = jobSnapshot.data();

    if (!jobSnapshot.exists() || jobData?.active !== true) {
      return NextResponse.json(
        { message: "This job opening is no longer accepting applications." },
        { status: 404 }
      );
    }

    const jobTitle = typeof jobData.title === "string" ? jobData.title : "Job opening";
    const application = await addDoc(collection(db, "jobApplications"), {
      jobId,
      jobTitle,
      name,
      email,
      phone,
      portfolioUrl,
      resumeUrl,
      message,
      createdAt: serverTimestamp(),
    });

    const notificationSent = await sendHiringNotification({
      applicationId: application.id,
      jobTitle,
      name,
      email,
      phone,
      portfolioUrl,
      resumeUrl,
      message,
    });

    return NextResponse.json({
      message: "Application submitted successfully. Our hiring team will review it soon.",
      notificationSent,
    });
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json(
      { message: "We could not submit your application. Please try again." },
      { status: 500 }
    );
  }
}

type NotificationInput = {
  applicationId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  portfolioUrl: string;
  resumeUrl: string;
  message: string;
};

async function sendHiringNotification(input: NotificationInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("Career notification email is missing RESEND_API_KEY.");
    return false;
  }

  const to = process.env.CAREERS_NOTIFICATION_EMAIL || "careers@diginfo.ai";
  const from =
    process.env.CAREERS_FROM_EMAIL ||
    process.env.RESEND_FROM_EMAIL ||
    "Diginfo Careers <careers@diginfo.ai>";
  const safe = {
    jobTitle: escapeHtml(input.jobTitle),
    name: escapeHtml(input.name),
    email: escapeHtml(input.email),
    phone: escapeHtml(input.phone),
    portfolioUrl: escapeHtml(input.portfolioUrl),
    resumeUrl: escapeHtml(input.resumeUrl),
    message: escapeHtml(input.message).replaceAll("\n", "<br />"),
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `career-application-${input.applicationId}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email,
      subject: `New application: ${input.jobTitle} - ${input.name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#201733;">
          <h1 style="font-size:24px;">New career application</h1>
          <p><strong>Role:</strong> ${safe.jobTitle}</p>
          <p><strong>Candidate:</strong> ${safe.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
          <p><strong>Phone:</strong> ${safe.phone}</p>
          ${safe.portfolioUrl ? `<p><strong>Portfolio:</strong> <a href="${safe.portfolioUrl}">Open portfolio / showreel</a></p>` : ""}
          <p><strong>Resume:</strong> <a href="${safe.resumeUrl}">Open resume</a></p>
          ${safe.message ? `<p><strong>Message:</strong><br />${safe.message}</p>` : ""}
        </div>
      `,
      text: [
        "New career application",
        `Role: ${input.jobTitle}`,
        `Candidate: ${input.name}`,
        `Email: ${input.email}`,
        `Phone: ${input.phone}`,
        input.portfolioUrl ? `Portfolio: ${input.portfolioUrl}` : "",
        `Resume: ${input.resumeUrl}`,
        input.message ? `Message: ${input.message}` : "",
      ].filter(Boolean).join("\n"),
      tags: [{ name: "category", value: "career_application" }],
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Resend career notification error:", await response.text());
    return false;
  }

  return true;
}
