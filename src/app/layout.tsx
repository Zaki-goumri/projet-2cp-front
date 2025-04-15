import React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ReactQueryProvider from "@/modules/shared/components/ReactQueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-root">
      <ThemeProvider defaultTheme="light" storageKey="app-theme">
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </ThemeProvider>
    </div>
  );
} 