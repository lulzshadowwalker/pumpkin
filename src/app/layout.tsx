import { CreationsProvider } from "@/context/creations-context";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Pumpkin",
  description:
    "Pumpkin is an ai image generation platform for the creative minds.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <SessionProvider>
          <CreationsProvider>
            <main>
              {children}
            </main>
          </CreationsProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
