import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Shree Developers Group",
  description: "Premium real estate landing page for Shree Developers Group.",
  icons: {
    icon: "/images/logo-black.png",
    shortcut: "/images/logo-black.png",
    apple: "/images/logo-black.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
