import CreatePost from '@/components/CreatePost'
import Intro from '@/components/Intro'
import PostCard from '@/components/PostCard'
import React from 'react'

const PostPage = () => {
  return (
    <div className='flex flex-col md:flex-row max-w-240 mx-auto gap-2 md:gap-5 mt-2 md:mt-5 px-2 md:px-10'>
        <div>
            {/* intro */}
            <Intro/>
        </div>
        <div className='space-y-4' >
          <CreatePost/>
          <PostCard/>
        </div>
    </div>
  )
}

export default PostPage