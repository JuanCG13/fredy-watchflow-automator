import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WatchFlow Automator — Browser Automation Monitoring Demo",
  description:
    "A portfolio demo by Fredy Gimenez showing browser automation monitoring, Playwright-style run logs, screenshots, structured extraction, and alert triage.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
