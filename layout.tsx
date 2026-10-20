import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "She Drives - Women Driving Women",
  description: "Soweto women only transport - CARD ONLY - Live location - SOS",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  manifest: "/manifest.json",
};
export const viewport: Viewport = { themeColor: "#C2185B" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
