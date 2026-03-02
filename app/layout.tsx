import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Promptpreneur | Learn to Build AI Apps and Make Money with Prompts",
  description:
    "I help regular people make their first money with AI - from zero to building and selling real products. No tech background needed.",
  openGraph: {
    title: "Promptpreneur | Learn to Build AI Apps and Make Money with Prompts",
    description:
      "I help regular people make their first money with AI - from zero to building and selling real products. No tech background needed.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={workSans.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
