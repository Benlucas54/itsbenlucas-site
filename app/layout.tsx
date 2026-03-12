import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Promptpreneur — Join the Waitlist",
  description:
    "I'm building something for promptpreneurs. Join the waitlist to be first in.",
  openGraph: {
    title: "Promptpreneur — Join the Waitlist",
    description:
      "I'm building something for promptpreneurs. Join the waitlist to be first in.",
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
