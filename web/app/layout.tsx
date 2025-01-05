import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {useMemo} from "react";
import DynamicPixels from "../../lib/DynamicPixels";
import Config from "@/app/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DynamicPixels | TicTocToe",
  description: "To be example of the Typescript SDK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
                crossOrigin="anonymous"
            />
        </head>
        <body className={inter.className}>
        <Config/>
        {children}
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
            crossOrigin="anonymous"
        />
        </body>
        </html>
    );
}
