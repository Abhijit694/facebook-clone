import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import userLogo from "../assets/fb-user-profile.jpg";
import { BsFileImage } from "react-icons/bs";
import { TiVideo } from "react-icons/ti";
import { FaRegSmile } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaEarthAmericas } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";

const CreatePost = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-white dark:bg-[#262829] shadow-md py-2.5 px-5 rounded-lg w-125 md:mt-2">
      <div className="flex gap-3 items-center">
        <Avatar className="size-9">
          <AvatarImage src={user.profilePicture || userLogo} />
        </Avatar>
        <Dialog className='shadow-xl' >
          <DialogTrigger>
            <input
              type="text"
              className="bg-gray-100 hover:bg-gray-200/80 h-9 text-lg cursor-pointer rounded-full p-5 focus:outline-none focus:ring-0 focus:visible:outline-none placeholder-gray-500"
              placeholder={`What's on your mind, ${user.firstname}?`}
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-125 dark:bg-[262829]">
            <DialogHeader>
              <DialogTitle className="text-black text-xl text-center font-bold">
                Create post
              </DialogTitle>
              <hr />
            </DialogHeader>

            <div className="flex gap-2 items-center">
              <Avatar className="size-9">
                <AvatarImage src={user.profilePicture || userLogo} />
              </Avatar>
              <div className="flex flex-col">
                <div className="text-base text-black font-medium">
                  {user.firstname} {user.lastname}
                </div>
                <div className="bg-gray-200 w-fit rounded-lg py-1 px-2 flex gap-1 items-center cursor-pointer">
                  <FaEarthAmericas />
                  <span className="text-sm">Public</span>
                  <TiArrowSortedDown />
                </div>
              </div>
            </div>

            <textarea
              placeholder={`What's on your mind, ${user.firstname}?`}
              className="w-full resize-none text-xl focus:outline-none"
              rows={6}
            ></textarea>
            
            <div className="w-full border border-gray-300 rounded-md flex items-center justify-between py-2 px-3">
              <span className="text-sm font-semibold">Add to your post</span>
              <span className="flex items-center">
                <div className="flex items-center justify-center size-10 hover:bg-gray-100 rounded-lg gap-2  font-semibold cursor-pointer">
                  <TiVideo className="size-7 text-red-500" />
                </div>
                <div className="flex items-center justify-center size-10 hover:bg-gray-100 rounded-lg gap-2  font-semibold cursor-pointer">
                  <BsFileImage className="size-5 text-green-500" />
                </div>
                <div className="flex items-center justify-center size-10 hover:bg-gray-100 rounded-lg gap-2  font-semibold cursor-pointer">
                  <FaRegSmile className="size-6 text-yellow-500" />
                </div>
              </span>
            </div>

            <button className="w-full py-2 text-white font-medium rounded-md bg-[#0866ff] hover:bg-[#0b60e9] cursor-pointer">Post</button>
          </DialogContent>
        </Dialog>

        <div className="flex items-center w-full">
          <div className="flex items-center justify-center size-10 hover:bg-gray-100 rounded-lg gap-2  font-semibold cursor-pointer">
            <TiVideo className="size-7 text-red-500" />
          </div>
          <div className="flex items-center justify-center size-10 hover:bg-gray-100 rounded-lg gap-2  font-semibold cursor-pointer">
            <BsFileImage className="size-5 text-green-500" />
          </div>
          <div className="flex items-center justify-center size-10 hover:bg-gray-100 rounded-lg gap-2  font-semibold cursor-pointer">
            <FaRegSmile className="size-6 text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
