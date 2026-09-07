# 8M Studio website

## Contact form setup

The native contact form sends a lead notification to the 8M inbox and then sends a Ukrainian confirmation email to the visitor. SMTP runs only inside the server-side `POST /api/contact` route.

Required environment variables:

- `GMAIL_USER` — the Gmail account used to send both messages.
- `GMAIL_APP_PASSWORD` — a Google App Password for that Gmail account. Do not use the normal account password.
- `LEAD_RECIPIENT` — the inbox that receives website leads.

### Local test

1. Copy `.env.example` to `.env.local`.
2. Add the three values to `.env.local`. This file is ignored by Git.
3. Run `pnpm dev`.
4. Submit the website form with a visitor email you can check.
5. Confirm that the lead reaches `LEAD_RECIPIENT`, Gmail Reply targets the visitor, and the visitor receives the automatic confirmation.

Without SMTP variables, the API deliberately returns a configuration error and the form shows its retry state.

### Vercel production

1. Open the Vercel project and go to **Settings → Environment Variables**.
2. Add `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and `LEAD_RECIPIENT` for Production.
3. Redeploy the project so the server function receives the new values.
4. Submit a real test through the deployed form and verify both messages and the Reply-To address.

Keep the Google App Password only in local environment files and the deployment platform’s secret store. Never commit it to Git.
