import { VscBriefcase } from "react-icons/vsc";
import { FaBriefcase } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa6";
import { MdHomeWork } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const Intro = () => {

    const arr1 = [
        {
            icon: <FaBriefcase/>,
            text: 'Works at Web developer'
        },
        {
            icon: <FaGraduationCap className="text-[18px]" />,
            text: 'Studied at Lokanath Mohavidyalaya'
        },
        {
            icon: <MdHomeWork className="text-[18px]" />,
            text: 'From Kendrapara,Odisha'
        },
        {
            icon: <FaLocationDot className="text-[18px]" />,
            text: 'Lives in Kendrapara'
        },
        {
            icon: <FaPhone/>,
            text: '+91 3947343794'
        },
        {
            icon: <FaHeart/>,
            text: 'Single'
        },
    ]

  return (
    <div className="bg-white dark:bg-[#262829] flex-1 rounded-lg p-5 h-max" >
      <h1 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-200" >Intro</h1>
      <p className="mb-5" >Hey I am a mernstack developer</p>
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
    </div>
  )
}

export default Intro