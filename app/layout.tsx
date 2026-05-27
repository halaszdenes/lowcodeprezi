import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Low-Code, Big Impact — Denes Halasz",
  description:
    "Transforming Careers with Power Platform. An animated talk by Denes Halasz.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
