import type { Metadata } from "next";
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-700.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./studio-polish.css";
import "./motion-polish.css";
import "./work-showcase.css";
import "./architectural-scene.css";
import "./studio-direction.css";
import "./hold-reveal.css";
import "./portal-journey.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Astra devs — From what if to holy shit.",
  description:
    "An independent software studio building websites, apps, automations, and useful digital experiences. Ideas into reality, with Astra devs.",
  applicationName: "Astra devs",
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
  twitter: {
    card: "summary_large_image",
    title: "Astra devs — From what if to holy shit.",
    description: "Websites, apps, automations, and useful digital experiences.",
  },
  openGraph: {
    title: "Astra devs — From what if to holy shit.",
    description: "Websites. Apps. Automations. Less blah blah. More ta-da.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
