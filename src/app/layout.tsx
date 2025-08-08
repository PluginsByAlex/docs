import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Plugins by Alex",
    template: "%s • Plugins by Alex",
  },
  description: "Documentation for Alex’s Minecraft plugins",
  applicationName: "Plugins by Alex",
  authors: [{ name: "Alex" }],
  keywords: [
    "Minecraft",
    "plugins",
    "docs",
    "MessageCore",
    "GlobalQuests",
    "shadcn",
    "Tailwind"
  ],
  openGraph: {
    type: "website",
    siteName: "Plugins by Alex",
    title: "Plugins by Alex",
    description: "Documentation for Alex’s Minecraft plugins",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plugins by Alex",
    description: "Documentation for Alex’s Minecraft plugins",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
