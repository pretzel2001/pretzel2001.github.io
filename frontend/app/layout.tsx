import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/sections/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anannya Preeta",
  description:
    "Portfolio of Anannya Preeta, a full-stack software engineer based in Dhaka, Bangladesh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}