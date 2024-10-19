'use client'
import React from 'react'

const Sidebar = () => {
    const routes = [
        {
            icon: Home,
            href: "/",
            label: "Home"

        }
    ]
  return (
    <aside
    className="space-y-4 flex flex-col h-full text-primary bg-secondary"
    >
        <div className="p-3 flex-1 justify-center">
            <div className="space-y-2">
                Routes
            </div>
        </div>
    </aside>
  )
}

export default Sidebar