import { Inter } from "next/font/google";
import "./globals.css";
import PrelineScript from "@/components/PrelineScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.className}>
      <body className={'bg-mainbackground'}>
        {children}
        <PrelineScript />
      </body>
    </html>
  );
}
