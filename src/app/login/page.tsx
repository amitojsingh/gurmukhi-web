import Gurfateh from '@/components/gurfateh/Gurfateh'
import Header from '@/components/header/Header'
import SignIn from '@/components/signin/SignIn'
import React from 'react'

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col justify-between background-layer">
      <Header />
      <section className="flex flex-row w-full h-full items-center justify-between gap-5 p-12 absolute">
        <Gurfateh />
        <SignIn />
      </section>
    </main>
  )
}
