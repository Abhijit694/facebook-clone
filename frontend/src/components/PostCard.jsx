import React, { useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import userLogo from '../assets/fb-user-profile.jpg'
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import TimeAgo from './TimeAgo'
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { toast } from './ui/toast';
import axios from 'axios';
import { setPosts } from '@/redux/postSlice';
import CommentBox from './CommentBox';

const PostCard = ({post}) => {

    const dispatch = useDispatch()
    const {user} = useSelector(store => store.auth)
    const {posts} = useSelector(store => store.post)
    const [liked, setLiked] = useState(post?.likes?.includes(user?._id))
    const [postLikeCount, setPostLikeCount] = useState(post?.likes?.length)
    const [openCommentDialog, setOpenCommentDialog] = useState(false)

    const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like'
            const response = await axios.get(
                `http://localhost:8000/api/v1/post/${post._id}/${action}`,
                { withCredentials: true }
            )
            if(response.data.success){
                const updatedLikes = liked ? postLikeCount - 1 : postLikeCount + 1
                setPostLikeCount(updatedLikes)
                setLiked(!liked)

                // updating the post
                const updatedPostData = posts.map(p => (
                    p._id === post._id ? {
                        ...p,
                        likes: liked  // the liked value is the old value
                            ? p.likes.filter(id => id !== user._id)
                            : [...p.likes,user._id]
                    } : p
                ))
                dispatch(setPosts(updatedPostData));

                toast.add({
                    type: "success",
                    description: response.data.message
                })
            }
        } catch (error) {
            console.log(error)
            toast.add({
                    type: "error",
                    description: error.response.data.message
                })
        }
    }


    const sharePostHandler = (postId) => {
        const postUrl = `${window.location.origin}/post/${postId}`
        if(navigator.share){
            navigator
                .share({
                    title: "CheckOut this post!",
                    text: "Check this amazing post",
                    url: postUrl
                })
                .then(() => {
                    console.log("Shared successfully.")
                })
                .catch((err) => {
                    console.error("Error sharing:",err)
                })
        } else {
            // Fallback : copy to clipboard
            navigator.clipboard.writeText(postUrl)
            .then(() => {
                toast.add({
                    type: "success",
                    description: "Post link copied to clipboard"
                })
            })
        }
    }

  return (
    <div className='bg-white dark:bg-[#262829] rounded-lg md:w-125 shadow-lg mt-3'>
        <div className='flex justify-between items-center p-4 mb-2'>
            <div className='flex gap-2 items-center '>
                <Avatar className="size-9">
                    <AvatarImage src={post?.user?.profilePicture || userLogo} />
                </Avatar>
                <div className='flex flex-col gap-0'>
                    <span className='text-base text-black dark:text-white font-medium'>{post?.user?.firstname} {post?.user?.lastname}</span>
                    <TimeAgo className='text-sm text-gray-500' createdAt={post.createdAt} />
                </div>
            </div>
            <div className='size-9 hover:bg-gray-200 dark:hover:bg-[#373a3b] rounded-full flex items-center justify-center cursor-pointer'>
                <BsThreeDots className='text-xl'/>
            </div>
        </div>

        <div className='w-full flex flex-col'>
            <p className='px-4'>{post.content}</p>
            <img src={post.image} className='w-full' />
        </div>

        <div className='h-10 flex text-gray-500'>
            <div className='h-full w-fit px-2 flex gap-2 items-center justify-center hover:bg-gray-100 cursor-pointer rounded-bl-lg'>
                <div onClick={likeOrDislikeHandler}>
                    {
                        liked ? <AiFillLike className='text-2xl text-blue-500' /> : <AiOutlineLike className='text-2xl' />
                    }
                </div>
                <span className='text-sm'>{postLikeCount}</span>
            </div>
            <div 
                className='h-full w-fit px-2 flex gap-2 items-center justify-center hover:bg-gray-100 cursor-pointer'
                onClick={() => setOpenCommentDialog(!openCommentDialog)}
            >
                <FaRegComment className='text-xl' />
                <span className='text-sm'>{post.comments.length}</span>
            </div>
            <div
                className='h-full w-fit px-2 flex gap-2 items-center justify-center hover:bg-gray-100 cursor-pointer'
                onClick={() => sharePostHandler(post._id)}
            >
                <PiShareFat className='text-2xl ' />
                <span className='text-sm'>{post.share.length}</span>
            </div>
        </div>
        {
            openCommentDialog && <CommentBox post={post} />
        }
    </div>
  )
}

export default PostCard