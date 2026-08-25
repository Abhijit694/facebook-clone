import defaultCoverImage from '../assets/default-cover-image.png'
import { IoCamera } from "react-icons/io5";
import userLogo from "../assets/fb-user-profile.jpg"

const Profile = () => {
  return (
    <div className='min-h-screen '>
        <div className='relative w-full'>
            {/* Blurred background */}
            <div
              className='absolute inset-0 bg-center bg-cover filter'
              style={{backgroundImage: `url(${defaultCoverImage})`}}
            ></div>
            {/* Overlay to darken he blur */}
            <div className='absolute inset-0 bg-black/40 backbrop-blur-lg bg-linear-to-b from-transparent dark:to-[#262829] to-white'></div>

            {/* Actual cover image */}
            <div className='relative flex justify-center items-center'>
              <img src={defaultCoverImage} alt="cover" className='rounded-b-md w-full lg:w-240 h-60 md:h-100 object-cover' />
              <div className='absolute right-5 md:right-55 bottom-3 md:bottom-5 flex items-center gap-2 bg-white hover:bg-gray-100 cursor-pointer text-black py-2 px-3 rounded-md'>
                <IoCamera className='text-lg'/>
                <span className='text-[15px] font-medium'>Add Cover Photo</span>
              </div>
            </div>
        </div>

        <div className='bg-white dark:bg-[#262829] z-40 py-4'>
          <div className='max-w-240 mx-auto px-5 md:px-10 flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between'>
            <div className='flex flex-col md:flex-row md:gap-5 md:items-center relative'>
              <img src={userLogo} className='size-44 cursor-pointer hover:invert-25 rounded-full border-4 border-white dark:border-[#262829] object-cover z-30 -mt-14'/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Profile