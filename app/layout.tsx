import type { Metadata } from "next";
import { Work_Sans, Lora } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Promptpreneur Newsletter",
  description:
    "The Promptpreneur Newsletter. Weekly AI insights for builders.",
  openGraph: {
    title: "The Promptpreneur Newsletter",
    description:
      "The Promptpreneur Newsletter. Weekly AI insights for builders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
