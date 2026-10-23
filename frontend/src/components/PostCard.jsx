import React, { useRef, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import userLogo from "../assets/fb-user-profile.jpg";
import { BsFileImage, BsThreeDots } from "react-icons/bs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment, FaRegSmile } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import TimeAgo from "./TimeAgo";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "./ui/toast";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";
import CommentBox from "./CommentBox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { readFileAsDataURL } from "@/lib/utils";
import { FaEarthAmericas } from "react-icons/fa6";
import { TiArrowSortedDown, TiVideo } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const [liked, setLiked] = useState(post?.likes?.includes(user?._id));
  const [postLikeCount, setPostLikeCount] = useState(post?.likes?.length);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [content, setContent] = useState(post?.content || "");
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(post?.image);
  const [file, setFile] = useState(post?.image);
  const imageRef = useRef();
  const [isLoading, setIsLoading] = useState(false)
  const isUserPost = post?.user?._id.toString() === user?._id.toString()

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const response = await axios.get(
        `http://localhost:8000/api/v1/post/${post._id}/${action}`,
        { withCredentials: true },
      );
      if (response.data.success) {
        const updatedLikes = liked ? postLikeCount - 1 : postLikeCount + 1;
        setPostLikeCount(updatedLikes);
        setLiked(!liked);

        // updating the post
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked // the liked value is the old value
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p,
        );
        dispatch(setPosts(updatedPostData));

        toast.add({
          type: "success",
          description: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast.add({
        type: "error",
        description: error.response.data.message,
      });
    }
  };

  const sharePostHandler = (postId) => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    if (navigator.share) {
      navigator
        .share({
          title: "CheckOut this post!",
          text: "Check this amazing post",
          url: postUrl,
        })
        .then(() => {
          console.log("Shared successfully.");
        })
        .catch((err) => {
          console.error("Error sharing:", err);
        });
    } else {
      // Fallback : copy to clipboard
      navigator.clipboard.writeText(postUrl).then(() => {
        toast.add({
          type: "success",
          description: "Post link copied to clipboard",
        });
      });
    }
  };

  const deletePostHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/post/delete/${id}`,
        { withCredentials: true },
      );
      if (response.data.success) {
        // updating the post
        const updatedPostData = posts.filter((post) => post?._id.toString() !== id);
        dispatch(setPosts(updatedPostData));
        toast.add({
          type: "success",
          description: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editPostHandler = async (id) => {
    if (!content && !file) {
      setIsEditPostOpen(false);
      toast.add({
        type: "error",
        description: "Post must  have image or content",
      });
      return;
    }
    const formData = new FormData();
    formData.append("content", content);
    if (file) {
      formData.append("file", file);
    }
    try {
      setIsLoading(true)
      const response = await axios.put(
        `http://localhost:8000/api/v1/post/update-post/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      if (response.data.success) {
        dispatch(setPosts([response.data.post, ...posts]));
        setIsEditPostOpen(false)
        toast.add({
          type: "success",
          description: response.data.message
        })
      }
    } catch (error) {
      console.log(error)
      toast.add({
        type: "error",
        description: error.message,
      });
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="bg-white dark:bg-[#262829] rounded-lg md:w-125 shadow-lg mt-3">
      <div className="flex justify-between items-center p-3">
        <div className="flex gap-2 items-center ">
          <Avatar className="size-9">
            <AvatarImage src={post?.user?.profilePicture || userLogo} />
          </Avatar>
          <div className="flex flex-col gap-0">
            <Link to={`/profile/${post?.user?._id}`} className="text-base text-black dark:text-white font-medium hover:underline">
              {post?.user?.firstname} {post?.user?.lastname}
            </Link>
            <TimeAgo
              className="text-sm text-gray-500"
              createdAt={post?.createdAt}
            />
          </div>
        </div>
        {
          isUserPost && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="size-9 hover:bg-gray-200 dark:hover:bg-[#373a3b] rounded-full flex items-center justify-center cursor-pointer">
                  <BsThreeDots className="text-xl" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent> 
                <DropdownMenuItem onClick={() => setIsEditPostOpen(true)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => deletePostHandler(post._id)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }

        {/* Edit post dialog */}
        <Dialog
          className="shadow-xl"
          open={isEditPostOpen}
          onOpenChange={setIsEditPostOpen}
        >
          <DialogContent className="sm:max-w-125 dark:bg-[262829]">
            <DialogHeader>
              <DialogTitle className="text-black text-xl text-center font-bold">
                Edit post
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
            {imagePreview && (
              <div className="size-25 flex items-center justify-center relative">
                <img
                  src={imagePreview}
                  className="object-cover h-full w-full rounded-md"
                />
                <button className="rounded-full p-1 cursor-pointer absolute top-2 right-2 bg-white text-grey-500">
                  <RxCross2
                    className="size-3"
                    onClick={() => setImagePreview("")}
                  />
                </button>
              </div>
            )}

            <div className="w-full border border-gray-300 rounded-md flex items-center justify-between py-2 px-3">
              <span className="text-sm font-semibold">Add to your post</span>
              <input
                type="file"
                className="hidden"
                ref={imageRef}
                onChange={fileChangeHandler}
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

            <button
              className="w-full py-2 text-white font-medium rounded-md bg-[#0866ff] hover:bg-[#0b60e9] cursor-pointer disabled:opacity-50"
              onClick={() => editPostHandler(post?._id)}
              disabled={isLoading}
            >
            {
              isLoading ? "Please wait..." : "Edit Post"
            }
            </button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full flex flex-col">
        {post?.content && (
          <p className="px-3 pb-3 text-[15px]">{post.content}</p>
        )}
        <img src={post?.image} className="w-full" />
      </div>

      <div className="h-10 flex text-gray-500">
        <div className="h-full w-fit px-2 flex gap-2 items-center justify-center hover:bg-gray-100 cursor-pointer rounded-bl-lg">
          <div onClick={likeOrDislikeHandler}>
            {liked ? (
              <AiFillLike className="text-2xl text-blue-500" />
            ) : (
              <AiOutlineLike className="text-2xl" />
            )}
          </div>
          <span className="text-sm">{postLikeCount}</span>
        </div>
        <div
          className="h-full w-fit px-2 flex gap-2 items-center justify-center hover:bg-gray-100 cursor-pointer"
          onClick={() => setOpenCommentDialog(!openCommentDialog)}
        >
          <FaRegComment className="text-xl" />
          <span className="text-sm">{post?.comments?.length}</span>
        </div>
        <div
          className="h-full w-fit px-2 flex gap-2 items-center justify-center hover:bg-gray-100 cursor-pointer"
          onClick={() => sharePostHandler(post._id)}
        >
          <PiShareFat className="text-2xl " />
          <span className="text-sm">{post?.share?.length}</span>
        </div>
      </div>
      {openCommentDialog && <CommentBox post={post} />}
    </div>
  );
};

export default PostCard;
