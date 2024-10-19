import Link from 'next/link'
import React from 'react'
import {FiMenu} from "react-icons/fi"
import MobileMenu from '../mobile-menu/mobile-menu'

const Navbar = ({session}) => {
  return (
    <header className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b bg-secondary border-primary/10 h-16">
        <nav className="flex items-center justify-between w-full">
                <div>
                <MobileMenu />
            <Link href="/"
            
            >
                <h1 className="hidden md:block">
                NoteTracker
                </h1>
            </Link>
                </div>
            <div className="flex items-center gap-x-3">
            {session?.user.email}
            </div>
        </nav>
    </header>
  )
}

export default Navbar