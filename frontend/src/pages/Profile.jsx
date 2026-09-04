import defaultCoverImage from "../assets/default-cover-image.png";
import { IoCamera } from "react-icons/io5";
import userLogo from "../assets/fb-user-profile.jpg";
import { LuSquareUser } from "react-icons/lu";
import { LuCamera } from "react-icons/lu";
import { PiBookOpenBold } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import axios from "axios";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "@/redux/authSlice";

const Profile = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const params = useParams()
  const navigate = useNavigate()
  const { userProfile } = useSelector(store => store.auth)
  const coverPhoto = userProfile.coverPhoto || defaultCoverImage


  const fetchUserProfile = async (req,res) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/auth/profile/${params.id}`)
      if(res.data.success){
        dispatch(setUserProfile(res.data.user))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  },[])

  return (
    <div className="min-h-screen ">
      <div className="relative w-full">
        {/* Blurred background */}
        <div
          className="absolute inset-0 bg-center bg-cover filter"
          style={{ backgroundImage: `url(${coverPhoto})` }}
        ></div>
        {/* Overlay to darken he blur */}
        <div className="absolute inset-0 bg-black/40 backbrop-blur-lg bg-linear-to-b from-transparent dark:to-[#262829] to-white"></div>

        {/* Actual cover image */}
        <div className="relative flex justify-center items-center">
          <img
            src={coverPhoto}
            alt="cover"
            className="rounded-b-md w-full lg:w-240 h-60 md:h-100 object-cover"
          />
          <div className="absolute right-5 md:right-55 bottom-3 md:bottom-5 flex items-center gap-2 bg-white hover:bg-gray-100 cursor-pointer text-black py-2 px-3 rounded-md">
            <IoCamera className="text-lg" />
            <span className="text-[15px] font-medium">Add Cover Photo</span>
          </div>
        </div>
      </div>

      
      <div className="bg-white dark:bg-[#262829] z-40 py-4">
        <div className="max-w-240 mx-auto px-5 md:px-10 flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between">
          <div className="flex flex-col md:flex-row md:gap-5 md:items-center relative">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {/* profile picture */}
                <img
                  src={userProfile.profilePicture || userLogo}
                  className="size-44 cursor-pointer hover:invert-25 rounded-full border-4 border-white dark:border-[#262829] object-cover z-30"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60">
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <PiBookOpenBold />
                  <span className="text-base font-medium">View story</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <LuSquareUser />
                  <span className="text-base font-medium">
                    See profile picture
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <LuCamera />
                  <span className="text-base font-medium">
                    Choose profile picture
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
 
            {/* see profile picture dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className='size-100'>
                <DialogHeader>
                  <DialogTitle className='text-center'>Profile picture</DialogTitle>
                </DialogHeader>
                <div className="w-full">
                  <img  src={userProfile.profilePicture || userLogo} className="w-full object-cover"/>
                </div>
              </DialogContent>
            </Dialog>

            {/* name,friends */}
            <div className="flex flex-col gap-0 w-60">
              <h1 className="text-3xl font-bold">Abhijit Nayak</h1>
              <span className="text-gray-900 dark:text-gray-200 mt-1 font-semibold">100 friends</span>
              <span className="text-gray-600 dark:text-gray-400 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore modi</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button className="bg-[#0866ff] hover:bg-[#0a54cb] flex items-center gap-2 cursor-pointer text-white px-2.5 py-1.5 rounded-md">
              <FaUserPlus/>
              <span className="font-bold">Add friend</span>
            </button>
            <button className="bg-[#0866ff] hover:bg-[#0a54cb] flex items-center gap-2 cursor-pointer text-white px-2.5 py-1.5 rounded-md">
              <FaPlus/>
              <span className="font-bold">Add to story</span>
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-100 dark:hover:bg-gray-200 flex items-center gap-2 cursor-pointer text-black px-2.5 py-1.5 rounded-md">
              <MdEdit/>
              <span className="font-bold">Edit profile</span>
            </button>
          </div>
        </div>

        <hr className="mt-5 mb-2 max-w-240 mx-auto" />

        <div className="flex md:gap-5 max-w-240 mx-auto md:px-10">
          <span
            className="hover:bg-gray-100 dark:hover:bg-[#3a3c3d] px-4 py-2 rounded-lg text-base text-gray-600 dark:text-gray-300 cursor-pointer"
            onClick={() => navigate(`/profile/${userProfile._id}/post`)}
          >Posts</span>
          <span
            className="hover:bg-gray-100 dark:hover:bg-[#3a3c3d] px-4 py-2 rounded-lg text-base text-gray-600 dark:text-gray-300 cursor-pointer"
            onClick={() => navigate(`/profile/${userProfile._id}/about`)}
          >About</span>
          <span
            className="hover:bg-gray-100 dark:hover:bg-[#3a3c3d] px-4 py-2 rounded-lg text-base text-gray-600 dark:text-gray-300 cursor-pointer"
            onClick={() => navigate(`/profile/${userProfile._id}/friends`)}
          >Friends</span>
          <span
            className="hover:bg-gray-100 dark:hover:bg-[#3a3c3d] px-4 py-2 rounded-lg text-base text-gray-600 dark:text-gray-300 cursor-pointer"
            onClick={() => navigate(`/profile/${userProfile._id}/photos`)}
          >Photos</span>
        </div>
      </div>
      <Outlet/>
    </div>
  );
};

export default Profile;
