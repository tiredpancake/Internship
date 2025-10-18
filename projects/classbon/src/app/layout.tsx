import "./globals.css";

import { Figtree } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "./_components/footer/footer";
import { Header } from "./_components/header";
import QueryProvider from "@/providers/react-query-provider";
import NextTopLoader from 'nextjs-toploader';
import { Notifications } from "./_components/notification/notifications";

const figtree = Figtree({
    display: "swap",
    subsets: ["latin"],
    variable: "--font-figtree",
    weight: ["300", "400", "500", "600", "700", "700", "800", "900"],
});

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
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            dir="rtl"
            className={`${vazirmatn.variable} ${figtree.variable} dark`}
        >
            <body className="min-h-screen grid grid-rows-[80px_1fr_auto] dark:bg-base-100 dark:text-base-content">
                <NextTopLoader showSpinner={false} color="var(--color-primary)"/>
                <Notifications/>
                <QueryProvider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </QueryProvider>
            </body>
        </html>
    );
}