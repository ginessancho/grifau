import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GRIFAU | Pure Water, Pure Elegance",
  description: "The Apple of faucets. Next-generation water filtration that removes PFAS, microplastics, and harmful contaminants. British-French elegance meets revolutionary technology.",
  keywords: ["water filter", "PFAS removal", "microplastics", "luxury faucet", "premium water filtration", "clean drinking water"],
  authors: [{ name: "GRIFAU" }],
  openGraph: {
    title: "GRIFAU | Pure Water, Pure Elegance",
    description: "The Apple of faucets. Next-generation water filtration that removes PFAS, microplastics, and harmful contaminants.",
    url: "https://www.grifau.com",
    siteName: "GRIFAU",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GRIFAU | Pure Water, Pure Elegance",
    description: "The Apple of faucets. Next-generation water filtration technology.",
  },
  robots: {
    index: true,
    follow: true,
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
