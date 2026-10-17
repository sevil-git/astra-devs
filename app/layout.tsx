import type { Metadata } from "next";
import "@fontsource/urbanist/500.css";
import "@fontsource/urbanist/700.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./studio-polish.css";
import "./motion-polish.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Astra devs — Making good code for people",
  description:
    "An independent software studio building websites, apps, automations, and useful digital experiences. Ideas into reality, with Astra devs.",
  applicationName: "Astra devs",
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
  twitter: {
    card: "summary_large_image",
    title: "Astra devs — Making good code for people",
    description: "Websites, apps, automations, and useful digital experiences.",
  },
  openGraph: {
    title: "Astra devs — Making good code for people",
    description: "Websites. Apps. Automations. A little less ordinary.",
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
