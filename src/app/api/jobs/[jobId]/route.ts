import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getAdminDb, isFirebaseAdminConfigError } from "@/lib/firebaseAdmin";
import { isJobAuthError, requireJobsAdmin } from "@/lib/jobAuth";
import { serializeJob } from "@/lib/jobServer";
import { validateJobInput } from "@/lib/jobs";

export const runtime = "nodejs";

type Context = { params: Promise<{ jobId: string }> };

function jobApiError(error: unknown, fallback: string) {
  if (isFirebaseAdminConfigError(error)) {
    return NextResponse.json(
      {
        error:
          "Firebase service account is missing or invalid. Add FIREBASE_SERVICE_ACCOUNT_KEY, or FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY, in Vercel.",
      },
      { status: 500 }
    );
  }

  if (isJobAuthError(error)) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  console.error(fallback, error);
  return NextResponse.json(
    { error: "Unable to connect to the jobs database. Check the server logs and Firebase service-account permissions." },
    { status: 500 }
  );
}

export async function GET(request: Request, { params }: Context) {
  const { jobId } = await params;

  try {
    const snapshot = await getAdminDb().collection("jobs").doc(jobId).get();

    if (!snapshot.exists || snapshot.data()?.active !== true) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    return NextResponse.json({
      job: serializeJob(snapshot),
      applicationEmail: "yash.sharma@diginfoexpert.com",
    });
  } catch (error) {
    return jobApiError(error, "Failed to load job opening");
  }
}

export async function PATCH(request: Request, { params }: Context) {
  try {
    await requireJobsAdmin(request);

    const payload = await request.json().catch(() => null);
    const validation = validateJobInput(payload);
    if (!validation.data) {
      return NextResponse.json({ error: validation.errors[0], errors: validation.errors }, { status: 400 });
    }

    const { jobId } = await params;
    const reference = getAdminDb().collection("jobs").doc(jobId);
    if (!(await reference.get()).exists) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    await reference.update({ ...validation.data, updatedAt: FieldValue.serverTimestamp() });
    return NextResponse.json({ job: serializeJob(await reference.get()) });
  } catch (error) {
    const response = jobApiError(error, "Failed to update job opening");
    if (response.status !== 500) return response;
    return NextResponse.json({ error: "Unable to update the job opening. Please try again." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Context) {
  try {
    await requireJobsAdmin(request);

    const { jobId } = await params;
    const reference = getAdminDb().collection("jobs").doc(jobId);
    if (!(await reference.get()).exists) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    await reference.delete();
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const response = jobApiError(error, "Failed to delete job opening");
    if (response.status !== 500) return response;
    return NextResponse.json({ error: "Unable to delete the job opening. Please try again." }, { status: 500 });
  }
}
