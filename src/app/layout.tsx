import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Archipelago Style Premium Real Estate",
  description: "Premium real estate landing page rebuilt in Next.js with animated editorial sections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
