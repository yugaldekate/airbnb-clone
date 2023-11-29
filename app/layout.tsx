import './globals.css'
import { Nunito } from 'next/font/google'

import type { Metadata } from 'next'

import Navbar from '@/components/navbar/Navbar';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';

import ToasterProvider from '@/providers/ToasterProvider';

import getCurrentUser from '@/actions/getCurrentUser';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar currentUser={currentUser} />
        <LoginModal/>
        <RegisterModal/>
        <ToasterProvider/>
        {children}
      </body>
    </html>
  )
}
