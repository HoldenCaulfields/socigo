// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProviderWrapper from './providers/AuthProviderWrapper';
import MainHeader from "@/components/Layout/MainHeader";
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Socigo - Social Service Marketplace", // Updated Title
  description: "A social network and service marketplace platform.", // Updated Description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProviderWrapper>
          <MainHeader />
          {children}
          <LoginModal />
          <SignupModal />
        </AuthProviderWrapper>
      </body>
    </html>
  );
}