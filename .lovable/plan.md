# WularData Website — Build Plan

A B2B infrastructure marketing website at wulardata.com modeled visually on OVHcloud (deep blue + cyan), with three pillar pages and a logged-in customer portal for quotes, tickets and profile.

## 1. Brand & Design System

- **Colors** (HSL tokens in `index.css`):
  - Primary Deep Blue `#000E9C`
  - Cyan Accent `#1FBFFF`
  - Royal Blue `#123FBF`
  - Neutrals: white, slate-50/100/600/900
- **Typography:** Inter for body, tight tracking display weights for headings (OVH-like)
- **Components:** OVH-style utility strip, sticky main nav with mega-menu hover, large hero, stat strips, 3-up service cards, pricing cards with "Starting at ₹X/mo", multi-column dark footer
- **Logo:** placeholder "WularData" wordmark (you can swap later)

## 2. Public Site Structure

### Header (two strips)
- **Utility strip:** Region (India), Phone/Contact, Help Center, Sign in, Customer Portal
- **Main nav:** Logo · Data Center Services ▾ · Hosting Services ▾ · IT Infrastructure ▾ · About · Contact · "Get a Quote" CTA
  - Each ▾ opens a mega-menu listing the sub-services with one-line descriptions

### Landing page (`/`) sections
1. Hero — headline, sub-headline, primary "Get a Quote" + secondary "Explore Services"
2. Trust strip — uptime %, datacenters, customers served, years in business
3. Three pillars overview — Data Center / Hosting / IT Infrastructure cards linking to pillar pages
4. Featured services with indicative pricing (Dedicated Servers, VPS, Web Hosting, Domain Registration)
5. "Why WularData" — 4 differentiators (Indian DC presence, 24×7 NOC, security, scalability)
6. Solutions by industry strip
7. Customer testimonials / logo wall (placeholders)
8. Resources teaser (blog/case study cards — placeholder content)
9. CTA band — "Talk to our experts"
10. Newsletter signup
11. Footer

### Pillar page 1 — `/data-center-services`
Hero + intro, then a section per sub-service with description, key features, indicative starting price where applicable, and "Request quote" CTA:
- Dedicated Servers (₹ starting price)
- VPS (₹ starting price)
- Application Hosting
- Database Hosting
- Storage Provisioning
- Backup & DR
- Connectivity & CDN

### Pillar page 2 — `/hosting-services`
- Domain Registration (₹ starting price)
- Web Hosting (₹ starting price)
- App Development
- Business Email Accounts (₹ starting price)

### Pillar page 3 — `/it-infrastructure`
- IT Managed Services
- Consulting & Migration
- Hardware Support

### Other pages
- `/about` — company snapshot, mission, India focus
- `/contact` — address placeholder, phone, contact form (creates a quote enquiry record)
- `/auth` — sign in / sign up (Email+password and Google)
- `/portal` — customer dashboard (gated)
- `/portal/quotes`, `/portal/tickets`, `/portal/profile`
- `/admin` — staff-only dashboard
- 404 (already exists)

### Footer (OVH-style multi-column, deep-blue background)
- Tools · Support · Company · News · Keep in touch (newsletter + social icons)
- Legal strip: © WularData, Privacy, Terms, Cookies

## 3. Customer Portal (Lovable Cloud)

### Authentication
- Email + password (with email confirmation auto-confirmed during dev for faster testing)
- Google sign-in
- `/reset-password` page included

### Database tables (with RLS)
- `profiles` — id (FK auth.users), full_name, company, phone, country, created_at
  - Auto-created on signup via trigger
  - RLS: user reads/updates own row; admins read all
- `user_roles` — id, user_id, role (`admin` | `customer`) — separate table per security best practice; `has_role()` SECURITY DEFINER function
- `quote_requests` — id, user_id (nullable for public form), service_category, service_name, company, contact_name, email, phone, message, status (`new`/`in_review`/`quoted`/`closed`), created_at
  - RLS: customers see own; admins see all and can update status
- `support_tickets` — id, user_id, subject, service, priority, status (`open`/`pending`/`resolved`/`closed`), created_at
  - RLS: customers see own; admins see all and update
- `ticket_messages` — id, ticket_id, sender_id, body, created_at
  - RLS: visible to ticket owner and admins; both can post

### Portal features
- **Dashboard:** counts of open quotes/tickets, recent activity
- **Quotes:** list with status badges, "New quote" form (pre-filled from profile), detail view
- **Tickets:** list, create, conversation view with reply box
- **Profile:** edit company details, contact info; change password

### Admin role (`/admin`)
- Gated by `has_role(uid, 'admin')`
- Tables for all quotes and tickets with status dropdowns and reply capability
- You'll be promoted to admin via a one-time SQL insert into `user_roles` after first signup

## 4. Technical Notes

- React + Vite + Tailwind + shadcn/ui (already in project)
- React Router with public layout (Header/Footer) and portal layout (sidebar + topbar)
- Lovable Cloud for auth + Postgres + RLS
- Session handling: `onAuthStateChange` listener set up before `getSession()`
- All forms validated with `zod`
- HSL design tokens in `index.css`; semantic Tailwind classes only — no hard-coded colors in components
- Reusable components: `ServiceCard`, `PricingCard`, `MegaMenu`, `SectionHeading`, `CTABand`, `Footer`, `PortalSidebar`, `StatusBadge`

## 5. Build Order

1. Design tokens + Header/Footer + landing page shell
2. Three pillar pages with all sub-services and indicative prices
3. About + Contact (public quote form writes to `quote_requests`)
4. Lovable Cloud: tables, RLS, roles, profile trigger
5. Auth pages (email + Google) + reset password
6. Customer portal (dashboard, quotes, tickets, profile)
7. Admin views
8. Polish, responsive QA, empty states

## 6. What I'll Need From You Later

- Actual indicative ₹ prices per service (I'll use sensible placeholders you can edit)
- Logo file and any brand imagery
- Real contact details (address, phone, support email)
- After first signup, your email so I can grant admin role
