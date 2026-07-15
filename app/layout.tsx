import "@/app/globals.css";
import type { Metadata } from 'next';
import { LocalThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Preeta | Software Engineer",
  description: "My personal portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LocalThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </LocalThemeProvider>
      </body>
    </html>
  );
}