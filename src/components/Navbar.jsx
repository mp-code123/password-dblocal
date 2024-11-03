import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-blue-900">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className='logo text-white text-3xl'>i<span className='text-blue-200'>Pwd</span></div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <a href="#" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Manage Passwords</a>
                            </div>
                        </div>
                    </div>
                    <button className='text-white rounded-full'>
                        <img className="invert-0 w-8" src="icons/github.png" alt="github" />
                    </button>
                </div>
            </div>
        </nav>

    )
}

export default Navbar
