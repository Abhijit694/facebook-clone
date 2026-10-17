import React from 'react'

const Photos = ({posts}) => {
  return (
    <div className='bg-white dark:bg-[#262829] p-5 rounded-lg mt-2 md:mt-5' >
        <h1 className='font-semibold text-xl mb-5' >Photos</h1>
        <div className='grid grid-cols-3 gap-1 rounded-2xl' >
          {
            posts.map((post,index) => (
              <img key={index} src={post?.image} className='aspect-square rounded-lg object-cover' />
            ))
          }
        </div>
    </div>
  )
}

export default Photos