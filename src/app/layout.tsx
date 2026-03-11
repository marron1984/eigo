import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";

export const metadata: Metadata = {
  title: "Eigo - 英語学習",
  description: "毎日続ける英語学習プラットフォーム",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Eigo",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased h-full">
        <div className="h-full flex flex-col max-w-lg mx-auto relative">
          <main className="flex-1 app-scroll pb-20">
            {children}
          </main>
          <Navigation />
        </div>
      </body>
    </html>
  );
}
