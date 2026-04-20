# PulseGym 365 Demo Website

A Next.js demo gym website for **www.pulsegym365.com**.

## Included pages
- Home
- Classes
- Pricing
- Trainers
- Free Trial
- Member Portal
- Contact

## Local setup
```bash
npm install
npm run dev
```

Open:
```bash
http://localhost:3000
```

## Production build
```bash
npm run build
npm start
```

## Recommended publish flow
### 1. Push to Git
Create a Git repository and push this project.

### 2. Import into Vercel
- Create a new project in Vercel
- Import the Git repository
- Keep the default Next.js settings
- Deploy

### 3. Connect the custom domain
Use your purchased domain:
- `www.pulsegym365.com`

In Vercel:
- Open the project
- Go to **Settings > Domains**
- Add `www.pulsegym365.com`
- Follow the DNS records Vercel gives you

In GoDaddy:
- Update the DNS records to the values requested by Vercel

## Notes
This demo is intentionally structured to show the future integration story:
- dynamic pricing blocks
- dynamic class/catalog blocks
- trial lead capture
- hosted pages
- member portal entry
- website-to-system integration paths

The forms in this demo use local API routes only to simulate success. They are ready to be replaced later with your real Pulse integration.
