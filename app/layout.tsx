import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Man Plumbing — Indianapolis Residential Plumbing",
  description:
    "Considered residential plumbing for Indianapolis and the Northside, with transparent pricing and a guarantee on every job.",
  icons: {
    icon: "/scraped/images/img-001.jpg",
    shortcut: "/scraped/images/img-001.jpg",
    apple: "/scraped/images/img-001.jpg",
  },
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
