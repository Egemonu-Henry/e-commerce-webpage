"use client"
import React from 'react'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import { ShoppingCart, TextAlignJustifyEnd, X,  } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import Image from 'next/image'
import { Button } from '@/component/ui/button'



const Navbar = () => {

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect (()=>{
    const handleResize = ()=>{
      if(window.innerWidth >= 750){
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const {items} = useCartStore()
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <nav className='sticky top-0 z-50 bg-white shadow text-black'>
        <div className='container mx-auto flex items-center justify-between px-4'>
            <Link href='/' className='hover:text-blue-600'>
            
              <Image
               src='/image/logo.png'
               width={80}
               height={80}
               alt='logo '
              />
            </Link>
        
            <div className='hidden md:flex space-x-6'>
                <Link href='/' className='hover:text-[#7515df] hover:underline'>Home</Link>
                <Link href='/Products' className='hover:text-[#7515df]'>Products</Link>
                <Link href='/Checkout' className='hover:text-[#7515df]'>Checkout</Link>
            </div>
            <div className='flex items-center space-x-4'>
              <Link href='/Checkout' className='relative'>
                <ShoppingCart/>
                {cartCount > 0 && (
                <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-center text-white'>
                  {cartCount}
                </span>)}
              </Link>
              <Button className='bg-transparent md:hidden' onClick={()=> setMobileOpen((prev)=> !prev)} >
                {mobileOpen? (<X className='text-black'/>): <TextAlignJustifyEnd className='text-black' /> }
              </Button>
            </div>
        </div>
        {mobileOpen && (
          <nav className='md:hidden shadow-md text-right first-letter:uppercase font-medium text-xl'>
            <ul className='flex flex-col p-4 space-y-2'>
              <li> <Link href='/' className='hover:text-blue-600'>Home</Link> </li>
              <li> <Link href='/Products' className='hover:text-blue-600'>Products</Link> </li>
              <li> <Link href='/Checkout' className='hover:text-blue-600'>Checkout</Link> </li>
            </ul>        
          </nav>
        )}
    </nav>
  )
}

export default Navbar