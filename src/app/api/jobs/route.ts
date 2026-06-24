import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getAdminDb, isFirebaseAdminConfigError } from "@/lib/firebaseAdmin";
import { serializeJob } from "@/lib/jobServer";
import { validateJobInput } from "@/lib/jobs";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const includeInactive = new URL(request.url).searchParams.get("includeInactive") === "true";

  try {
    const db = getAdminDb();
    // Keep this as a single-field query. Combining `active == true` with an
    // order by `createdAt` requires a Firestore composite index, which caused
    // the public careers page to fail even though jobs appeared in admin.
    const query = db.collection("jobs").orderBy("createdAt", "desc");
    const snapshot = await query.get();
    const jobs = snapshot.docs.map(serializeJob);

    return NextResponse.json({ jobs: includeInactive ? jobs : jobs.filter((job) => job.active) });
  } catch (error) {
    if (isFirebaseAdminConfigError(error)) {
      return NextResponse.json(
        { error: "Firebase service account is missing. Add FIREBASE_SERVICE_ACCOUNT_KEY to your environment." },
        { status: 500 }
      );
    }

    console.error("Failed to load job openings", error);
    return NextResponse.json(
      { error: "Unable to connect to the jobs database. Check the server logs and Firebase service-account permissions." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);
    const validation = validateJobInput(payload);
    if (!validation.data) {
      return NextResponse.json({ error: validation.errors[0], errors: validation.errors }, { status: 400 });
    }

    const reference = await getAdminDb().collection("jobs").add({
      ...validation.data,
      active: true,
      createdBy: "admin",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    const job = await reference.get();

    return NextResponse.json({ job: serializeJob(job) }, { status: 201 });
  } catch (error) {
    if (isFirebaseAdminConfigError(error)) {
      return NextResponse.json(
        { error: "Firebase service account is missing or invalid. Check FIREBASE_SERVICE_ACCOUNT_KEY." },
        { status: 500 }
      );
    }

    console.error("Failed to create job opening", error);
    return NextResponse.json({ error: "Unable to create the job opening. Please try again." }, { status: 500 });
  }
}
