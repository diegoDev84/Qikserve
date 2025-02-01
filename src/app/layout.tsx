// app/layout.tsx
import React from "react";
import "../styles/globals.css";
import Header from "../components/Header";
import { Providers } from "../store/Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Qikserve Restaurant Challenge</title>
      </head>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
