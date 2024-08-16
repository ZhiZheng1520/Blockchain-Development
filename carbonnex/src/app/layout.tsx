import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Open_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { cookieToInitialState } from "wagmi";
import { Toaster } from "@/components/ui/toaster";

import { config } from "@/utils/web3";
import Web3ModalProvider from "@/context/web3";

import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "CarbonNex",
  description: "A Decentralised Carbon Credit Exchange Platform",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Web3ModalProvider initialState={initialState}>
          {children}
        </Web3ModalProvider>
        <Toaster />
      </body>
    </html>
  );
}
