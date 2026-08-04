# MathDreams accounts and analytics

The app now supports optional Supabase accounts and guest analytics. Guests are never
hard-blocked. They can browse for five minutes before seeing a dismissible account prompt;
after dismissal, the reminder returns in one minute. Signed-in visitors do not see reminders.

## One-time setup

1. Create a dedicated Supabase project for MathDreams. Do not reuse another app's project.
2. Run `supabase/schema.sql` in its SQL editor once.
3. In Supabase Authentication, enable Email and Google providers. Add the deployed MathDreams
   URL to Authentication > URL Configuration > Redirect URLs.
4. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to the MathDreams Vercel project.
   Use `.env.example` for local development.
5. Add both the production MathDreams URL and local development URL to Authentication >
   URL Configuration > Redirect URLs. Only after verifying both, set
   `VITE_SUPABASE_REDIRECTS_READY=true`.
6. Redeploy.

Events captured are page views, active visible-tab time, sign-in prompt views/dismissals,
successful sign-ins, and sign-outs. Anonymous activity uses random browser/session IDs; once
a visitor signs in, new events also carry their Supabase user ID. Raw events have no public
read policy and are available only to Supabase project administrators.

Example reporting queries are included at the bottom of `supabase/schema.sql`.
