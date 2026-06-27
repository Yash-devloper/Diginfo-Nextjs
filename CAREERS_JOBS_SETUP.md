# Secure jobs module setup

## Firestore schema

The server creates documents in the `jobs` collection with this shape:

```ts
{
  title: string,
  candidateType: "Fresher" | "Experienced" | "Internship",
  experienceRequired: string, // required only when candidateType is "Experienced"
  description: string,
  location: string,
  employmentType: "Full-time" | "Part-time" | "Contract",
  active: true,
  createdBy: string, // Firebase Auth UID
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Required environment variables

Set these in the production host (and in `.env.local` for local development):

```env
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
CAREERS_APPLICATION_EMAIL=hiring@example.com
```

`FIREBASE_SERVICE_ACCOUNT_KEY` must be the complete, single-line JSON of a Firebase service account. Never expose it through a `NEXT_PUBLIC_` variable or commit it to Git.

If Vercel gives trouble with the single JSON value, use these three server-only variables instead:

```env
FIREBASE_PROJECT_ID=diginfowebproject
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@diginfowebproject.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Optionally set `ADMIN_EMAILS` to a comma-separated list of Firebase Auth emails allowed to manage jobs. If it is omitted, any signed-in Firebase user can use the existing admin panel, matching the previous admin behavior.

## Admin access

The admin UI uses the regular login page. Sign in with the account you want to use for careers posting, then open `/admin/careers` and post jobs directly. The browser sends that Firebase ID token to the jobs API, and the server verifies it before listing inactive jobs or creating, editing, or deleting openings.

## Firestore rules

Merge the `jobs` match block from `firestore.jobs.rules` into your deployed Firestore rules. It prevents direct browser reads and writes to jobs; all public reads and all admin CRUD calls go through the server endpoints, where tokens and the `admin` custom claim are verified.

## API surface

- `GET /api/jobs` — public active jobs only
- `GET /api/jobs/:jobId` — public active job details only
- `POST /api/jobs` — admin only
- `PATCH /api/jobs/:jobId` — admin only
- `DELETE /api/jobs/:jobId` — admin only

Every mutation validates field lengths and allowed enum values on the server.
