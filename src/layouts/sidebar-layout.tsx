"use client";

import React, { useState } from 'react'
import { BsArrowLeftCircle } from "react-icons/bs";
import { cn } from '../../lib/utils';

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(true)
    return (
        // <div className='h-screen bg-yellow-200'>{children}</div>
        <div className={cn('h-screen bg-white text-black grid duration-500',
            open ? "grid-cols-[260px_1fr]" : "grid-cols-[60px_1fr]"
        )}>
            <div className='grid grid-rows-[60px_1fr] border-r  border-gray-400 duration-500'>
                <div className={cn('grid border-b w-full border-gray-400 ', open ? "grid-cols-[1fr_60px]" : "grid-cols-1")}>
                    <div className={cn('flex justify-center items-center whitespace-nowrap overflow-hidden', !open && "hidden")}>Top-nav Bar</div>
                    <div className={cn("flex justify-center items-center cursor-pointer duration-700")} onClick={() => setOpen((prev) => (!prev))}><BsArrowLeftCircle  className={cn(open ? "rotate-180" : "rotate-0")}/></div>
                </div>
                <div className=' flex justify-center items-center whitespace-nowrap overflow-hidden'> Side-nav Bar</div>
            </div>
            <div className='grid grid-rows-[60px_1fr]'>
                <div className='border-b border-gray-400 flex justify-center items-center'>Top-nav Bar</div>
                <div className=''>{children}</div>
            </div>
        </div>
    )
}

export default SidebarLayout