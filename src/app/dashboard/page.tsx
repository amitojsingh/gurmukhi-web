import Header from '@/components/header/Header'
import LevelsFooter from '@/components/levels-footer/LevelsFooter'
import React from 'react'

export default function Dashboard() {  
  return (
    <main className="flex min-h-screen flex-col justify-between background-layer">
      <Header loggedIn={true} />
      <div>Dashboard</div>
      <LevelsFooter />
    </main>
  )
}
