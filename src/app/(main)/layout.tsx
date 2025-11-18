import { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ClientLayoutWrapper } from '@/components/Client-layout-wrapper'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <ClientLayoutWrapper>
        {children}
      </ClientLayoutWrapper>
      <Footer />
    </>
  )
}
