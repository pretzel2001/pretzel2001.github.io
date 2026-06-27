import "@/app/globals.css";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { Metadata } from 'next';
function LocalThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

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