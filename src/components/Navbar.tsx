'use client'
import Image from 'next/image'
import Link from 'next/link'
import Logo from "@/assets/logoBlack.png"
import { FaSearch } from 'react-icons/fa'
import { IoCloseOutline } from 'react-icons/io5'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { HiMenuAlt2 } from 'react-icons/hi'
import { signOut, useSession } from 'next-auth/react'
const navBarList = [
    {
        title: "Home",
        link: "/home",
    },
    {
        title: "Shop",
        link: "/shop",
    },
    {
        title: "Cart",
        link: "/cart",
    },
    {
        title: "Profile",
        link: "/profile",
    },
    {
        title: "Studio",
        link: "/studio",
    },
]
const Navbar = () => {
    const {data:session} = useSession()
    const [searchQuery,setSearchQuery] = useState("")
    const pathname = usePathname()
  return (
    <div className='w-full h-20 bg-white border-b-[1px] border-b-gray-400 sticky top-0 z-50'>
        <nav className='h-full max-w-screen-xl mx-auto px-4 xl:px-0 flex items-center justify-between gap-2'>
            <Link href="/">
                <Image src={Logo} alt='logo' className='w-20' />
            </Link>
            <div className='relative w-full hidden lg:inline-flex lg:w-[600px] h-10 text-base text-primeColor border-[1px] border-black items-center gap-2 justify-betweenpx-6 rounded-md'>
                <input 
                type="text" 
                placeholder='Search Your product here' 
                className='flex-1 h-full outline-none placeholder:text-gray-600 rounded-md'
                onChange={(e)=> setSearchQuery(e.target.value)}
                value={searchQuery}
                />
                {searchQuery ? 
                <IoCloseOutline
                onClick={()=> setSearchQuery("")}  
                className='w-5 h-5 hover:cursor-pointer hover:text-red-500 duration-200'
                />:<FaSearch 
                className='w-5 h-5 hover:cursor-pointer'
                />}
            </div>
            <div className='hidden md:inline-flex gap-2 items-center'>
                    {navBarList.map((item,index)=>(
                        <Link href={item.link} key={index}
                        className={`flex hover:font-medium w-20 h-6 justify-center items-center px-12 text-gray-600 hover:underline underline-offset-4 decoration-[1px] hover:text-gray-950 md:border-r-[2px] border-r-gray-300 duration-200 last:border-r-0 ${pathname ===item.link && "text-gray-950 font-bold"}`}
                        >
                            {item.title}
                        </Link>
                    ))}
                    {
                        session?.user && <button
                        onClick={()=> signOut()}
                        className='flex hover:font-medium w-20 h-6 justify-center items-center px-12 text-gray-500 hover:underline
                        underline-offset-4 decoration-[1px] hover:text-red-600 md:border-r-[2px] border-r-gray-300 duration-200 last:border-r-0'>Logout</button>
                    }
            </div>
            <HiMenuAlt2 className='inline-flex md:hidden cursor-pointer w-8 h-6 ' />
        </nav>
    </div>
  )
}

export default Navbar