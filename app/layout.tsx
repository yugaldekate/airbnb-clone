import './globals.css'
import { Nunito } from 'next/font/google'

import type { Metadata } from 'next'

import Modal from '@/components/modals/Modal';
import Navbar from '@/components/navbar/Navbar';

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
        <Modal isOpen={true}/>
        {children}
      </body>
    </html>
  )
}
