"use client";
import './globals.css';
import React from 'react';
import { UserProvider } from '@/contexts/userContext';
import Header from '@/components/Header';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className='flex flex-col min-h-screen'>
        <UserProvider>
        <Header/>
          <main className="p-0 m-0 w-auto flex-1 overflow-auto flex flex-col">
            {children}
          </main>
          <footer className="">

          </footer>
        </UserProvider>
      </body>
    </html>
  );
}
