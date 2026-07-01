"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  Bot,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Code2,
  Database,
  Eye,
  FileJson,
  Gauge,
  Globe2,
  History,
  LayoutDashboard,
  Play,
  Radar,
  RefreshCcw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Terminal,
  Timer,
  Workflow,
  XCircle,
} from "lucide-react";

type View = "dashboard" | "runs" | "alerts" | "screenshots";
type MonitorKey = "pricing" | "jobs" | "vendor";
type RunResult = "success" | "change_detected" | "failed";

type DemoRun = {
  id: string;
  monitor: string;
  target: string;
  result: RunResult;
  duration: string;
  screenshot: string;
  extracted: Record<string, string | number>;
};

const monitors: Array<{
  key: MonitorKey;
  title: string;
  target: string;
  cadence: string;
  schema: string;
  status: RunResult;
  change: string;
  color: "green" | "amber" | "sky";
}> = [
  {
    key: "pricing",
    title: "Competitor Pricing Watch",
    target: "example-shop.test/search?q=automation",
    cadence: "Every 30 min",
    schema: "product, price, stock, confidence",
    status: "change_detected",
    change: "Price moved -16.8%",
    color: "amber",
  },
  {
    key: "jobs",
    title: "Job Board Listing Watch",
    target: "example-jobs.test/search?role=ai-automation",
    cadence: "Every 4 hours",
    schema: "title, company, remote, seniority",
    status: "success",
    change: "7 new listings",
    color: "sky",
  },
  {
    key: "vendor",
    title: "Vendor Status Watch",
    target: "status.vendor-demo.test",
    cadence: "Every 10 min",
    schema: "status, incident, latency",
    status: "success",
    change: "No incident",
    color: "green",
  },
];

const initialRun: DemoRun = {
  id: "WF-24071",
  monitor: "Competitor Pricing Watch",
  target: "https://example-shop.test/search?q=automation",
  result: "change_detected",
  duration: "4.2s",
  screenshot: "capture-pricing-24071.png",
  extracted: {
    product: "Workflow Automation Starter",
    price: "$149",
    previousPrice: "$179",
    stock: "In stock",
    confidence: 0.94,
  },
};

const fallbackTimeline = [
  "Queued monitor run in demo scheduler",
  "Launching isolated Chromium context",
  "Navigating to target URL",
  "Waiting for stable selector match",
  "Capturing screenshot evidence",
  "Extracting structured data against schema",
  "Diff engine flagged price delta",
  "Run archived in local demo history",
];

const alerts = [
  ["High", "Price change detected", "Competitor Pricing Watch", "Needs review", "amber"],
  ["Medium", "Selector matched slowly", "Job Board Listing Watch", "Monitor", "sky"],
  ["Info", "Vendor page stable", "Vendor Status Watch", "Closed", "green"],
];

const historyRows = [
  ["11:42:18", "Competitor Pricing Watch", "Change", "4.2s", "WF-24071"],
  ["11:38:03", "Vendor Status Watch", "Success", "1.8s", "WF-24070"],
  ["11:21:44", "Job Board Listing Watch", "Success", "3.1s", "WF-24069"],
  ["10:58:11", "Competitor Pricing Watch", "Success", "4.0s", "WF-24068"],
  ["10:44:07", "Vendor Status Watch", "Success", "1.9s", "WF-24067"],
];

const icons: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  dashboard: LayoutDashboard,
  workflow: Workflow,
  alerts: AlertTriangle,
  camera: Camera,
  settings: Settings,
  radar: Radar,
  search: Search,
  refresh: RefreshCcw,
  bell: Bell,
  bot: Bot,
  play: Play,
  terminal: Terminal,
  json: FileJson,
  timer: Timer,
  database: Database,
  globe: Globe2,
  shield: ShieldCheck,
  eye: Eye,
  sparkles: Sparkles,
  code: Code2,
  activity: Activity,
  check: CheckCircle2,
  x: XCircle,
  gauge: Gauge,
  history: History,
  chevron: ChevronRight,
  down: ChevronDown,
};

function Icon({ name, className = "" }: { name: string; className?: string }) {
  const Cmp = icons[name] ?? CircleDot;
  return <Cmp className={`icon ${className}`} size={20} />;
}

export default function WatchFlowAutomator() {
  const [view, setView] = useState<View>("dashboard");
  const [active, setActive] = useState<MonitorKey>("pricing");
  const [run, setRun] = useState<DemoRun>(initialRun);
  const [timeline, setTimeline] = useState(fallbackTimeline);
  const [isRunning, setIsRunning] = useState(false);

  async function triggerMonitor(key: MonitorKey) {
    setActive(key);
    setView("runs");
    setIsRunning(true);
    const response = await fetch("/api/runs/demo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: key }),
    });
    const data = await response.json();
    setRun(data.run ?? initialRun);
    setTimeline(data.timeline ?? fallbackTimeline);
    setIsRunning(false);
  }

  return (
    <div className="wf-shell">
      <Sidebar active={view} setView={setView} />
      <main className="wf-main">
        <Topbar />
        <div className="wf-content">
          {view === "dashboard" && <Dashboard active={active} triggerMonitor={triggerMonitor} setView={setView} />}
          {view === "runs" && <RunDetails run={run} timeline={timeline} active={active} isRunning={isRunning} triggerMonitor={triggerMonitor} />}
          {view === "alerts" && <AlertsPanel />}
          {view === "screenshots" && <ScreenshotsGallery />}
        </div>
      </main>
    </div>
  );
}

function Sidebar({ active, setView }: { active: View; setView: (view: View) => void }) {
  const nav: Array<[View, string, string]> = [
    ["dashboard", "Dashboard", "dashboard"],
    ["runs", "Runs", "workflow"],
    ["alerts", "Alerts", "alerts"],
    ["screenshots", "Screenshots", "camera"],
  ];
  return (
    <aside className="wf-sidebar">
      <div className="wf-brand">
        <div className="wf-logo">W</div>
        <div>
          <strong>WatchFlow</strong>
          <span>Automation Monitor</span>
        </div>
      </div>
      <nav className="wf-nav">
        {nav.map(([key, label, icon]) => (
          <button key={key} className={active === key ? "active" : ""} onClick={() => setView(key)}>
            <Icon name={icon} />
            {label}
          </button>
        ))}
        <button><Icon name="settings" />Settings</button>
      </nav>
      <section className="wf-side-card">
        <div className="live-dot"><i /> Demo safe mode</div>
        <p>Seeded targets only. No real scraping, no credentials, no external side effects.</p>
      </section>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="wf-topbar">
      <div className="wf-crumb"><span>Portfolio</span><Icon name="chevron" /><b>WatchFlow Automator</b></div>
      <label className="wf-search"><Icon name="search" /><input placeholder="Search monitors, selectors, run IDs..." /></label>
      <div className="wf-top-actions">
        <span className="wf-pill"><i /> Demo Mode</span>
        <span className="wf-refresh"><Icon name="refresh" /> Auto-refresh 30s</span>
        <Icon name="bell" />
      </div>
    </header>
  );
}

function Dashboard({ active, triggerMonitor, setView }: { active: MonitorKey; triggerMonitor: (key: MonitorKey) => void; setView: (view: View) => void }) {
  return (
    <>
      <section className="kpi-grid">
        <Kpi icon="radar" label="Active Monitors" value="12" meta="3 critical targets" tone="green" />
        <Kpi icon="check" label="Success Rate" value="98.4%" meta="last 24 hours" tone="sky" />
        <Kpi icon="alerts" label="Detected Changes" value="3" meta="needs review" tone="amber" />
        <Kpi icon="x" label="Failed Runs" value="0" meta="stable now" tone="violet" />
      </section>

      <section className="dashboard-grid">
        <div className="panel monitors-panel">
          <PanelHead title="Monitor Overview" action="View all" onAction={() => setView("runs")} />
          <div className="monitor-list">
            {monitors.map((monitor) => (
              <article key={monitor.key} className={active === monitor.key ? "monitor active" : "monitor"}>
                <div className={`monitor-icon ${monitor.color}`}><Icon name="globe" /></div>
                <div className="monitor-main">
                  <div className="monitor-title"><b>{monitor.title}</b><StatusBadge status={monitor.status} /></div>
                  <p>{monitor.target}</p>
                  <div className="monitor-meta"><span>{monitor.cadence}</span><span>{monitor.schema}</span><span>{monitor.change}</span></div>
                </div>
                <button onClick={() => triggerMonitor(monitor.key)}><Icon name="play" /> Run monitor</button>
              </article>
            ))}
          </div>
        </div>
        <div className="panel queue-panel">
          <PanelHead title="Alert Queue" action="Triage" onAction={() => setView("alerts")} />
          <AlertList compact />
        </div>
      </section>

      <section className="panel history-panel">
        <PanelHead title="Recent Run History" action="Open run log" onAction={() => setView("runs")} />
        <RunHistory />
      </section>
    </>
  );
}

function Kpi({ icon, label, value, meta, tone }: { icon: string; label: string; value: string; meta: string; tone: string }) {
  return (
    <article className={`kpi-card ${tone}`}>
      <div><span>{label}</span><Icon name={icon} /></div>
      <strong>{value}</strong>
      <p>{meta}</p>
      <i className="kpi-line" />
    </article>
  );
}

function RunDetails({ run, timeline, active, isRunning, triggerMonitor }: { run: DemoRun; timeline: string[]; active: MonitorKey; isRunning: boolean; triggerMonitor: (key: MonitorKey) => void }) {
  return (
    <section className="run-page">
      <header className="run-header">
        <div>
          <span>Run Details</span>
          <h1>{run.monitor}</h1>
          <p>{run.target}</p>
        </div>
        <button className="primary" onClick={() => triggerMonitor(active)} disabled={isRunning}>
          <Icon name={isRunning ? "refresh" : "play"} /> {isRunning ? "Running..." : "Re-run monitor"}
        </button>
      </header>
      <div className="run-grid">
        <article className="panel run-log">
          <PanelHead title="Playwright execution log" />
          {timeline.map((item, index) => (
            <div className="log-line" key={item}><span>{String(index + 1).padStart(2, "0")}</span><code>{item}</code></div>
          ))}
        </article>
        <article className="panel json-panel">
          <PanelHead title="Structured extraction" />
          <pre>{JSON.stringify(run.extracted, null, 2)}</pre>
          <div className="diff-card">
            <b>Diff summary</b>
            <p>{run.result === "change_detected" ? "Price changed from $179 to $149. Alert queued for human review." : "No critical field change detected in this run."}</p>
          </div>
        </article>
        <article className="panel evidence-panel">
          <PanelHead title="Screenshot evidence" />
          <div className="screenshot-mock">
            <div className="browser-bar"><i /><i /><i /><span>{run.screenshot}</span></div>
            <div className="mock-page"><span>Captured viewport</span><b>{run.monitor}</b><p>Selector evidence and visual snapshot placeholder</p></div>
          </div>
        </article>
        <article className="panel selectors-panel">
          <PanelHead title="Selector checks" />
          {["main", "[data-product-card]", ".price", ".stock-state"].map((selector) => (
            <div className="selector-row" key={selector}><Icon name="code" /><code>{selector}</code><StatusBadge status="success" /></div>
          ))}
        </article>
      </div>
    </section>
  );
}

function AlertsPanel() {
  return (
    <section className="panel full-panel">
      <PanelHead title="Alert Triage" />
      <AlertList />
    </section>
  );
}

function ScreenshotsGallery() {
  return (
    <section className="panel full-panel">
      <PanelHead title="Screenshot Gallery" />
      <div className="shot-grid">
        {monitors.map((monitor, index) => (
          <article className="shot" key={monitor.key}>
            <div className="screenshot-mock small">
              <div className="browser-bar"><i /><i /><i /><span>capture-{monitor.key}-2407{index + 1}.png</span></div>
              <div className="mock-page"><span>Evidence</span><b>{monitor.title}</b><p>{monitor.change}</p></div>
            </div>
            <h3>{monitor.title}</h3>
            <p>{monitor.target}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AlertList({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "alert-list compact" : "alert-list"}>
      {alerts.map(([severity, title, monitor, state, tone]) => (
        <article className="alert-row" key={title}>
          <div className={`severity ${tone}`}>{severity}</div>
          <div><b>{title}</b><p>{monitor}</p></div>
          <button>{state}</button>
        </article>
      ))}
    </div>
  );
}

function RunHistory() {
  return (
    <table>
      <thead><tr><th>Time</th><th>Monitor</th><th>Result</th><th>Duration</th><th>Run ID</th></tr></thead>
      <tbody>
        {historyRows.map(([time, monitor, result, duration, id]) => (
          <tr key={id}><td>{time}</td><td><b>{monitor}</b></td><td><span className={`table-status ${result.toLowerCase()}`}>{result}</span></td><td>{duration}</td><td>{id}</td></tr>
        ))}
      </tbody>
    </table>
  );
}

function PanelHead({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="panel-head"><h2>{title}</h2>{action && <button onClick={onAction}>{action}<Icon name="chevron" /></button>}</div>
  );
}

function StatusBadge({ status }: { status: RunResult }) {
  const label = status === "change_detected" ? "Change" : status === "failed" ? "Failed" : "Success";
  return <span className={`status ${status}`}>{label}</span>;
}
