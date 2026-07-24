# jewellery-eminence

Monorepo:

- `frontend` — Next.js storefront
- `admin` — Next.js admin panel
- `backend` — Express + MongoDB API

## Local run

```bash
# backend
cd backend && npm install && npm start

# frontend
cd frontend && npm install && npm run dev

# admin
cd admin && npm install && npm run dev
```

## Vercel

If the site shows **404 NOT_FOUND**, set the Vercel project **Root Directory** to `frontend` and redeploy.

See [docs/vercel-deploy.md](docs/vercel-deploy.md).
