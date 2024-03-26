
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { cookies } from "next/headers";
import { JWTProvider, JwtContext } from "@/components/Provider/Provider";
import { DropdownProvider } from "@/components/Provider/DropdownContext";
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
          <Navbar jwt={jwt} />
          <JWTProvider jwt={jwt}>
            {children}
          </JWTProvider>
          <Footer />
        </DropdownProvider>
      </body>
    </html>
  );
}
