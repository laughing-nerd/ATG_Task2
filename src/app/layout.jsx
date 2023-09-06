import { Inter } from 'next/font/google'
import "./globals.css"
import "bootstrap/dist/css/bootstrap.css"
import CurrentUserContext from '@/app/contexts/context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ATG Task-2',
  description: 'Task 2 of Across The Globe',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CurrentUserContext>
          {children}
        </CurrentUserContext>
      </body>
    </html>
  )
}
