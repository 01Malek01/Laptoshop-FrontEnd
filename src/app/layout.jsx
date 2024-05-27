
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { cookies } from "next/headers";
import { JWTProvider, JwtContext } from "@/components/Provider/Provider";
import { DropdownProvider } from "@/components/Provider/DropdownContext";
import { QuantityProvider } from "@/components/Provider/QuantityContext";
import { QueryProvider } from "@/components/Provider/QueryContext";
import { Suspense } from "react";
import Loading from "./loading";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Laptop Store",
  description: "Made By Malek",
};


export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const jwt = cookieStore.get('jwt');
  return (
    <html lang="en">
      <body className={`${inter.className} container`}>
        <DropdownProvider>
          <QueryProvider>
            <Navbar jwt={jwt} />
            <JWTProvider jwt={jwt}>
              <QuantityProvider>
                <Suspense fallback={<Loading />}>
                  {children}
                </Suspense>
              </QuantityProvider>
            </JWTProvider>
            <Footer />
          </QueryProvider>
        </DropdownProvider>
      </body>
    </html>
  );
}
