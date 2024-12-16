import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/context/useSession";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarExcept from "@/components/navbarExcept";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Festify",
  description: "Music & Film Ticketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider>
          <NavbarExcept />
          {children}
          <ToastContainer
            draggable
            closeOnClick
            autoClose={3000}
            position="top-center"
          />
        </SessionProvider>
      </body>
    </html>
  );
}
