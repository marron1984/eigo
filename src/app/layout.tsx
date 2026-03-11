import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";

export const metadata: Metadata = {
  title: "Eigo - 英語学習",
  description: "吉田俊輔の英語学習プラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased min-h-screen">
        <Header />
        <div className="flex min-h-[calc(100vh-64px)]">
          <Navigation />
          <main className="flex-1 p-6 md:p-8 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
