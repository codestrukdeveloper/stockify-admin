import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./app";
import "./global.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Stockify Main Demo",
  description: "Stockify Main kit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Toaster />

          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}
