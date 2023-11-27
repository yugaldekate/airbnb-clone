import './globals.css'
import { Nunito } from 'next/font/google'

import type { Metadata } from 'next'

import Navbar from '@/components/navbar/Navbar';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';

import ToasterProvider from '@/providers/ToasterProvider';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar/>
        <LoginModal/>
        <RegisterModal/>
        <ToasterProvider/>
        {children}
      </body>
    </html>
  )
}
