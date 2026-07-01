---
name: WatchFlow Automator Design System
mode: dark
primary: "#22C55E"
secondary: "#38BDF8"
tertiary: "#8B5CF6"
background: "#060E20"
surface: "#0A1836"
font_headline: "Space Grotesk"
font_body: "Inter"
stitch_project: "projects/10892099372177702220"
stitch_design_system: "assets/8446355974194482075"
stitch_screen: "projects/10892099372177702220/screens/62d73fdf46fb46b8856710dc560716d0"
---

# WatchFlow Automator Design Direction

A serious dark enterprise cockpit for browser automation monitoring. It should feel like a real QA/operations console for Playwright-style jobs: monitors, target URLs, selectors, screenshots, structured extraction, change diffs, alerts, and run history.

## Visual rules

- Dark navy/slate surfaces, not pure black.
- Green = successful automation / primary action.
- Amber = detected changes or pending review.
- Red = failed run / high severity.
- Sky = telemetry and live status.
- Violet = AI extraction/schema intelligence.
- Dense but readable; cards aligned to an 8px rhythm.
- Monospace for logs, selectors, JSON, and timestamps.

## Implementation scope

This V1 is an honest public portfolio shell: seeded data, local mock API route, no real scraping of third-party sites, no secrets, and no claims of production SaaS readiness.
