import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { isFirebaseAdminConfigError } from "@/lib/firebaseAdmin";
import { getAdminDb } from "@/lib/firebaseAdminDb";
import { isJobAuthError, requireJobsAdmin } from "@/lib/jobAuth";
import { serializeJob } from "@/lib/jobServer";
import { validateJobInput } from "@/lib/jobs";

export const runtime = "nodejs";

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
  return NextResponse.json({ error: "Unable to connect to the jobs database. Check the server logs and Firebase service-account permissions." }, { status: 500 });
}

export async function GET(request: Request) {
  const includeInactive = new URL(request.url).searchParams.get("includeInactive") === "true";

  try {
    if (includeInactive) {
      await requireJobsAdmin(request);
    }

    const db = getAdminDb();
    // Keep this as a single-field query. Combining `active == true` with an
    // order by `createdAt` requires a Firestore composite index, which caused
    // the public careers page to fail even though jobs appeared in admin.
    const query = db.collection("jobs").orderBy("createdAt", "desc");
    const snapshot = await query.get();
    const jobs = snapshot.docs.map(serializeJob);

    return NextResponse.json({ jobs: includeInactive ? jobs : jobs.filter((job) => job.active) });
  } catch (error) {
    return jobApiError(error, "Failed to load job openings");
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireJobsAdmin(request);
    const payload = await request.json().catch(() => null);
    const validation = validateJobInput(payload);
    if (!validation.data) {
      return NextResponse.json({ error: validation.errors[0], errors: validation.errors }, { status: 400 });
    }

    const reference = await getAdminDb().collection("jobs").add({
      ...validation.data,
      active: true,
      createdBy: admin.uid,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    const job = await reference.get();

    return NextResponse.json({ job: serializeJob(job) }, { status: 201 });
  } catch (error) {
    const response = jobApiError(error, "Failed to create job opening");
    if (response.status !== 500) return response;
    return NextResponse.json({ error: "Unable to create the job opening. Please try again." }, { status: 500 });
  }
}
