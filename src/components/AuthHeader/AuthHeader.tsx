"use client"
import { Routes } from '@/constants/constants'
import { cn } from '@/lib/utils'
import { User, UserPlus } from 'lucide-react'
import Link from 'next/link'
import {  usePathname } from 'next/navigation'
import React from 'react'

export default  function AuthHeader() {

const  pathname = usePathname();


  return (
    <div className='flex gap-10 items-center my-6'>
      <Link href={Routes.LOGIN} className={cn(`border-3 p-5 w-[150px] h-[120px] flex gap-1 items-center justify-center flex-col rounded-md`, pathname === Routes.LOGIN && 'border-[#3B82F6]')}>
        <User size={30} className={cn(pathname === Routes.LOGIN && 'text-[#3B82F6]')}/>
        <p className='text-sm'>Sign in</p>
      </Link>
      <Link href={Routes.REGISTER} className={cn(`border-3 p-5 w-[150px] h-[120px] flex gap-1 items-center justify-center flex-col rounded-md`, pathname === Routes.REGISTER && 'border-[#3B82F6]')}>
        <UserPlus size={30} className={cn(pathname === Routes.REGISTER && 'text-[#3B82F6]')}/>
        <p className='text-sm'>Sign up</p>
      </Link>
    </div>
  )
}
