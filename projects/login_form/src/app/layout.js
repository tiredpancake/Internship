import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="" >
        {children}
         <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
