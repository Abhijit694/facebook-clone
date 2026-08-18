import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "/facebook-logo.png";
import { FiSearch } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { FaMoon, FaUserFriends } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";
import { MdLogout, MdOutlineOndemandVideo } from "react-icons/md";
import { BiStore } from "react-icons/bi";
import { HiBell } from "react-icons/hi2";
import { CgMenuGridR } from "react-icons/cg";
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

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { theme } = useSelector(store => store.theme)


  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/auth/logout`)
      if(res.data.success){
        dispatch(setUser(null))
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
    <nav className="bg-white dark:bg-[#262829] shadow fixed w-full z-50">
      <div className="px-4 py-2 md:py-0 flex justify-between items-center">
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
              <FiSearch className="text-gray-400" />
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search Facelook"
              className="dark:bg-[#323233] bg-[#f2f4f7] ml-2 outline-none text-sm w-28 md-w-45 text-black dark:text-gray-200"
            />
          </div>
        </div>

        {/* Center section - navigation icons */}
        <div className="hidden md:flex space-x-8 mt-2">
          <button className="border-b-3 border-blue-600 w-[100px] flex items-center justify-center pb-3">
            <GoHomeFill className="text-3xl text-blue-600 cursor-pointer hover:text-blue-700" />
          </button>
          <button className="w-[100px] flex items-center justify-center hover:bg-gray-200/10 rounded lg transition-all">
            <MdOutlineOndemandVideo className="text-3xl text-gray-400 cursor-pointer" />
          </button>
          <button className="w-[100px] flex items-center justify-center hover:bg-gray-200/10 rounded lg transition-all">
            <FaUserFriends className="text-3xl text-gray-400 cursor-pointer" />
          </button>
          <button className="w-[100px] flex items-center justify-center hover:bg-gray-200/10 rounded lg transition-all">
            <BiStore className="text-3xl text-gray-400 cursor-pointer" />
          </button>
        </div>

        {/* Right section - profile & icons */}
        <div className="flex items-center justify-end space-x-4 w-[200px]">
          <div className="flex justify-center items-center bg-gray-300 size-9 rounded-full dark:bg-[#323233]">
            <CgMenuGridR className="text-2xl text-gray-900 dark:text-gray-200 cursor-pointer hover:text-blue-600 hidden md:block" />
          </div>
          <div className="flex justify-center items-center bg-gray-300 size-9 rounded-full dark:bg-[#323233]">
            <HiBell className="text-2xl text-gray-900 dark:text-gray-200 cursor-pointer hover:text-blue-600 hidden md:block" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="m-0">
              <Avatar>
                <AvatarImage />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 bg-[#262829] text-white'>
              <DropdownMenuGroup>
                <DropdownMenuItem className='text-base cursor-pointer' >My Profile</DropdownMenuItem>
                <DropdownMenuItem className='text-base cursor-pointer' >Friends</DropdownMenuItem>
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
                  Change theme
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
      </div>
    </nav>
  );
};

export default Navbar;
