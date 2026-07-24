# Vercel deploy (monorepo)

This repo has three apps:

- `frontend` → Next.js store (deploy on Vercel)
- `admin` → Next.js admin (separate Vercel project)
- `backend` → Express API (not ideal on Vercel; use Railway/Render)

## Fix 404 on jewellery-eminence

Vercel was building the **repo root**, which has no Next.js pages.

### Required setting (dashboard)

1. Open the Vercel project → **Settings** → **General**
2. **Root Directory** → set to `frontend`
3. Framework Preset → **Next.js**
4. Save
5. **Deployments** → Redeploy (clear cache if available)

### Environment variables (frontend project)

In **Settings → Environment Variables**, add:

- `NEXT_PUBLIC_API_BASE_URL` = your live backend URL (e.g. `https://your-api.railway.app`)
- `NEXT_PUBLIC_STRIPE_KEY` = your Stripe publishable key (if used)

Then redeploy.

### Admin (optional second project)

Create another Vercel project from the same repo with Root Directory = `admin`.
