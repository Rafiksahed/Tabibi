import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'; 
import './globals.css'
import Nav from "./components/nav"
import Footer from "./components/footer"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tabibi',
  description: 'Tabibi ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
