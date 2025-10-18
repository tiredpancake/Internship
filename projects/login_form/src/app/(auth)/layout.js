import { Sidebar } from '@deemlol/next-icons'
import React from 'react'
import {SideBar} from './sidebar';
export default function  AuthLayout  ({children})
{
  return (
    <div className='flex  flex-col min-h-screen lg:flex-row'>
        <div className='bg-gray-background flex-1  '> <SideBar/></div>
        <div className='bg-white flex-1' >{children}</div>
      
    </div>
  )
}

