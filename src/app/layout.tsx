import { ReactNode } from 'react'
import { Inter } from 'next/font/google'

import './globals.css'
import { Navigation } from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aliar Sistemas',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body
        className={`${inter.className} bg-gray-900 text-gray-50 flex justify-center h-full`}
      >
        <div
          className="grid sm:grid-cols-main sm-max:grid-rows-main w-full min-h-[752px] max-w-[1180px]
         bg-gray-50 rounded-2xl p-4 sm:my-4 "
        >
          <div className="bg-gray-800 rounded-2xl sm-max:self-start">
            <Navigation />
          </div>
          <div className="flex flex-col">
            <div className="flex-1 p-8">{children}</div>
            <div className="text-emerald-400 font-bold italic text-center text-lg">
              Aliar Sistemas
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
