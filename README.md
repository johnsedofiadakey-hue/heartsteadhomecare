# Heartstead Home Care website

Local, single-location website and CMS inspired by the page structure and visual language of arhomecare.com. The logo is from Heartstead's supplied PDF. The current website uses licensed stock photos, not actual Heartstead clients or staff. The earlier `preview/` mockups contain generated concept images.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js. `/admin` shows a setup preview until Firebase is configured; edits cannot be saved or published in that mode. Site content is seeded in `src/lib/site-data.ts`.

## Connect Firebase

1. Create a Firebase project, Web app, Firestore database, and Storage bucket. Enable Google and/or email-password sign-in in Firebase Authentication.
2. Create the owner account and copy its Authentication UID. Set `FIREBASE_OWNER_UID` to that exact UID. The public email address is not an authorization rule.
3. Copy `.env.example` to `.env.local` and enter the Firebase Web app values plus `FIREBASE_PROJECT_ID` and `FIREBASE_STORAGE_BUCKET`. For local server access, use Application Default Credentials; do not put a service account key in the repository.
4. Deploy `firestore.rules`, `storage.rules`, and `firestore.indexes.json` to the new project. Configure the same server and public variables in the App Hosting backend.
5. Sign in at `/admin`, save a draft, publish, upload and assign a photo, submit a test inquiry and application, and verify both in the private inbox. Check owner and non-owner access before launch.

Search indexing is disabled by default. Set `SITE_READY_FOR_INDEXING=true` only for the approved public launch.

The public forms intentionally return an unavailable message until Firestore is connected. No email notifications are sent. Published content is server-rendered on each request.

## Before public launch

- Confirm phone number `609-910-2632`, service coverage, actual services, payment methods, job requirements, and any health or availability claims.
- Replace or approve the stock photos. Do not copy competitor photographs, client testimonials, logos, or article text without rights.
- Replace draft Privacy Policy and Terms of Service with owner-approved text; decide retention and deletion for care inquiries and job applications.
- Supply the Firebase project details and owner UID, connect a domain, and complete live form, upload, access, and mobile checks.
- Decide whether email alerts, draft visual preview, revision rollback, and editable remaining static copy are required for launch.

`npm run typecheck` and `npm run build` verify the local code. Neither proves a live Firebase connection or public release.
