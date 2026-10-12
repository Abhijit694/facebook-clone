import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import userLogo from '../assets/fb-user-profile.jpg'
import { RiSendInsLine } from "react-icons/ri";
import TimeAgo from './TimeAgo';
import { PiDotsThreeBold } from "react-icons/pi";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import axios from 'axios';
import { toast } from './ui/toast';

const CommentBox = ({post}) => {

    const {user} = useSelector(store => store.auth)
    const [content, setContent] = useState('')

    const postCommentHandler = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/comment/${id}/create`,
                {content},
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )
            if(response.data.success){
                setContent('')
                toast.add({
                    type: "success",
                    description: response.data.message
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCommentHandler = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v1/comment/${id}/delete`,
                {
                    withCredentials: true
                }
            )
            if(response.data.success){
                toast.add({
                    type: "success",
                    description: response.data.message
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const likeCommentHandler = async (id) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/comment/${id}/like`,
                {},
                { withCredentials: true }
            )
            if(response.data.success){
                toast.add({
                    type: "success",
                    description: response.data.message
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className='my-2'>
        <hr />
        <div className='flex gap-2 my-2 mb-2 p-2' >
            <Avatar>
                <AvatarImage src={user?.profilePicture || userLogo} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='bg-[#e4e6eb] flex-1 rounded-md flex gap-1 px-2'>
                <textarea
                    placeholder="Write a comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='p-3 rounded-md text-base outline-none resize-none flex-1 scrollbar-none'
                ></textarea>
                <button
                    disabled={!content.trim()}
                    className='text-xl text-gray-500 size-5 relative top-11 cursor-pointer disabled:opacity-40 disabled:cursor-default '
                    onClick={() => postCommentHandler(post?._id)}
                > 
                    <RiSendInsLine />
                </button>
            </div>

        </div>

        <div className='mt-2 space-y-2 p-2'>
            {
                post?.comments?.map((comment,index) => (
                    <div key={index} className='flex gap-2'>
                        <Avatar>
                            <AvatarImage src={comment?.userId?.profilePicture || userLogo} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        {/* Name and content */}
                        <div className='flex flex-col gap-1'>
                            <div className='flex'>
                                <div className='flex flex-col'>
                                    <div>
                                        <span className='text-sm font-medium'>{comment?.userId?.firstname} {comment?.userId?.lastname} . </span>
                                        <TimeAgo className='text-sm text-gray-500' createdAt={comment?.createdAt} />
                                    </div>
                                    <div>{comment?.content}</div>
                                </div>
                                <div className='cursor-pointer size-5 flex justify-center items-center rounded-full hover:bg-gray-100'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <PiDotsThreeBold className='cursor-pointer'/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() => deleteCommentHandler(comment?._id)}
                                            >Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div
                                className={`cursor-pointer size-5 flex justify-center items-center ${comment?.likes.includes(user?._id) ? 'text-blue-500' : '' }`}
                                onClick={() => likeCommentHandler(comment._id)}
                            >
                                {
                                    comment?.likes.includes(user?._id) ? <AiFillLike/> :  <AiOutlineLike/>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default CommentBox