import CreatePost from '@/components/CreatePost'
import Intro from '@/components/Intro'
import Photos from '@/components/Photos'
import PostCard from '@/components/PostCard'
import React from 'react'
import { useSelector } from 'react-redux'

const PostPage = () => {

  const {userProfile} = useSelector(state => state.auth)
  return (
    <div className='flex flex-col md:flex-row max-w-240 mx-auto gap-2 md:gap-5 mt-2 md:mt-5 px-2 md:px-10'>
        <div>
            {/* intro */}
            <Intro/>
            <Photos posts={userProfile?.posts}/>
        </div>
        <div className='space-y-4' >
          <CreatePost/>
          {
            userProfile?.posts?.map((post,index) => (
              <div key={index}>
                <PostCard post={post}/>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default PostPage