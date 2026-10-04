import React, { useEffect } from 'react'
import CreatePost from './CreatePost'
import PostCard from './PostCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '@/redux/postSlice'

const MidHome = () => {

  const dispatch = useDispatch()
  const {posts} = useSelector(store => store.post)

  const getAllPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/post/getallpost`,
        { withCredentials: true }
      )
      if(response.data.success){
        dispatch(setPosts(response.data.posts))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllPost()
  },[])

  return (
    <div className='pt-16 md:pl-95 bg-[#f2f4f7] dark:bg-[#1b1b1c] flex-1 justify-center px-3 md:px-0'>
      <CreatePost/>
      <div className='space-y-4 max-w-225'>
        {
          posts.map((post,index) => {
            return (<PostCard key={index} post={post} />)
          })
        }
      </div>
    </div>
  )
}

export default MidHome