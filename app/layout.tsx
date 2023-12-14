import './globals.css'
import { Nunito } from 'next/font/google'

import type { Metadata } from 'next'

import Navbar from '@/components/navbar/Navbar';
import RentModal from '@/components/modals/RentModal';
import LoginModal from '@/components/modals/LoginModal';
import SearchModal from '@/components/modals/SearchModal';
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
        <RentModal/>
        <LoginModal/>
        <SearchModal/>
        <RegisterModal/>
        <ToasterProvider/>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
