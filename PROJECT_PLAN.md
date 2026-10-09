# Heartstead Home Care website and CMS plan

Status: local website and CMS implementation in progress. The site is running locally; no Firebase project is connected and nothing is published.

## Confirmed inputs

- Brand: Heartstead Home Care, using the supplied ivory and coffee logo.
- Office: 23 Orchard Rd, Suite 210, Skillman, NJ 08558.
- Public contact email: Heartsteadh@gmail.com.
- Phone in the earlier Heartstead proposal: 609-910-2632. Use as draft content and verify before launch.
- First owner administrator: heartsteadhomecare@gmail.com. The owner will provide the Firebase Authentication UID after creating the account.
- One office only; services should follow the reference provider's catalogue, subject to Heartstead review before publication.
- Images should have a similar warm home-care feel and be replaceable through the CMS. The website now uses licensed stock photos; the earlier `preview/` mockup uses generated concepts. Neither depicts Heartstead clients or staff.

## Experience and scope

The reference is arhomecare.com. Reproduce the public site's visual hierarchy, warm gradients, rounded typography, curved section transitions, heart motif, alternating editorial image/text sections, service cards, prominent phone and care CTAs, and form treatment. Use Heartstead's own brand and content. Mobile should preserve the same visual language and fit its viewport. A proper 390px device check showed no horizontal overflow on the reference; an earlier desktop-window screenshot had misleadingly cropped it.

The local build includes Home, About, Care Services overview and 28 detail pages, Testimonials, Service Area, Careers and open positions, a general job application, Time Off information, Payment Options, Contact/Get Care, Blog and article pages, Privacy Policy, and Terms of Service. Franchise and multi-office directory pages are omitted for this single-location business. The reference site's open-cases page is a location selector; Heartstead has a real CMS-managed job listing page instead.

The reference service overview currently groups Live-In, Hourly, Overnight, Always On Virtual, Personal, Mobility, Companion, Specialized and Complex, Alzheimer's and Dementia, Hospital-to-Home, Palliative, Parkinson's, Stroke Recovery, Respite, Veterans, Private Duty, Caregiver, 24-Hour, and Elderly Sitter care. Seed these labels as draft CMS content, but only publish individual pages once Heartstead confirms it can deliver the service and approves the description. Virtual monitoring and clinical claims need specific operational evidence.

The local CMS edits global contact details, homepage and several inner-page sections, service catalogue and detail pages, jobs, testimonials, blog posts, and images. New About, Careers, and Payment sections are editable. Media can be assigned to the three primary site image slots, a selected service, or a selected article. It saves drafts, publishes site-wide content, and stores publication snapshots once Firebase is connected. Media uploads optimize images and require alt text. The private inbox lists the latest 50 care inquiries and job applications and supports status changes. Navigation labels, some fixed section copy, page metadata, full visual draft preview, revision rollback, and automated email alerts are still to be built if required before launch.

## Firebase shape

- Next.js public website and admin, deployed through Firebase App Hosting after a Firebase project and repository are available.
- Firebase Authentication for the owner account. The first owner UID is set through trusted server configuration; no self-assigned roles. Additional editor roles are not implemented.
- Cloud Firestore for published content, drafts, media metadata, publication snapshots, inquiries, and applications. Public client access is denied; server routes verify the owner UID before CMS reads or writes.
- Cloud Storage for uploaded public media. Image type and size limits are enforced server-side. Media deletion and replacement cleanup are not implemented.
- Server-owned endpoints for publishing and inquiry submission. No service account keys in the browser.
- Security Rules deny direct browser access to Firestore and Storage. Emulator tests and live owner sign-in remain pending Firebase setup.

This CMS is for the marketing website. Client care records, scheduling, EVV, family access, and caregiver operations are separate care-platform work and are not included in this launch.

## Design and delivery gates

1. Review the local desktop and mobile build. Reference-inspired visual treatment uses the supplied Heartstead logo and licensed stock photos.
2. Approve final service names, imagery, and claims. Replace stock photos with Heartstead-owned assets as supplied.
3. Complete any remaining content and CMS polish after reviewing the updated local pages. The local build, navigation, and 390px, 1024px, and 1440px layouts have been checked; publishing, owner access, form persistence, and media replacement require Firebase configuration.
4. Connect the new Firebase project and owner UID, then test authentication and content edits in a private preview.
5. Confirm phone, service coverage, legal text, inquiry handling, domain, and actual credentials before public launch.

## Current dependencies for launch

Firebase project ID/web app config, owner UID, domain, exact coverage area, approved service list and descriptions, real operational claims, form retention and privacy/consent wording, and owner-approved public imagery/testimonials. The phone number from the proposal must be re-confirmed. These do not block local development.
