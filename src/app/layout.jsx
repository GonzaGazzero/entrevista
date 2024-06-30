import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import Menu from "@/components/Menu/Menu";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Entrevista",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="container">
          <Menu />
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
