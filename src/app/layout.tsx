import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwiftBill — Professional Invoicing for Freelancers",
  description: "Create, send, and track professional invoices in seconds. 15 PDF templates, AI-powered generation, ZATCA & UAE FTA invoice formatting.",
  icons: { icon: "/images/app-icon.png", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
