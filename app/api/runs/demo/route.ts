import { NextResponse } from "next/server";

const demoRuns = {
  pricing: {
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
  },
  jobs: {
    id: "WF-24072",
    monitor: "Job Board Listing Watch",
    target: "https://example-jobs.test/search?role=ai-automation",
    result: "success",
    duration: "3.1s",
    screenshot: "capture-jobs-24072.png",
    extracted: {
      newListings: 7,
      seniority: "Mid/Senior",
      remoteRatio: "62%",
      confidence: 0.89,
    },
  },
  vendor: {
    id: "WF-24073",
    monitor: "Vendor Status Watch",
    target: "https://status.vendor-demo.test/",
    result: "success",
    duration: "1.8s",
    screenshot: "capture-status-24073.png",
    extracted: {
      status: "Operational",
      incidents: 0,
      latency: "126ms",
      confidence: 0.98,
    },
  },
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const type = (body?.type ?? "pricing") as keyof typeof demoRuns;
  const run = demoRuns[type] ?? demoRuns.pricing;

  return NextResponse.json({
    ok: true,
    run,
    selectors: ["main", "[data-product-card]", ".price", ".stock-state"],
    timeline: [
      "Queued monitor run in demo scheduler",
      "Launching isolated Chromium context",
      "Navigating to target URL",
      "Waiting for stable selector match",
      "Capturing screenshot evidence",
      "Extracting structured data against schema",
      run.result === "change_detected" ? "Diff engine flagged price delta" : "No critical changes detected",
      "Run archived in local demo history",
    ],
  });
}
