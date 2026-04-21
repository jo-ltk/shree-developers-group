import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Shree Developers Group",
  description: "Premium real estate landing page for Shree Developers Group.",
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
