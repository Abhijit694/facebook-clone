import React, { useRef, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import userLogo from "../assets/fb-user-profile.jpg";
import { BsFileImage } from "react-icons/bs";
import { TiVideo } from "react-icons/ti";
import { FaRegSmile } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaEarthAmericas } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";
import { readFileAsDataURL } from "@/lib/utils";
import { toast } from "./ui/toast";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { setPosts } from "@/redux/postSlice";

const CreatePost = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.post)
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector((store) => store.auth);
  const [content, setContent] = useState("")
  const [file, setFile] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const imageRef = useRef()
  const [isLoading, setIsLoading] = useState(false)


  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0]
    if(file){
      setFile(file)
      const dataUrl = await readFileAsDataURL(file)
      setImagePreview(dataUrl)
    }
  }

  const submitHandler = async () => {
    if(!content && !file){
      toast.add({
        type: "error",
        description: "Post must have content or image"
      })
      setIsOpen(false)
      return
    }

    const formData = new FormData()
    formData.append("content",content)
    if(file){
      formData.append("file",file)
    }
    try {
      setIsLoading(true)
      const response = await axios.post(
        `http://localhost:8000/api/v1/post/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        }
      )
      if(response.data.success){
        toast.add({
          type: "success",
          description: response.data.message
        })
        setContent("")
        setFile(null)
        setImagePreview("")
        setIsOpen(false)
        dispatch(setPosts([response.data.post, ...posts]))
      }
    } catch (error) {
      console.log(error)
      toast.add({
        type: "error",
        description: "Error to post"
      })
    } finally {
      setIsLoading(false)
    }

  }


  return (
    <div className="bg-white dark:bg-[#262829] shadow-md py-2.5 px-3 rounded-lg w-125">
      <div className="flex gap-3 items-center">
        <Avatar className="size-9">
          <AvatarImage src={user.profilePicture || userLogo} />
        </Avatar>
        <Dialog className='shadow-xl' open={isOpen} onOpenChange={setIsOpen} >
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
              className="w-full resize-none text-lg outline-none overflow-x-hidden scrollbar-none"
              rows={6}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
            {
              imagePreview && (
                <div className="size-25 flex items-center justify-center relative" >
                  <img src={imagePreview} className="object-cover h-full w-full rounded-md" />
                  <button className="rounded-full p-1 cursor-pointer absolute top-2 right-2 bg-white text-grey-500" >
                    <RxCross2 className="size-3" onClick={() => setImagePreview("")} />
                  </button>
                </div>
              )
            }
            
            <div className="w-full border border-gray-300 rounded-md flex items-center justify-between py-2 px-3">
              <span className="text-sm font-semibold">Add to your post</span>
              <input
                type="file"
                className="hidden"
                ref={imageRef} onChange={fileChangeHandler}
                accept="image/*"
              />
              <span className="flex items-center">
                <div className="flex items-center justify-center size-10 hover:bg-gray-100 rounded-lg gap-2  font-semibold cursor-pointer">
                  <TiVideo className="size-7 text-red-500" />
                </div>
                <div className="flex items-center justify-center size-10 hover:bg-gray-100 rounded-lg gap-2  font-semibold cursor-pointer">
                  <BsFileImage
                    className="size-5 text-green-500"
                    onClick={() => imageRef.current.click()}
                  />
                </div>
                <div className="flex items-center justify-center size-10 hover:bg-gray-100 rounded-lg gap-2  font-semibold cursor-pointer">
                  <FaRegSmile className="size-6 text-yellow-500" />
                </div>
              </span>
            </div>

            <button className="w-full py-2 text-white font-medium rounded-md bg-[#0866ff] hover:bg-[#0b60e9] cursor-pointer disabled:opacity-50" onClick={submitHandler} disabled={isLoading} >
              {
                isLoading ? "Please wait..." : "Post"
              }
            </button>
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
