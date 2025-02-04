// app/layout.tsx
"use client";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Providers } from "../store/Provider";
import { RestaurantProvider } from "@/context/RestaurantProvider";
import { MenuProvider } from "@/context/MenuProvider";
import { useDeviceType } from "@/hooks/useDeviceType";
import MobileMenu from "@/components/MobileMenu";
import DesktopMenu from "@/components/DesktopMenu";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useDeviceType();

  return (
    <html lang="en">
      <head>
        <title>Qikserve Restaurant Challenge</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Qikserve Restaurant Challenge" />
      </head>
      <body>
        <Providers>
          <RestaurantProvider>
            <MenuProvider>
              <div className="header-container" style={{ overflowX: "hidden" }}>
                {isMobile ? <MobileMenu /> : <DesktopMenu />}
                <Header />
              </div>
              <main>{children}</main>
            </MenuProvider>
          </RestaurantProvider>
        </Providers>
      </body>
    </html>
  );
}
