// Informação que vai ser atualizada => renderizar do lado do cliente
"use client";

import localFont from "next/font/local";
import "./globals.css";
import Header from "./Header/header";
import Footer from "./Footer/footer";
import React, { useState } from "react";
import { HeroProvider } from "@/context/Editar_Herois";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
  Header: React.ReactNode;
  Footer: React.ReactNode;
}>) {
  const [data, setData] = useState({
    my_name: 'Pedro Marques',
    project_name: 'League of Heroes'
  });

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header my_name={data.my_name} project_name={data.project_name} />
        <HeroProvider>
          {children}
        </HeroProvider>
        <Footer my_name={data.my_name} project_name={data.project_name} />
      </body>
    </html>
  );
}