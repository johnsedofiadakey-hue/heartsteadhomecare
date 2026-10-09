# Reference website audit and Heartstead route map

Reviewed 9 October 2026 against [Always Responsive Home Care](https://arhomecare.com/). The reference repeats location pages for many branches. Heartstead has one Skillman office, so this map tracks the page types and user journeys that apply to one location. The desktop and mobile hero layouts were tuned against the reference at 1440px and 390px. This remains a local implementation audit, not a claim of pixel identity or live Firebase verification.

| Reference experience | Heartstead route | Current state |
| --- | --- | --- |
| Homepage, navigation, care CTA, inquiry form | `/` | Built; hero, rounded imagery, forms, and footer visually checked |
| About and trust sections | `/about-us` | Expanded with editable team, approach, mission, story, and note sections; owner biographies are pending |
| Care service index | `/care-services` | Built with grouped cards |
| Service detail templates | `/care-services/[slug]` | 28 seeded pages; all returned 200 locally |
| Contact form and office finder | `/contact` | Built with interest choices and one office card; submission requires Firebase |
| Testimonials | `/testimonials` | Template built; no invented reviews published |
| Payment options | `/payment-options` | Expanded with editable planning guidance and checklist; accepted methods and terms still require confirmation |
| Caregiver jobs and application | `/caregiver-jobs` | Expanded resources, benefits, requirements, and application layout; submission requires Firebase |
| Open cases location selector | `/caregiver-jobs/cases` | Converted to editable job listings for one office; currently empty |
| Job-specific application | `/caregiver-jobs/apply?job=...` | Built; job ID stored with application |
| Time-off location selector | `/caregiver-jobs/time-off` | Converted to office contact details |
| Blog index and posts | `/blog`, `/blog/[slug]` | Three original starter articles; CMS can add/edit posts |
| Service locations | `/service-area` | Single-office service-area page; exact coverage needs confirmation |
| Privacy and terms | `/privacy-policy`, `/terms-of-service` | Editable draft text; owner review required |
| Franchise, family portal, office directory, branch pages | No Heartstead equivalent | Excluded because there is one office and no supplied portal or franchise operation |

## Form and admin behavior

- Care inquiry: name, email, phone, care ZIP, care type, contact intent on the Contact page, validation, honeypot, success/error state, and private Firestore record.
- Caregiver application: name, email, phone, address, position, driving and certification questions, referral source, optional job ID, validation, honeypot, success/error state, and private Firestore record.
- Admin: exact owner UID authorization; draft/save/publish; homepage, inner-page copy, services, jobs, testimonials and blog editing; image uploads; private submissions inbox with status updates.
- Visual checks: Home, About, Services, Contact, Jobs, Payment, Open Cases, and Admin were opened at 390px, 1024px, and 1440px; no horizontal overflow was observed. Build and typecheck pass. The Home, Services, Contact, and Jobs first screens now closely track the reference's spacing, color, and image positions, with different Heartstead imagery and text.
- Missing from a full operating launch: Firebase connection and live persistence tests, approved legal text, phone and service validation, actual job openings, approved testimonials, and photo rights. Email alerts, rich draft preview, revision rollback, configurable navigation labels, and some fixed copy remain future CMS work. Inquiry and application API calls return 503 by design while Firebase is absent.

The reference includes an optional SMS consent control. It is not copied into Heartstead's forms because no Heartstead SMS program or messaging terms have been provided.
