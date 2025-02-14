import React from 'react'
import Header from '../components/Header'

function MainLayout({children}) {
  return (
    <div className=''>
        <Header />
        {children}
    </div>
  )
}

export default MainLayout