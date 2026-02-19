import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MergeFund - The Future of Open Source Funding",
  description:
    "Fund open source work. Get paid for contributions. MergeFund connects maintainers with contributors through bounties.",
  /*
   * HACKATHON NOTE:
   * Feel free to update metadata for your redesign.
   * Good SEO/metadata is part of a great landing page!
   */
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/*
          HACKATHON TIP:
          You can add a theme provider here if you want to implement dark mode toggle.
          For simplicity, we're using system preference via CSS.
        */}
        {children}
      </body>
    </html>
  );
}
