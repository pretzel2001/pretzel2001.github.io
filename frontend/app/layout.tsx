import "@/app/globals.css";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Strong wrapper component protect children types from compiler smash!
function LocalThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Me put suppressHydrationWarning here too! Stop extension bug giants from breaking body */}
      <body suppressHydrationWarning>
        {/* Set default to dark, block system light preference sync! */}
        <LocalThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </LocalThemeProvider>
      </body>
    </html>
  );
}