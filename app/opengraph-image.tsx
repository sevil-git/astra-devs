import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Astra devs — Websites, apps, and automations. Making good code for people.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = await readFile(
  join(
    process.cwd(),
    "node_modules/@fontsource/urbanist/files/urbanist-latin-700-normal.woff",
  ),
);

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d0d0d",
          color: "#b7ab98",
          padding: "54px 64px",
          fontFamily: "Urbanist",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 15,
            letterSpacing: 4,
          }}
        >
          <span>INDEPENDENT SOFTWARE STUDIO</span>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path d="M5 19 19 5M5 5h14v14" stroke="#eb5939" strokeWidth="1.5" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 150,
            fontWeight: 700,
            letterSpacing: -11,
            lineHeight: 0.85,
          }}
        >
          <span>ASTRA</span>
          <span style={{ color: "#eb5939" }}>DEVS.</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
          }}
        >
          <span>Making good code for people.</span>
          <span>Websites. Apps. Automations.</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Urbanist", data: font, weight: 700, style: "normal" }],
    },
  );
}
