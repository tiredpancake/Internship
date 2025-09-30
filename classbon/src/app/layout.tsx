import "./globals.css";
import {Figtree} from 'next/font/google';
import localFont from 'next/font/local';
import path from "path";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

const figtree=Figtree({
  display:"swap",
  subsets:['latin'],
  weight:['300','400','500','600','700','800','900'],
  variable:"--font-figtree"

})

const vazirmatn=localFont({
  src:[
    {
      path:'../../public/fonts/Vazirmatn-FD-Thin.ttf',
      weight:'100',
      style:'normal'
    },
     {
      path:'../../public/fonts/Vazirmatn-FD-Light.ttf',
      weight:'300',
      style:'normal'
    },
    {
      path:'../../public/fonts/Vazirmatn-FD-Regular.ttf',
      weight:'400',
      style:'normal'
    },
    {
      path:'../../public/fonts/Vazirmatn-FD-SemiBold.ttf',
      weight:'600',
      style:'normal'
    },
    {
      path:'../../public/fonts/Vazirmatn-FD-Bold.ttf',
      weight:'700',
      style:'normal'
    },
    {
      path:'../../public/fonts/Vazirmatn-FD-Black.ttf',
      weight:'900',
      style:'normal'
    },
  ],
  variable:'--font-vazirmatn'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  dir="rtl" className={` dark ${figtree.variable} ${vazirmatn.variable}`}>
      <body className=" min-h-screen grid grid-rows-[80px_1fr_auto]  dark:bg-base-100 dark:text-base-content">
        <Header/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
