import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer/Footer'
import Provider from '@/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Realtor - Application',
  description: 'Realtor - Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
