import Footer from './Footer'
import NavBar from './NavBar'
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
