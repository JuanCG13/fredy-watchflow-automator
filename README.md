# WatchFlow Automator — Browser Automation Monitoring Demo

Portfolio owner/public name: **Fredy Gimenez**

Role positioning: **AI Workflow Automation Developer**

WatchFlow Automator is a production-style portfolio demo for browser automation monitoring. It shows how an automation developer can configure Playwright-style website monitors, capture screenshots, extract structured data, detect changes, and triage alerts from a clean operations cockpit.

> Honest status: this public V1 is a deployable demo shell with seeded data and mocked run execution. It demonstrates architecture, UI quality, automation workflow thinking, and implementation direction without pretending to scrape real third-party systems in production.

## Stitch design

- Stitch project: `projects/10892099372177702220`
- Stitch design system: `assets/8446355974194482075`
- Main screen: `projects/10892099372177702220/screens/62d73fdf46fb46b8856710dc560716d0`

## What the demo shows

- Browser automation command center for Playwright-style monitors.
- Monitor cards for competitor pricing, job board listings, and vendor status pages.
- Mock run trigger: `POST /api/runs/demo`.
- Target URL, selector checks, terminal-style execution log, screenshot evidence placeholder, JSON extraction, and diff summary.
- Alert queue and recent run history.
- Demo-safe architecture: no real scraping, no credentials, no external side effects.

## Local development

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Open `http://localhost:3000`.

## Demo script

1. Open the dashboard.
2. Click **Run monitor** on the Competitor Pricing monitor.
3. Review the target URL, selectors checked, execution log, screenshot evidence, structured JSON output, and diff summary.
4. Open **Alerts** to show triage queue and severity badges.
5. Open **Screenshots** to show evidence capture cards.
6. Explain that real deployments would add a worker queue, storage, auth, scheduler, and compliant target-specific scraping policies.

## Next safe iterations

- Add Playwright worker script that runs only against owned/sandbox targets.
- Persist run history in SQLite/Postgres.
- Add screenshot upload/storage adapter.
- Add monitor CRUD with validation.
- Add a short demo video and public Vercel deployment.
