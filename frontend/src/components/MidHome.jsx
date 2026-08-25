import React from 'react'
import CreatePost from './CreatePost'
import PostCard from './PostCard'

const MidHome = () => {
  return (
    <div className='pt-16 md:pl-95 bg-[#f2f4f7] dark:bg-[#1b1b1c] flex-1 justify-center px-3 md:px-0'>
      <CreatePost/>
      <PostCard/>
    </div>
  )
}

export default MidHome