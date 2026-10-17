import React from 'react'
import { useSelector } from 'react-redux'

const PhotosPage = () => {

  const { userProfile } = useSelector(store => store.auth)

  return (
    <div className='flex max-w-6xl mx-auto gap-5 mt-0 md:px-10 px-2 ' >
      <div className='bg-white dark:bg-[#262829] p-5 rounded-lg mt-2 md:mt-5 ' >
        <h1 className='font-semibold text-xl mb-5 ' >Photos</h1>
        <div className='grid gid-cols-3 md:grid-cols-5 gap-1 rounded-2xl' >
          {
            userProfile.posts.map((post,index) => (
              <img key={index} src={post?.image} className='aspect-square rounded-lg object-cover' />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default PhotosPage