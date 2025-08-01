import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ThemeProvider,
  ThemeStyleProvider,
} from "@/components/layouts/theme-provider";
import { Toaster } from "ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "better-chatbot",
  description:
    "Better Chatbot is a chatbot that uses the Tools to answer questions.",
};

// const themes = BASE_THEMES.flatMap((t) => [t, `${t}-dark`]);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          themes={["light", "dark"]}
          storageKey="app-theme"
          disableTransitionOnChange
        >
          <ThemeStyleProvider>
            <div id="root">
              {children}
              <Toaster richColors />
            </div>
          </ThemeStyleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
