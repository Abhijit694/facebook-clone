import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "/facebook-logo.png";
import { FiSearch } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { FaMoon, FaUserFriends } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";
import { MdLogout, MdOutlineOndemandVideo } from "react-icons/md";
import { HiBell } from "react-icons/hi2";
import userLogo from "../assets/fb-user-profile.jpg"
import { IoIosArrowDown } from "react-icons/io";
// import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/themeSlice";
import axios from "axios";
import { toast } from "./ui/toast";
import { setUser } from "@/redux/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setPosts } from "@/redux/postSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useDispatch()
  const { theme } = useSelector(store => store.theme)
  const {user} = useSelector(state => state.auth)
  
  // Determine active icon based on current route
  const getActiveIconFromRoute = (pathname) => {
    if(pathname === "/") return "home"
    if(pathname === "/reels") return "reels"
    if(pathname === "/friends") return "friends"
    return "home"  // default value
  }
  
  const [activeIcon, setActiveIcon] = useState(getActiveIconFromRoute(location.pathname))

  
  // change the activeIcon on every click
  useEffect(() => {
    setActiveIcon(getActiveIconFromRoute(location.pathname))
  },[location.pathname])


  const homeIconHandler = () => {
    navigate("/")
    console.log(activeIcon)
  }

  const reelsIconHandler = () => {
    navigate("/reels")
    console.log(activeIcon)
  }

  const friendsIconHandler = () => {
    navigate("/friends")
    console.log(activeIcon)
  }

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/auth/logout`)
      if(res.data.success){
        dispatch(setUser(null))
        dispatch(setPosts([]))
        navigate("/login")
        toast.add({
          type: "success",
          description: res.data.message
        })
      }
    } catch (error) {
      console.log(error)
      toast.add({
        type: "error",
        description: res.data.message
      })
    }
  }

  return (
    <nav className="bg-white dark:bg-[#262829] shadow h-14 fixed w-full z-50 px-4 py-2 md:py-0 flex justify-between items-center">
      {/* <div className="px-4 py-2 md:py-0 flex justify-between items-center"> */}
        {/* left section - logo + search */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 rounded-full object-fill cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="relative flex items-center bg-[#f2f4f7] dark:bg-[#323233] p-2 rounded-full">
            <label htmlFor="search">
              <FiSearch className="text-gray-500" />
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search Facelook"
              className="dark:bg-[#323233] bg-[#f2f4f7] placeholder-gray-500 ml-2 h-6.5 outline-none text-sm w-28 md:w-50 text-black dark:text-gray-200"
            />
          </div>
        </div>

        {/* Center section - navigation icons */}
        <div className="hidden md:flex h-full gap-1">
          <button onClick={homeIconHandler} className={ `${activeIcon === "home" ? "border-b-3 border-blue-600 text-blue-600" : "rounded-lg text-gray-400 hover:bg-gray-100 cursor-pointer"} w-30 flex items-center justify-center`}>
            <GoHomeFill className="text-2xl" />
          </button>
          <button onClick={reelsIconHandler} className={ `${activeIcon === "reels" ? "border-b-3 border-blue-600 text-blue-600" : "rounded-lg text-gray-400 hover:bg-gray-100 cursor-pointer"} w-30 flex items-center justify-center`}>
            <MdOutlineOndemandVideo className="text-2xl" />
          </button>
          <button onClick={friendsIconHandler} className={ `${activeIcon === "friends" ? "border-b-3 border-blue-600 text-blue-600" : "rounded-lg text-gray-400 hover:bg-gray-100 cursor-pointer"} w-30 flex items-center justify-center`}>
            <FaUserFriends className="text-2xl" />
          </button>
        </div>

        {/* Right section - profile & icons */}
        <div className="flex items-center justify-end space-x-4 w-[200px]">
          <div className="flex justify-center items-center bg-gray-300 size-9 rounded-full dark:bg-[#323233]">
            <HiBell className="text-2xl text-gray-900 dark:text-gray-200 cursor-pointer hover:text-blue-600 hidden md:block" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="m-0">
              <Avatar className='size-9 cursor-pointer relative'>
                <div className="size-3.75 absolute rounded-full bg-gray-200 dark:bg-[#323233] outline-2 outline-white dark:outline-[#262829] bottom-0 right-0 flex items-center justify-center">
                  <IoIosArrowDown className="text-[13px] text-gray-700 dark:text-gray-200"/>
                </div>
                <AvatarImage src={ user?.profilePicture || userLogo} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 text-black dark:text-white bg-white dark:bg-[#262829]'>
              <DropdownMenuGroup>
                <DropdownMenuItem className='text-base cursor-pointer' onClick={() => navigate(`/profile/${user._id}/post`)} >My Profile</DropdownMenuItem>
                <DropdownMenuItem className='text-base cursor-pointer' onClick={() => navigate('/friends')} >Friends</DropdownMenuItem>
                <DropdownMenuItem className='text-base cursor-pointer' >Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className='text-base cursor-pointer flex gap-2 items-center'
                  onClick={() => dispatch(toggleTheme())}
                >
                  <div className="rounded-full">
                    {
                      theme === 'light'? <FaMoon className="size-4" /> : <FaSun className="size-4" />
                    }
                  </div>
                  Display
                </DropdownMenuItem>
                <DropdownMenuItem className='text-base cursor-pointer' onClick={logoutHandler} >
                  <div className="rounded-full">
                    <MdLogout className="size-6" />
                  </div>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
