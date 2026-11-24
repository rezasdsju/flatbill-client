import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import ThemeProvider from "@/components/provider/ThemeProvider";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: {
    default: "FlatBill: Building Bill & Service Charge Management",
    template: "%s | FlatBill",
  },
  description:
    "Manage monthly service charges, payments, expenses, notices and complaints for your apartment building in one place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${notoSansBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute={`class`}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
