
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { JWTProvider } from "@/components/Provider/JWTprovider";
import { DropdownProvider } from "@/components/Provider/DropdownContext";
import { QuantityProvider } from "@/components/Provider/QuantityContext";
import { QueryProvider } from "@/components/Provider/QueryContext";
import { Suspense } from "react";
import Loading from "./loading";
import SortProvider from "@/components/Provider/SortContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Laptop Store",
  description: "Made By Malek",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} container`}>
        <DropdownProvider>
          <QueryProvider>
            <Navbar  />
            <JWTProvider >
              <QuantityProvider>
                <SortProvider>
                  <Suspense fallback={<Loading />}>
                    {children}
                  </Suspense>
                </SortProvider>
              </QuantityProvider>
            </JWTProvider>
            <Footer />
          </QueryProvider>
        </DropdownProvider>
      </body>
    </html>
  );
}
