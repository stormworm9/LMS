import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import ToasterProvider from "@/components/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Vision Academy",
  description: "Empowering Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
       appearance={{
        //@ts-ignore
        layout: { unsafe_disableDevelopmentModeWarnings: true }
      }}
      >
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          {children}
          </body>
      </html>
    </ClerkProvider>
  );
}
