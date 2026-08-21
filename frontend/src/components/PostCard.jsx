import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import userLogo from '../assets/fb-user-profile.jpg'
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";

const PostCard = () => {

  return (
    <div className='bg-white dark:bg-[#262829] rounded-lg md:w-125 shadow-lg mt-3'>
        <div className='flex justify-between items-center p-4 mb-2'>
            <div className='flex gap-2 items-center '>
                <Avatar className="size-9">
                    <AvatarImage src={userLogo} />
                </Avatar>
                <div className='flex flex-col gap-0'>
                    <span className='text-base text-black dark:text-white font-medium'>username</span>
                    <span className='text-sm text-gray-500 '>jun 30 at 12:31pm</span>
                </div>
            </div>
            <div className='size-9 hover:bg-gray-200 dark:hover:bg-[#373a3b] rounded-full flex items-center justify-center cursor-pointer'>
                <BsThreeDots className='text-xl'/>
            </div>
        </div>

        <div className='w-full flex flex-col'>
            <p className='px-4'>This is my first post</p>
            <img src={userLogo} className='w-full' />
        </div>

        <div className='h-10 flex text-gray-500'>
            <div className='h-full w-fit px-2 flex gap-2 items-center justify-center hover:bg-gray-100 cursor-pointer'>
                <AiOutlineLike className='text-2xl' />
                <span className='text-sm'>0</span>
            </div>
            <div className='h-full w-fit px-2 flex gap-2 items-center justify-center hover:bg-gray-100 cursor-pointer'>
                <FaRegComment className='text-xl' />
                <span className='text-sm'>0</span>
            </div>
            <div className='h-full w-fit px-2 flex gap-2 items-center justify-center hover:bg-gray-100 cursor-pointer'>
                <PiShareFat className='text-2xl ' />
                <span className='text-sm'>0</span>
            </div>
        </div>
    </div>
  )
}

export default PostCard