import React from 'react'

const layout = ({children}) => {
  return (
    <div className="bg-slate-100">
       <div className="flex flex-col items-center justify-between px-6 py-8 mx-auto h-screen">
        <div className="w-full bg-white rounded-lg shadow mt-0 max-w-screen-md">
        {children}
        </div>
       </div>
    </div>
  )
}

export default layout