import { auth } from '@/auth'
import React from 'react'
import Navbar from '../_components/navbar/navbar'
import Sidebar from '../_components/sidebar/sidebar'


const layout = async ({children}) => {
    const session = await auth()
  return (
    <div className="h-[100vh]">
        <Navbar session={session} />
        <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
            <Sidebar />
        </div>
    <main className="md:pl-20 pt-16 min-h-full">
        {children}
    </main>
    </div>
  )
} 

export default layout