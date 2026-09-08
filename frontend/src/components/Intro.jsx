import { VscBriefcase } from "react-icons/vsc";
import { FaBriefcase } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa6";
import { MdHomeWork } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";

const Intro = () => {

  const { userProfile } = useSelector(store => store.auth)

  const [introData, setIntroData] = useState({
    bioText: userProfile?.bio?.bioText,
    liveIn: userProfile?.bio?.liveIn,
    relationship: userProfile?.bio?.relationship,
    workplace: userProfile?.bio?.workplace,
    education: userProfile?.bio?.education,
    phone: userProfile?.bio?.phone,
    hometown: userProfile?.bio?.hometown
  })

    const arr1 = [
        {
            icon: <FaBriefcase/>,
            text: `Works at ${introData.workplace}`
        },
        {
            icon: <FaLocationDot className="text-[18px]" />,
            text: `Lives in ${introData.liveIn}`
        },
        {
            icon: <FaGraduationCap className="text-[18px]" />,
            text: `Studied at ${introData.education}`
        },
        {
            icon: <MdHomeWork className="text-[18px]" />,
            text: `From ${introData.hometown}`
        },
        {
            icon: <FaPhone/>,
            text: `${introData.phone}`
        },
        {
            icon: <FaHeart/>,
            text: `${introData.relationship}`
        },
    ]

  return (
    <div className="bg-white dark:bg-[#262829] flex-1 rounded-lg p-5 h-max shadow-md" >
      <h1 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-200" >Personal details</h1>
      {
        arr1.map((item,index) => {
          return (
            <div key={index} className="flex items-center gap-4 h-10">
              <span className="opacity-70 invert-50" >{item.icon}</span>
              <span>{item.text}</span>
            </div>
          )
        })
      }
      <button className="w-full bg-[#e1e4e8] hover:bg-[#c8cdd2] dark:bg-[#3a3c3d] text-gray-800 dark:text-gray-200 cursor-pointer py-1 rounded-md font-medium" >Edit details</button>
    </div>
  )
}

export default Intro